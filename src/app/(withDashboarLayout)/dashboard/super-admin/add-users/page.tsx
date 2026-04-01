"use client"

import React, { useState, useEffect } from 'react'
import { Loader2, Plus, Trash2, X, Globe, Save, Link as LinkIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2'
import { 
    getSuperAdminUsers, createSuperAdmin, 
    deleteSuperAdmin, getSystemConfig, updateSystemConfig 
} from '@/app/actions/superadmin'

export default function SuperAdminProfileControl() {
  const [activeTab, setActiveTab] = useState('users')
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  // সাইট স্টেট
  const [siteName, setSiteName] = useState("Schoology BD")
  const [siteSubtitle, setSiteSubtitle] = useState("Management System")
  const [siteLogo, setSiteLogo] = useState("")

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        const [userRes, configRes] = await Promise.all([getSuperAdminUsers(), getSystemConfig()])
        if (userRes?.success) setUsers(userRes.data || [])
        if (configRes?.success && configRes.data) {
          setSiteName(configRes.data.siteName || "")
          setSiteSubtitle(configRes.data.siteSubtitle || "")
          setSiteLogo(configRes.data.siteLogo || "")
        }
      } finally { setLoading(false) }
    }
    init()
  }, [])

  // ১. ডিলিট ফাংশন
  const handleDeleteUser = async (user: any) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: `${user.name} এর এক্সেস চিরতরে মুছে যাবে!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete it!'
    });

    if (confirm.isConfirmed) {
      const result = await deleteSuperAdmin(user.id, user.authUserId);
      if (result.success) {
        setUsers(prev => prev.filter(u => u.id !== user.id));
        Swal.fire('Deleted!', 'User has been removed.', 'success');
      } else {
        Swal.fire('Error!', result.error, 'error');
      }
    }
  }



  // ২. ইউজার তৈরি
  const handleAddUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsCreatingUser(true)
    const formData = new FormData(form)
    const userData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: (formData.get('password') as string) || "Super@Admin123"
    }

    try {
        const result = await createSuperAdmin(userData)
        if (result.success) {
            Swal.fire({ title: 'Success!', text: 'Admin created!', icon: 'success', confirmButtonColor: '#2563eb' });
            setUsers(prev => [result.data, ...prev]);
            setShowUserModal(false);
            form.reset();
        } else { Swal.fire('Error!', result.error, 'error'); }
    } catch (err: any) { Swal.fire('Error!', err.message, 'error'); }
    finally { setIsCreatingUser(false) }
  }

  // ৩. আইডেন্টিটি সেভ (লোগো URL সহ)
  const handleSaveIdentity = async () => {
    setIsSaving(true)
    const result = await updateSystemConfig({ siteName, siteSubtitle, siteLogo })
    if (result.success) Swal.fire('Updated!', 'Site identity updated.', 'success')
    else Swal.fire('Error!', result.error, 'error')
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] pb-20 p-4 md:p-8 text-[var(--color-text-primary)]">
      
   

      <div className="bg-[var(--color-bg-card)] p-8 md:p-12 rounded-[48px] border border-[var(--color-border-light)] min-h-[600px] shadow-sm">
        <AnimatePresence mode="wait">
          
          {/* ট্যাব ১: ইউজার লিস্ট */}
          {activeTab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-3xl font-black tracking-tight">System Admins</h3>
                        <p className="text-sm text-slate-400">Total {users.length} super admin accounts active.</p>
                    </div>
                    <button onClick={() => setShowUserModal(true)} className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"><Plus size={18} /> Add User</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-[var(--color-border-light)]">
                            {loading ? (
                              <tr><td className="py-20 text-center"><Loader2 size={32} className="animate-spin mx-auto text-blue-600" /></td></tr>
                            ) : users.map((user) => (
                                <tr key={user.id} className="group hover:bg-[var(--color-bg-page)]/50 transition-all">
                                    <td className="py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">{user.name?.charAt(0)}</div>
                                            <div><p className="font-black text-base">{user.name}</p><p className="text-xs text-slate-400">{user.email}</p></div>
                                        </div>
                                    </td>
                                    <td className="py-8"><span className="px-4 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-[10px] font-black uppercase tracking-widest">{user.role}</span></td>
                                    <td className="py-8 text-right">
                                        <button onClick={() => handleDeleteUser(user)} className="p-4 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100">
                                            <Trash2 size={20}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
          )}

          {/* ট্যাব ২: সাইট কনফিগ */}
          {activeTab === 'config' && (
            <motion.div key="config" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Platform Name</label>
                        <input value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full px-8 py-5 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-3xl font-black outline-none focus:border-blue-500 shadow-sm" />
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Subtitle</label>
                        <input value={siteSubtitle} onChange={e => setSiteSubtitle(e.target.value)} className="w-full px-8 py-5 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-3xl font-black outline-none focus:border-blue-500 shadow-sm" />
                    </div>
                </div>

                <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">System Logo Configuration</label>
                    <div className="flex flex-col md:flex-row items-center gap-10 p-10 bg-[var(--color-bg-page)] border-2 border-dashed border-[var(--color-border-light)] rounded-[40px] group hover:border-blue-500/30 transition-all">
                        <div className="size-24 rounded-3xl bg-white flex items-center justify-center shadow-lg border overflow-hidden">
                            {siteLogo ? <img src={siteLogo} alt="Logo" className="w-full h-full object-contain" /> : <Save className="text-slate-200" size={32}/>}
                        </div>
                        <div className="flex-1 space-y-4 w-full">
                            <p className="text-lg font-black tracking-tight">Master Site Logo URL</p>
                            <div className="relative">
                                <LinkIcon size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input value={siteLogo} onChange={e => setSiteLogo(e.target.value)} placeholder="https://example.com/logo.png" className="w-full pl-14 pr-8 py-4 bg-white border border-[var(--color-border-light)] rounded-2xl font-medium text-sm outline-none focus:border-blue-500 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={handleSaveIdentity} disabled={isSaving} className="flex items-center gap-3 bg-blue-600 text-white px-12 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                    {isSaving ? <Loader2 className="animate-spin" size={20}/> : <ShieldCheck size={20} />}
                    Save Identity Settings
                </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* --- ADD USER MODAL --- */}
      <AnimatePresence>
        {showUserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-lg">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[var(--color-bg-card)] w-full max-w-lg rounded-[48px] p-12 relative border border-[var(--color-border-light)] shadow-2xl">
                  <button onClick={() => setShowUserModal(false)} className="absolute right-10 top-10 text-slate-400 hover:rotate-90 transition-all hover:text-black duration-300"><X size={28}/></button>
                  <h4 className="text-3xl font-black mb-10 tracking-tight">Provision Admin</h4>
                  <form onSubmit={handleAddUserSubmit} className="space-y-6">
                      <input name="name" required placeholder="Full Name" className="w-full px-8 py-5 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-3xl font-black outline-none focus:border-blue-500 transition-all" />
                      <input name="email" required type="email" placeholder="Email Address" className="w-full px-8 py-5 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-3xl font-black outline-none focus:border-blue-500 transition-all" />
                      <input name="password" type="password" placeholder="Password" className="w-full px-8 py-5 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-3xl font-black outline-none focus:border-blue-500 transition-all" />
                      <button disabled={isCreatingUser} type="submit" className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl">
                        {isCreatingUser ? <Loader2 className="animate-spin mx-auto" size={24}/> : "Grant System Access"}
                      </button>
                  </form>
              </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

// আইকন ইমপোর্ট মিসিং ছিল তাই এখানে ডিফাইন করে দিচ্ছি
function ShieldCheck({ size = 20 }) { return <Globe size={size} /> }