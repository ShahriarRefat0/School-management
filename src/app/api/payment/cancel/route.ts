import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Senior Developer Note: SSLCommerz Cancelled Callback
 * User manual cancellation (browser closed/back button on gateway) 
 * will trigger this POST callback.
 */

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const tran_id = formData.get('tran_id') as string;

        console.info('Payment CANCELLED for Transaction ID:', tran_id);

        // 1. Mark the Database Record as CANCELLED (if found)
        if (tran_id) {
            await prisma.payment.update({
                where: { transactionId: (tran_id as string) },
                data: {
                    status: 'CANCELLED',
                    updatedAt: new Date()
                }
            }).catch(() => null);
        }

        // 2. Return to the dashboard with cancelled status
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=cancelled&transactionId=${tran_id}`, { status: 303 });

    } catch (error: any) {
        console.error('Cancel Callback Logic Failure:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=error`, { status: 303 });
    }
}
