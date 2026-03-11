"use client"
import React from 'react'
import { Check, Zap, Shield, Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

const plans = [
    {
        name: "Basic",
        price: 500,
        duration: "1 Month",
        features: ["Up to 100 Students", "Basic Reporting", "Email Support"],
        color: "blue",
        icon: Zap
    },
    {
        name: "Standard",
        price: 2500,
        duration: "6 Months",
        features: ["Up to 500 Students", "Advanced Analytics", "Priority Support", "Custom Domain"],
        color: "purple",
        icon: Shield,
        popular: true
    },
    {
        name: "Premium",
        price: 4500,
        duration: "12 Months",
        features: ["Unlimited Students", "Full ERP Access", "Dedicated Manager", "White-labeling"],
        color: "orange",
        icon: Crown
    }
]

export default function SubscriptionPage() {
    const router = useRouter();

    const { user } = useAuth();

    const handleBuyNow = async (plan: any) => {
        try {
            if (!user) {
                alert("Please log in first");
                return;
            }

            const res = await fetch('/api/subscription/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    planName: plan.name,
                    amount: plan.price,
                    duration: plan.duration,
                    customerName: user.user_metadata?.name || user.email,
                    customerEmail: user.email,
                    customerPhone: user.user_metadata?.phone,
                    schoolId: user.user_metadata?.schoolId, // optional, server will find it if missing
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Payment initiation failed: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred during payment initiation.");
        }
    }

    return (
        <div className="p-8 space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-[var(--color-text-primary)]">Choose Your Plan</h1>
                <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
                    Select the best plan for your school and get started in minutes.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative bg-[var(--color-bg-card)] p-8 rounded-3xl border-2 transition-all hover:scale-105 ${plan.popular ? 'border-[var(--color-primary)] shadow-xl' : 'border-[var(--color-border-light)]'}`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-primary)] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                Most Popular
                            </div>
                        )}

                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-${plan.color}-500/10 text-${plan.color}-500`}>
                            <plan.icon size={24} />
                        </div>

                        <h3 className="text-2xl font-black text-[var(--color-text-primary)]">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline">
                            <span className="text-4xl font-black text-[var(--color-text-primary)]">৳{plan.price}</span>
                            <span className="text-[var(--color-text-muted)] ml-2">/{plan.duration}</span>
                        </div>

                        <ul className="mt-8 space-y-4">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                                    <Check size={16} className="text-green-500" />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleBuyNow(plan)}
                            className={`w-full mt-10 py-4 rounded-2xl font-black transition-all ${plan.popular ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25 hover:opacity-90' : 'bg-[var(--color-bg-page)] text-[var(--color-text-primary)] border border-[var(--color-border-light)] hover:bg-[var(--color-primary)] hover:text-white'}`}
                        >
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
