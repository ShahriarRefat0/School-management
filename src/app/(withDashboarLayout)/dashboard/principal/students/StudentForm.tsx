"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    UserPlus,
    Save,
    ChevronLeft,
    User,
    GraduationCap,
    Users,
    MapPin,
    CheckCircle2,
    AlertCircle,
    FileUp,
    Info,
    RefreshCcw,
    Trash2
} from "lucide-react";
import { addStudent, getStudent, updateStudent, deleteStudent } from "@/app/actions/student";

export default function StudentForm() {
    const router = useRouter();
    const params = useParams();
    const studentId = params?.id ? decodeURIComponent(params.id as string) : "";
    const isEdit = !!studentId;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(isEdit);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [form, setForm] = useState({
        registrationNo: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        religion: "",
        currentClass: "",
        section: "",
        rollNo: "",
        session: "",
        fatherName: "",
        motherName: "",
        guardianPhone: "",
        emergencyContact: "",
        email: "",
        presentAddress: "",
        permanentAddress: "",
    });

    useEffect(() => {
        let active = true;

        if (isEdit && studentId) {
            console.log("�️ StudentForm: Starting fetch for ID:", studentId);
            const loadData = async () => {
                setLoading(true);
                setError("");
                try {
                    const result = await getStudent(studentId);
                    if (!active) return;

                    console.log("�️ StudentForm: Fetch Result:", result);

                    if (result.success && result.data) {
                        const d = result.data;
                        setForm({
                            registrationNo: d.registrationNo || studentId,
                            firstName: d.firstName || "",
                            lastName: d.lastName || "",
                            dateOfBirth: d.dateOfBirth ? new Date(d.dateOfBirth).toISOString().split('T')[0] : "",
                            gender: d.gender || "",
                            bloodGroup: d.bloodGroup || "",
                            religion: d.religion || "",
                            currentClass: d.currentClass || "",
                            section: d.section || "",
                            rollNo: d.rollNo ? String(d.rollNo) : "",
                            session: d.session || "",
                            fatherName: d.fatherName || "",
                            motherName: d.motherName || "",
                            guardianPhone: d.guardianPhone || "",
                            emergencyContact: d.emergencyContact || "",
                            email: d.email || "",
                            presentAddress: d.presentAddress || "",
                            permanentAddress: d.permanentAddress || "",
                        });
                        console.log("🛠️ StudentForm: Form data set successfully");
                    } else {
                        setError(result.error || "Student record not found.");
                    }
                } catch (err: any) {
                    console.error("�️ StudentForm: Error loading data:", err);
                    setError("Communication failure with repository.");
                } finally {
                    if (active) setLoading(false);
                }
            };
            loadData();
        } else {
            console.log("🛠️ StudentForm: Add mode, skipping fetch");
            setLoading(false);
        }

        return () => { active = false; };
    }, [studentId, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const submissionData = {
                ...form,
                rollNo: Number(form.rollNo) || 0,
            };

            const result = isEdit
                ? await updateStudent(studentId!, submissionData)
                : await addStudent(submissionData);

            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/dashboard/principal/students");
                }, 2000);
            } else {
                setError(result.error || `Failed to ${isEdit ? 'update' : 'add'} student record.`);
            }
        } catch (err: any) {
            setError("Network error or server unavailable.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure? This action cannot be undone.")) return;
        const result = await deleteStudent(studentId!);
        if (result.success) {
            router.push("/dashboard/principal/students");
        } else {
            alert(result.error);
        }
    };

    if (loading) return <div className="p-20 text-center font-black animate-pulse text-xs tracking-[0.5em] text-primary/60 uppercase">SYNCING LEDGER DATA...</div>;

    if (success) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-500">
                <div className={`w-24 h-24 ${isEdit ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'} rounded-full flex items-center justify-center mb-6 shadow-xl`}>
                    {isEdit ? <RefreshCcw size={56} className="animate-spin-slow" /> : <CheckCircle2 size={56} className="animate-bounce" />}
                </div>
                <h2 className={`text-3xl font-black ${isEdit ? 'text-blue-600' : 'text-emerald-600'} mb-2`}>
                    {isEdit ? "Update Successful!" : "Registration Successful!"}
                </h2>
                <p className="text-text-muted font-bold">The student record has been {isEdit ? 'updated' : 'added to'} the database.</p>
                <p className="text-xs text-text-muted mt-4 opacity-50 font-mono tracking-widest uppercase">REDIRECTING TO DIRECTORY...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 lg:p-10 space-y-10">
            {/* Header & Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-light pb-8 gap-6">
                <div className="space-y-4">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-[10px] font-black uppercase text-primary/60 hover:text-primary transition-all tracking-widest"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Directory
                    </button>
                    <div className="flex items-center gap-6">
                        <div className={`p-5 ${isEdit ? 'bg-blue-600' : 'bg-primary'} text-white rounded-3xl shadow-2xl shadow-primary/40 rotate-1`}>
                            {isEdit ? <RefreshCcw size={40} /> : <UserPlus size={40} />}
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-text-primary tracking-tight">
                                {isEdit ? "Modify Student Details" : "Add New Student"}
                            </h1>
                            <p className="text-sm font-bold text-text-muted mt-1 uppercase tracking-widest opacity-60">
                                {isEdit ? `Editing Record: ${studentId}` : "Admission Lifecycle — 2025 Session"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isEdit ? (
                        <Button
                            onClick={handleDelete}
                            variant="ghost"
                            className="h-14 px-8 rounded-2xl text-red-500 hover:bg-red-50 font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                        >
                            <Trash2 size={18} />
                            Delete Record
                        </Button>
                    ) : (
                        <Button variant="outline" className="h-14 px-8 rounded-2xl border-dashed border-2 border-primary/20 text-text-muted hover:border-primary/50 hover:bg-primary/5 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                            <FileUp size={18} />
                            Bulk Import (CSV)
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Sidebar Info */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="p-6 bg-primary/[0.03] rounded-3xl border border-primary/10 border-dashed">
                        <h3 className="text-xs font-black text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Info size={14} /> Guidelines
                        </h3>
                        <ul className="space-y-4 text-[11px] font-bold text-text-muted tracking-tight">
                            <li className="flex gap-2"><span>•</span> Registration numbers must be unique.</li>
                            {isEdit && <li className="flex gap-2 text-blue-600"><span>•</span> Updating the Registration ID may break academic links.</li>}
                            <li className="flex gap-2"><span>•</span> All fields marked with (*) are mandatory.</li>
                        </ul>
                    </div>
                </div>

                {/* Main Form Area */}
                <div className="lg:col-span-9">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-red-50 text-red-600 rounded-2xl border-2 border-red-100 flex items-center gap-3 font-black text-sm text-center">
                                <AlertCircle size={22} /> {error}
                            </motion.div>
                        )}

                        <div className="bg-bg-card rounded-[2.5rem] border border-border-light shadow-2xl shadow-black/5 p-8 lg:p-12 space-y-10">
                            <div className="flex items-center gap-3 pb-6 border-b border-border-light/50">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                    <User size={20} />
                                </div>
                                <h3 className="text-xl font-black text-text-primary tracking-tight">Personal Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Registration No *</label>
                                    <Input name="registrationNo" value={form.registrationNo} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold border-2 focus:border-primary/50 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Birth Date *</label>
                                    <Input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold border-2" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Gender *</label>
                                    <select name="gender" value={form.gender} onChange={handleChange} required className="w-full h-14 rounded-2xl border-2 border-border-light bg-bg-page/40 px-5 text-sm font-bold outline-none">
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">First Name *</label>
                                    <Input name="firstName" value={form.firstName} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Last Name *</label>
                                    <Input name="lastName" value={form.lastName} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Blood Group</label>
                                    <Input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} className="h-14 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg-card rounded-[2.5rem] border border-border-light shadow-2xl shadow-black/5 p-8 lg:p-12 space-y-10">
                            <div className="flex items-center gap-3 pb-6 border-b border-border-light/50">
                                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                                    <GraduationCap size={20} />
                                </div>
                                <h3 className="text-xl font-black text-text-primary tracking-tight">Academic Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Current Class *</label>
                                    <Input name="currentClass" value={form.currentClass} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Section / Group *</label>
                                    <Input name="section" value={form.section} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Roll No *</label>
                                    <Input name="rollNo" type="number" value={form.rollNo} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold text-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Academic Session *</label>
                                    <Input name="session" value={form.session} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold text-center" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-bg-card rounded-[2.5rem] border border-border-light shadow-2xl shadow-black/5 p-8 lg:p-12 space-y-10">
                            <div className="flex items-center gap-3 pb-6 border-b border-border-light/50">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                    <Users size={20} />
                                </div>
                                <h3 className="text-xl font-black text-text-primary tracking-tight">Parental Record</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Father's Name *</label>
                                    <Input name="fatherName" value={form.fatherName} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Mother's Name *</label>
                                    <Input name="motherName" value={form.motherName} onChange={handleChange} required className="h-14 rounded-2xl bg-bg-page/40 font-bold" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">Guardian Phone *</label>
                                    <Input name="guardianPhone" value={form.guardianPhone} onChange={handleChange} required className="h-16 rounded-2xl bg-bg-page/40 font-black text-2xl tracking-widest" />
                                </div>
                            </div>

                            <div className="pt-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2">
                                        <MapPin size={12} /> Residential Address *
                                    </label>
                                    <textarea
                                        name="presentAddress"
                                        rows={3}
                                        value={form.presentAddress}
                                        onChange={(e: any) => handleChange(e)}
                                        required
                                        className="w-full rounded-3xl border-2 border-border-light bg-bg-page/40 px-6 py-4 text-sm font-bold focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-6 pt-10 pb-20">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => router.back()}
                                disabled={isSubmitting}
                                className="h-16 px-10 rounded-2xl font-black text-text-muted uppercase tracking-widest text-[10px] hover:bg-red-50 hover:text-red-500 transition-all"
                            >
                                Discard Edits
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`h-16 px-16 ${isEdit ? 'bg-blue-600' : 'bg-primary'} text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-widest shadow-2xl shadow-primary/40 hover:-translate-y-2 transition-all flex items-center gap-3`}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Save size={20} />
                                )}
                                {isSubmitting ? "Syncing..." : isEdit ? "Update Profile" : "Finalize Enrollment"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
