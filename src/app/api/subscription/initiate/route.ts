import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planName, amount, duration, schoolId, customerName, customerEmail, customerPhone } = body;

        // স্কুল খুঁজে বের করা
        let school = null;
        if (schoolId) {
            school = await prisma.school.findUnique({ where: { id: schoolId } });
        }

        // যদি আইডি না থাকে, তবে ইমেল দিয়ে খুঁজি (Principal এর ইমেল দিয়ে স্কুল লিঙ্ক করা থাকতে পারে)
        if (!school && customerEmail) {
            const userWithSchool = await prisma.user.findUnique({
                where: { email: customerEmail },
                include: { school: true }
            });
            if (userWithSchool?.school) {
                school = userWithSchool.school;
            }
        }

        // যদি তাও না থাকে, তবে টেস্ট করার জন্য ডাটাবেজ থেকে একটি স্কুল নিয়ে নিই (ডেভলপমেন্টের জন্য)
        if (!school) {
            school = await prisma.school.findFirst();
        }

        if (!school) {
            return NextResponse.json({ error: 'No school found associated with this account.' }, { status: 400 });
        }

        const transactionId = `SUB-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        const params = new URLSearchParams();
        params.append('store_id', process.env.SSL_STORE_ID!);
        params.append('store_passwd', process.env.SSL_STORE_PASS!);
        params.append('total_amount', amount.toString());
        params.append('currency', 'BDT');
        params.append('tran_id', transactionId);
        params.append('success_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/success`);
        params.append('fail_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`);
        params.append('cancel_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`);
        params.append('ipn_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/ipn`);
        params.append('shipping_method', 'NO');
        params.append('product_name', `Plan: ${planName}`);
        params.append('product_category', 'Subscription');
        params.append('product_profile', 'subscription');
        params.append('cus_name', customerName || school?.schoolName || 'Principal');
        params.append('cus_email', customerEmail || school?.schoolEmail || 'principal@school.com');
        params.append('cus_add1', school?.address || 'Dhaka');
        params.append('cus_city', 'Dhaka');
        params.append('cus_postcode', '1000');
        params.append('cus_country', 'Bangladesh');
        params.append('cus_phone', customerPhone || school?.phone || '01XXXXXXXXX');
        params.append('ship_name', 'N/A');
        params.append('ship_add1', 'N/A');
        params.append('ship_city', 'N/A');
        params.append('ship_postcode', '0');
        params.append('ship_country', 'Bangladesh');

        const gatewayUrl = process.env.SSL_IS_LIVE === 'true'
            ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
            : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

        const response = await fetch(gatewayUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });

        const responseText = await response.text();
        let result: any;
        try {
            result = JSON.parse(responseText);
        } catch (e) {
            return NextResponse.json({ error: 'Gateway error' }, { status: 400 });
        }

        if (result && result.status === 'SUCCESS' && result.GatewayPageURL) {
            try {
                // Prisma তে ট্রানজ্যাকশন রেকর্ড সেভ করা (Status: PENDING)
                await prisma.transaction.create({
                    data: {
                        transactionId: transactionId,
                        amount: parseFloat(amount),
                        status: 'PENDING',
                        planName: planName,
                        duration: duration,
                        schoolId: school.id,
                        customerName: customerName || school.schoolName || 'Principal',
                        customerEmail: customerEmail || school.schoolEmail || 'principal@school.com',
                        customerPhone: customerPhone || school.phone || null,
                    }
                });
                return NextResponse.json({ url: result.GatewayPageURL });
            } catch (prismaError: any) {
                console.error('Prisma Transaction Create Error:', prismaError);
                return NextResponse.json({
                    error: 'Database error while saving transaction.',
                    details: prismaError.message
                }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: result.failedreason || 'Failed to initiate' }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Subscription Initiate Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
