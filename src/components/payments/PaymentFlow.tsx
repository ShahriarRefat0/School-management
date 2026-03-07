"use client"

import React, { useState } from "react"
import {
    CheckCircle2,
    Wallet,
    Download,
    User,
    Calendar,
    History,
    FileText,
    ExternalLink,
    AlertCircle,
    Smartphone,
    ShieldCheck
} from "lucide-react"

// --- Types ---



interface FeeCategory {
    id: string
    title: string
    period: string
    icon: React.ReactNode
    amount: number
    breakdown: { label: string; amount: number }[]
    lateFine?: number
    dueDate: string
}



// --- Mock Data ---

const feeCategories: FeeCategory[] = [
    {
        id: "monthly",
        title: "Monthly Fee",
        period: "Jan - Jun 2024",
        icon: <Calendar className="w-5 h-5" />,
        amount: 3000,
        dueDate: "15 May, 2024",
        lateFine: 50,
        breakdown: [
            { label: "Monthly Tuition Fee", amount: 2500 },
            { label: "Library Charge", amount: 150 },
            { label: "Laboratory Fee", amount: 300 },
        ]
    },
    {
        id: "exam",
        title: "Exam Fee",
        period: "Final Semester",
        icon: <FileText className="w-5 h-5" />,
        amount: 2500,
        dueDate: "20 May, 2024",
        breakdown: [
            { label: "Exam Registration", amount: 2000 },
            { label: "Center Fee", amount: 500 },
        ]
    },
    {
        id: "transport",
        title: "Transport",
        period: "Quarterly",
        icon: <Smartphone className="w-5 h-5" />, // Using Smartphone for mobility/transport mock
        amount: 1500,
        dueDate: "10 May, 2024",
        breakdown: [
            { label: "Route A-12 Fee", amount: 1500 },
        ]
    },
    {
        id: "admission",
        title: "Admission",
        period: "New Session",
        icon: <User className="w-5 h-5" />,
        amount: 15000,
        dueDate: "30 June, 2024",
        breakdown: [
            { label: "Admission Fee", amount: 10000 },
            { label: "Security Deposit", amount: 5000 },
        ]
    }
]



// --- Components ---

export default function PaymentFlow({ initialStatus, initialTxnId }: { initialStatus?: string | null, initialTxnId?: string | null }) {
    const [step, setStep] = useState<string>(
        initialStatus === 'success' ? 'SUCCESS' :
            initialStatus === 'failed' || initialStatus === 'cancelled' ? 'FAILED' :
                "SELECT"
    )
    const [selectedFee, setSelectedFee] = useState<FeeCategory>(feeCategories[0])
    const [isProcessing, setIsProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState<string | null>(initialTxnId || null)

    const handlePayment = async () => {
        setIsProcessing(true)
        try {
            // Senior Tip: Securely Fetch payment session from backend
            const response = await fetch('/api/payment/initiate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: selectedFee.amount + (selectedFee.lateFine || 0),
                    studentId: 'STUDENT_2024_03_06', // Mock ID for demonstration
                    schoolId: 'SCHOOL_PRIMARY_BN',
                    feeCategory: selectedFee.title,
                    customerName: 'Ariful Islam',
                    customerEmail: 'ariful@student.com',
                    customerPhone: '01712345678'
                })
            });

            const data = await response.json();

            if (data.url) {
                // Critical Redirect to SSLCommerz Hosted Page
                window.location.href = data.url;
            } else {
                console.error('Frontend Pay Initialization Error:', data);
                const errorMsg = data.details || data.error || 'Unable to connect to SSLCommerz';
                alert(`Error: ${errorMsg}`);
                setIsProcessing(false);
            }
        } catch (error) {
            console.error('Network/Client Error during Payment Start:', error);
            alert('A network error occurred. Please check your connection.');
            setIsProcessing(false);
        }
    }

    if (step === "SUCCESS") return <PaymentStatus step="SUCCESS" amount={selectedFee.amount + (selectedFee.lateFine || 0)} txnId={transactionId} />
    if (step === "FAILED") return <PaymentStatus step="FAILED" txnId={transactionId} />

    return (
        <div className="max-w-4xl mx-auto bg-[#F8FAFC] min-h-screen p-4 md:p-8 font-sans">
            {/* Header / Nav */}
            <div className="flex items-center justify-between mb-8">
                <div className="w-10" /> {/* Spacer */}
                <h1 className="text-xl font-bold text-slate-800">
                    Fee Selection
                </h1>
                <div className="w-10" /> {/* Spacer */}
            </div>

            <FeeSelection
                selectedFee={selectedFee}
                onSelect={setSelectedFee}
                onProceed={handlePayment}
                isProcessing={isProcessing}
            />
        </div>
    )
}

