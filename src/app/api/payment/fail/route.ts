import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Senior Developer Note: SSLCommerz Failed Callback
 * In case of a failure (incorrect CVV, insufficient balance, etc.), 
 * SSLCommerz will redirect the browser here with a POST request.
 */

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const tran_id = formData.get('tran_id') as string;
        const failed_reason = formData.get('failedreason') as string || 'Unknown';

        console.error('Payment FAILED for Transaction ID:', { tran_id, failed_reason });

        // 1. Mark the Database Record as FAILED (If found)
        if (tran_id) {
            await prisma.payment.update({
                where: { transactionId: tran_id },
                data: {
                    status: 'FAILED',
                    updatedAt: new Date()
                }
            }).catch(() => null); // Silent if transaction not found/already updated
        }

        // 2. Redirect User Back to Dashboard to Inform of the Result
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=failed&transactionId=${tran_id}&reason=${encodeURIComponent(failed_reason)}`, { status: 303 });

    } catch (error: any) {
        console.error('Fail Callback Logic Failure:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=error`, { status: 303 });
    }
}
