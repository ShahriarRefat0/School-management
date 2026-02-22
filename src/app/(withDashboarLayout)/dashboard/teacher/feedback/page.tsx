"use client";
import React, { useState } from 'react';
import {
    MessageSquare,
    Search,
    Send,
    User,
    Star,
    BookOpen,
    Filter,
    CheckCircle2
} from 'lucide-react';

export default function StudentsFeedbackPage() {
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

    const students = [
        { id: "S101", name: "Rahim Ahmed", roll: "101", class: "Class X-A" },
        { id: "S102", name: "Fatima Noor", roll: "102", class: "Class X-A" },
        { id: "S103", name: "Arif Hossein", roll: "103", class: "Class IX-B" },
        { id: "S104", name: "Sumaiya Akhter", roll: "104", class: "Class X-A" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                    Students <span className="text-primary italic">Feedback</span> 💬
                </h1>
                <p className="text-text-muted mt-2 font-medium">
                    Provide behavioral and academic feedback to your students.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Student List Sidebar */}
                <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6 space-y-6 lg:h-[70vh] flex flex-col">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="pl-10 pr-4 py-2 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                        {students.map((student) => (
                            <button
                                key={student.id}
                                onClick={() => setSelectedStudent(student.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${selectedStudent === student.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-bg-page/50 text-text-secondary hover:bg-bg-page'
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${selectedStudent === student.id ? 'bg-white/20' : 'bg-primary/10 text-primary'
                                    }`}>
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="text-left overflow-hidden">
                                    <p className="font-bold text-sm truncate">{student.name}</p>
                                    <p className={`text-[10px] uppercase font-black tracking-widest ${selectedStudent === student.id ? 'text-white/70' : 'text-text-muted'
                                        }`}>
                                        {student.class} • Roll: {student.roll}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feedback Form Area */}
                <div className="lg:col-span-2">
                    {selectedStudent ? (
                        <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-8 space-y-8 h-full">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-primary/20">
                                    {students.find(s => s.id === selectedStudent)?.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-text-primary">
                                        {students.find(s => s.id === selectedStudent)?.name}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="px-2 py-0.5 bg-primary/5 text-primary rounded-md text-[10px] font-black uppercase tracking-widest">
                                            {students.find(s => s.id === selectedStudent)?.class}
                                        </span>
                                        <span className="text-xs text-text-muted font-medium">Providing feedback as Senior Teacher</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider flex items-center gap-2">
                                        <Star size={16} className="text-amber-500" /> Academic Performance
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button key={s} className="p-2 bg-bg-page hover:bg-amber-50 text-amber-500 rounded-lg transition-colors border border-border-light">
                                                <Star size={20} fill={s <= 4 ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-text-secondary mb-3 uppercase tracking-wider flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-emerald-500" /> Behavior Rating
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button key={s} className="p-2 bg-bg-page hover:bg-emerald-50 text-emerald-500 rounded-lg transition-colors border border-border-light">
                                                <Star size={20} fill={s <= 3 ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                                    <MessageSquare size={16} className="text-primary" /> Personalized Comments
                                </label>
                                <textarea
                                    className="w-full bg-bg-page border border-border-light rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[150px] resize-none"
                                    placeholder="Write your feedback here... e.g. Great improvement in math, but needs to focus on daily attendance."
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <div className="flex items-center gap-2 text-text-muted text-xs font-medium">
                                    <BookOpen size={14} />
                                    Feedback will be visible to parents and student.
                                </div>
                                <button
                                    className="bg-primary text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <Send size={18} /> Send Feedback
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-bg-page/30 border-2 border-dashed border-border-light rounded-3xl h-[60vh] flex flex-col items-center justify-center text-center p-8">
                            <div className="w-20 h-20 bg-bg-card rounded-2xl flex items-center justify-center text-text-muted mb-6 shadow-sm">
                                <User size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-text-primary">Select a Student</h3>
                            <p className="text-text-muted mt-2 max-w-xs mx-auto">
                                Choose a student from the list to provide academic or behavioral feedback.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
