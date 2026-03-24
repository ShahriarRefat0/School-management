import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const data = Object.fromEntries(formData.entries());

        const { tran_id, status, val_id, bank_tran_id, card_type } = data as any;

        if (status === 'VALID') {
            // ১. Subscription স্ট্যাটাস আপডেট করা
            const subscription = await prisma.subscription.update({
                where: { transactionId: tran_id },
                data: {
                    status: 'SUCCESS',
                    valId: val_id,
                    method: card_type || bank_tran_id,
                    startDate: new Date(),
                }
            });

            // ২. স্কুলের Plan আপডেট করা
            await prisma.school.update({
                where: { id: subscription.schoolId },
                data: {
                    plan: subscription.planName.toLowerCase(),
                    duration: subscription.duration,
                }
            });

            // ডাটা রিফ্রেশ নিশ্চিত করা
            revalidatePath('/dashboard/principal/subscription');

            // পেমেন্ট সফল হওয়ার পর আবার সাবস্ক্রিপশন পেজেই পাঠানো (সাথে সাকসেস ফ্ল্যাগ)
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/principal/subscription?payment=success`,
                303
            );
        } else {
            // পেমেন্ট ফেইল হলে আপডেট
            await prisma.subscription.update({
                where: { transactionId: tran_id },
                data: { status: 'FAIL' }
            }).catch(() => {});

            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/principal/subscription?payment=failed`,
                303
            );
        }

    } catch (error: any) {
        console.error('Subscription Success Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
