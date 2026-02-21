"use client"

import React, { useState } from "react"
import { Calendar, Tag, ChevronRight, Search, Mic } from "lucide-react"

// Mock Data
const notices = [
    {
        id: 1,
        title: "Annual Sports Day 2026 Registration Open",
        date: "Feb 18, 2026",
        category: "Events",
        excerpt: "Registration for the Annual Sports Day is now open. Students can participate in up to 3 events.",
        priority: "High",
    },
    {
        id: 2,
        title: "Mid-Term Examination Schedule Released",
        date: "Feb 15, 2026",
        category: "Academic",
        excerpt: "The schedule for the upcoming Mid-Term examinations has been published. Please check the notice board.",
        priority: "High",
    },
    {
        id: 3,
        title: "School Picnic to Cox's Bazar",
        date: "Feb 10, 2026",
        category: "Excursion",
        excerpt: "Join us for a fun-filled picnic to Cox's Bazar. Fee submission deadline: Feb 25, 2026.",
        priority: "Medium",
    },
    {
        id: 4,
        title: "Tuition Fee Submission Deadline Extended",
        date: "Feb 05, 2026",
        category: "Administrative",
        excerpt: "The deadline for tuition fee submission for January has been extended to Feb 10, 2026.",
        priority: "High",
    },
    {
        id: 5,
        title: "Library Books Return Reminder",
        date: "Jan 30, 2026",
        category: "Library",
        excerpt: "All students are requested to return borrowed library books before the end of the month.",
        priority: "Low",
    },
]

const categories = ["All", "Academic", "Events", "Administrative", "Excursion", "Library"]

export default function NoticesPage() {
    const [selectedCategory, setSelectedCategory] = useState("All")

    const filteredNotices = selectedCategory === "All"
        ? notices
        : notices.filter(n => n.category === selectedCategory)

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Notices & Announcements</h1>

                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full md:w-auto shadow-sm">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search notices..."
                        className="bg-transparent border-none outline-none text-sm w-full md:w-64 placeholder:text-slate-400 text-slate-700"
                    />
                </div>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`
                            px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all
                            ${selectedCategory === cat
                                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"}
                        `}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Notice List */}
            <div className="grid gap-4">
                {filteredNotices.map((notice) => (
                    <div key={notice.id} className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${notice.priority === 'High' ? 'bg-red-500' :
                                notice.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                            }`}></div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-3">
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3">
                                    <span className={`
                                        text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded
                                        ${notice.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                                            notice.category === 'Events' ? 'bg-purple-100 text-purple-700' :
                                                notice.category === 'Administrative' ? 'bg-red-100 text-red-700' :
                                                    'bg-slate-100 text-slate-700'}
                                    `}>
                                        {notice.category}
                                    </span>
                                    <span className="flex items-center text-xs text-slate-400 font-medium">
                                        <Calendar className="h-3 w-3 mr-1" /> {notice.date}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                    {notice.title}
                                </h3>
                                <p className="text-sm text-slate-500 line-clamp-2 md:line-clamp-1 group-hover:line-clamp-none transition-all duration-300">
                                    {notice.excerpt}
                                </p>
                            </div>

                            <div className="flex items-center">
                                <button className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredNotices.length === 0 && (
                    <div className="text-center py-12 bg-white border border-slate-200 rounded-xl border-dashed">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 mb-4">
                            <Tag className="h-6 w-6 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No notices found</h3>
                        <p className="text-slate-500">Try selecting a different category.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
