"use client"
import React, { useState } from 'react'
import { 
  Building, Globe, Mail, ShieldCheck, User, Lock, AtSign, Plus,
  Layers, Users, FileText, Facebook, Layout, Languages
} from 'lucide-react'
import { z } from 'zod'
import { createSchool } from '@/app/actions/school' // অ্যাকশনটি ইমপোর্ট করুন
import { useAuth } from '@/hooks/useAuth'

// Zod Schema
const schoolSchema = z.object({
  schoolName: z.string().min(3, "School name is required"),
  slug: z.string(),
  schoolEmail: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  plan: z.string(),
  duration: z.string(),
  schoolCategory: z.string(),
  expectedStudents: z.any().optional(),
  registrationId: z.string().min(1, "Registration ID is required"),
  facebookUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
  language: z.string(),
  adminName: z.string().min(3, "Admin name is required"),
  adminEmail: z.string().email("Invalid admin email"),
  adminPassword: z.string().min(6, "Password must be at least 6 characters")
})

export default function NewSchool() {
  const [loading, setLoading] = useState(false)
  const {signUp} = useAuth()

  const [formData, setFormData] = useState({
    schoolName: '',
    slug: '',
    schoolEmail: '',
    phone: '',
    address: '',
    plan: 'basic',
    duration: '12',
    schoolCategory: 'high-school',
    expectedStudents: '',
    registrationId: '',
    facebookUrl: '',
    websiteUrl: '',
    language: 'english',
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

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setLoading(true)

  const validation = schoolSchema.safeParse(formData)

  if (!validation.success) {
    alert("Please fill all required fields correctly.")
    setLoading(false)
    return
  }

  // 1️⃣ Create Supabase Auth User
  const { data, error } = await signUp(
    formData.adminEmail,
    formData.adminPassword,
    "admin"
  )

  if (error || !data?.user) {
    alert(error?.message || "Admin account creation failed")
    setLoading(false)
    return
  }

  // 2️⃣ Create School + Prisma User
  const result = await createSchool({
    ...formData,
    adminId: data.user.id
  })

  if (!result.success) {

    // ❗ Rollback Supabase user (optional improvement)
    // এখানে future এ deleteUser logic দিতে পারো

    alert("❌ Error: " + result.error)
    setLoading(false)
    return
  }

  alert("🎉 Institution Deployed Successfully!")

  setLoading(false)
}

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="text-center">
        <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight uppercase">Register New Institution</h2>
        <p className="text-[var(--color-text-muted)] font-medium">Setup a new tenant environment.</p>
      </div>

      <div className="bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border-light)] shadow-xl space-y-10">
        <form className="space-y-10" onSubmit={handleSubmit}>
          
          {/* Institutional Profile */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-[var(--color-primary)] flex items-center gap-2 border-b border-[var(--color-border-light)] pb-2 uppercase tracking-tighter">
              <Building size={20} /> Institutional Profile
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">School Name</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input required type="text" name="schoolName" value={formData.schoolName} className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Sub-domain / Slug</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                  <input type="text" value={formData.slug} className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] opacity-70 cursor-not-allowed font-mono" readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">School Category</label>
                <select name="schoolCategory" value={formData.schoolCategory} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" onChange={handleChange}>
                  <option value="primary">Primary School</option>
                  <option value="high-school">High School</option>
                  <option value="college">College / University</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Expected Students</label>
                <input type="number" name="expectedStudents" value={formData.expectedStudents} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Registration ID</label>
                <input required type="text" name="registrationId" value={formData.registrationId} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none" onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Language</label>
                <select name="language" value={formData.language} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none" onChange={handleChange}>
                  <option value="english">English</option>
                  <option value="bangla">Bangla</option>
                </select>
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-emerald-500 flex items-center gap-2 border-b border-[var(--color-border-light)] pb-2 uppercase tracking-tighter">
              <Globe size={20} /> Communication & Web
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Official Email</label>
                <input required type="email" name="schoolEmail" value={formData.schoolEmail} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl" onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Facebook Page</label>
                <input type="text" name="facebookUrl" value={formData.facebookUrl} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl" onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Admin Account */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-orange-500 flex items-center gap-2 border-b border-[var(--color-border-light)] pb-2 uppercase tracking-tighter">
              <ShieldCheck size={20} /> Admin Account
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input required type="text" name="adminName" placeholder="Admin Name" value={formData.adminName} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl" onChange={handleChange} />
              <input required type="email" name="adminEmail" placeholder="Admin Email" value={formData.adminEmail} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl" onChange={handleChange} />
              <div className="md:col-span-2">
                <input required type="password" name="adminPassword" placeholder="Initial Password" value={formData.adminPassword} className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl" onChange={handleChange} />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[var(--color-primary)] text-white font-black py-5 rounded-2xl shadow-lg hover:scale-[1.01] transition-all text-lg uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? "Processing..." : "Deploy School Instance"}
          </button>
        </form>
      </div>
    </div>
  )
}