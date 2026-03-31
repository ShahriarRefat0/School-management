import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Senior Developer Note: SSLCommerz Success Callback
 * SSLCommerz redirects the user's browser via a POST request to this URL
 * upon a successful transaction. We parse the data, check the transaction,
 * update the database, and redirect the user back to the dashboard.
 */

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // 1. Extraction of Key SSLCommerz Fields
        const tran_id = formData.get('tran_id') as string;
        const val_id = formData.get('val_id') as string;
        const card_type = formData.get('card_type') as string;
        const amount = formData.get('amount') as string;
        const bank_tran_id = formData.get('bank_tran_id') as string;
        const status = formData.get('status') as string;

        console.log('Payment Successful:', { tran_id, val_id, amount, status });

        // 2. Perform Secondary Validation (Mandatory for security)
        // Check if the transaction exists in our system and is still PENDING
        if (tran_id) {
            const existingPayment = await prisma.payment.findUnique({
                where: { transactionId: tran_id }
            });

            if (!existingPayment) {
                console.error(`Transaction ID ${tran_id} not found.`);
                return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=error&message=Transaction-not-found`, { status: 303 });
            }

            // 3. Update Database via Prisma
            await prisma.payment.update({
                where: { transactionId: tran_id },
                data: {
                    status: 'SUCCESS',
                    method: card_type || 'ONLINE',
                    valId: val_id,
                    updatedAt: new Date()
                }
            });

            // 4. Final Redirect to Frontend Success View
            // Status code 303 (See Other) is used for manual redirect after a POST request
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=success&transactionId=${tran_id}`, { status: 303 });
        }

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=error`, { status: 303 });

    } catch (error: any) {
        console.error('Success Callback Failure:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=error`, { status: 303 });
    }
}
