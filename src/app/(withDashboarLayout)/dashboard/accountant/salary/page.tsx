"use client";

import { useState } from "react";
import { Search, Wallet, CheckCircle2, Clock } from "lucide-react";

const teachers = [
  {
    id: "T-1001",
    name: "Mr. Hasan",
    subject: "Mathematics",
    monthlySalary: 25000,
    paymentDate: "05 Feb, 2026",
    status: "Paid",
  },
  {
    id: "T-1002",
    name: "Ms. Rahman",
    subject: "Physics",
    monthlySalary: 23000,
    paymentDate: "-",
    status: "Unpaid",
  },
  {
    id: "T-1003",
    name: "Mr. Karim",
    subject: "English",
    monthlySalary: 22000,
    paymentDate: "03 Feb, 2026",
    status: "Paid",
  },
];

export default function SalaryManagementPage() {
  const [search, setSearch] = useState("");

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Salary Management
        </h1>
        <p className="text-sm text-slate-500">
          Manage teacher salaries and payment history
        </p>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search teacher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Salary Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">

            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-blue-50/40">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Teacher
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Monthly Salary
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Payment Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="hover:bg-blue-50/30 transition-all duration-300"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">
                      {teacher.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      ID: {teacher.id}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {teacher.subject}
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-slate-900">
                    ৳ {teacher.monthlySalary}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {teacher.paymentDate}
                  </td>

                  <td className="px-6 py-4">
                    {teacher.status === "Paid" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                        <CheckCircle2 size={12} />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-orange-100 text-orange-700 rounded-full border border-orange-200">
                        <Clock size={12} />
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {teacher.status === "Unpaid" ? (
                      <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-lg hover:shadow-md transition">
                        <Wallet size={14} className="inline mr-1" />
                        Pay Salary
                      </button>
                    ) : (
                      <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg text-slate-500 cursor-not-allowed">
                        Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}