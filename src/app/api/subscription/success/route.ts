import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const data = Object.fromEntries(formData.entries());

        const { tran_id, status, val_id, bank_tran_id, card_type } = data as any;

        if (status === 'VALID') {
            // ১. ট্রানজ্যাকশন স্ট্যাটাস আপডেট করা
            const transaction = await prisma.transaction.update({
                where: { transactionId: tran_id },
                data: {
                    status: 'SUCCESS',
                    valId: val_id,
                    method: card_type || bank_tran_id,
                }
            });

            // ২. স্কুলের সাবস্ক্রিপশন (Plan) আপডেট করা
            await prisma.school.update({
                where: { id: transaction.schoolId },
                data: {
                    plan: transaction.planName.toLowerCase(),
                    duration: transaction.duration,
                }
            });

            // পেমেন্ট সফল হওয়ার পর প্রিন্সিপালকে থ্যাঙ্ক ইউ পেজে বা ড্যাশবোর্ডে পাঠানো
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/principal?payment=success`, 303);
        } else {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/principal?payment=failed`, 303);
        }

    } catch (error: any) {
        console.error('Subscription Success Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
