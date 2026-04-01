"use client"

import React, { useState, useEffect } from 'react'
import { Loader2, Plus, Trash2, X, User as UserIcon, Users, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2'
import { 
    getSuperAdminUsers, createSuperAdmin, 
    deleteSuperAdmin
} from '@/app/actions/superadmin'

export default function SuperAdminProfileControl() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showUserModal, setShowUserModal] = useState(false)
  const [isCreatingUser, setIsCreatingUser] = useState(false)

  const init = async () => {
    try {
      setLoading(true)
      const userRes = await getSuperAdminUsers()
      if (userRes?.success) {
        setUsers(userRes.data || [])
      }
    } catch (err) {
      console.error("Initialization error:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] pb-20 p-4 md:p-8 text-[var(--color-text-primary)]">
      
      <div className="bg-[var(--color-bg-card)] p-8 md:p-12 rounded-[48px] border border-[var(--color-border-light)] min-h-[600px] shadow-sm">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
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
                          <tr><td className="py-20 text-center"><Loader2 size={32} className="animate-spin mx-auto text-blue-600 mb-2" /><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Admins...</p></td></tr>
                        ) : users.length > 0 ? (
                           users.map((user) => (
                            <tr key={user.id} className="group hover:bg-[var(--color-bg-page)]/50 transition-all">
                                <td className="py-8">
                                    <div className="flex items-center gap-4">
                                        <div className="size-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            {user.name?.charAt(0) || <UserIcon size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-black text-base">{user.name}</p>
                                            <p className="text-xs text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-8">
                                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-8 text-right">
                                    <button onClick={() => handleDeleteUser(user)} className="p-4 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100">
                                        <Trash2 size={20}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td className="py-20 text-center">
                                    <div className="flex flex-col items-center gap-2 text-slate-300">
                                        <Users size={48} className="opacity-20" />
                                        <p className="font-bold">No Super Admins Found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
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
function ShieldCheck({ size = 20 }: { size?: number }) { return <Globe size={size} /> }