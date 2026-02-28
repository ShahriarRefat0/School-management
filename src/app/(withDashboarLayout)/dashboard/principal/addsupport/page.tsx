'use client';
import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  Send,
  AlertCircle,
  CheckCircle2,
  Plus,
  X,
  Trash2,
  Image as ImageIcon,
  Loader2,
  RotateCcw,
  Calendar,
  Hash,
  Activity,
  MessageSquare,
} from 'lucide-react';
import {
  createSupportTicket,
  getAllSupportTickets,
  deleteTicket,
} from '@/app/actions/principle/support';

export default function SupportDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    msg: string;
  } | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // টিকেট লোড করার ফাংশন
  const loadTickets = async () => {
    setLoading(true);
    const result = await getAllSupportTickets();
    if (result.success) setTickets(result.data);
    setLoading(false);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  // ইমেজ সিলেক্ট এবং প্রিভিউ হ্যান্ডলার
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => setImagePreview(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    const result = await deleteTicket(id);
    if (result.success) loadTickets();
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);

    const data = {
      subject: formData.get('subject') as string,
      description: formData.get('description') as string,
      priority: formData.get('priority') as string,
      userEmail: 'principal@test.com',
      image: imagePreview, // এটি এখন Base64 হিসেবে সার্ভারে যাবে এবং ImgBB-তে আপলোড হবে
    };

    const result = await createSupportTicket(data);

    if (result.success) {
      setStatus({ type: 'success', msg: 'Ticket created successfully!' });
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus(null);
        setImagePreview(null);
        loadTickets();
      }, 1500);
    } else {
      setStatus({ type: 'error', msg: result.error || 'Something went wrong' });
    }
    setFormLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up p-4 md:p-6 lg:p-0">
      {/* --- Header Section --- */}
      <div className="relative overflow-hidden bg-[var(--color-bg-card)] p-8 md:p-10 rounded-[40px] border border-[var(--color-border-light)] shadow-sm group">
        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
          <LifeBuoy size={120} />
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-[var(--color-text-primary)] tracking-tight uppercase">
              Support <span className="text-primary">Center</span>
            </h2>
            <p className="text-[var(--color-text-muted)] mt-2 font-medium max-w-md">
              আমাদের টিম আপনার সমস্যার সমাধানে প্রস্তুত। নিচে নতুন টিকেট তৈরি
              করুন।
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group/btn bg-primary hover:bg-black text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[2px] transition-all shadow-2xl shadow-primary/30 flex items-center gap-3 active:scale-95"
          >
            <Plus
              size={20}
              className="group-hover/btn:rotate-90 transition-transform"
            />
            Create Ticket
          </button>
        </div>
      </div>

      {/* --- Stats Section --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tickets', value: tickets.length, icon: Hash },
          {
            label: 'Pending',
            value: tickets.filter((t) => t.status === 'open').length,
            icon: Activity,
          },
          {
            label: 'Resolved',
            value: tickets.filter((t) => t.status === 'completed').length,
            icon: CheckCircle2,
          },
          { label: 'Last Activity', value: 'Today', icon: Calendar },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--color-bg-card)] p-5 rounded-3xl border border-[var(--color-border-light)] flex items-center gap-4"
          >
            <div className="p-3 bg-primary/5 rounded-2xl text-primary">
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-tighter">
                {stat.label}
              </p>
              <p className="text-lg font-black text-[var(--color-text-primary)]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Tickets Table --- */}
      <div className="bg-[var(--color-bg-card)] rounded-[32px] border border-[var(--color-border-light)] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--color-bg-page)]/50 border-b border-[var(--color-border-light)]">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                  Subject & Info
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] text-center">
                  Priority
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] text-center">
                  Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center">
                    <Loader2
                      className="animate-spin mx-auto text-primary"
                      size={40}
                    />
                  </td>
                </tr>
              ) : tickets.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-20 text-center font-bold text-[var(--color-text-muted)]"
                  >
                    No tickets found.
                  </td>
                </tr>
              ) : (
                tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-primary/[0.02] transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="hidden md:flex p-3 bg-[var(--color-bg-page)] rounded-2xl text-[var(--color-text-muted)]">
                          <MessageSquare size={18} />
                        </div>
                        <div>
                          <p className="font-black text-[var(--color-text-primary)] text-base group-hover:text-primary transition-colors">
                            {ticket.subject}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-[10px] font-bold text-[var(--color-text-muted)] uppercase italic">
                            <span>#{ticket.id.slice(-6).toUpperCase()}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar size={10} />{' '}
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${ticket.priority === 'high' ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-100 text-slate-500'}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-bg-page)] rounded-full border border-[var(--color-border-light)]">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'open' ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}
                        />
                        <span className="text-[10px] font-black uppercase tracking-tighter">
                          {ticket.status}
                        </span>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all active:scale-90"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-4xl bg-[var(--color-bg-card)] rounded-[40px] border border-[var(--color-border-light)] shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-[var(--color-border-light)] flex justify-between items-center bg-primary/5 shrink-0">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20">
                  <Plus size={24} />
                </div>
                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight">
                  New Support Ticket
                </h1>
              </div>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  removeImage();
                }}
                className="p-3 hover:bg-rose-500/10 text-rose-500 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-5 gap-10"
              >
                {/* Inputs (3/5) */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                      Issue Subject
                    </label>
                    <input
                      name="subject"
                      required
                      placeholder="কী নিয়ে সমস্যা?"
                      className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-page)] border border-[var(--color-border-light)] outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-[var(--color-text-primary)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                      Priority Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['low', 'medium', 'high'].map((p) => (
                        <label
                          key={p}
                          className="relative cursor-pointer group"
                        >
                          <input
                            type="radio"
                            name="priority"
                            value={p}
                            defaultChecked={p === 'low'}
                            className="peer hidden"
                          />
                          <div className="p-3 text-center rounded-xl border border-[var(--color-border-light)] bg-[var(--color-bg-page)] peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary font-black text-[10px] uppercase transition-all whitespace-nowrap">
                            {p}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--color-text-muted)] ml-1">
                      Details
                    </label>
                    <textarea
                      name="description"
                      rows={5}
                      required
                      placeholder="বিস্তারিত লিখুন..."
                      className="w-full px-6 py-4 rounded-2xl bg-[var(--color-bg-page)] border border-[var(--color-border-light)] outline-none resize-none font-medium text-[var(--color-text-primary)]"
                    />
                  </div>
                </div>

                {/* Image & Submit (2/5) */}
                <div className="lg:col-span-2 flex flex-col space-y-6">
                  <div className="flex flex-col flex-grow">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[var(--color-text-muted)] mb-3 italic">
                      Screenshot Preview
                    </label>
                    <div className="relative h-full min-h-[250px] lg:min-h-0">
                      {!imagePreview ? (
                        <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-[var(--color-border-light)] rounded-[32px] cursor-pointer bg-[var(--color-bg-page)] hover:bg-primary/5 transition-all group overflow-hidden">
                          <div className="flex flex-col items-center justify-center p-6 text-center">
                            <ImageIcon
                              size={32}
                              className="text-primary mb-2"
                            />
                            <p className="text-[10px] font-black uppercase tracking-widest">
                              Add Screenshot
                            </p>
                          </div>
                          <input
                            type="file"
                            name="image"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                      ) : (
                        <div className="relative group w-full h-full rounded-[32px] overflow-hidden border-2 border-primary/20 shadow-2xl">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                            <button
                              type="button"
                              onClick={removeImage}
                              className="p-4 bg-rose-500 text-white rounded-2xl active:scale-90"
                            >
                              <Trash2 size={24} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    disabled={formLoading}
                    type="submit"
                    className="w-full bg-primary text-white py-6 rounded-[28px] font-black text-xs uppercase tracking-[3px] hover:bg-black transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {formLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <Send size={18} /> Submit Ticket
                      </>
                    )}
                  </button>
                </div>
              </form>

              {status && (
                <div
                  className={`mt-8 p-5 rounded-2xl flex items-center gap-4 animate-fade-in-down ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'}`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 size={22} />
                  ) : (
                    <AlertCircle size={22} />
                  )}
                  <p className="text-[11px] font-black uppercase tracking-tight">
                    {status.msg}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
