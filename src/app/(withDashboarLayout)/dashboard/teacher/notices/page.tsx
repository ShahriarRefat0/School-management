"use client";
import React from 'react';
import {
    Megaphone,
    Calendar,
    ChevronRight,
    Search,
    Pin,
    Bell,
    Clock,
    Plus,
    X,
    MessageSquare,
    Users
} from 'lucide-react';

import { TeacherHeader } from "../TeacherHeader";

export default function NoticesPage() {
    const [showPostModal, setShowPostModal] = React.useState(false);
    const [activeFilter, setActiveFilter] = React.useState("all");

    const notices = [
        {
            id: 1,
            title: "Annual Sports Day 2026",
            content: "We are pleased to announce the Annual Sports Day on March 15th. All classes are invited to participate.",
            date: "Feb 12, 2026",
            tag: "Event",
            category: "General",
            tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
            isPinned: true
        },
        {
            id: 2,
            title: "Mid-Term Examination Schedule",
            content: "The mid-term examinations will begin from March 1st. Please check the detailed schedule on the board.",
            date: "Feb 10, 2026",
            tag: "Academic",
            category: "General",
            tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
            isPinned: false
        },
        {
            id: 3,
            title: "Physics Lab Session Change",
            content: "The lab session for Class X-A on Monday has been moved to 10:00 AM instead of 11:30 AM.",
            date: "Feb 08, 2026",
            tag: "Update",
            category: "Class X-A",
            tagColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
            isPinned: true
        },
        {
            id: 4,
            title: "Math Homework Reminder",
            content: "Please ensure all students submit their trigonometry assignments by tomorrow afternoon.",
            date: "Feb 05, 2026",
            tag: "Urgent",
            category: "Class IX-B",
            tagColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
            isPinned: false
        }
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <TeacherHeader
                title="Notice"
                highlight="Board"
                emoji="📢"
                subtitle="View official announcements and post class notices."
                rightElement={
                    <button
                        onClick={() => setShowPostModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
                    >
                        <Plus size={18} /> Post Notice
                    </button>
                }
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex bg-bg-card p-1.5 rounded-2xl border border-border-light overflow-x-auto scrollbar-hide">
                    {["all", "General", "Class X-A", "Class IX-B"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-text-muted hover:text-text-secondary"}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-primary" size={18} />
                    <input
                        type="text"
                        placeholder="Filter announcements..."
                        className="w-full pl-12 pr-4 py-4 md:py-3.5 bg-bg-card border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary shadow-sm"
                    />
                </div>
            </div>

            <div className="grid gap-6">
                {notices.map((notice) => (
                    <div
                        key={notice.id}
                        className="group bg-bg-card p-6 rounded-3xl border border-border-light shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
                    >
                        {notice.isPinned && (
                            <div className="absolute top-0 right-0 p-4">
                                <Pin size={18} className="text-primary rotate-45" />
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="space-y-3 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${notice.tagColor}`}>
                                        {notice.tag}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-text-muted">
                                        <Calendar size={12} />
                                        <span className="text-xs font-bold">{notice.date}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">
                                    {notice.title}
                                </h3>

                                <p className="text-text-secondary text-sm leading-relaxed max-w-3xl">
                                    {notice.content}
                                </p>
                            </div>

                            <div className="flex items-center justify-end">
                                <button className="flex items-center gap-2 text-sm font-bold text-primary group/btn">
                                    Read More
                                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border-light/50 flex items-center justify-between">
                            <div className="flex flex-wrap items-center gap-4 text-text-muted">
                                <div className="flex items-center gap-1.5 bg-bg-page px-3 py-1 rounded-lg border border-border-light/30">
                                    <Users size={12} className="text-primary/70" />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{notice.category}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={12} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">5 mins ago</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-primary/40 uppercase tracking-widest">
                                ID: {notice.id}00{notice.id}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Post Notice Modal */}
            {showPostModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fadeIn" onClick={() => setShowPostModal(false)}></div>
                    <div className="bg-bg-card w-full max-w-2xl rounded-[3rem] overflow-hidden relative z-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-slideInBottom border border-white/5 flex flex-col">
                        <div className="px-8 md:px-12 py-8 bg-gradient-to-r from-primary to-indigo-700 text-white flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-[0.2em]">New Notice</h3>
                                <p className="text-white/70 text-[10px] font-bold mt-1 uppercase tracking-widest">Broadcast to classes or school</p>
                            </div>
                            <button onClick={() => setShowPostModal(false)} className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 md:p-12 space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-1">Announcement Title</label>
                                <input type="text" className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary" placeholder="e.g. Schedule for Practical Exams" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-1">Target Audience</label>
                                    <select className="w-full px-6 py-4 bg-bg-page border border-border-light rounded-2xl text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-primary cursor-pointer appearance-none shadow-sm text-text-secondary">
                                        <option>All Faculty & Students</option>
                                        <option>Class X - A</option>
                                        <option>Class IX - B</option>
                                        <option>Class X - C</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-1">Category</label>
                                    <select className="w-full px-6 py-4 bg-bg-page border border-border-light rounded-2xl text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-primary cursor-pointer appearance-none shadow-sm text-text-secondary">
                                        <option>Academic</option>
                                        <option>Event</option>
                                        <option>Urgent</option>
                                        <option>Holiday</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-1">Notice Content</label>
                                <textarea className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-[2rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary min-h-[150px] resize-none text-text-secondary shadow-inner" placeholder="Detailed announcement goes here..."></textarea>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setShowPostModal(false)}
                                    className="w-full sm:flex-1 py-5 bg-bg-page border-2 border-border-light text-text-muted rounded-2xl font-black text-[11px] uppercase tracking-widest hover:text-text-primary transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setShowPostModal(false)}
                                    className="w-full sm:flex-[2] py-5 bg-primary text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-primary-dark transition-all shadow-2xl shadow-primary/40 active:scale-[0.98]"
                                >
                                    Publish Announcement
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
