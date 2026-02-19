'use client';

import {
  TrendingUp,
  Users,
  CalendarCheck,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ---------------- KPI Card ---------------- */
const StatCard = ({ title, value, desc, icon: Icon }: any) => (
  <div className="bg-bg-card p-6 rounded-xl border border-border-light">
    <div className="flex items-center justify-between mb-4">
      <Icon className="text-primary" />
      <TrendingUp className="text-emerald-400" size={16} />
    </div>
    <h3 className="text-sm text-text-muted">{title}</h3>
    <p className="text-2xl font-bold text-text-primary">{value}</p>
    <p className="text-xs text-text-muted mt-1">{desc}</p>
  </div>
);

/* ---------------- Page ---------------- */
export default function PrincipalDashboard() {
  /* KPI Data */
  const stats = [
    {
      title: 'Student Performance Index',
      value: '82.4%',
      desc: 'Up 3.1% from last quarter',
      icon: TrendingUp,
    },
    {
      title: 'Teacher Engagement Score',
      value: '91 / 100',
      desc: 'Highest this academic year',
      icon: Users,
    },
    {
      title: 'Average Attendance Rate',
      value: '94.2%',
      desc: 'Stable over 4 weeks',
      icon: CalendarCheck,
    },
    {
      title: 'Revenue vs Target',
      value: '87%',
      desc: '৳2.1L pending collection',
      icon: CreditCard,
    },
  ];

  /* Line Chart */
  const performanceData = [
    { month: 'Aug', score: 74 },
    { month: 'Sep', score: 76 },
    { month: 'Oct', score: 78 },
    { month: 'Nov', score: 77 },
    { month: 'Dec', score: 80 },
    { month: 'Jan', score: 82 },
    { month: 'Feb', score: 82.4 },
  ];

  /* Bar Chart */
  const attendanceData = [
    { class: 'VI', rate: 96 },
    { class: 'VII', rate: 93 },
    { class: 'VIII', rate: 91 },
    { class: 'IX', rate: 95 },
    { class: 'X', rate: 89 },
    { class: 'XI', rate: 94 },
    { class: 'XII', rate: 97 },
  ];

  /* Pie Chart */
  const feeData = [
    { name: 'Collected', value: 74, color: '#22c55e' },
    { name: 'Pending', value: 18, color: '#facc15' },
    { name: 'Overdue', value: 8, color: '#ef4444' },
  ];

  /* Approvals */
  const approvals = [
    {
      title: 'Monthly Performance Report — January',
      type: 'Report',
    },
    {
      title: 'Annual Day Announcement Draft',
      type: 'Announcement',
    },
    {
      title: 'Q3 Fee Summary for Board Review',
      type: 'Finance',
    },
  ];

  return (
    <div className="space-y-8 p-6 bg-bg-page min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">
          Principal Dashboard
        </h1>
        <p className="text-sm text-text-muted">
          School performance overview & insights
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-bg-card p-6 rounded-xl border border-border-light">
          <h3 className="font-semibold text-text-primary mb-4">
            School Performance Trend
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.2)" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis domain={[70, 90]} stroke="#94a3b8" />
                <Tooltip />
                <Line
                  dataKey="score"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-bg-card p-6 rounded-xl border border-border-light">
          <h3 className="font-semibold text-text-primary mb-4">
            Attendance by Class
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <XAxis dataKey="class" stroke="#94a3b8" />
                <YAxis domain={[80, 100]} stroke="#94a3b8" />
                <Tooltip />
                <Bar
                  dataKey="rate"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-bg-card p-6 rounded-xl border border-border-light">
          <h3 className="font-semibold text-text-primary mb-4">
            Fee Collection Distribution
          </h3>
          <div className="flex items-center gap-8">
            <PieChart width={200} height={200}>
              <Pie
                data={feeData}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >
                {feeData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Pie>
            </PieChart>

            <div className="space-y-2 text-sm">
              {feeData.map((d, i) => (
                <p key={i} className="text-text-muted">
                  <span className="font-semibold text-text-primary">
                    {d.value}%
                  </span>{' '}
                  {d.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-bg-card p-6 rounded-xl border border-border-light">
          <h3 className="font-semibold text-text-primary mb-4">
            Pending Approvals
          </h3>

          <div className="space-y-4">
            {approvals.map((a, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-bg-page"
              >
                <div>
                  <p className="font-semibold text-text-primary">{a.title}</p>
                  <p className="text-xs text-text-muted">{a.type}</p>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm rounded-md border border-border-light">
                    Review
                  </button>
                  <button className="px-3 py-1 text-sm rounded-md bg-primary text-white flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
