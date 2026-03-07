"use client"

import React, { useState, Suspense, useEffect } from "react"
import { DollarSign, Clock, ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import PaymentFlow from "@/components/payments/PaymentFlow"
import PaymentDetails from "@/components/payments/PaymentDetails"
import { getPayments } from "./actions"

function PaymentsContent() {
    const searchParams = useSearchParams()
    const status = searchParams.get('status')
    const transactionId = searchParams.get('transactionId')

    const [showPaymentFlow, setShowPaymentFlow] = useState(!!status)
    const [realPayments, setRealPayments] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedPayment, setSelectedPayment] = useState<any | null>(null)

    useEffect(() => {
        async function loadPayments() {
            const data = await getPayments()
            setRealPayments(data)
            setLoading(false)
        }
        loadPayments()
    }, [showPaymentFlow]) // Refresh when returning from payment flow

    if (showPaymentFlow) {
        return (
            <div className="relative">
                {!status && (
                    <button
                        onClick={() => setShowPaymentFlow(false)}
                        className="absolute top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                )}
                <PaymentFlow initialStatus={status} initialTxnId={transactionId} />
            </div>
        )
    }

    const pendingTotal = realPayments.filter(p => p.status === 'PENDING').reduce((acc, p) => acc + p.amount, 0)

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Payments & Invoices</h1>

            {/* Total Due Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <DollarSign size={120} className="text-emerald-500" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 text-white">
                    <div>
                        <p className="text-slate-400 font-medium mb-1">Total Outstanding Dues (Pending)</p>
                        <h3 className="text-5xl font-bold tracking-tight text-emerald-400">৳ {pendingTotal.toLocaleString()}</h3>
                        <p className="text-slate-500 text-sm mt-2">Update based on your recent activity</p>
                    </div>

                    <button
                        onClick={() => setShowPaymentFlow(true)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-emerald-900/20 transition-all transform hover:-translate-y-0.5"
                    >
                        Pay Now via Online
                    </button>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" /> Real-time Payment History
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={async () => {
                                setLoading(true)
                                const data = await getPayments()
                                setRealPayments(data)
                                setLoading(false)
                            }}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 border-blue-100 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
                        >
                            Refresh History
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Method</th>
                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">Loading payment history...</td>
                                </tr>
                            ) : realPayments.map((payment: any) => (
                                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600 text-[10px]">{payment.transactionId}</td>
                                    <td className="px-6 py-4 text-slate-500 text-[11px]">{new Date(payment.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{payment.feeCategory}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">৳ {payment.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`
                                            inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase
                                            ${payment.status === "SUCCESS" ? "bg-emerald-100 text-emerald-700" :
                                                payment.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                                                    "bg-red-100 text-red-700"}
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 
                                                ${payment.status === "SUCCESS" ? "bg-emerald-500" :
                                                    payment.status === "PENDING" ? "bg-amber-500" :
                                                        "bg-red-500"}
                                            `}></span>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-xs">{payment.method || 'Online'}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedPayment(payment)}
                                            className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-100 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!loading && realPayments.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No real-time payment history found in database.
                    </div>
                )}
            </div>

            {selectedPayment && (
                <PaymentDetails
                    payment={selectedPayment}
                    onClose={() => setSelectedPayment(null)}
                />
            )}
        </div>
    )
}

export default function PaymentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentsContent />
        </Suspense>
    )
}
