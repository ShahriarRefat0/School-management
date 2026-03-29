"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  ChevronDown,
  Loader2,
  FileText,
  CreditCard,
  User,
  Tag
} from "lucide-react";
import { getAccountantHistory } from "@/app/actions/accountant/history";
import toast from "react-hot-toast";

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    type: "All",
    status: "All",
    search: ""
  });

  useEffect(() => {
    loadHistory();
  }, [filters.type, filters.status]);

  const loadHistory = async () => {
    setIsLoading(true);
    const res = await getAccountantHistory(filters);
    if (res.success) {
      setHistory(res.data || []);
    } else {
      toast.error(res.error || "Failed to load history");
    }
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadHistory();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Audit Trail</h1>
          <p className="text-sm text-slate-500 font-medium">Complete financial history for your school</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
            <FileText size={18} />
            Generate Report
          </button>
        </div>
      </div>

      {/* Filters Card */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-sm">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by student, ID, or title..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all cursor-pointer"
            >
              <option value="All">All Transactions</option>
              <option value="Payment">Income (Fees)</option>
              <option value="Expense">Outcome (Expenses)</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full pl-12 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-blue-500/10 appearance-none transition-all cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="SUCCESS">Success / Paid</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all active:scale-[0.98]"
          >
            Apply Filters
          </button>
        </form>
      </div>

      {/* History Table */}
      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Date</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Source / Category</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <Loader2 className="animate-spin text-blue-600 mx-auto mb-2" size={32} />
                    <p className="text-sm font-bold text-slate-400">Loading audit trail...</p>
                  </td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-slate-400">
                    No transactions found matching your filters.
                  </td>
                </tr>
              ) : (
                history.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{new Date(item.date).toLocaleDateString()}</span>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                          item.type === "Income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        )}>
                          {item.type === "Income" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none mb-1">{item.title}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.subText}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                       <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">{item.source}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                       <span className={cn(
                         "text-sm font-black",
                         item.type === "Income" ? "text-emerald-600" : "text-rose-600"
                       )}>
                         {item.type === "Income" ? "+" : "-"} Tk {item.amount.toLocaleString()}
                       </span>
                    </td>
                    <td className="px-8 py-4">
                       <span className={cn(
                         "px-3 py-1.5 text-[10px] font-black rounded-full border uppercase tracking-wider",
                         item.status === "SUCCESS" && "bg-emerald-50 text-emerald-700 border-emerald-100",
                         item.status === "PENDING" && "bg-amber-50 text-amber-700 border-amber-100",
                         item.status === "FAILED" && "bg-rose-50 text-rose-700 border-rose-100"
                       )}>
                         {item.status}
                       </span>
                    </td>
                    <td className="px-8 py-4">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.method}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-slate-400 tracking-wide uppercase">
              Showing <span className="text-slate-900">{history.length}</span> most recent entries
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-400 bg-white cursor-not-allowed">Previous</button>
              <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-400 bg-white cursor-not-allowed">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
