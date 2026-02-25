"use client";
import React, { useState } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Save,
    Camera,
    BookOpen,
    Shield,
    Key,
    UserCircle,
    Calendar,
    Briefcase
} from 'lucide-react';
import { TeacherHeader } from "../TeacherHeader";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("info");

    const teacherData = {
        name: "Abu Raihan",
        id: "TR-2026-001",
        designation: "Senior Mathematics Teacher",
        department: "Science",
        joiningDate: "Jan 15, 2022",
        email: "abu.raihan@school.edu",
        phone: "+880 1712-345678",
        address: "Sector 07, Uttara, Dhaka-1230",
        assignedClasses: [
            { id: "C1", name: "Class X-A", subject: "Higher Mathematics" },
            { id: "C2", name: "Class IX-B", subject: "General Science" },
            { id: "C3", name: "Class X-C", subject: "Physics" },
        ]
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <TeacherHeader
                title="Profile"
                highlight="Settings"
                emoji="👤"
                subtitle="Manage your personal information and account security."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar - Quick Info */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-bg-card rounded-[2.5rem] border border-border-light shadow-sm overflow-hidden text-center p-10">
                        <div className="relative inline-block mb-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-primary to-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-primary/30">
                                AR
                            </div>
                            <button className="absolute -bottom-2 -right-2 p-2.5 bg-white dark:bg-slate-800 border border-border-light rounded-2xl shadow-xl text-primary hover:scale-110 active:scale-95 transition-all">
                                <Camera size={18} />
                            </button>
                        </div>
                        <h2 className="text-2xl font-black text-text-primary uppercase tracking-wider">{teacherData.name}</h2>
                        <p className="text-xs font-black text-primary uppercase tracking-[0.2em] mt-2">{teacherData.designation}</p>

                        <div className="mt-10 space-y-4 text-left">
                            <div className="flex items-center gap-4 p-4 bg-bg-page/50 rounded-2xl border border-border-light/50">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                                    <Shield size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Employee ID</p>
                                    <p className="text-sm font-bold text-text-secondary tabular-nums">{teacherData.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-bg-page/50 rounded-2xl border border-border-light/50">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                                    <Briefcase size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Department</p>
                                    <p className="text-sm font-bold text-text-secondary">{teacherData.department}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-bg-page/50 rounded-2xl border border-border-light/50">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Joining Date</p>
                                    <p className="text-sm font-bold text-text-secondary tabular-nums">{teacherData.joiningDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-bg-card rounded-[2.5rem] border border-border-light shadow-sm p-8">
                        <h3 className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-6 px-1">Active Classes</h3>
                        <div className="space-y-3">
                            {teacherData.assignedClasses.map((cls) => (
                                <div key={cls.id} className="flex items-center justify-between p-4 bg-bg-page/30 rounded-2xl border border-border-light/50 group hover:border-primary/30 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <BookOpen size={14} />
                                        </div>
                                        <span className="text-xs font-black text-text-secondary uppercase">{cls.name}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-text-muted">{cls.subject}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Area - Forms */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-bg-card rounded-[2.5rem] border border-border-light shadow-sm overflow-hidden flex flex-col min-h-[600px]">
                        <div className="flex bg-bg-page p-2 gap-2 border-b border-border-light">
                            <button
                                onClick={() => setActiveTab("info")}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === "info" ? 'bg-white dark:bg-slate-800 text-primary shadow-lg border border-border-light/50' : 'text-text-muted hover:text-text-secondary'}`}
                            >
                                <UserCircle size={18} /> General Info
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === "security" ? 'bg-white dark:bg-slate-800 text-primary shadow-lg border border-border-light/50' : 'text-text-muted hover:text-text-secondary'}`}
                            >
                                <Key size={18} /> Security
                            </button>
                        </div>

                        <div className="p-8 md:p-12 flex-1">
                            {activeTab === "info" ? (
                                <div className="space-y-10 animate-fadeIn">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                                <User size={14} className="text-primary/60" /> Full Name
                                            </label>
                                            <input type="text" defaultValue={teacherData.name} className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                                <Mail size={14} className="text-primary/60" /> Email Address
                                            </label>
                                            <input type="email" defaultValue={teacherData.email} className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                                <Phone size={14} className="text-primary/60" /> Phone Number
                                            </label>
                                            <input type="text" defaultValue={teacherData.phone} className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                                <MapPin size={14} className="text-primary/60" /> Residential Address
                                            </label>
                                            <input type="text" defaultValue={teacherData.address} className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary" />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border-light/50">
                                        <button className="flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-primary/30 hover:bg-primary-dark hover:-translate-y-1 transition-all active:scale-95">
                                            <Save size={18} /> Update Profile
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-10 animate-fadeIn max-w-xl">
                                    <div className="p-8 bg-amber-500/5 border-2 border-amber-500/10 rounded-[2.5rem] flex gap-6 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                                            <Shield size={28} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-amber-700 uppercase tracking-wider">Security Notice</h4>
                                            <p className="text-xs font-bold text-amber-600/80 mt-2 leading-relaxed italic">Changing your password will log you out from all other active devices for security purposes.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                                <Lock size={14} className="text-primary/60" /> Current Password
                                            </label>
                                            <input type="password" placeholder="••••••••" className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                                <Lock size={14} className="text-primary/60" /> New Password
                                            </label>
                                            <input type="password" placeholder="••••••••" className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                                                <Lock size={14} className="text-primary/60" /> Confirm New Password
                                            </label>
                                            <input type="password" placeholder="••••••••" className="w-full px-6 py-4.5 bg-bg-page border border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-text-secondary" />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border-light/50">
                                        <button className="flex items-center justify-center gap-3 bg-slate-900 dark:bg-slate-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-black transition-all active:scale-95">
                                            <Key size={18} /> Reset Password
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
