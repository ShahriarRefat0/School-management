"use client";
import React, { useState } from 'react';
import {
    GraduationCap,
    Search,
    ChevronLeft,
    ChevronRight,
    Trophy,
    Save,
    Filter,
    Settings,
    Calculator,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

export default function ResultsPage() {
    const [selectedClass, setSelectedClass] = useState<string | null>(null);
    const [examType, setExamType] = useState('Final Term');
    const [expandedStudent, setExpandedStudent] = useState<string | null>(null);
    const [subjects, setSubjects] = useState(["Bangla", "English", "Math", "Science", "Religion", "ICT"]);

    const classes = [
        { id: "C1", name: "Class X - Section A", exam: "Final Term" },
        { id: "C2", name: "Class IX - Section B", exam: "Final Term" },
    ];

    const [studentsData, setStudentsData] = useState([
        { id: "S101", name: "Rahim Ahmed", roll: "101", marks: { Bangla: 85, English: 78, Math: 92, Science: 88, Religion: 95, ICT: 82 } },
        { id: "S102", name: "Fatima Noor", roll: "102", marks: { Bangla: 92, English: 88, Math: 85, Science: 94, Religion: 98, ICT: 90 } },
        { id: "S103", name: "Arif Hossein", roll: "103", marks: { Bangla: 78, English: 65, Math: 70, Science: 72, Religion: 85, ICT: 68 } },
        { id: "S104", name: "Sumaiya Akhter", roll: "104", marks: { Bangla: 88, English: 82, Math: 90, Science: 85, Religion: 92, ICT: 88 } },
        { id: "S105", name: "Karim Ullah", roll: "105", marks: { Bangla: 65, English: 58, Math: 60, Science: 62, Religion: 75, ICT: 70 } },
    ]);

    const handleAddSubject = () => {
        const subjectName = prompt("Enter new subject name:");
        if (subjectName && !subjects.includes(subjectName)) {
            setSubjects(prev => [...prev, subjectName]);
            setStudentsData(prev => prev.map(student => ({
                ...student,
                marks: {
                    ...student.marks,
                    [subjectName]: 0
                }
            })));
        }
    };

    const handleMarkChange = (studentId: string, subject: string, value: string) => {
        setStudentsData(prev => prev.map(student => {
            if (student.id === studentId) {
                return {
                    ...student,
                    marks: {
                        ...student.marks,
                        [subject]: parseInt(value) || 0
                    }
                };
            }
            return student;
        }));
    };

    const calculateGPA = (studentMarks: Record<string, number>) => {
        const marks = Object.values(studentMarks);
        const total = marks.reduce((sum, m) => sum + m, 0);
        const avg = total / marks.length;

        // Simple GPA mapping
        if (avg >= 80) return { gpa: "5.00", grade: "A+" };
        if (avg >= 70) return { gpa: "4.00", grade: "A" };
        if (avg >= 60) return { gpa: "3.50", grade: "A-" };
        if (avg >= 50) return { gpa: "3.00", grade: "B" };
        if (avg >= 40) return { gpa: "2.00", grade: "C" };
        if (avg >= 33) return { gpa: "1.00", grade: "D" };
        return { gpa: "0.00", grade: "F" };
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                        Results <span className="text-primary italic">Gradebook</span> 🏆
                    </h1>
                    <p className="text-text-muted mt-2 font-medium">
                        Bulk enter and manage student marks for all subjects.
                    </p>
                </div>
                {selectedClass && (
                    <button
                        onClick={() => setSelectedClass(null)}
                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-bg-card border border-border-light rounded-xl text-sm font-bold text-text-secondary hover:bg-bg-page transition-all active:scale-95"
                    >
                        <ChevronLeft size={18} /> Back to Selection
                    </button>
                )}
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
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                                        {cls.name}
                                    </h3>
                                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mt-0.5">Gradebook View</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-text-muted">
                                    <Trophy size={16} className="text-primary/60" />
                                    <span className="text-sm font-bold">{cls.exam}</span>
                                </div>
                                <div className="bg-primary/5 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10">
                                    Open Grid
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
                    {/* Toolbar */}
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-bg-card border border-border-light p-4 rounded-3xl shadow-sm">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by name or roll..."
                                    className="pl-10 pr-4 py-2 bg-bg-page border border-border-light rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64 transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-2 bg-bg-page border border-border-light px-4 py-2 rounded-xl">
                                <Filter size={14} className="text-text-muted" />
                                <span className="text-xs font-bold text-text-secondary">{examType}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleAddSubject}
                                className="flex-1 md:flex-none px-4 py-2.5 bg-primary/10 border border-primary/20 text-primary rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Settings size={14} /> Add Subject
                            </button>
                            <button className="flex-1 md:flex-none px-4 py-2.5 bg-bg-page border border-border-light text-text-secondary rounded-xl text-xs font-black uppercase tracking-widest hover:bg-border-light transition-all flex items-center justify-center gap-2">
                                <Settings size={14} /> Export CSV
                            </button>
                            <button
                                className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Save size={16} /> Save Changes
                            </button>
                        </div>
                    </div>

                    {/* Grid Container */}
                    <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6 overflow-hidden">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Calculator size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-text-primary">
                                    {classes.find(c => c.id === selectedClass)?.name} - Marksheet
                                </h2>
                                <p className="text-xs text-text-muted font-medium italic">All Subjects Overview</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-border-light text-[10px] font-black uppercase tracking-widest text-text-muted">
                                        <th className="pb-4 px-4 sticky left-0 bg-bg-card z-10 w-24">Roll</th>
                                        <th className="pb-4 px-4 sticky left-24 bg-bg-card z-10">Student Name</th>
                                        <th className="pb-4 px-4 text-center">Total</th>
                                        <th className="pb-4 px-4 text-center">GPA</th>
                                        <th className="pb-4 px-4 text-right">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light/50">
                                    {studentsData.map((student) => {
                                        const { gpa, grade } = calculateGPA(student.marks);
                                        const total = Object.values(student.marks).reduce((sum, m) => sum + m, 0);
                                        const isExpanded = expandedStudent === student.id;

                                        return (
                                            <React.Fragment key={student.id}>
                                                <tr
                                                    onClick={() => setExpandedStudent(isExpanded ? null : student.id)}
                                                    className={`
                                                        group cursor-pointer transition-all duration-200
                                                        ${isExpanded ? 'bg-primary/[0.04] shadow-inner' : 'hover:bg-bg-page/50'}
                                                    `}
                                                >
                                                    <td className="py-5 px-4 sticky left-0 z-10 bg-inherit border-r border-border-light/5">
                                                        <span className="text-[10px] font-black text-text-muted tracking-widest uppercase">{student.roll}</span>
                                                    </td>
                                                    <td className="py-5 px-4 sticky left-24 z-10 bg-inherit shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)]">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`
                                                                w-8 h-8 rounded-lg flex items-center justify-center transition-all
                                                                ${isExpanded ? 'bg-primary text-white shadow-lg shadow-primary/30 rotate-180' : 'bg-primary/10 text-primary group-hover:scale-110'}
                                                            `}>
                                                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                            </div>
                                                            <span className={`font-bold transition-colors ${isExpanded ? 'text-primary' : 'text-text-primary group-hover:text-primary'}`}>
                                                                {student.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 px-4 text-center">
                                                        <span className="text-sm font-black text-text-primary">{total}</span>
                                                    </td>
                                                    <td className="py-5 px-4 text-center">
                                                        <span className="text-sm font-bold text-primary tabular-nums">{gpa}</span>
                                                    </td>
                                                    <td className="py-5 px-4 text-right">
                                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${grade === 'A+' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                                                            grade === 'A' || grade === 'A-' ? 'bg-primary text-white shadow-lg shadow-primary/20' :
                                                                grade === 'F' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' :
                                                                    'bg-bg-page text-text-secondary border border-border-light'
                                                            }`}>
                                                            {grade}
                                                        </span>
                                                    </td>
                                                </tr>

                                                {/* Expanded Details: Subject Marks Entry */}
                                                {isExpanded && (
                                                    <tr className="bg-primary/[0.01] border-l-4 border-primary">
                                                        <td colSpan={5} className="px-6 py-8">
                                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-in fade-in slide-in-from-left-4 duration-500 ease-out">
                                                                {subjects.map(subject => (
                                                                    <div key={subject} className="group/field space-y-2">
                                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted px-1 flex items-center gap-2 group-hover/field:text-primary transition-colors">
                                                                            <Settings size={10} className="opacity-0 group-hover/field:opacity-100 transition-opacity" /> {subject}
                                                                        </label>
                                                                        <div className="relative">
                                                                            <input
                                                                                type="number"
                                                                                value={student.marks[subject as keyof typeof student.marks]}
                                                                                onChange={(e) => handleMarkChange(student.id, subject, e.target.value)}
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                min="0"
                                                                                max="100"
                                                                                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-border-light rounded-xl text-sm font-black text-center focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary shadow-sm transition-all hover:border-primary/40 focus:scale-[1.02]"
                                                                            />
                                                                            <div className="absolute top-1/2 -translate-y-1/2 right-3 opacity-20 text-[8px] font-bold pointer-events-none uppercase">Marks</div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
