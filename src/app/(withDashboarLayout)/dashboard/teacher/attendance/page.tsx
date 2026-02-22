"use client";
import React, { useState } from 'react';
import {
    UserCheck,
    Search,
    CheckCircle2,
    XCircle,
    Clock,
    ChevronRight,
    BookOpen,
    Calendar
} from 'lucide-react';

export default function AttendancePage() {
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

    const classes = [
        { id: "C1", name: "Class X - Section A", subject: "Higher Mathematics", time: "09:00 AM", studentsCount: 45 },
        { id: "C2", name: "Class IX - Section B", subject: "General Science", time: "10:30 AM", studentsCount: 38 },
    ];

    const students = [
        { id: "S101", name: "Rahim Ahmed", roll: "101" },
        { id: "S102", name: "Fatima Noor", roll: "102" },
        { id: "S103", name: "Arif Hossein", roll: "103" },
        { id: "S104", name: "Sumaiya Akhter", roll: "104" },
        { id: "S105", name: "Karim Ullah", roll: "105" },
    ];

    const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
        setAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const markAllAsPresent = () => {
        const allPresent = students.reduce((acc, student) => ({ ...acc, [student.id]: 'present' }), {});
        setAttendance(allPresent);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                    Take <span className="text-primary italic">Attendance</span> ✔️
                </h1>
                <p className="text-text-muted mt-2 font-medium">
                    Mark daily attendance for your students.
                </p>
            </div>

            {!selectedClass ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {classes.map((cls) => (
                        <div
                            key={cls.id}
                            onClick={() => setSelectedClass(cls.id)}
                            className="group bg-bg-card p-6 rounded-3xl border border-border-light shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer relative overflow-hidden"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                                        {cls.name}
                                    </h3>
                                    <p className="text-sm font-semibold text-text-muted">{cls.subject}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-text-muted">
                                    <Clock size={16} className="text-primary/60" />
                                    <span className="text-sm font-bold">{cls.time}</span>
                                </div>
                                <div className="bg-primary/5 px-3 py-1 rounded-full text-xs font-bold text-primary border border-primary/10">
                                    {cls.studentsCount} Students
                                </div>
                            </div>

                            <div className="absolute right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                                    <ChevronRight size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <button
                            onClick={() => setSelectedClass(null)}
                            className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                        >
                            ← Back to Selection
                        </button>
                        <div className="flex gap-3">
                            <button
                                onClick={markAllAsPresent}
                                className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                            >
                                Mark All Present
                            </button>
                            <button
                                className="px-6 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                            >
                                Save Attendance
                            </button>
                        </div>
                    </div>

                    <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6 overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-text-primary">
                                        Attendance for {classes.find(c => c.id === selectedClass)?.name}
                                    </h2>
                                    <p className="text-xs text-text-muted font-medium italic">Today: {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search student..."
                                    className="pl-10 pr-4 py-2 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {students.map((student) => (
                                <div
                                    key={student.id}
                                    className="group bg-bg-page/40 p-4 rounded-2xl border border-border-light/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/20 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-bold text-text-muted w-8">{student.roll}</span>
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                                            {student.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="font-bold text-text-primary">{student.name}</span>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'present')}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${attendance[student.id] === 'present'
                                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                                    : 'bg-bg-card text-emerald-600 border border-emerald-100 hover:bg-emerald-50'
                                                }`}
                                        >
                                            <CheckCircle2 size={16} />
                                            Present
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'late')}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${attendance[student.id] === 'late'
                                                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                                                    : 'bg-bg-card text-amber-600 border border-amber-100 hover:bg-amber-50'
                                                }`}
                                        >
                                            <Clock size={16} />
                                            Late
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(student.id, 'absent')}
                                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${attendance[student.id] === 'absent'
                                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                                    : 'bg-bg-card text-red-600 border border-red-100 hover:bg-red-50'
                                                }`}
                                        >
                                            <XCircle size={16} />
                                            Absent
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
