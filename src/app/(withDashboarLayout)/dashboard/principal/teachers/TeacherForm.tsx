"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Briefcase,
    Save,
    ChevronLeft,
    User,
    GraduationCap,
    Users,
    MapPin,
    CheckCircle2,
    AlertCircle,
    FileSpreadsheet,
    Info,
    RefreshCcw,
    Trash2,
    Clock
} from "lucide-react";
import { addTeacher, getTeacher, updateTeacher, deleteTeacher } from "@/app/actions/teacher";

export default function TeacherForm() {
    const router = useRouter();
    const params = useParams();
    const teacherIdFromUrl = params?.id ? decodeURIComponent(params.id as string) : "";
    const isEdit = !!teacherIdFromUrl;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(isEdit);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        teacherId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        religion: "",
        designation: "",
        department: "",
        qualification: "",
        presentAddress: "",
        permanentAddress: "",
    });

    useEffect(() => {
        let active = true;

        if (isEdit && teacherIdFromUrl) {
            console.log("🛠️ TeacherForm: Starting fetch for ID:", teacherIdFromUrl);
            const loadData = async () => {
                setLoading(true);
                setError("");
                try {
                    const result = await getTeacher(teacherIdFromUrl);
                    if (!active) return;

                    console.log("🛠️ TeacherForm: Fetch Result:", result);

                    if (result.success && result.data) {
                        const d = result.data;
                        setForm({
                            teacherId: d.teacherId,
                            firstName: d.firstName,
                            lastName: d.lastName,
                            email: d.email,
                            phone: d.phone,
                            dateOfBirth: d.dateOfBirth ? new Date(d.dateOfBirth).toISOString().split('T')[0] : "",
                            gender: d.gender,
                            bloodGroup: d.bloodGroup || "",
                            religion: d.religion || "",
                            designation: d.designation,
                            department: d.department,
                            qualification: d.qualification,
                            presentAddress: d.presentAddress,
                            permanentAddress: d.permanentAddress || "",
                        });
                        console.log("🛠️ TeacherForm: Form data set successfully");
                    } else {
                        setError(result.error || "Teacher profile not found.");
                    }
                } catch (err: any) {
                    console.error("🛠️ TeacherForm: Error loading data:", err);
                    setError("Failed to sync faculty data.");
                } finally {
                    if (active) setLoading(false);
                }
            };
            loadData();
        } else {
            console.log("🛠️ TeacherForm: Add mode, skipping fetch");
            setLoading(false);
        }

        return () => { active = false; };
    }, [isEdit, teacherIdFromUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const result = isEdit
                ? await updateTeacher(teacherIdFromUrl!, form)
                : await addTeacher(form);

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/dashboard/principal/teachers");
                }, 2000);
            } else {
                setError(result.error || `Failed to ${isEdit ? 'update' : 'register'} teacher.`);
            }
        } catch (err: any) {
            setError("Server communication failure.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("This will permanently remove the teacher profile. Continue?")) return;
        const result = await deleteTeacher(teacherIdFromUrl!);
        if (result.success) {
            router.push("/dashboard/principal/teachers");
        } else {
            alert(result.error);
        }
    };

    if (loading) return <div className="p-20 text-center font-black animate-pulse text-xs tracking-[0.5em] text-primary/60 uppercase">SYNCING FACULTY RECORD...</div>;

    if (success) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in slide-in-from-bottom duration-700">
                <div className={`w-24 h-24 ${isEdit ? 'bg-amber-100 text-amber-600' : 'bg-primary/10 text-primary'} rounded-full flex items-center justify-center mb-6 shadow-2xl`}>
                    {isEdit ? <RefreshCcw size={56} className="animate-spin-slow" /> : <CheckCircle2 size={56} className="animate-pulse" />}
                </div>
                <h2 className={`text-3xl font-black ${isEdit ? 'text-amber-600' : 'text-text-primary'} mb-2 tracking-tight`}>
                    {isEdit ? "Profile Refreshed!" : "Staff Onboarded!"}
                </h2>
                <p className="text-text-muted font-black uppercase text-[10px] tracking-widest opacity-60">
                    REDIRECTING TO FACULTY ROSTER...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-light pb-10 gap-8">
                <div className="space-y-6">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-[10px] font-black uppercase text-primary/60 hover:text-primary transition-all tracking-widest"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Faculty
                    </button>
                    <div className="flex items-center gap-6">
                        <div className={`p-5 ${isEdit ? 'bg-amber-500 shadow-amber-200' : 'bg-primary shadow-primary/40'} text-white rounded-3xl shadow-2xl rotate-3`}>
                            {isEdit ? <RefreshCcw size={40} /> : <Briefcase size={40} />}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-text-primary tracking-tight">
                                {isEdit ? "Modify Profile" : "Onboard Faculty"}
                            </h1>
                            <p className="text-sm font-bold text-text-muted mt-1 uppercase tracking-widest opacity-70">
                                {isEdit ? `Editing faculty ID: ${teacherIdFromUrl}` : "New Staff Registration Portal"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {isEdit ? (
                        <Button
                            onClick={handleDelete}
                            variant="ghost"
                            className="h-14 px-8 rounded-2xl text-red-500 hover:bg-red-50 font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                        >
                            <Trash2 size={24} />
                            Terminate Access
                        </Button>
                    ) : (
                        <Button variant="outline" className="h-14 px-10 rounded-2xl border-2 border-border-light font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-bg-page">
                            <FileSpreadsheet size={18} />
                            Import Roster
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Info Column */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="p-8 bg-bg-card rounded-[2rem] border border-border-light shadow-xl">
                        <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Info size={14} /> System Notice
                        </h3>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <Clock size={16} className="text-text-muted opacity-40 shrink-0" />
                                <p className="text-[11px] font-bold text-text-muted leading-relaxed italic">
                                    Updating ID profiles or emails may temporarily affect login synchronization for this faculty member.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Column */}
                <div className="lg:col-span-9">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        {error && (
                            <div className="p-6 bg-red-50 text-red-600 rounded-3xl border-2 border-red-100 font-black text-sm flex items-center gap-4 text-center">
                                <AlertCircle size={24} /> {error}
                            </div>
                        )}

                        <div className="bg-bg-card rounded-[3rem] border border-border-light shadow-2xl p-10 lg:p-14 space-y-12">
                            <div className="flex items-center gap-4 pb-8 border-b border-border-light/40">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                    <User size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-text-primary tracking-tight">Identity Data</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Teacher ID *</label>
                                    <Input name="teacherId" value={form.teacherId} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-black border-2 text-center" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">First Name *</label>
                                    <Input name="firstName" value={form.firstName} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Last Name *</label>
                                    <Input name="lastName" value={form.lastName} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Gender *</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} required className="w-full h-16 rounded-2xl border-2 border-border-light bg-bg-page/40 px-6 text-sm font-bold outline-none">
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Birth Date *</label>
                                    <Input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Blood Group</label>
                                    <Input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="h-16 rounded-2xl bg-bg-page/40 font-bold shadow-inner" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg-card rounded-[3rem] border border-border-light shadow-2xl p-10 lg:p-14 space-y-12">
                            <div className="flex items-center gap-4 pb-8 border-b border-border-light/40">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                    <GraduationCap size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-text-primary tracking-tight">Professional Record</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Designation *</label>
                                    <Input name="designation" value={form.designation} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Department *</label>
                                    <Input name="department" value={form.department} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Main Qualification *</label>
                                    <Input name="qualification" value={form.qualification} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg-card rounded-[3rem] border border-border-light shadow-2xl p-10 lg:p-14 space-y-12">
                            <div className="flex items-center gap-4 pb-8 border-b border-border-light/40">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                                    <Users size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-text-primary tracking-tight">Communications</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Official Email *</label>
                                    <Input name="email" type="email" value={form.email} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-bold lowercase" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Mobile Number *</label>
                                    <Input name="phone" value={form.phone} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-black text-2xl tracking-tighter" />
                                </div>
                            </div>

                            <div className="pt-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                                        <MapPin size={12} /> Present Residential Address *
                                    </label>
                                    <textarea
                                        name="presentAddress"
                                        rows={3}
                                        value={form.presentAddress}
                                        onChange={(e: any) => handleChange(e)}
                                        required
                                        className="w-full rounded-[2rem] border-2 border-border-light bg-bg-page/40 px-8 py-6 text-sm font-bold shadow-inner focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-6 pt-12 pb-20">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                                className="h-16 px-12 rounded-2xl font-black text-text-muted uppercase tracking-widest text-[10px] hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                                Discard Edits
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`h-16 px-20 ${isEdit ? 'bg-amber-500 hover:shadow-amber-500/40' : 'bg-primary shadow-primary/40'} text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl hover:-translate-y-2 active:scale-95 transition-all flex items-center gap-4`}
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save size={24} />
                                )}
                                {isSubmitting ? "Syncing..." : isEdit ? "Update Profile" : "Finalize Profile"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
