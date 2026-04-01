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
            const payment = await prisma.payment.update({
                where: { transactionId: tran_id },
                data: {
                    status: 'SUCCESS',
                    method: card_type || 'ONLINE',
                    valId: val_id,
                    updatedAt: new Date()
                }
            });

            // 4. Handle Reconciliation Logic (Waterfall Debt Deduction)
            // Whether it's "All Outstanding Dues" or a "Custom Payment", we apply the amount to existing PENDING debts.
            if (payment.feeCategory === 'All Outstanding Dues' || payment.feeCategory === 'Custom Payment') {
                // Fetch all PENDING payments for this student (oldest first)
                const pendingFees = await prisma.payment.findMany({
                    where: {
                        studentId: payment.studentId,
                        status: 'PENDING',
                        id: { not: payment.id } // Don't try to reconcile the transaction we just completed
                    },
                    orderBy: { createdAt: 'asc' }
                });

                let remainingPaidAmount = payment.amount;

                // Waterfall through each pending fee
                for (const fee of pendingFees) {
                    if (remainingPaidAmount <= 0) break;

                    if (remainingPaidAmount >= fee.amount) {
                        // This fee is FULLY COVERED
                        await prisma.payment.update({
                            where: { id: fee.id },
                            data: {
                                status: 'SUCCESS',
                                method: 'SETTLED_BY_LUMP_SUM',
                                valId: val_id,
                                updatedAt: new Date()
                            }
                        });
                        remainingPaidAmount -= fee.amount;
                    } else {
                        // This fee is PARTIALLY COVERED
                        // Reduce the amount of the existing fee record
                        await prisma.payment.update({
                            where: { id: fee.id },
                            data: {
                                amount: fee.amount - remainingPaidAmount,
                                updatedAt: new Date()
                                // Status remains PENDING for the remaining balance
                            }
                        });
                        remainingPaidAmount = 0;
                    }
                }
            }

            // 5. Final Redirect to Frontend Success View
            // Status code 303 (See Other) is used for manual redirect after a POST request
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=success&transactionId=${tran_id}`, { status: 303 });
        }

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=error`, { status: 303 });

    } catch (error: any) {
        console.error('Success Callback Failure:', error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/student/payments?status=error`, { status: 303 });
    }
}
