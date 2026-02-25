"use client";
import React from 'react';
import {
    User,
    Calendar,
    Award,
    MessageSquare,
    CheckCircle2,
    XCircle,
    Clock,
    TrendingUp,
    ArrowLeft
} from 'lucide-react';

interface StudentProfileProps {
    student: {
        id: string;
        name: string;
        roll: string;
        attendance: string;
        performance: string;
        grade: string;
    };
    onBack: () => void;
}

export default function StudentProfile({ student, onBack }: StudentProfileProps) {
    const attendanceHistory = [
        { date: "Feb 23, 2026", status: "present" },
        { date: "Feb 22, 2026", status: "present" },
        { date: "Feb 21, 2026", status: "late" },
        { date: "Feb 20, 2026", status: "absent" },
        { date: "Feb 19, 2026", status: "present" },
    ];

    const examResults = [
        { exam: "Class Test 2", subject: "Math", marks: "92/100", grade: "A+" },
        { exam: "Class Test 1", subject: "Math", marks: "88/100", grade: "A" },
        { exam: "Monthly Assesment", subject: "Math", marks: "45/50", grade: "A+" },
    ];

    const feedbacks = [
        { date: "Feb 15, 2026", note: "Shows great improvement in calculus.", teacher: "Abu Raihan" },
        { date: "Jan 10, 2026", note: "Very active in class discussions.", teacher: "Abu Raihan" },
    ];

    return (
        <div className="space-y-6 animate-fadeIn">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-bold text-primary hover:underline group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Student List
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Header Card */}
                <div className="lg:col-span-3 bg-bg-card rounded-3xl border border-border-light shadow-sm p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-indigo-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-xl rotate-3">
                            {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-bg-card flex items-center justify-center text-white">
                            <CheckCircle2 size={12} fill="currentColor" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-black text-text-primary mb-2 line-clamp-1">{student.name}</h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold">
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg border border-primary/20">Roll: {student.roll}</span>
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-text-secondary rounded-lg border border-border-light">ID: {student.id}</span>
                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-500/20 flex items-center gap-1.5">
                                <CheckCircle2 size={14} /> Active Student
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center px-6 py-4 bg-bg-page rounded-2xl border border-border-light">
                            <p className="text-[10px] uppercase tracking-widest font-black text-text-muted mb-1">Attendance</p>
                            <p className="text-xl font-black text-emerald-500">{student.attendance}</p>
                        </div>
                        <div className="text-center px-6 py-4 bg-bg-page rounded-2xl border border-border-light">
                            <p className="text-[10px] uppercase tracking-widest font-black text-text-muted mb-1">Performance</p>
                            <p className="text-xl font-black text-primary">{student.grade}</p>
                        </div>
                    </div>
                </div>

                {/* Left Column: History & Stats */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Attendance History */}
                    <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6">
                        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                            <Calendar size={20} className="text-primary" /> Attendance History
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {attendanceHistory.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-bg-page rounded-xl border border-border-light/50">
                                    <span className="text-sm font-bold text-text-secondary">{item.date}</span>
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${item.status === 'present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' :
                                        item.status === 'late' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 text-xs font-bold text-text-muted hover:text-primary transition-colors border-t border-border-light">View Full History</button>
                    </div>

                    {/* Result History */}
                    <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6">
                        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                            <Award size={20} className="text-primary" /> Recent Results
                        </h3>
                        <div className="overflow-hidden rounded-2xl border border-border-light">
                            <table className="w-full text-left">
                                <thead className="bg-bg-page">
                                    <tr>
                                        <th className="py-3 px-4 text-[10px] font-black uppercase text-text-muted">Exam</th>
                                        <th className="py-3 px-4 text-[10px] font-black uppercase text-text-muted">Marks</th>
                                        <th className="py-3 px-4 text-[10px] font-black uppercase text-text-muted text-right">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light/50">
                                    {examResults.map((res, idx) => (
                                        <tr key={idx}>
                                            <td className="py-3 px-4 text-sm font-bold text-text-secondary">{res.exam}</td>
                                            <td className="py-3 px-4 text-sm font-bold text-text-primary">{res.marks}</td>
                                            <td className="py-3 px-4 text-right">
                                                <span className="text-sm font-black italic text-primary">{res.grade}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column: Feedback & Profile Info */}
                <div className="space-y-6">
                    {/* Performance Note */}
                    <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-primary/20">
                        <TrendingUp className="mb-4 opacity-50" size={32} />
                        <h3 className="text-lg font-bold mb-2">Performance Trend</h3>
                        <p className="text-primary-100/80 text-sm leading-relaxed mb-6 font-medium">
                            Student is showing consistent improvement in Mathematics. Recommended for Advanced Algebra group.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-white rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <span className="text-xs font-bold">85%</span>
                        </div>
                    </div>

                    {/* Feedback History */}
                    <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6">
                        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
                            <MessageSquare size={18} className="text-primary" /> Teacher Feedback
                        </h3>
                        <div className="space-y-6">
                            {feedbacks.map((fb, idx) => (
                                <div key={idx} className="relative pl-6 border-l-2 border-primary/20">
                                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(79,70,229,0.8)]"></div>
                                    <p className="text-sm font-bold text-text-primary leading-snug mb-2">{fb.note}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-text-muted italic">{fb.teacher}</span>
                                        <span className="text-[10px] font-bold text-primary">{fb.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest text-center italic">Personal information is read-only.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
