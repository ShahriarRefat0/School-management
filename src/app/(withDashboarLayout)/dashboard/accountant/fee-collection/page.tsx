"use client";

import { useState } from "react";
import {
  Search,
  Receipt,
  Printer,
  DollarSign,
} from "lucide-react";

const students = [
  {
    id: "ST-1001",
    name: "Rahim Ahmed",
    class: "Class 10",
    roll: "12",
    monthlyFee: 2000,
    examFee: 1000,
    admissionFee: 500,
    paid: 1500,
  },
  {
    id: "ST-1002",
    name: "Karim Hasan",
    class: "Class 9",
    roll: "7",
    monthlyFee: 1800,
    examFee: 900,
    admissionFee: 400,
    paid: 1000,
  },
  {
    id: "ST-1003",
    name: "Sakib Islam",
    class: "Class 8",
    roll: "5",
    monthlyFee: 1500,
    examFee: 800,
    admissionFee: 300,
    paid: 500,
  },
];

export default function FeeCollectionPage() {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Fee Collection
        </h1>
        <p className="text-sm text-slate-500">
          Manage student payments and dues
        </p>
      </div>

      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">

            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-blue-50/40">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Class / Roll
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Monthly Fee
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Exam Fee
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Admission
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Total Fee
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Paid
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Due
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, idx) => {
                const total =
                  student.monthlyFee +
                  student.examFee +
                  student.admissionFee;

                const due = total - student.paid;

                return (
                  <tr
                    key={student.id}
                    className="hover:bg-blue-50/30 transition-all duration-300"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {student.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          ID: {student.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700">
                      {student.class} • Roll {student.roll}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      ৳ {student.monthlyFee}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      ৳ {student.examFee}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      ৳ {student.admissionFee}
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      ৳ {total}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">
                      ৳ {student.paid}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-bold bg-red-100 text-red-700 rounded-full border border-red-200">
                        ৳ {due}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-lg hover:shadow-md transition">
                          <Receipt size={14} className="inline mr-1" />
                          Pay
                        </button>

                        <button className="px-3 py-1.5 border border-slate-200 text-xs font-semibold rounded-lg hover:bg-slate-50 transition">
                          <Printer size={14} className="inline mr-1" />
                          Print
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}