function FeeSelection({ selectedFee, onSelect, onProceed, isProcessing }: any) {
    return (
        <div className="space-y-6">
            {/* Student Profile Card */}
            {/* ... student profile ... */}

            {/* ... other parts ... */}

            <button
                onClick={onProceed}
                disabled={isProcessing}
                className="w-full bg-[#3B82F6] hover:bg-[#1E40AF] text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3 transform active:scale-[0.98] disabled:bg-slate-300"
            >
                {isProcessing ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Redirecting to SSLCommerz...
                    </div>
                ) : (
                    <>Pay with SSLCommerz <ExternalLink className="w-5 h-5" /></>
                )}
            </button>
            <p className="text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Securely processed by SSLCommerz Bangladesh
            </p>
        </div>
    )
}



function PaymentStatus({ step, method, amount, txnId }: any) {
    const today = new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    if (step === "SUCCESS") {
        return (
            <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-slate-900 mb-2">Payment Successful!</h1>
                <p className="text-slate-500 font-medium mb-12">Your school fees have been processed successfully.</p>

                <div className="w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full -mr-16 -mt-16" />

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">Transaction ID</span>
                        <span className="text-slate-800 font-mono font-bold text-[10px]">{txnId || '#SB-98234710'}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">Date</span>
                        <span className="text-slate-800 font-bold text-[10px]">{today}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">Amount Paid</span>
                        <span className="text-emerald-600 font-black text-lg">৳ {amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">Payment Method</span>
                        <div className="flex items-center gap-2 font-bold text-slate-800">
                            <Wallet className="w-4 h-4 text-slate-400" /> {method?.toUpperCase() || 'SSLCOMMERZ'}
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <button
                        onClick={() => window.location.href = '/dashboard/student/payments'}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
                    >
                        <History className="w-5 h-5" /> Back to Dashboard
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-3"
                    >
                        <Download className="w-5 h-5" /> Download Receipt (PDF)
                    </button>
                </div>

                <button className="mt-8 text-slate-500 text-sm font-bold flex items-center gap-2 hover:text-blue-600">
                    Need help? <span className="underline">Contact School Support</span>
                </button>

                {/* Hidden Printable Template */}
                <div className="hidden print:block">
                    <div id="printable-receipt" className="p-10 font-sans text-slate-900 bg-white text-left">
                        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-8">
                            <div>
                                <h1 className="text-2xl font-black uppercase tracking-tighter">Official Fee Receipt</h1>
                                <p className="text-sm font-bold text-slate-500">School Management System</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold">No: {txnId}</p>
                                <p className="text-xs text-slate-500 italic">{today}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10 mb-10">
                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase text-slate-400 border-b pb-1">Billed To</h4>
                                <div>
                                    <p className="font-bold">Student Record</p>
                                    <p className="text-xs text-slate-600 font-medium italic">Verified Session Payment</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-xs font-black uppercase text-slate-400 border-b pb-1">Payment Status</h4>
                                <div>
                                    <p className="font-black text-xl italic text-slate-900">SUCCESS</p>
                                    <p className="text-xs text-slate-600 font-medium">Method: {method || 'Online'}</p>
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
                                        <p className="font-bold">School Fee Payment</p>
                                        <p className="text-[10px] text-slate-500 italic mt-1 font-medium">Transaction: {txnId}</p>
                                    </td>
                                    <td className="p-4 text-right font-black italic">৳ {amount?.toLocaleString()}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td className="p-4 text-right font-black uppercase text-sm">Total Paid</td>
                                    <td className="p-4 text-right font-black text-2xl italic tracking-tighter underline decoration-double">৳ {amount?.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div className="mt-20 flex justify-between items-end">
                            <div className="max-w-xs">
                                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                                    This receipt is digitally generated and validated.
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

                <style dangerouslySetInnerHTML={{
                    __html: `
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
                ` }} />
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto min-h-screen bg-slate-50 p-4 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-8">
                <AlertCircle className="w-12 h-12 text-red-500" />
            </div>

            <h1 className="text-3xl font-black text-slate-900 mb-2">Payment Failed</h1>
            <p className="text-slate-500 font-medium mb-12 max-w-[280px]">We couldn't process your payment. No funds were deducted from your account.</p>

            <div className="w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-8 text-left">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                    Potential Reasons
                </h3>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Insufficient account balance in your card or wallet.</p>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Incorrect card details, CVV, or expiration date entered.</p>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Bank server timeout or transaction rejected by issuer.</p>
                    </li>
                </ul>
            </div>

            <div className="w-full space-y-4">
                <button
                    onClick={() => window.location.href = '/dashboard/student/payments'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
                >
                    <History className="w-5 h-5" /> Retry Payment
                </button>
                <button className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-4 px-6 rounded-2xl transition-all">
                    Contact Support
                </button>
            </div>

            <p className="mt-8 text-slate-400 text-xs font-mono text-center">Transaction ID: {txnId || 'SB-992384-LX'}</p>
        </div>
    )
}
