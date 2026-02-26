"use client";

import { useState } from 'react';
import { useRoleGuard } from '@/hooks/useRoleGurad';
import {
  Users,
  UserCheck,
  UserPlus,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  GraduationCap
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import AddStudentModal from './AddStudentModal';

const stats = [
  {
    title: "Total Students",
    value: "1,284",
    subtitle: "+12.5% from last year",
    icon: Users,
    colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
  },
  {
    title: "Active Now",
    value: "942",
    subtitle: "Currently on campus",
    icon: UserCheck,
    colorClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
  },
  {
    title: "New Enrollments",
    value: "156",
    subtitle: "This academic session",
    icon: UserPlus,
    colorClass: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400"
  },
  {
    title: "Avg. Attendance",
    value: "94.2%",
    subtitle: "Last 30 days",
    icon: TrendingUp,
    colorClass: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
  },
];

const enrollmentData = [
  { year: '2020', students: 850 },
  { year: '2021', students: 940 },
  { year: '2022', students: 1050 },
  { year: '2023', students: 1180 },
  { year: '2024', students: 1284 },
];

const initialStudents = [
  { id: "STU001", name: "Zahirul Islam", class: "X", section: "A", roll: "01", status: "Active" },
  { id: "STU002", name: "Rahat Ahmed", class: "X", section: "A", roll: "02", status: "Active" },
  { id: "STU003", name: "Nusrat Jahan", class: "IX", section: "B", roll: "15", status: "Active" },
  { id: "STU004", name: "Kamrul Hasan", class: "VIII", section: "C", roll: "08", status: "Active" },
  { id: "STU005", name: "Sadiya Afrin", class: "X", section: "B", roll: "22", status: "Active" },
];

export default function StudentsPage() {
  const { loading } = useRoleGuard("admin");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [students, setStudents] = useState(initialStudents);

  if (loading) return <p className="p-6">Loading.......</p>;

  // Add student to table (simulate form submission)
  const handleAddStudent = (newStudent: typeof students[0]) => {
    setStudents([newStudent, ...students]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-primary" />
            Students Management
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Overview of student body, enrollments and directory.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            Add New Student
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-bg-card p-6 rounded-xl border border-border-light shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.colorClass}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{stat.title}</h3>
            <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Trends & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-bg-card p-6 rounded-xl border border-border-light">
          <h3 className="font-semibold text-text-primary mb-6">Enrollment Growth Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.1)" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-primary)' }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="var(--color-primary)"
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-bg-card p-6 rounded-xl border border-border-light">
          <h3 className="font-semibold text-text-primary mb-6">Student Breakdown</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-muted">Primary (I - V)</span>
                <span className="font-medium text-text-primary">420 Students</span>
              </div>
              <div className="w-full bg-bg-page rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-muted">High School (VI - X)</span>
                <span className="font-medium text-text-primary">650 Students</span>
              </div>
              <div className="w-full bg-bg-page rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '51%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-muted">College (XI - XII)</span>
                <span className="font-medium text-text-primary">214 Students</span>
              </div>
              <div className="w-full bg-bg-page rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-border-light">
              <p className="text-xs text-text-muted italic">
                * Based on current academic session enrollment data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
        <div className="p-6 border-b border-border-light flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-semibold text-text-primary">Recent Enrollments</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-9 pr-4 py-2 bg-bg-page border border-border-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
              />
            </div>
            <button className="p-2 border border-border-light rounded-lg text-text-muted hover:bg-bg-page transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-bg-page/50 text-text-muted uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Section/Roll</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-bg-page/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{student.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-text-primary">{student.name}</div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">{student.class}</td>
                  <td className="px-6 py-4 text-text-muted">{student.section} / {student.roll}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 text-[10px] font-bold">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-bg-page rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-text-muted" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-border-light text-center">
          <button className="text-sm text-primary font-medium hover:underline">
            View All Students
          </button>
        </div>
      </div>

      {/* Modal */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}