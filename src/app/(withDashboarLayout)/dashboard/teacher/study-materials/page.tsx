"use client";
import React, { useState, useEffect } from 'react';
import { TeacherHeader } from "../TeacherHeader";
import {
    Plus,
    FileText,
    Link as LinkIcon,
    Search,
    BookOpen,
    Eye,
    Trash2,
    MoreVertical,
    Upload,
    Loader2
} from 'lucide-react';
import { getStudyMaterials, createStudyMaterial, deleteStudyMaterial } from '@/app/actions/teacher/studyMaterials';
import toast from 'react-hot-toast';

export default function StudyMaterialsPage() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [materials, setMaterials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        title: '',
        class: 'Class X - A',
        subject: 'Mathematics',
        description: '',
        type: 'PDF',
        attachmentUrl: 'https://example.com/demo-file.pdf', // Placeholder for now
        size: '2.4 MB'
    });

    // Mock IDs for testing - these should come from auth/context in a real scenario
    const schoolId = "cm7qy0k6d0000uxu88zq3z9f6"; // Placeholder schoolId
    const teacherId = "T-1001"; // Placeholder teacherId

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        setLoading(true);
        const response = await getStudyMaterials(schoolId);
        if (response.success) {
            setMaterials(response.data || []);
        } else {
            toast.error(response.error || "Failed to fetch materials");
        }
        setLoading(false);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const response = await createStudyMaterial({
            ...formData,
            schoolId,
            teacherId
        });

        if (response.success) {
            toast.success("Material published successfully!");
            setShowUploadModal(false);
            setMaterials([response.data, ...materials]);
            // Reset form
            setFormData({
                title: '',
                class: 'Class X - A',
                subject: 'Mathematics',
                description: '',
                type: 'PDF',
                attachmentUrl: 'https://example.com/demo-file.pdf',
                size: '2.4 MB'
            });
        } else {
            toast.error(response.error || "Failed to publish material");
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this material?")) return;

        const response = await deleteStudyMaterial(id);
        if (response.success) {
            toast.success("Material deleted");
            setMaterials(materials.filter(m => m.id !== id));
        } else {
            toast.error(response.error || "Failed to delete material");
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <TeacherHeader
                title="Study"
                highlight="Materials"
                emoji="📚"
                subtitle="Upload and share resources with your students."
                rightElement={
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
                    >
                        <Plus size={18} /> Upload New Material
                    </button>
                }
            />

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
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-text-muted">
                            <Loader2 className="animate-spin mb-4" size={32} />
                            <p>Loading materials...</p>
                        </div>
                    ) : materials.length === 0 ? (
                        <div className="text-center py-20 bg-bg-page/20 rounded-2xl border border-dashed border-border-light">
                            <BookOpen className="mx-auto text-text-muted mb-4" size={48} />
                            <p className="text-text-secondary font-medium">No materials found. Start by uploading one!</p>
                        </div>
                    ) : (
                        materials.map((material) => (
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
                                    <span className="text-xs font-medium text-text-muted hidden md:block">
                                        Uploaded on {new Date(material.createdAt).toLocaleDateString()}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <a href={material.attachmentUrl} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-primary/10 rounded-lg text-text-muted hover:text-primary transition-all" title="View">
                                            <Eye size={18} />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(material.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-text-muted hover:text-red-500 transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-bg-page rounded-lg text-text-muted">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !isSubmitting && setShowUploadModal(false)}></div>
                    <form onSubmit={handleUpload} className="bg-bg-card w-full max-w-md rounded-3xl p-8 relative z-10 shadow-2xl animate-slideInBottom border border-border-light">
                        <h3 className="text-2xl font-bold text-text-primary mb-6">Upload Material</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="e.g. Algebra Slides"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">Class</label>
                                    <select
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                        className="w-full px-4 py-3 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option>Class X - A</option>
                                        <option>Class IX - B</option>
                                        <option>Class X - C</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">Subject</label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    >
                                        <option>Mathematics</option>
                                        <option>Chemistry</option>
                                        <option>Physics</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wider">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-none"
                                    placeholder="Provide a brief overview of the material..."
                                ></textarea>
                            </div>
                            <div className="border-2 border-dashed border-border-light rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group bg-bg-page/30">
                                <Upload size={32} className="mx-auto text-text-muted group-hover:text-primary transition-colors mb-2" />
                                <p className="text-sm font-bold text-text-secondary">Click or drag file here</p>
                                <p className="text-xs text-text-muted mt-1 uppercase font-black tracking-widest text-[8px]">PDF, DOC, PPT, MP4 (MAX 50MB)</p>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => setShowUploadModal(false)}
                                    className="flex-1 py-3 border border-border-light text-text-secondary rounded-xl font-bold text-sm hover:bg-bg-page transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
                                    {isSubmitting ? 'Publishing...' : 'Publish'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
