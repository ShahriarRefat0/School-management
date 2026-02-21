"use client"

import React from "react"
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react"

const stats = [
  { title: "Total Days", value: "140", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Present", value: "128", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
  { title: "Absent", value: "8", icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  { title: "Late", value: "4", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
]

const attendanceHistory = [
  { id: 1, date: "17 Feb, 2026", status: "Present", in: "08:15 AM", out: "02:30 PM", remarks: "On Time" },
  { id: 2, date: "16 Feb, 2026", status: "Late", in: "08:45 AM", out: "02:30 PM", remarks: "Traffic Issue" },
  { id: 3, date: "15 Feb, 2026", status: "Present", in: "08:10 AM", out: "02:30 PM", remarks: "-" },
  { id: 4, date: "14 Feb, 2026", status: "Absent", in: "-", out: "-", remarks: "Sick Leave" },
  { id: 5, date: "13 Feb, 2026", status: "Present", in: "08:20 AM", out: "02:30 PM", remarks: "-" },
]

export default function AttendancePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Attendance Record</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-medium">{item.title}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{item.value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${item.bg}`}>
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-semibold text-slate-800">Monthly Report (February 2026)</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors">
            Download Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceHistory.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{row.date}</td>
                  <td className="px-6 py-4">
                    <span className={`
                                            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                                            ${row.status === "Present" ? "bg-green-100 text-green-700" :
                        row.status === "Absent" ? "bg-red-100 text-red-700" :
                          "bg-amber-100 text-amber-700"}
                                        `}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5
                                                ${row.status === "Present" ? "bg-green-500" :
                          row.status === "Absent" ? "bg-red-500" :
                            "bg-amber-500"}
                                            `}></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.in}</td>
                  <td className="px-6 py-4">{row.out}</td>
                  <td className="px-6 py-4 text-slate-400">{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}