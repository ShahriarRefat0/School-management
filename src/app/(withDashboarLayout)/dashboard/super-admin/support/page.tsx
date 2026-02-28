'use client';
import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Clock,
  User,
  CheckCircle2,
  X,
  Eye,
  Calendar,
  Image as ImageIcon,
  ExternalLink,
  Trash2,
  School,
  Loader2,
} from 'lucide-react';
import {
  getAllSupportTickets,
  updateTicketStatus,
  deleteTicket,
} from '@/app/actions/principle/support';

export default function ActivityHelpDesk() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);

  // টিকেট লোড করার ফাংশন
  const loadTickets = async () => {
    setLoading(true);
    const result = await getAllSupportTickets();
    if (result.success) setActivities(result.data);
    setLoading(false);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  // স্ট্যাটাস আপডেট হ্যান্ডলার
  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    setUpdating(true);
    let nextStatus = currentStatus === 'open' ? 'reviewing' : 'completed';
    const result = await updateTicketStatus(id, nextStatus);
    if (result.success) {
      setActivities((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)),
      );
      setSelectedTicket((prev: any) =>
        prev ? { ...prev, status: nextStatus } : null,
      );
    }
    setUpdating(false);
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;
    const result = await deleteTicket(id);
    if (result.success) {
      setActivities((prev) => prev.filter((t) => t.id !== id));
      if (selectedTicket?.id === id) setSelectedTicket(null);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center font-black animate-pulse text-primary flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        INITIALIZING COMMAND CENTER...
      </div>
    );

  return (
    <div className="space-y-8 animate-fade-in-up p-2 md:p-0">
      {/* --- Header --- */}
      <div className="bg-[var(--color-bg-card)] p-8 rounded-[32px] border border-[var(--color-border-light)] shadow-sm">
        <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight uppercase">
          Support <span className="text-primary">Tickets</span>
        </h2>
        <p className="text-[var(--color-text-muted)] mt-1 font-bold text-xs uppercase tracking-widest">
          Active: {activities.filter((t) => t.status !== 'completed').length} |
          Resolved: {activities.filter((t) => t.status === 'completed').length}
        </p>
      </div>

      {/* --- Desktop/Tablet Table --- */}
      <div className="bg-[var(--color-bg-card)] rounded-[32px] border border-[var(--color-border-light)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-page)]/50 border-b border-[var(--color-border-light)]">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                  Subject
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                  Priority
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                  Status
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {activities.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-primary/[0.02] transition-colors group"
                >
                  <td className="p-6">
                    <p className="font-black text-[var(--color-text-primary)] group-hover:text-primary transition-colors">
                      {item.subject}
                    </p>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase mt-1">
                      ID: #{item.id.slice(-6)}
                    </p>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ${item.priority === 'high' ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${item.status === 'completed' ? 'bg-emerald-500' : item.status === 'reviewing' ? 'bg-amber-500 animate-pulse' : 'bg-blue-500'}`}
                      />
                      <span className="text-[10px] font-black uppercase tracking-tighter">
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => setSelectedTicket(item)}
                        className="p-2 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-white transition-all"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Detail Modal --- */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[var(--color-bg-card)] w-full max-w-4xl rounded-[40px] border border-[var(--color-border-light)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-up">
            {/* Modal Header */}
            <div className="p-6 border-b border-[var(--color-border-light)] flex justify-between items-center bg-primary/5">
              <h3 className="font-black text-xl uppercase tracking-tight flex items-center gap-3">
                <Eye className="text-primary" /> Ticket Details
              </h3>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 hover:bg-rose-500/10 text-rose-500 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Info Side */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-black text-primary leading-tight mb-4 uppercase">
                      {selectedTicket.subject}
                    </h2>
                    <div className="bg-[var(--color-bg-page)] p-6 rounded-2xl border border-[var(--color-border-light)] italic font-medium">
                      "{selectedTicket.description}"
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm font-bold bg-[var(--color-bg-page)] p-4 rounded-xl border border-[var(--color-border-light)]">
                      <School className="text-primary" size={18} />
                      <span className="text-[var(--color-text-muted)] uppercase text-[10px]">
                        School ID:
                      </span>
                      <span className="text-primary uppercase tracking-widest">
                        {selectedTicket.schoolId || 'NOT_SPECIFIED'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold bg-[var(--color-bg-page)] p-4 rounded-xl border border-[var(--color-border-light)]">
                      <User className="text-primary" size={18} />
                      <span className="text-[var(--color-text-muted)] uppercase text-[10px]">
                        From:
                      </span>
                      <span>{selectedTicket.userEmail}</span>
                    </div>
                  </div>
                </div>

                {/* Attachment Side */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">
                    Screenshot Attachment
                  </p>
                  {selectedTicket.attachmentUrl ? (
                    <div className="relative group rounded-3xl overflow-hidden border-2 border-[var(--color-border-light)] bg-black h-[280px]">
                      <img
                        src={selectedTicket.attachmentUrl}
                        alt="Screenshot"
                        className="w-full h-full object-contain"
                      />
                      <a
                        href={selectedTicket.attachmentUrl}
                        target="_blank"
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-black text-xs gap-2"
                      >
                        <ExternalLink size={18} /> VIEW FULL SIZE
                      </a>
                    </div>
                  ) : (
                    <div className="h-[280px] border-2 border-dashed border-[var(--color-border-light)] rounded-3xl flex flex-col items-center justify-center bg-[var(--color-bg-page)]">
                      <ImageIcon size={40} className="opacity-10 mb-2" />
                      <p className="text-[10px] font-black uppercase opacity-30 tracking-widest">
                        No Image
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-8 border-t border-[var(--color-border-light)]">
              {selectedTicket.status !== 'completed' ? (
                <button
                  disabled={updating}
                  onClick={() =>
                    handleStatusUpdate(selectedTicket.id, selectedTicket.status)
                  }
                  className="w-full bg-primary text-white py-5 rounded-[24px] font-black uppercase tracking-[2px] text-xs hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {updating ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 size={18} />{' '}
                      {selectedTicket.status === 'open'
                        ? 'Start Reviewing'
                        : 'Mark Completed'}
                    </>
                  )}
                </button>
              ) : (
                <div className="w-full bg-emerald-500/10 text-emerald-600 py-5 rounded-[24px] font-black uppercase text-xs text-center border border-emerald-500/20">
                  Resolved Ticket
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
