"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Search, Filter, AlertCircle, Loader2 } from "lucide-react";
import { getDueStudents } from "@/app/actions/accountant/due-list";
import { getAccountantClasses } from "@/app/actions/accountant/fee";
import toast from "react-hot-toast";

export default function DueListPage() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [dueStudents, setDueStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    loadData();
  }, [selectedClass]);

  const loadData = async () => {
    setIsLoading(true);
    const [dueRes, classRes] = await Promise.all([
      getDueStudents({ classId: selectedClass }),
      getAccountantClasses()
    ]);

    if (dueRes.success) {
      setDueStudents(dueRes.data || []);
    } else {
      toast.error(dueRes.error || "Failed to load due list");
    }

    if (classRes.success) {
      setClasses(classRes.data || []);
    }
    setIsLoading(false);
  };

  const filtered = dueStudents.filter((student) => {
    const matchSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
      student.id.toLowerCase().includes(search.toLowerCase());

    const matchMonth =
      selectedMonth === "All" || student.month === selectedMonth;

    return matchSearch && matchMonth;
  });

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Preventing Hydration Mismatch
  if (!hasMounted) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
            Student Due Summary
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Comprehensive list of students with outstanding balances ({filtered.length})
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={isLoading}
          className="p-2 bg-bg-card border border-border-light hover:bg-bg-page rounded-xl transition-all disabled:opacity-50 shadow-sm"
        >
          {isLoading ? <Loader2 size={20} className="animate-spin text-text-secondary" /> : <Filter size={20} className="text-text-secondary" />}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-bg-card border border-border-light rounded-2xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              size={18}
            />
            <input
              type="text"
              placeholder="Search student or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg-page border border-border-light rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 bg-bg-page border border-border-light rounded-xl text-sm text-text-secondary focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
          >
            <option value="All">All Classes</option>
            {classes.map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>

          {/* Month Filter */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
          >
            <option value="All">All Months (Oldest Due)</option>
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Due Table */}
      <div className="bg-bg-card border border-border-light rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-page border-b border-border-light">
                <th className="px-6 py-4 text-left text-[10px] font-black text-text-muted uppercase tracking-widest">Student Info</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-text-muted uppercase tracking-widest">Class / Roll</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-text-muted uppercase tracking-widest">Pending Items</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-text-muted uppercase tracking-widest">Oldest Due</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-text-muted uppercase tracking-widest">Total Payable</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-text-muted uppercase tracking-widest">Due Days</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-text-muted uppercase tracking-widest">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-light">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <Loader2 className="animate-spin text-blue-600 mx-auto mb-2" size={32} />
                    <p className="text-sm font-bold text-slate-400">Loading due registry...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center text-slate-400">
                    No outstanding dues found.
                  </td>
                </tr>
              ) : (
                filtered.map((student, idx) => (
                  <tr key={student.dbId} className="hover:bg-bg-page/50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-text-primary group-hover:text-blue-600 transition-colors">{student.name}</p>
                      <p className="text-[10px] font-bold text-text-muted uppercase tracking-tighter">ID: {student.id}</p>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-text-secondary bg-bg-page px-2 py-1 rounded-md">
                        {student.class} • #{student.roll}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-text-secondary flex items-center gap-1">
                          <AlertCircle size={14} className="text-orange-500" />
                          {student.pendingCount} Items
                        </span>
                        <p className="text-[10px] text-text-muted font-medium truncate max-w-[150px]" title={student.categories}>
                          {student.categories}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-text-secondary">{student.month}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                        Tk {student.totalDue.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs font-bold text-text-muted">
                      {student.dueDays} Days Overdue
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] font-black bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-full border border-rose-500/20 uppercase tracking-wider">
                        Pending
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}