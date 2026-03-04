"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  Calendar,
  Tag,
  DollarSign,
  FileText,
  Trash2,
  Edit2,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Reusing the Card component pattern with theme variables
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-bg-card rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const MOCK_EXPENSES = [
  {
    id: "EXP-001",
    title: "Electricity Bill - Jan",
    category: "Utility",
    amount: "৳ 12,500",
    date: "15 Feb, 2026",
    status: "Paid",
    addedBy: "Admin",
  },
  {
    id: "EXP-002",
    title: "Internet Subscription",
    category: "Utility",
    amount: "৳ 3,000",
    date: "10 Feb, 2026",
    status: "Paid",
    addedBy: "Fin-Controller",
  },
  {
    id: "EXP-003",
    title: "School Building Maintenance",
    category: "Maintenance",
    amount: "৳ 45,000",
    date: "05 Feb, 2026",
    status: "Pending",
    addedBy: "Super Admin",
  },
  {
    id: "EXP-004",
    title: "Sports Day Equipment",
    category: "Event",
    amount: "৳ 25,000",
    date: "01 Feb, 2026",
    status: "Paid",
    addedBy: "Admin",
  },
  {
    id: "EXP-005",
    title: "Office Stationery",
    category: "Others",
    amount: "৳ 5,500",
    date: "28 Jan, 2026",
    status: "Paid",
    addedBy: "Accountant",
  },
];

const CATEGORIES = ["Utility", "Maintenance", "Event", "Rent", "Others"];

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Expense Management</h1>
          <p className="text-sm text-text-muted">Track and manage all school expenditures</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-border-light rounded-xl text-sm font-medium text-text-secondary hover:bg-bg-page transition-all shadow-sm">
            <Download size={18} />
            Export CSV
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20"
          >
            <Plus size={18} />
            Add Expense
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Total Monthly Expense</p>
            <h3 className="text-xl font-bold text-text-primary">৳ 1,85,000</h3>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Tag size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Highest Category</p>
            <h3 className="text-xl font-bold text-text-primary">Maintenance</h3>
          </div>
        </Card>
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Invoices Processed</p>
            <h3 className="text-xl font-bold text-text-primary">24 Items</h3>
          </div>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border-light flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bg-page/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input
              type="text"
              placeholder="Search expenses..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-bg-card border border-border-light text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-bg-card border border-border-light rounded-lg text-sm text-text-secondary hover:bg-bg-page transition-all">
              <Filter size={16} />
              Category
              <ChevronDown size={14} />
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-bg-card border border-border-light rounded-lg text-sm text-text-secondary hover:bg-bg-page transition-all">
              <Calendar size={16} />
              Date Range
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-page/80 text-text-secondary border-b border-border-light">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider">Expense ID</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider">Title & Date</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {MOCK_EXPENSES.map((expense) => (
                <tr key={expense.id} className="hover:bg-bg-page/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                      {expense.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-text-primary">{expense.title}</span>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Calendar size={12} />
                        {expense.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${expense.category === 'Utility' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      expense.category === 'Maintenance' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                        expense.category === 'Event' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' :
                          'bg-slate-500/10 text-text-muted border-border-light'
                      }`}>
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-text-primary">{expense.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${expense.status === 'Paid'
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${expense.status === 'Paid' ? 'bg-emerald-500' : 'bg-rose-500'
                        }`} />
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-text-muted hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20 rounded-xl transition-all shadow-sm hover:shadow-md">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-text-muted hover:text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 rounded-xl transition-all shadow-sm hover:shadow-md">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 text-text-muted hover:text-text-primary hover:bg-bg-card border border-transparent hover:border-border-light rounded-xl transition-all shadow-sm hover:shadow-md">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-bg-page/50 border-t border-border-light flex items-center justify-between">
          <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Showing 5 of 128 items</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text-primary transition-all">Previous</button>
            <button className="px-3 py-1.5 bg-bg-card border border-border-light rounded-lg text-xs font-bold text-primary shadow-sm">1</button>
            <button className="px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text-primary transition-all">2</button>
            <button className="px-3 py-1.5 text-xs font-bold text-text-muted hover:text-text-primary transition-all">Next</button>
          </div>
        </div>
      </Card>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-bg-card rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-xl overflow-hidden border border-border-light flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-8 border-b border-border-light flex items-center justify-between bg-bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary tracking-tight">Add New Expense</h2>
                  <p className="text-[10px] text-text-muted mt-1 font-bold uppercase tracking-widest">Transaction Entry</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-page rounded-full transition-all border border-border-light shadow-sm"
                >
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Expense Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Monthly Electricity Bill"
                    className="w-full px-5 py-3.5 rounded-2xl bg-bg-page border border-border-light text-text-primary focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all placeholder:text-text-muted/40 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Category</label>
                    <div className="relative">
                      <select className="w-full px-5 py-3.5 rounded-2xl bg-bg-page border border-border-light text-text-primary focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer font-medium">
                        {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Amount (৳)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                      <input
                        type="number"
                        placeholder="0.00"
                        className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-bg-page border border-border-light text-text-primary focus:outline-none focus:border-primary transition-all font-bold placeholder:text-text-muted/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Transaction Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                    <input
                      type="date"
                      className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-bg-page border border-border-light text-text-primary focus:outline-none focus:border-primary transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Note (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Add any additional details..."
                    className="w-full px-5 py-4 rounded-2xl bg-bg-page border border-border-light text-text-primary focus:outline-none focus:border-primary transition-all resize-none placeholder:text-text-muted/40 font-medium"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest ml-1">Attachment</label>
                  <label className="p-8 bg-bg-page/50 border-2 border-border-light border-dashed rounded-3xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/5 hover:border-primary/40 transition-all group relative overflow-hidden min-h-[160px]">
                    <input type="file" className="hidden" onChange={handleFileChange} />
                    {selectedFile ? (
                      <div className="flex flex-col items-center gap-2 animate-in zoom-in-95 duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm text-primary">
                          <FileText size={24} />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-text-primary px-4 truncate max-w-[200px]">{selectedFile.name}</p>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedFile(null);
                            }}
                            className="text-[10px] text-rose-500 font-bold uppercase tracking-tight mt-1 hover:underline"
                          >
                            Remove File
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-2xl bg-bg-card border border-border-light flex items-center justify-center shadow-sm text-text-muted group-hover:text-primary transition-all">
                          <Download className="rotate-180" size={20} />
                        </div>
                        <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">Click to upload receipt</p>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-tight">PDF, JPG or PNG</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-8 bg-bg-page/50 border-t border-border-light flex items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 px-6 border border-border-light text-sm font-bold text-text-secondary rounded-2xl hover:bg-bg-card hover:shadow-sm transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-[2] py-4 px-6 bg-primary text-white text-sm font-bold rounded-2xl hover:opacity-95 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
                >
                  Save Expense
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
