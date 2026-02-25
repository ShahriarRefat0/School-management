"use client";
import React from 'react';
import Link from 'next/link';
import {
    BookOpen,
    Users,
    Search,
    ChevronRight,
    Info,
    Calendar,
    Award
} from 'lucide-react';
import { TeacherHeader } from "../TeacherHeader";

export default function MyClassesPage() {
    const [selectedClass, setSelectedClass] = React.useState<string | null>(null);

    const classes = [
        {
            id: "C1",
            name: "Class X - Section A",
            subject: "Higher Mathematics",
            studentsCount: 45,
            room: "Room 402",
            schedule: "Sun, Tue, Thu | 09:00 AM"
        },
        {
            id: "C2",
            name: "Class IX - Section B",
            subject: "General Science",
            studentsCount: 38,
            room: "Science Lab",
            schedule: "Mon, Wed | 10:30 AM"
        },
        {
            id: "C3",
            name: "Class X - Section C",
            subject: "Higher Mathematics",
            studentsCount: 42,
            room: "Room 405",
            schedule: "Sun, Tue, Thu | 12:00 PM"
        },
        {
            id: "C4",
            name: "Class VIII - Section A",
            subject: "ICT",
            studentsCount: 40,
            room: "Computer Lab",
            schedule: "Sat, Mon | 02:00 PM"
        }
    ];

    const students = [
        { id: "S101", name: "Rahim Ahmed", roll: "101", attendance: "98%", lastResult: "A+", status: "Active" },
        { id: "S102", name: "Fatima Noor", roll: "102", attendance: "95%", lastResult: "A", status: "Active" },
        { id: "S103", name: "Arif Hossein", roll: "103", attendance: "85%", lastResult: "A-", status: "Active" },
        { id: "S104", name: "Sumaiya Akhter", roll: "104", attendance: "92%", lastResult: "B+", status: "Active" },
        { id: "S105", name: "Karim Ullah", roll: "105", attendance: "78%", lastResult: "C", status: "Warning" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <TeacherHeader
                title={selectedClass ? "Class" : "My"}
                highlight={selectedClass ? "Directory" : "Classes"}
                emoji="🏫"
                subtitle={selectedClass ? "Detailed student list and performance overview." : "Manage your active classes and student sessions."}
                rightElement={
                    selectedClass && (
                        <button
                            onClick={() => setSelectedClass(null)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-bg-card border border-border-light rounded-2xl text-sm font-bold text-text-secondary hover:bg-bg-page transition-all active:scale-95 shadow-sm"
                        >
                            <ChevronRight className="rotate-180" size={18} /> Exit Directory
                        </button>
                    )
                }
            />

            {!selectedClass ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {classes.map((cls) => (
                        <div
                            key={cls.id}
                            onClick={() => setSelectedClass(cls.id)}
                            className="group bg-bg-card p-6 rounded-3xl border border-border-light shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <BookOpen size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                                            {cls.name}
                                        </h3>
                                        <p className="text-sm font-semibold text-text-muted mt-0.5">{cls.subject}</p>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-bg-page border border-border-light rounded-full flex items-center gap-2">
                                    <Users size={14} className="text-primary" />
                                    <span className="text-xs font-bold text-text-secondary">{cls.studentsCount} Students</span>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-text-muted">
                                    <Calendar size={16} className="text-primary/60" />
                                    <span className="text-xs font-medium">{cls.schedule}</span>
                                </div>
                                <div className="flex items-center gap-2 text-text-muted justify-end">
                                    <Info size={16} className="text-primary/60" />
                                    <span className="text-xs font-medium">{cls.room}</span>
                                </div>
                            </div>

                            <div className="absolute right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    href={`/dashboard/teacher/my-classes/${cls.id}`}
                                    className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all"
                                >
                                    <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    <button
                        onClick={() => setSelectedClass(null)}
                        className="flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-4"
                    >
                        ← Back to All Classes
                    </button>

                    <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">
                                    {classes.find(c => c.id === selectedClass)?.name}
                                </h2>
                                <p className="text-sm font-medium text-text-muted uppercase tracking-wider">Student Directory</p>
                            </div>
                            <div className="relative w-full md:w-auto">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search student..."
                                    className="pl-10 pr-4 py-3 bg-bg-page border border-border-light rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
                                />
                            </div>
                        </div>

                        {/* Mobile Cards View */}
                        <div className="grid gap-4 md:hidden">
                            {students.map((student) => (
                                <div key={student.id} className="bg-bg-page/40 p-5 rounded-3xl border border-border-light/50 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-text-primary">{student.name}</h4>
                                                <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Roll: {student.roll} • {student.status}</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 bg-bg-card border border-border-light rounded-xl flex items-center justify-center text-text-muted hover:text-primary transition-colors">
                                            <Info size={16} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div className="bg-bg-card p-3 rounded-2xl border border-border-light">
                                            <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Attendance</p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-bg-page rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500" style={{ width: student.attendance }}></div>
                                                </div>
                                                <span className="text-xs font-black text-text-secondary">{student.attendance}</span>
                                            </div>
                                        </div>
                                        <div className="bg-bg-card p-3 rounded-2xl border border-border-light flex flex-col justify-center">
                                            <p className="text-[9px] font-black text-text-muted uppercase tracking-tighter mb-1">Last Result</p>
                                            <div className="flex items-center gap-1.5 text-primary">
                                                <Award size={14} />
                                                <span className="font-black italic text-sm">{student.lastResult}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border-light text-[10px] font-black uppercase tracking-widest text-text-muted">
                                        <th className="pb-4 px-4 w-24">Roll</th>
                                        <th className="pb-4 px-4">Student Name</th>
                                        <th className="pb-4 px-4">Attendance</th>
                                        <th className="pb-4 px-4">Performance</th>
                                        <th className="pb-4 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light/50">
                                    {students.map((student) => (
                                        <tr key={student.id} className="group hover:bg-bg-page/40 transition-all duration-200">
                                            <td className="py-5 px-4">
                                                <span className="text-[11px] font-black text-text-muted tracking-widest">{student.roll}</span>
                                            </td>
                                            <td className="py-5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xs group-hover:scale-110 transition-transform">
                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="font-bold text-text-primary group-hover:text-primary transition-colors">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-24 h-2 bg-bg-page rounded-full overflow-hidden shadow-inner">
                                                        <div
                                                            className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                                            style={{ width: student.attendance }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-xs font-black text-text-secondary tabular-nums">{student.attendance}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-4">
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-xl w-fit">
                                                    <Award size={14} className="text-primary" />
                                                    <span className="text-xs font-black italic text-primary">{student.lastResult}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-4 text-right">
                                                <button className="w-10 h-10 bg-bg-page border border-border-light rounded-xl flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-all shadow-sm">
                                                    <Info size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
