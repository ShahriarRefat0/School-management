import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * SSLCommerz Payment Initiation
 * This route creates a transaction ID, saves a PENDING record in Prisma,
 * and returns the SSLCommerz gateway URL for the user to visit.
 */

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            amount,
            studentId,
            schoolId,
            feeCategory,
            customerName,
            customerEmail,
            customerPhone
        } = body;

        // 1. Validation
        if (!amount || !studentId || !schoolId) {
            return NextResponse.json({ error: 'Missing required payment details' }, { status: 400 });
        }

        // 2. Transaction Setup
        const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        // 3. Prepare SSLCommerz API Parameters
        const params = new URLSearchParams();
        params.append('store_id', process.env.SSL_STORE_ID!);
        params.append('store_passwd', process.env.SSL_STORE_PASS!);
        params.append('total_amount', amount.toString());
        params.append('currency', 'BDT');
        params.append('tran_id', transactionId);
        params.append('success_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/success`);
        params.append('fail_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/fail`);
        params.append('cancel_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/cancel`);
        params.append('ipn_url', `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/ipn`);
        params.append('shipping_method', 'NO');
        params.append('product_name', feeCategory || 'School Fee');
        params.append('product_category', 'Education');
        params.append('product_profile', 'general');
        params.append('cus_name', customerName || 'Default Student');
        params.append('cus_email', customerEmail || 'student@school.com');
        params.append('cus_add1', 'Dhaka');
        params.append('cus_city', 'Dhaka');
        params.append('cus_postcode', '1000');
        params.append('cus_country', 'Bangladesh');
        params.append('cus_phone', customerPhone || '01XXXXXXXXX');
        params.append('ship_name', 'N/A');
        params.append('ship_add1', 'N/A');
        params.append('ship_city', 'N/A');
        params.append('ship_postcode', '0');
        params.append('ship_country', 'Bangladesh');

        const gatewayUrl = process.env.SSL_IS_LIVE === 'true'
            ? 'https://securepay.sslcommerz.com/gwprocess/v4/api.php'
            : 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php';

        // 4. Call SSLCommerz API
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
            console.error('SSLCommerz non-JSON response:', responseText);
            return NextResponse.json({
                error: 'Invalid response from gateway',
                details: responseText.substring(0, 100)
            }, { status: 400 });
        }

        // 5. Verify API Response
        if (result && result.status === 'SUCCESS' && result.GatewayPageURL) {
            // 6. Persistence via Prisma
            await prisma.payment.create({
                data: {
                    transactionId: transactionId,
                    amount: parseFloat(amount),
                    status: 'PENDING',
                    studentId: studentId,
                    schoolId: schoolId,
                    feeCategory: feeCategory || 'School Fee',
                    customerName: customerName || 'Default Student',
                    customerEmail: customerEmail || 'student@school.com',
                    customerPhone: customerPhone || '01XXXXXXXXX',
                }
            });

            return NextResponse.json({ url: result.GatewayPageURL });
        } else {
            console.error('SSLCommerz Initialization Error:', result);
            return NextResponse.json({ error: result.failedreason || 'Gateway initialization failed' }, { status: 400 });
        }

    } catch (error: any) {
        console.error('API /api/payment/initiate critical error:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            details: error.message
        }, { status: 500 });
    }
}
