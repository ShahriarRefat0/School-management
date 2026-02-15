"use client";

import React from 'react';
import { Calendar, MessageSquare, Bell } from 'lucide-react';
import { Notice } from '@/types/notice';
import DefaultWeight from '@/components/shared/defaultWeight/DefaultWeight';

const dummyNotices: Notice[] = [
    {
        id: '1',
        title: 'Annual Sports Competition 2026',
        date: 'February 15, 2026',
        description: 'Prepare for our annual sports event. Registration starts from next Monday.',
        category: 'Event'
    },
    {
        id: '2',
        title: 'Mid-term Examination Schedule',
        date: 'February 12, 2026',
        description: 'The schedule for the upcoming mid-term exams has been published. Please check your dashboard.',
        category: 'Academic'
    },
    {
        id: '3',
        title: 'Holiday Notice: Martyr Day',
        date: 'February 10, 2026',
        description: 'The school will remain closed on February 21st in observance of Martyr Day.',
        category: 'Holiday'
    },
    {
        id: '4',
        title: 'New Library Books Added',
        date: 'February 08, 2026',
        description: 'Over 500 new science and literature books have been added to our central library.',
        category: 'Administrative'
    },
    {
        id: '5',
        title: 'Parent-Teacher Meeting',
        date: 'February 05, 2026',
        description: 'A parent-teacher meeting for Class 6-10 will be held on coming Friday at 10:00 AM.',
        category: 'Academic'
    }
];

const NoticeBoard = () => {
    return (
        <DefaultWeight>
            <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-2xl">
                            <Bell className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-text-primary">Notice Board</h2>
                            <p className="text-text-muted text-sm font-medium">Stay updated with latest school news</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {dummyNotices.map((notice, index) => (
                        <div
                            key={notice.id}
                            className="group bg-bg-card border border-border-light p-5 rounded-2xl hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${notice.category === 'Academic' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                            notice.category === 'Holiday' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                                                notice.category === 'Event' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                                                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                            }`}>
                                            {notice.category}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs text-text-muted font-semibold">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {notice.date}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                                        {notice.title}
                                    </h3>
                                    <p className="text-text-secondary line-clamp-2 text-sm leading-relaxed">
                                        {notice.description}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 rounded-full bg-bg-page border border-border-light flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                        <MessageSquare className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </DefaultWeight>
        
    );
};

export default NoticeBoard;
