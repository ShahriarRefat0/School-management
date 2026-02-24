"use client"
import React, { useState } from 'react'
import { 
  Save, 
  Globe, 
  Mail, 
  Building, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Upload, 
  CreditCard, 
  Calendar, 
  User, 
  Lock,
  AtSign,
  Plus
} from 'lucide-react'

export default function NewSchool() {
  const [formData, setFormData] = useState({
    schoolName: '',
    slug: '',
    schoolEmail: '',
    phone: '',
    address: '',
    plan: 'basic',
    duration: '12',
    adminName: '',
    adminEmail: '',
    adminPassword: ''
  })

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'schoolName') {
      setFormData(prev => ({ ...prev, schoolName: value, slug: generateSlug(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="text-center">
        <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">Add New School</h2>
        <p className="text-[var(--color-text-muted)] font-medium">Register a new institution and setup their master account.</p>
      </div>

      <div className="bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border-light)] shadow-xl space-y-10">
        <form className="space-y-10">
          
          {/* SECTION 1: School Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-[var(--color-primary)] flex items-center gap-2 border-b border-[var(--color-border-light)] pb-2 uppercase tracking-tighter">
              <Building size={20} /> School Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* School Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">School Name</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="text" name="schoolName" placeholder="e.g. Dhaka International School" className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange} />
                </div>
              </div>

              {/* Sub-domain/Slug (Auto Generated) */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Sub-domain / Slug</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="text" value={formData.slug} className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] opacity-70 cursor-not-allowed" readOnly />
                </div>
                <p className="text-[10px] text-[var(--color-primary)] font-bold italic">Link: {formData.slug || 'slug'}.yourdomain.com</p>
              </div>

              {/* School Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">School Official Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="email" name="schoolEmail" placeholder="info@school.com" className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange} />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Contact Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="text" name="phone" placeholder="+880 1XXX-XXXXXX" className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange} />
                </div>
              </div>

              {/* Plan Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Assigned Plan</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <select name="plan" className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] appearance-none font-bold" onChange={handleChange}>
                    <option value="basic">Basic Plan</option>
                    <option value="pro">Pro Plan</option>
                    <option value="enterprise">Enterprise Plan</option>
                  </select>
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Subscription Duration (Months)</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="number" name="duration" placeholder="e.g. 12" className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange} />
                </div>
              </div>

              {/* Logo Upload */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">School Logo</label>
                <div className="border-2 border-dashed border-[var(--color-border-light)] bg-[var(--color-bg-page)] p-6 rounded-2xl flex flex-col items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all cursor-pointer">
                  <Upload size={24} className="mb-2" />
                  <span className="text-xs font-bold uppercase tracking-widest">Click to upload school logo</span>
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">School Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-[var(--color-text-muted)]" size={18} />
                  <textarea name="address" rows={3} placeholder="Full address of the school..." className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange}></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Admin Account Credentials */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-orange-500 flex items-center gap-2 border-b border-[var(--color-border-light)] pb-2 uppercase tracking-tighter">
              <ShieldCheck size={20} /> Primary Admin Account
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Admin Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Principal / Admin Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="text" name="adminName" placeholder="e.g. Mr. Rahim Ullah" className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange} />
                </div>
              </div>

              {/* Admin Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Admin Login Email</label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="email" name="adminEmail" placeholder="admin.principal@school.com" className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange} />
                </div>
              </div>

              {/* Admin Password */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Initial Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="password" name="adminPassword" placeholder="••••••••" className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange} />
                </div>
                <p className="text-[10px] text-[var(--color-text-muted)] italic font-medium mt-1">এই পাসওয়ার্ডটি ব্যবহার করে স্কুলের অ্যাডমিন প্রথমবার লগইন করবেন।</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-[var(--color-primary)] text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all text-lg">
            <Plus size={22} className="mr-1" /> Add School
          </button>
        </form>
      </div>
    </div>
  )
}