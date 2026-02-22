"use client";
import React, { useState } from 'react';
import {
    Upload,
    FileText,
    Link as LinkIcon,
    Plus,
    MoreVertical,
    Search,
    BookOpen,
    Eye,
    Trash2
} from 'lucide-react';

export default function StudyMaterialsPage() {
    const [showUploadModal, setShowUploadModal] = useState(false);

    const materials = [
        { id: 1, title: "Coordinate Geometry Notes", subject: "Higher Math", type: "PDF", date: "Feb 15, 2026", size: "2.4 MB" },
        { id: 2, title: "Trigonometry Formulas Sheet", subject: "Higher Math", type: "PDF", date: "Feb 18, 2026", size: "1.1 MB" },
        { id: 3, title: "Physics Lab Simulation", subject: "General Science", type: "Link", date: "Feb 20, 2026", size: "-" },
        { id: 4, title: "Unit 4 Assignment Guide", subject: "General Science", type: "PDF", date: "Feb 21, 2026", size: "850 KB" },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
                        Study <span className="text-primary italic">Materials</span> 📂
                    </h1>
                    <p className="text-text-muted mt-2 font-medium">
                        Share and manage resources for your students.
                    </p>
                </div>
                <button
                    onClick={() => setShowUploadModal(true)}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
                >
                    <Plus size={18} /> Upload New Material
                </button>
            </div>

            <div className="bg-bg-card rounded-3xl border border-border-light shadow-sm p-6 overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-xl font-bold text-text-primary">Shared Resources</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <input
                            type="text"
                            placeholder="Search materials..."
                            className="pl-10 pr-4 py-2 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full md:w-64"
                        />
                    </div>
                </div>

                <div className="grid gap-4">
                    {materials.map((material) => (
                        <div
                            key={material.id}
                            className="group bg-bg-page/40 p-4 rounded-2xl border border-border-light/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${material.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                                    }`}>
                                    {material.type === 'PDF' ? <FileText size={24} /> : <LinkIcon size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">{material.title}</h3>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
                                            <BookOpen size={12} /> {material.subject}
                                        </span>
                                        <span className="w-1 h-1 bg-border-light rounded-full"></span>
                                        <span className="text-xs font-semibold text-text-muted uppercase">{material.type} • {material.size}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-2 lg:gap-4">
                                <span className="text-xs font-medium text-text-muted hidden md:block">Uploaded on {material.date}</span>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 hover:bg-primary/10 rounded-lg text-text-muted hover:text-primary transition-all" title="View">
                                        <Eye size={18} />
                                    </button>
                                    <button className="p-2 hover:bg-red-50 rounded-lg text-text-muted hover:text-red-500 transition-all" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                    <button className="p-2 hover:bg-bg-page rounded-lg text-text-muted">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upload Modal (Simplified UI) */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowUploadModal(false)}></div>
                    <div className="bg-bg-card w-full max-w-md rounded-3xl p-8 relative z-10 shadow-2xl animate-slideInBottom border border-border-light">
                        <h3 className="text-2xl font-bold text-text-primary mb-6">Upload Material</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">Title</label>
                                <input type="text" className="w-full px-4 py-3 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="e.g. Algebra Slides" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">Select Class</label>
                                <select className="w-full px-4 py-3 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                                    <option>Class X - Section A</option>
                                    <option>Class IX - Section B</option>
                                </select>
                            </div>
                            <div className="border-2 border-dashed border-border-light rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group">
                                <Upload size={32} className="mx-auto text-text-muted group-hover:text-primary transition-colors mb-2" />
                                <p className="text-sm font-bold text-text-secondary">Click or drag file here</p>
                                <p className="text-xs text-text-muted mt-1">PDF, DOC, PPT (Max 10MB)</p>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    className="flex-1 py-3 border border-border-light text-text-secondary rounded-xl font-bold text-sm hover:bg-bg-page transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg"
                                >
                                    Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
