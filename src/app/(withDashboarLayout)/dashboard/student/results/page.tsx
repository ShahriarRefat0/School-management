"use client"

import React from "react"
import { Download, Trophy, TrendingUp, FileText, GraduationCap } from "lucide-react"

// Mock Data
const examResults = [
    {
        id: 1,
        examName: "Mid-Term Examination 2025",
        date: "Feb 10, 2026",
        gpa: "3.85",
        grade: "A",
        totalMarks: "750/800",
        rank: "4th",
        status: "Passed",
        subjects: [
            { name: "Mathematics", marks: 95, grade: "A+", points: 4.00 },
            { name: "Physics", marks: 88, grade: "A+", points: 4.00 },
            { name: "Chemistry", marks: 82, grade: "A+", points: 4.00 },
            { name: "English", marks: 85, grade: "A+", points: 4.00 },
            { name: "Biology", marks: 78, grade: "A", points: 3.75 },
            { name: "History", marks: 80, grade: "A+", points: 4.00 },
            { name: "Geography", marks: 76, grade: "A", points: 3.75 },
            { name: "Computer Science", marks: 92, grade: "A+", points: 4.00 },
        ]
    },
    {
        id: 2,
        examName: "Final Term Examination 2024",
        date: "Dec 15, 2024",
        gpa: "3.92",
        grade: "A+",
        totalMarks: "765/800",
        rank: "2nd",
        status: "Passed",
    },
    {
        id: 3,
        examName: "Class Test 2",
        date: "Oct 20, 2024",
        gpa: "3.75",
        grade: "A",
        totalMarks: "280/300",
        rank: "8th",
        status: "Passed",
    }
]

export default function ResultsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
                Results & Grades
            </h1>

            {/* GPA Trend / Highlight */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl overflow-hidden p-8 shadow-sm">
                    <div className="absolute right-0 top-0 h-64 w-64 translate-x-16 -translate-y-16 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-3">Current Performance</span>
                            <h2 className="text-3xl font-bold mb-2">Excellent Work, Alex!</h2>
                            <p className="text-blue-100 max-w-md">
                                You've maintained a consistent <span className="font-bold text-white">3.85 GPA</span> this semester.
                                You're ranking in the top <span className="font-bold text-white">5%</span> of your class.
                            </p>
                            <div className="flex gap-3 mt-6">
                                <button className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
                                    <Trophy className="h-4 w-4" /> View Analytics
                                </button>
                            </div>
                        </div>
                        <div className="relative h-32 w-32 flex items-center justify-center">
                            {/* Simple ring chart representation */}
                            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                                <path className="text-blue-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeOpacity="0.4" />
                                <path className="text-white drop-shadow-md" strokeDasharray="96, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold">3.85</span>
                                <span className="text-xs text-blue-100 uppercase">CGPA</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-bg-card rounded-xl border border-border-light p-6 shadow-sm flex flex-col justify-center space-y-6">
                    <h3 className="text-lg font-bold text-text-primary">Stats Overview</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-text-muted">Total Credits Earned</span>
                            <span className="font-bold text-text-primary">124/140</span>
                        </div>
                        <div className="h-2 w-full bg-bg-page rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[88%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-text-muted">Attendance Score</span>
                            <span className="font-bold text-text-primary">92%</span>
                        </div>
                        <div className="h-2 w-full bg-bg-page rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[92%] rounded-full"></div>
                        </div>
                    </div>
                    <div className="pt-2 flex items-center gap-2 text-sm text-text-muted">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <span>Improved by <span className="font-bold text-emerald-600">0.2</span> since last term</span>
                    </div>
                </div>
            </div>

            {/* Exam List */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-blue-600" /> Exam History
                </h3>

                {examResults.map((exam) => (
                    <div key={exam.id} className="bg-bg-card border border-border-light rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-bg-page/50 px-6 py-4 border-b border-border-light flex flex-row items-center justify-between">
                            <div>
                                <h4 className="text-lg font-bold text-text-primary">{exam.examName}</h4>
                                <p className="text-sm text-text-muted">{exam.date}</p>
                            </div>
                            <span className={`
                                px-3 py-1 rounded-full text-xs font-bold uppercase
                                ${exam.status === "Passed" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}
                            `}>
                                {exam.status}
                            </span>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="p-4 rounded-xl bg-bg-page/50 border border-border-light text-center md:text-left">
                                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">GPA</p>
                                    <p className="text-2xl font-bold text-text-primary mt-1">{exam.gpa}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-bg-page/50 border border-border-light text-center md:text-left">
                                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Total Marks</p>
                                    <p className="text-2xl font-bold text-text-primary mt-1">{exam.totalMarks}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-bg-page/50 border border-border-light text-center md:text-left">
                                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Grade</p>
                                    <p className="text-2xl font-bold text-text-primary mt-1">{exam.grade}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-bg-page/50 border border-border-light text-center md:text-left">
                                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Class Rank</p>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">#{exam.rank}</p>
                                </div>
                            </div>

                            {exam.subjects ? (
                                <>
                                    <div className="overflow-x-auto border border-border-light rounded-xl">
                                        <table className="w-full text-sm text-left text-text-secondary">
                                            <thead className="text-xs text-text-muted uppercase bg-bg-page/50">
                                                <tr>
                                                    <th className="px-6 py-3 font-semibold">Subject</th>
                                                    <th className="px-6 py-3 font-semibold">Marks</th>
                                                    <th className="px-6 py-3 font-semibold">Grade</th>
                                                    <th className="px-6 py-3 font-semibold">Points</th>
                                                    <th className="px-6 py-3 font-semibold">Remarks</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border-light">
                                                {exam.subjects.map((subject, idx) => (
                                                    <tr key={idx} className="bg-bg-card hover:bg-bg-page/50 transition-colors">
                                                        <td className="px-6 py-4 font-medium text-text-primary">{subject.name}</td>
                                                        <td className="px-6 py-4">{subject.marks}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`font-bold ${subject.grade.startsWith('A') ? 'text-emerald-600 dark:text-emerald-400' :
                                                                subject.grade.startsWith('B') ? 'text-blue-600 dark:text-blue-400' :
                                                                    'text-text-muted'
                                                                }`}>{subject.grade}</span>
                                                        </td>
                                                        <td className="px-6 py-4">{subject.points.toFixed(2)}</td>
                                                        <td className="px-6 py-4 text-xs italic text-text-muted">Excellent</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                                            <Download className="h-4 w-4" /> Download Report Card
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex justify-center py-4">
                                    <button className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium text-sm text-slate-700 transition-colors">
                                        <FileText className="h-4 w-4" /> View Detailed Marksheet
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
