"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    Users,
    ChevronLeft,
    Search,
    UserCheck,
    GraduationCap,
    ClipboardList,
    TrendingUp,
    Filter,
    Award
} from 'lucide-react';
import { TeacherHeader } from "../../TeacherHeader";

export default function ClassDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("students");
    const classId = params.classId as string;

    const classInfo = {
        C1: { name: "Class X - Section A", subject: "Higher Mathematics" },
        C2: { name: "Class IX - Section B", subject: "General Science" },
        C3: { name: "Class X - Section C", subject: "Higher Mathematics" },
        C4: { name: "Class VIII - Section A", subject: "ICT" },
    }[classId] || { name: "Unknown Class", subject: "General" };

    const students = [
        { id: "S101", name: "Rahim Ahmed", roll: "101", attendance: "98%", lastResult: "A+", grade: "A+" },
        { id: "S102", name: "Fatima Noor", roll: "102", attendance: "95%", lastResult: "A", grade: "A" },
        { id: "S103", name: "Arif Hossein", roll: "103", attendance: "85%", lastResult: "A-", grade: "A-" },
        { id: "S104", name: "Sumaiya Akhter", roll: "104", attendance: "92%", lastResult: "B+", grade: "B+" },
        { id: "S105", name: "Karim Ullah", roll: "105", attendance: "78%", lastResult: "C", grade: "C" },
    ];

    const attendanceStats = {
        present: 42,
        absent: 3,
        late: 0,
        rate: "94%"
    };

    const tabs = [
        { id: "students", label: "Student List", icon: Users },
        { id: "attendance", label: "Attendance Summary", icon: UserCheck },
        { id: "results", label: "Result Overview", icon: GraduationCap },
        { id: "assignments", label: "Assignments", icon: ClipboardList },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-4 mb-2">
                <button
                    onClick={() => router.back()}
                    className="p-2 bg-bg-card border border-border-light rounded-xl text-text-muted hover:text-primary transition-all active:scale-95"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Class Management</span>
                    <h2 className="font-bold text-text-primary">{classInfo.name}</h2>
                </div>
            </div>

            <TeacherHeader
                title={classInfo.name}
                highlight={classInfo.subject}
                emoji="📊"
                subtitle="Detailed student list and performance overview."
            />

            {/* Tabs Navigation */}
            <div className="flex items-center gap-2 p-1.5 bg-bg-card rounded-3xl border border-border-light overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id
                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                            : "text-text-muted hover:text-text-secondary hover:bg-bg-page"
                            }`}
                    >
                        <tab.icon size={16} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-bg-card rounded-[2.5rem] border border-border-light shadow-sm p-8">
                {activeTab === "students" && (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="text-xl font-bold text-text-primary">Registered Students</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by name or roll..."
                                    className="pl-10 pr-4 py-2 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border-light">
                                        <th className="pb-4 font-bold text-text-muted text-[10px] uppercase tracking-widest px-4">Roll</th>
                                        <th className="pb-4 font-bold text-text-muted text-[10px] uppercase tracking-widest px-4">Student Name</th>
                                        <th className="pb-4 font-bold text-text-muted text-[10px] uppercase tracking-widest px-4">Attendance %</th>
                                        <th className="pb-4 font-bold text-text-muted text-[10px] uppercase tracking-widest px-4">Perf. Grade</th>
                                        <th className="pb-4 font-bold text-text-muted text-[10px] uppercase tracking-widest px-4 text-right">Profile</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light/50">
                                    {students.map((student) => (
                                        <tr key={student.id} className="group hover:bg-bg-page/50 transition-colors">
                                            <td className="py-4 px-4 font-black text-text-secondary">{student.roll}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xs ring-1 ring-primary/20">
                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="font-bold text-text-primary group-hover:text-primary transition-colors">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-bg-page rounded-full overflow-hidden border border-border-light">
                                                        <div
                                                            className="h-full bg-emerald-500 rounded-full"
                                                            style={{ width: student.attendance }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs font-black text-text-secondary">{student.attendance}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${student.grade === 'A+' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                                                    student.grade === 'A' || student.grade === 'A-' ? 'bg-primary text-white shadow-lg shadow-primary/20' :
                                                        'bg-bg-page text-text-secondary border border-border-light'
                                                    }`}>
                                                    {student.grade}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="flex items-center gap-1.5 ml-auto px-4 py-2 bg-bg-page border border-border-light text-text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary hover:border-primary/40 transition-all active:scale-95 shadow-sm">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "attendance" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-900/40">
                            <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Present Today</p>
                            <h3 className="text-3xl font-black text-emerald-700 dark:text-emerald-300 tabular-nums">{attendanceStats.present}</h3>
                        </div>
                        <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-3xl border border-red-100 dark:border-red-900/40">
                            <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-1">Absent Today</p>
                            <h3 className="text-3xl font-black text-red-700 dark:text-red-300 tabular-nums">{attendanceStats.absent}</h3>
                        </div>
                        <div className="p-6 bg-bg-page rounded-3xl border border-border-light">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Attendance Rate</p>
                            <h3 className="text-3xl font-black text-primary tabular-nums">{attendanceStats.rate}</h3>
                        </div>
                        <div className="p-6 bg-bg-page rounded-3xl border border-border-light">
                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Status</p>
                            <h3 className="text-lg font-black text-emerald-500 uppercase flex items-center gap-2">
                                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" /> Excellent
                            </h3>
                        </div>
                    </div>
                )}

                {activeTab === "results" && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-text-primary">Performance Trend</h3>
                            <div className="flex items-center gap-2 px-4 py-2 bg-bg-page border border-border-light rounded-xl">
                                <TrendingUp size={16} className="text-primary" />
                                <span className="text-xs font-bold text-text-secondary">Term Exam 2026</span>
                            </div>
                        </div>
                        <div className="h-48 bg-bg-page/40 rounded-[2rem] border border-dashed border-border-light flex items-center justify-center">
                            <p className="text-sm font-bold text-text-muted italic">Performance analytics chart will be rendered here.</p>
                        </div>
                    </div>
                )}

                {activeTab === "assignments" && (
                    <div className="space-y-6">
                        <div className="grid gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-6 bg-bg-page/40 rounded-3xl border border-border-light hover:border-primary/30 transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <ClipboardList size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">Assignment Name {i}</h4>
                                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mt-0.5">Deadline: Feb 28, 2026</p>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2 bg-bg-card border border-border-light text-text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-primary hover:border-primary/40 transition-all">
                                        Grade Task
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
