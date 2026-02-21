"use client"

import React, { useState } from "react"
import { DollarSign, Clock, CheckCircle } from "lucide-react"

// Mock Data
const payments = [
    {
        id: 1,
        invoiceId: "INV-2026-001",
        date: "Feb 10, 2026",
        month: "January 2026",
        amount: "$150.00",
        status: "Paid",
        method: "Bank Transfer",
    },
    {
        id: 2,
        invoiceId: "INV-2025-012",
        date: "Jan 10, 2025",
        month: "December 2025",
        amount: "$150.00",
        status: "Paid",
        method: "Credit Card",
    },
    {
        id: 3,
        invoiceId: "INV-2025-011",
        date: "Dec 10, 2025",
        month: "November 2025",
        amount: "$150.00",
        status: "Paid",
        method: "Mobile Banking",
    },
    {
        id: 4,
        invoiceId: "INV-2026-002",
        date: "Feb 28, 2026",
        month: "February 2026",
        amount: "$150.00",
        status: "Unpaid",
        method: "-",
    },
]

const pendingTotal = "$150.00"

export default function PaymentsPage() {
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
                        <p className="text-slate-400 font-medium mb-1">Total Outstanding Dues</p>
                        <h3 className="text-5xl font-bold tracking-tight text-emerald-400">{pendingTotal}</h3>
                        <p className="text-slate-500 text-sm mt-2">Due by: Feb 28, 2026</p>
                    </div>

                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-emerald-900/20 transition-all transform hover:-translate-y-0.5">
                        Pay Now via Online
                    </button>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" /> Payment History
                    </h3>
                    <div className="flex gap-2">
                        <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 border bg-white px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">
                            This Year
                        </button>
                        <button className="text-xs font-semibold text-slate-500 hover:text-blue-600 bg-white border px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors">
                            Download Statement
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-600">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Invoice ID</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Month</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Method</th>
                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600">{payment.invoiceId}</td>
                                    <td className="px-6 py-4 text-slate-500">{payment.date}</td>
                                    <td className="px-6 py-4 font-medium text-slate-800">{payment.month}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">{payment.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`
                                            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase
                                            ${payment.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 
                                                ${payment.status === "Paid" ? "bg-emerald-500" : "bg-red-500"}
                                            `}></span>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{payment.method}</td>
                                    <td className="px-6 py-4 text-right">
                                        {payment.status === "Paid" ? (
                                            <button className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-100 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                                                Download
                                            </button>
                                        ) : (
                                            <button className="text-emerald-600 hover:text-emerald-800 font-medium text-xs border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors">
                                                Pay
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {payments.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                        No payment history found.
                    </div>
                )}
            </div>
        </div>
    )
}