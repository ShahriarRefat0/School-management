"use client";
import React from 'react';
import {
    Megaphone,
    Calendar,
    ChevronRight,
    Search,
    Pin,
    Bell,
    Clock
} from 'lucide-react';

export default function NoticesPage() {
    const notices = [
        {
            id: 1,
            title: "Faculty Meeting - Annual Sports Day Planning",
            date: "Oct 24, 2023",
            tag: "Urgent",
            tagColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
            content: "All faculty members are required to attend the meeting in the conference hall at 2:00 PM for sports day planning.",
            isPinned: true
        },
        {
            id: 2,
            title: "Submission of Monthly Progress Report",
            date: "Oct 26, 2023",
            tag: "Academic",
            tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
            content: "Please ensure all monthly progress reports are submitted by the end of this week through the portal.",
            isPinned: false
        },
        {
            id: 3,
            title: "New Study Material Guidelines",
            date: "Oct 28, 2023",
            tag: "Update",
            tagColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
            content: "New guidelines for uploading study materials have been published. Please review them in the resource section.",
            isPinned: false
        },
        {
            id: 4,
            title: "Winter Vacation Announcement",
            date: "Nov 05, 2023",
            tag: "Admin",
            tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
            content: "The school will remain closed from December 24th to January 2nd for winter vacation.",
            isPinned: false
        },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                        Notice <span className="text-primary italic">Board</span> 📢
                    </h1>
                    <p className="text-text-muted mt-2 font-medium">
                        Stay updated with the latest school announcements.
                    </p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                    <input
                        type="text"
                        placeholder="Search notices..."
                        className="pl-10 pr-4 py-2 bg-bg-card border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
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
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-text-muted">
                                    <Bell size={14} />
                                    <span className="text-xs font-medium">All Faculty</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-text-muted">
                                    <Clock size={14} />
                                    <span className="text-xs font-medium">5 mins ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
