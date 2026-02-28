"use client";
import React, { useState, useEffect } from 'react';
import { Save, Users, UserRound, HardDrive, LayoutGrid, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getPlan, updatePlan } from '@/app/actions/plans';

export default function EditPlan({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = React.use(params);

    const modulesList = ["Attendance", "Exams", "Finance", "SMS", "Library", "Inventory", "Staff Management"];

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        duration: '',
        icon: 'Zap',
        color: 'text-blue-500',
        students: '',
        teachers: '',
        storage: '',
        modules: [] as string[]
    });

    useEffect(() => {
        const fetchPlanData = async () => {
            try {
                const res = await getPlan(id);
                if (res.success && res.data) {
                    setFormData({
                        name: res.data.name || '',
                        price: res.data.price || '',
                        duration: res.data.duration || '',
                        icon: res.data.icon || 'Zap',
                        color: res.data.color || 'text-blue-500',
                        students: res.data.students || '',
                        teachers: res.data.teachers || '',
                        storage: res.data.storage || '',
                        modules: res.data.modules || []
                    });
                } else {
                    alert('Failed to load plan details');
                    router.push('/dashboard/super-admin/plans');
                }
            } catch (error) {
                console.error('Error fetching plan:', error);
                alert('Error loading plan details');
            } finally {
                setInitialLoading(false);
            }
        };

        fetchPlanData();
    }, [id, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleModuleToggle = (mod: string) => {
        setFormData(prev => {
            if (prev.modules.includes(mod)) {
                return { ...prev, modules: prev.modules.filter(m => m !== mod) };
            }
            return { ...prev, modules: [...prev.modules, mod] };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await updatePlan(id, formData);
            if (res.success) {
                alert('Plan updated successfully!');
                router.push('/dashboard/super-admin/plans');
            } else {
                alert(`Failed to update plan: ${res.error}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred while updating the plan.');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex justify-center items-center py-40">
                <Loader2 className="animate-spin h-12 w-12 text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-12">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/super-admin/plans" className="p-2 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-black text-[var(--color-text-primary)]">Edit Subscription Plan</h2>
                        <p className="text-sm text-[var(--color-text-muted)]">Update pricing, limits, and features for this plan.</p>
                    </div>
                </div>
            </div>

            <div className="bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border-light)] shadow-xl">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="font-black text-[var(--color-primary)] uppercase text-xs tracking-widest border-b pb-2">Basic Info</h3>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Plan Name (Required)</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g. Pro Plan"
                                className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Price String (Required)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-3.5 text-[var(--color-text-muted)] text-xs font-bold">৳</span>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. 5,000 / month"
                                    className="w-full pl-8 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Duration String (Required)</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g. 1 Month or 1 Year"
                                className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Icon Selection</label>
                            <select
                                name="icon"
                                value={formData.icon}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] appearance-none cursor-pointer"
                            >
                                <option value="Zap">Zap (Lightning)</option>
                                <option value="Shield">Shield</option>
                                <option value="Crown">Crown</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Color Class</label>
                            <select
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] appearance-none cursor-pointer"
                            >
                                <option value="text-blue-500">Blue (Basic)</option>
                                <option value="text-purple-500">Purple (Pro)</option>
                                <option value="text-yellow-500">Yellow (Premium)</option>
                                <option value="text-emerald-500">Emerald</option>
                            </select>
                        </div>
                    </div>

                    {/* System Limits */}
                    <div className="space-y-4">
                        <h3 className="font-black text-[var(--color-primary)] uppercase text-xs tracking-widest border-b pb-2">System Limits & Perks</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Student Limit (Required)</label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        name="students"
                                        value={formData.students}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. 500"
                                        className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Teacher Limit (Required)</label>
                                <div className="relative">
                                    <UserRound className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        name="teachers"
                                        value={formData.teachers}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. 50"
                                        className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Storage Limit String (Required)</label>
                            <div className="relative">
                                <HardDrive className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    name="storage"
                                    value={formData.storage}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. 10GB or Unlimited"
                                    className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Modules Selection */}
                    <div className="md:col-span-2 space-y-4 pt-4 border-t">
                        <h3 className="font-black text-[var(--color-primary)] uppercase text-xs tracking-widest flex items-center gap-2">
                            <LayoutGrid size={16} /> Included Modules
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {modulesList.map((mod) => (
                                <label key={mod} className={`flex items-center gap-3 p-3 bg-[var(--color-bg-page)] border ${formData.modules.includes(mod) ? 'border-[var(--color-primary)]' : 'border-[var(--color-border-light)]'} rounded-xl cursor-pointer hover:border-[var(--color-primary)] transition-all`}>
                                    <input
                                        type="checkbox"
                                        checked={formData.modules.includes(mod)}
                                        onChange={() => handleModuleToggle(mod)}
                                        className="w-4 h-4 accent-[var(--color-primary)]"
                                    />
                                    <span className="text-xs font-bold text-[var(--color-text-secondary)]">{mod}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 mt-6 w-full bg-[var(--color-primary)] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                        {loading ? 'Updating...' : 'Update Subscription Plan'}
                    </button>
                </form>
            </div>
        </div>
    );
}
