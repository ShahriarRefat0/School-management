"use client"
import React, { useState, useEffect } from 'react'
import { Megaphone, Users, Calendar, AlertCircle, Layers, FileText, Send, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createAnnouncement } from '@/app/actions/announcement'
import Swal from 'sweetalert2'
import { getCurrentSchoolId } from '@/app/actions/user'

export default function NewAnnouncement() {
  const router = useRouter()
  const [schoolId, setSchoolId] = useState("")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    audience: 'all',
    targetClass: 'all',
    category: 'academic',
    priority: 'normal',
    expiryDate: '',
    schoolId: ''
  })

  useEffect(() => {
    getCurrentSchoolId().then(id => {
      if (id) {
        setSchoolId(id)
        setFormData(prev => ({ ...prev, schoolId: id }))
      }
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await createAnnouncement(formData);

    if (result.success) {
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "🎉 Announcement Published Successfully!",
        confirmButtonColor: "#3085d6",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push('/dashboard/principal/announcements');
    } else {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: result.error || "Something went wrong",
        confirmButtonColor: "#d33",
      });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="text-center">
        <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight uppercase flex items-center justify-center gap-3">
          <Megaphone className="text-[var(--color-primary)]" size={32} />
          Create New Announcement
        </h2>
        <p className="text-[var(--color-text-muted)] font-medium">Broadcast notices to your institution.</p>
      </div>

      <div className="bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border-light)] shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Notice Title</label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
              <input required type="text" name="title" value={formData.title} placeholder="e.g. Winter Vacation Notice"
                className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                onChange={handleChange} />
            </div>
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Details / Description</label>
            <textarea required name="content" value={formData.content} rows={5} placeholder="Write your notice details here..."
              className="w-full p-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Audience Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Target Audience</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                <select name="audience" value={formData.audience} className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none" onChange={handleChange}>
                  <option value="all">Everyone (All)</option>
                  <option value="students">Students Only</option>
                  <option value="teachers">Teachers Only</option>
                  <option value="staff">Office Staff</option>
                </select>
              </div>
            </div>

            {/* Conditional Class Selection (Only shows if Audience is Students) */}
            {formData.audience === 'students' && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Specific Class</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <select name="targetClass" value={formData.targetClass} className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none ring-2 ring-[var(--color-primary)]/20" onChange={handleChange}>
                    <option value="all">All Classes</option>
                    <option value="class-1">Class 1</option>
                    <option value="class-2">Class 2</option>
                    <option value="class-10">Class 10</option>
                    {/* আপনি এখানে আপনার স্কুলের ক্লাসগুলো ম্যাপ করে দিতে পারেন */}
                  </select>
                </div>
              </div>
            )}

            {/* Category */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Notice Category</label>
              <select name="category" value={formData.category} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none" onChange={handleChange}>
                <option value="academic">Academic</option>
                <option value="holiday">Holiday / Vacation</option>
                <option value="exam">Exam Schedule</option>
                <option value="event">Event / Sports</option>
                <option value="emergency">Emergency Notice</option>
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Priority Level</label>
              <div className="relative">
                <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                <select name="priority" value={formData.priority} className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none" onChange={handleChange}>
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent (Immediate)</option>
                </select>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Visible Until (Expiry)</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                <input type="date" name="expiryDate" value={formData.expiryDate} className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none" onChange={handleChange} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.01] transition-all text-lg uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Publishing..." : <><Send size={20} /> Broadcast Announcement</>}
          </button>
        </form>
      </div>
    </div>
  )
}