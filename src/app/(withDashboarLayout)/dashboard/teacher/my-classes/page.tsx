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
                title="My"
                highlight="Classes"
                emoji="🏫"
                subtitle="Manage your active classes and student sessions."
            />

            <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 border-b border-border-light flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-text-primary">Active Classes</h2>
                        <p className="text-xs font-medium text-text-muted mt-1 uppercase tracking-wider">Academic Year 2026</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {/* Desktop View */}
                    <table className="w-full text-left hidden md:table">
                        <thead>
                            <tr className="border-b border-border-light text-[10px] font-black uppercase tracking-widest text-text-muted">
                                <th className="py-5 px-8">Class Name</th>
                                <th className="py-5 px-4 font-black">Section</th>
                                <th className="py-5 px-4">Subject</th>
                                <th className="py-5 px-4">Total Students</th>
                                <th className="py-5 px-8 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light/50">
                            {classes.map((cls) => (
                                <tr key={cls.id} className="group hover:bg-bg-page/40 transition-all duration-200">
                                    <td className="py-6 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                <BookOpen size={20} />
                                            </div>
                                            <span className="font-bold text-text-primary group-hover:text-primary transition-colors">{cls.name.split(' - ')[0]}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-4">
                                        <span className="px-3 py-1 bg-bg-page border border-border-light rounded-lg text-xs font-black text-text-secondary uppercase">
                                            {cls.name.split(' - ')[1]}
                                        </span>
                                    </td>
                                    <td className="py-6 px-4">
                                        <span className="text-sm font-semibold text-text-muted">{cls.subject}</span>
                                    </td>
                                    <td className="py-6 px-4 text-center">
                                        <div className="flex items-center gap-2">
                                            <Users size={14} className="text-primary/60" />
                                            <span className="text-sm font-bold text-text-primary tabular-nums">{cls.studentsCount}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-8 text-right">
                                        <Link
                                            href={`/dashboard/teacher/my-classes/${cls.id}`}
                                            className="px-5 py-2.5 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 inline-flex items-center gap-2"
                                        >
                                            View Details <ChevronRight size={14} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Mobile View */}
                    <div className="md:hidden p-4 space-y-4">
                        {classes.map((cls) => (
                            <Link
                                key={cls.id}
                                href={`/dashboard/teacher/my-classes/${cls.id}`}
                                className="block bg-bg-page/40 p-4 rounded-2xl border border-border-light/50 space-y-4 active:scale-[0.98] transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary ">
                                            <BookOpen size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary">{cls.name}</h4>
                                            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">{cls.subject}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-text-muted" />
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-border-light/30">
                                    <div className="flex items-center gap-2">
                                        <Users size={14} className="text-primary/60" />
                                        <span className="text-xs font-bold text-text-secondary">{cls.studentsCount} Students</span>
                                    </div>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Open Directory</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
