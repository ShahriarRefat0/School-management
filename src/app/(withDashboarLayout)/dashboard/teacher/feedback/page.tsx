"use client";
import React, { useState } from 'react';
import { TeacherHeader } from "../TeacherHeader";
import {
    MessageSquare,
    Search,
    Send,
    User,
    Star,
    BookOpen,
    Filter,
    CheckCircle2,
    Users
} from 'lucide-react';


export default function FeedbackPage() {
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

    const students = [
        { id: "S101", name: "Rahim Ahmed", roll: "101", class: "Class X-A" },
        { id: "S102", name: "Fatima Noor", roll: "102", class: "Class X-A" },
        { id: "S103", name: "Arif Hossein", roll: "103", class: "Class IX-B" },
        { id: "S104", name: "Sumaiya Akhter", roll: "104", class: "Class X-A" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <TeacherHeader
                title="Student"
                highlight="Feedback"
                emoji="💬"
                subtitle="Review and respond to parent concerns and student feedback."
                rightElement={
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <input
                            type="text"
                            placeholder="Filter by student..."
                            className="pl-10 pr-4 py-2 bg-bg-card border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
                        />
                    </div>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Student List Sidebar */}
                <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6 space-y-6 lg:h-[70vh] flex flex-col">

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

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Star size={14} className="text-amber-500" /> Academic
                                    </label>
                                    <div className="flex bg-bg-page border border-border-light p-2 rounded-2xl justify-between">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button key={s} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${s <= 4 ? "text-amber-500 bg-amber-500/5 shadow-inner" : "text-text-muted hover:bg-bg-card"}`}>
                                                <Star size={18} fill={s <= 4 ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[9px] font-bold text-text-muted uppercase text-center tracking-tighter">Excellent Progress</p>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-emerald-500" /> Behavior
                                    </label>
                                    <div className="flex bg-bg-page border border-border-light p-2 rounded-2xl justify-between">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button key={s} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${s <= 3 ? "text-emerald-500 bg-emerald-500/5 shadow-inner" : "text-text-muted hover:bg-bg-card"}`}>
                                                <Star size={18} fill={s <= 3 ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[9px] font-bold text-text-muted uppercase text-center tracking-tighter">Needs Attention</p>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Users size={14} className="text-indigo-500" /> Participation
                                    </label>
                                    <div className="flex bg-bg-page border border-border-light p-2 rounded-2xl justify-between">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <button key={s} className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${s <= 5 ? "text-indigo-500 bg-indigo-500/5 shadow-inner" : "text-text-muted hover:bg-bg-card"}`}>
                                                <Star size={18} fill={s <= 5 ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[9px] font-bold text-text-muted uppercase text-center tracking-tighter">Very Engaged</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                                    <MessageSquare size={14} className="text-primary" /> Personalized Comments
                                </label>
                                <textarea
                                    className="w-full bg-bg-page border-2 border-border-light rounded-[2rem] p-6 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary min-h-[180px] resize-none shadow-inner transition-all"
                                    placeholder="Provide detailed feedback for the student and parents..."
                                ></textarea>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-border-light/50">
                                <div className="flex items-center gap-3 text-text-muted text-[10px] font-black uppercase tracking-widest bg-bg-page px-6 py-3 rounded-full border border-border-light/50">
                                    <BookOpen size={14} className="text-primary/60" />
                                    Transparency: Visible to Parents
                                </div>
                                <button
                                    className="w-full sm:w-auto bg-primary text-white px-10 py-4.5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary/30 hover:bg-primary-dark hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <Send size={18} /> Submit Evaluation
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-bg-page/10 border-4 border-dashed border-border-light/40 rounded-[3rem] min-h-[400px] lg:h-full flex flex-col items-center justify-center text-center p-8 md:p-12 group transition-all hover:bg-bg-page/20">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-bg-card rounded-[2rem] flex items-center justify-center text-text-muted mb-8 shadow-2xl border border-border-light group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <User size={48} className="text-primary/40 group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-text-primary uppercase tracking-widest">Select Student</h3>
                            <p className="text-text-muted mt-3 max-w-xs mx-auto text-xs md:text-sm font-medium leading-relaxed">
                                Pick a student from the directory to start their performance evaluation.
                            </p>
                            <div className="mt-8 flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary/20 animate-bounce" />
                                <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                                <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
