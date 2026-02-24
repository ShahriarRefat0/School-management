"use client";
import React from 'react';
import {
    BookOpen,
    Users,
    Search,
    ChevronRight,
    Info,
    Calendar,
    Award
} from 'lucide-react';

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                        My <span className="text-primary italic">Classes</span> 📚
                    </h1>
                    <p className="text-text-muted mt-2 font-medium">
                        Manage your classes and view student information.
                    </p>
                </div>
            </div>

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
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                                    <ChevronRight size={18} />
                                </div>
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
                                <p className="text-sm font-medium text-text-muted uppercase tracking-wider">Student List</p>
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

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border-light">
                                        <th className="pb-4 font-bold text-text-muted text-sm uppercase px-4">Roll</th>
                                        <th className="pb-4 font-bold text-text-muted text-sm uppercase px-4">Student Name</th>
                                        <th className="pb-4 font-bold text-text-muted text-sm uppercase px-4">Attendance</th>
                                        <th className="pb-4 font-bold text-text-muted text-sm uppercase px-4">Last Result</th>
                                        <th className="pb-4 font-bold text-text-muted text-sm uppercase px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light/50">
                                    {students.map((student) => (
                                        <tr key={student.id} className="group hover:bg-bg-page/50 transition-colors">
                                            <td className="py-4 px-4 font-bold text-text-secondary">{student.roll}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                                                        {student.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="font-bold text-text-primary group-hover:text-primary transition-colors">{student.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-full max-w-[60px] h-1.5 bg-bg-page rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-emerald-500 rounded-full"
                                                            style={{ width: student.attendance }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-bold text-text-secondary">{student.attendance}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-1 text-primary">
                                                    <Award size={14} />
                                                    <span className="text-sm font-black italic">{student.lastResult}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="p-2 hover:bg-primary/10 rounded-lg text-text-muted hover:text-primary transition-all">
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
