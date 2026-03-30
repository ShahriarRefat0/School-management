import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planName, schoolId, customerName, customerEmail, customerPhone } = body;

        if (!process.env.SSL_STORE_ID || !process.env.SSL_STORE_PASS) {
            return NextResponse.json({ error: 'SSL credentials missing' }, { status: 500 });
        }

        // --- SECURITY: Fetch Plan Details from Database (Never trust Client Amount) ---
        const plan = await prisma.plan.findFirst({
            where: { name: { equals: planName, mode: 'insensitive' } }
        });

        if (!plan) {
            return NextResponse.json({ error: 'Plan not found' }, { status: 400 });
        }

        const amount = parseFloat(plan.price);
        const duration = plan.duration;

        let school: any = null;
        if (schoolId) school = await prisma.school.findUnique({ where: { id: schoolId } });
        if (!school && customerEmail) {
            const userWithSchool = await prisma.user.findUnique({
                where: { email: customerEmail },
                include: { school: true }
            });
            school = userWithSchool?.school;
        }
        if (!school) school = await prisma.school.findFirst();

        if (!school) {
            return NextResponse.json({ error: 'No school found' }, { status: 400 });
        }

        const transactionId = `SUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const params = new URLSearchParams();
        params.append('store_id', process.env.SSL_STORE_ID!);
        params.append('store_passwd', process.env.SSL_STORE_PASS!);
        params.append('total_amount', amount.toString());
        params.append('currency', 'BDT');
        params.append('tran_id', transactionId);
        params.append('success_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/success`);
        params.append('fail_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/success`); // Use success for handling fail too
        params.append('cancel_url', `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/principal/subscription`);
        params.append('shipping_method', 'NO');
        params.append('product_name', `Plan: ${planName}`);
        params.append('product_category', 'Subscription');
        params.append('product_profile', 'subscription');
        params.append('cus_name', customerName || 'Principal');
        params.append('cus_email', customerEmail || 'principal@school.com');
        params.append('cus_phone', customerPhone || '01700000000');
        params.append('cus_add1', 'Dhaka');
        params.append('cus_city', 'Dhaka');
        params.append('cus_postcode', '1000');
        params.append('cus_country', 'Bangladesh');

        const gatewayUrl = process.env.SSL_IS_LIVE === 'true'
            ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
            : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

        const response = await fetch(gatewayUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString()
        });

        const result = await response.json();

        if (result && result.status === 'SUCCESS' && result.GatewayPageURL) {
            try {
                // @ts-ignore
                await prisma.subscription.create({
                    data: {
                        transactionId: transactionId,
                        amount: amount,
                        status: 'PENDING',
                        planName: planName,
                        duration: duration,
                        schoolId: school.id,
                        customerName: customerName || 'Principal',
                        customerEmail: customerEmail || 'principal@school.com',
                        customerPhone: customerPhone || null,
                    }
                });
                return NextResponse.json({ url: result.GatewayPageURL });
            } catch (pError: any) {
                console.error('Prisma Error:', pError.message);
                return NextResponse.json({ error: 'DB Error: Please restart the server once.' }, { status: 500 });
            }
        } else {
            return NextResponse.json({ error: result?.failedreason || 'Gateway failed' }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
