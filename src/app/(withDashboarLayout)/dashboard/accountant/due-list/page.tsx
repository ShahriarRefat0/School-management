"use client";

import { useState } from "react";
import { Search, Filter, AlertCircle } from "lucide-react";

const dueStudents = [
  {
    id: "ST-1001",
    name: "Rahim Ahmed",
    class: "Class 10",
    roll: "12",
    month: "February",
    totalFee: 3500,
    paid: 1500,
    dueDays: 12,
  },
  {
    id: "ST-1002",
    name: "Karim Hasan",
    class: "Class 9",
    roll: "7",
    month: "February",
    totalFee: 3000,
    paid: 1000,
    dueDays: 20,
  },
  {
    id: "ST-1003",
    name: "Sakib Islam",
    class: "Class 8",
    roll: "5",
    month: "January",
    totalFee: 2600,
    paid: 500,
    dueDays: 35,
  },
];

export default function DueListPage() {
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");

  const filtered = dueStudents.filter((student) => {
    const matchSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchClass =
      selectedClass === "All" || student.class === selectedClass;

    const matchMonth =
      selectedMonth === "All" || student.month === selectedMonth;

    return matchSearch && matchClass && matchMonth;
  });

  return (
   <div className="space-y-6">

  {/* Header */}
  <div>
    <h1 className="text-xl sm:text-2xl font-bold text-[--color-text-primary]">
      Student Due List
    </h1>
    <p className="text-xs sm:text-sm text-[--color-text-muted]">
      Track students with pending fee payments
    </p>
  </div>

  {/* Filters */}
  <div className="bg-[--color-bg-card] border border-border-light rounded-2xl p-3 sm:p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

      {/* Search */}
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[--color-text-muted]"
          size={18}
        />
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-transparent border border-border-light rounded-xl text-sm text-[--color-text-secondary] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Class Filter */}
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="px-3 py-2 bg-transparent border border-border-light rounded-xl text-sm text-[--color-text-secondary] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <option>All</option>
        <option>Class 10</option>
        <option>Class 9</option>
        <option>Class 8</option>
      </select>

      {/* Month Filter */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="px-3 py-2 bg-transparent border border-border-light rounded-xl text-sm text-[--color-text-secondary] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <option>All</option>
        <option>January</option>
        <option>February</option>
      </select>

    </div>
  </div>

  {/* Due Table */}
  <div className="bg-[--color-bg-card] border border-border-light rounded-2xl overflow-hidden shadow-sm">

    {/* Mobile scroll fix */}
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px]">

        {/* Header */}
        <thead>
          <tr className="bg-bg-card">
            {[
              "Student",
              "Class / Roll",
              "Month",
              "Total Fee",
              "Paid",
              "Due",
              "Due Days",
              "Status",
            ].map((item) => (
              <th
                key={item}
                className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-bold text-[--color-text-muted] uppercase"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y border border-border-light">
          {filtered.map((student) => {
            const due = student.totalFee - student.paid;

            return (
              <tr
                key={student.id}
                className="hover:bg-[--color-bg-page] transition-all duration-300"
              >
                <td className="px-4 sm:px-6 py-4">
                  <p className="text-sm font-bold text-[--color-text-primary]">
                    {student.name}
                  </p>
                  <p className="text-xs text-[--color-text-muted]">
                    ID: {student.id}
                  </p>
                </td>

                <td className="px-4 sm:px-6 py-4 text-sm text-[--color-text-secondary]">
                  {student.class} • Roll {student.roll}
                </td>

                <td className="px-4 sm:px-6 py-4 text-sm text-[--color-text-secondary]">
                  {student.month}
                </td>

                <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-[--color-text-primary]">
                  ৳ {student.totalFee}
                </td>

                <td className="px-4 sm:px-6 py-4 text-sm font-semibold text-emerald-500">
                  ৳ {student.paid}
                </td>

                <td className="px-4 sm:px-6 py-4">
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                    ৳ {due}
                  </span>
                </td>

                <td className="px-4 sm:px-6 py-4 text-sm text-[--color-text-secondary]">
                  {student.dueDays} days
                </td>

                <td className="px-4 sm:px-6 py-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
                    <AlertCircle size={12} />
                    Pending
                  </span>
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