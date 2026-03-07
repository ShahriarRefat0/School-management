"use client"

import React from "react"
import {
    X,
    Download,
    Printer,
    CheckCircle2,
    Clock,
    AlertCircle,
    CreditCard,
    Calendar,
    Hash,
    User,
    Mail,
    Phone,
    FileText,
    ExternalLink
} from "lucide-react"

interface PaymentDetailsProps {
    payment: any
    onClose: () => void
}

export default function PaymentDetails({ payment, onClose }: PaymentDetailsProps) {
    if (!payment) return null

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handlePrint = () => {
        window.print()
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fadeIn">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Payment Details</h2>
                        <p className="text-xs text-slate-500 font-medium">Transaction info and digital receipt</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Status Badge Area */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-inner
                            ${payment.status === "SUCCESS" ? "bg-emerald-50" :
                                payment.status === "PENDING" ? "bg-amber-50" : "bg-red-50"}
                        `}>
                            {payment.status === "SUCCESS" ? <CheckCircle2 className="w-10 h-10 text-emerald-500" /> :
                                payment.status === "PENDING" ? <Clock className="w-10 h-10 text-amber-500" /> :
                                    <AlertCircle className="w-10 h-10 text-red-500" />}
                        </div>
                        <div>
                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                                ${payment.status === "SUCCESS" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                                    payment.status === "PENDING" ? "bg-amber-100 text-amber-700 border-amber-200" :
                                        "bg-red-100 text-red-700 border-red-200"}
                            `}>
                                {payment.status}
                            </span>
                            <h3 className="text-3xl font-black text-slate-900 mt-3 italic underline decoration-blue-500/30">
                                ৳ {payment.amount.toLocaleString()}
                            </h3>
                        </div>
                    </div>

                    {/* Transaction Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Transaction ID</p>
                            <p className="font-mono text-xs font-bold text-slate-700 flex items-center gap-2">
                                <Hash className="w-3 h-3 text-slate-400" /> {payment.transactionId}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Payment Date</p>
                            <p className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-slate-400" /> {formatDate(payment.createdAt)}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Fee Category</p>
                            <p className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                <FileText className="w-3 h-3 text-slate-400" /> {payment.feeCategory}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Payment Method</p>
                            <p className="text-xs font-bold text-slate-700 flex items-center gap-2">
                                <CreditCard className="w-3 h-3 text-slate-400" /> {payment.method || 'Online (SSLCommerz)'}
                            </p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Payer Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <User className="w-4 h-4 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-none">Name</p>
                                    <p className="text-xs font-bold text-slate-700 truncate max-w-[120px]">{payment.customerName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-none">Email</p>
                                    <p className="text-xs font-bold text-slate-700 truncate max-w-[150px]">{payment.customerEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                    <Phone className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter leading-none">Phone</p>
                                    <p className="text-xs font-bold text-slate-700">{payment.customerPhone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Disclaimer */}
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                        <p className="text-[10px] text-blue-700 font-medium leading-relaxed italic">
                            * This is a computer-generated digital receipt. No signature is required. For any discrepancies, please contact the school accountant office with the transaction ID.
                        </p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                    <button
                        onClick={handlePrint}
                        className="flex-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                    >
                        <Printer className="w-4 h-4" /> Print Receipt
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                </div>
            </div>

            {/* Printable Invoice Component (Hidden from UI, visible in Print) */}
            <div className="hidden print:block">
                <div id="printable-receipt" className="p-10 font-sans text-slate-900 bg-white">
                    {/* Simplified Print Layout */}
                    <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter">Official Fee Receipt</h1>
                            <p className="text-sm font-bold text-slate-500">School Management System</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold">No: {payment.transactionId}</p>
                            <p className="text-xs text-slate-500 italic">{formatDate(payment.createdAt)}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10 mb-10">
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase text-slate-400 border-b pb-1">Billed To</h4>
                            <div>
                                <p className="font-bold">{payment.customerName}</p>
                                <p className="text-xs text-slate-600 font-medium">{payment.customerEmail}</p>
                                <p className="text-xs text-slate-600 font-medium">{payment.customerPhone}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase text-slate-400 border-b pb-1">Payment Status</h4>
                            <div>
                                <p className="font-black text-xl italic text-slate-900">{payment.status}</p>
                                <p className="text-xs text-slate-600 font-medium">Method: {payment.method || 'Online'}</p>
                                <p className="text-xs text-slate-600 font-medium">Gateway: SSLCommerz</p>
                            </div>
                        </div>
                    </div>

                    <table className="w-full mb-10 border-collapse">
                        <thead>
                            <tr className="bg-slate-900 text-white">
                                <th className="p-3 text-left text-xs font-bold uppercase tracking-widest">Description</th>
                                <th className="p-3 text-right text-xs font-bold uppercase tracking-widest">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-200">
                                <td className="p-4">
                                    <p className="font-bold">{payment.feeCategory}</p>
                                    <p className="text-[10px] text-slate-500 italic mt-1 font-medium">Session Fee Collection</p>
                                </td>
                                <td className="p-4 text-right font-black italic">৳ {payment.amount.toLocaleString()}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="p-4 text-right font-black uppercase text-sm">Total Paid</td>
                                <td className="p-4 text-right font-black text-2xl italic tracking-tighter underline decoration-double">৳ {payment.amount.toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="mt-20 flex justify-between items-end">
                        <div className="max-w-xs">
                            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                                This receipt is digitally generated and validated and is legally binding.
                                For any verification, please use the Transaction ID on our portal.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-40 h-[1px] bg-slate-900 mb-2" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Verified Registrar</p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #printable-receipt, #printable-receipt * {
                        visibility: visible;
                    }
                    #printable-receipt {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    )
}
