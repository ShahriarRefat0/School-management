"use client"
import { getAllSchools } from "@/app/actions/school"
import React, { useEffect, useState } from 'react'
import {
  Building2,
  Users,
  Wallet,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Activity,
  ArrowDownRight,
  ShieldCheck,
  Megaphone,
  CreditCard,
  Wrench
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts'
import { useRoleGuard } from '@/hooks/useRoleGurad'


// Mock Data for Graph
const revenueData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 5200 },
  { name: 'Mar', amount: 4800 },
  { name: 'Apr', amount: 7000 },
  { name: 'May', amount: 8500 },
  { name: 'Jun', amount: 10000 },
]



export default function SuperAdminOverview() {
  const [schoolCount, setSchoolCount] = useState<number>(0)
  const [schools, setSchools] = useState<any[]>([])
  const { loading } = useRoleGuard('super_admin')

  useEffect(() => {
    async function loadSchools() {
      const res = await getAllSchools()

      if (res.success) {
        setSchools(res.data)
        setSchoolCount(res.data.length)
      }
    }

    loadSchools()
  }, [])

  if (loading) return <p>Super Admin Dashboard is Loading...</p>

  const stats = [
    {
      title: "Total Schools",
      value: schoolCount,
      icon: Building2,
      trend: "+12%",
      up: true,
      subtitle: "Registered Schools"
    },
    { title: "Active Subscriptions", value: "115", icon: ShieldCheck, trend: "+5%", up: true, subtitle: "Current Paying Tenants" },
    { title: "Monthly Revenue", value: "৳4.50L", icon: Wallet, trend: "+18%", up: true, subtitle: "Total Earnings" },
    { title: "Expiring Soon", value: "08", icon: AlertTriangle, trend: "Requires Action", up: false, subtitle: "Next 7 Days" },
  ]

  const planDistribution = [
    {
      name: "Basic",
      value: schools.filter(s => s.plan === "basic").length,
      color: "#3b82f6"
    },
    {
      name: "Premium",
      value: schools.filter(s => s.plan === "premium").length,
      color: "#8b5cf6"
    },
    {
      name: "Enterprise",
      value: schools.filter(s => s.plan === "enterprise").length,
      color: "#10b981"
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in-up">

      {/* ১. হেডার সেকশন */}
      <div className="flex  flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">Project Overview</h2>
          <p className="text-[var(--color-text-muted)] font-medium mt-4">Business performance and tenant insights.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-light)] px-4 py-2 rounded-xl flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-500" />
            <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase">Server Status: Healthy</span>
          </div>
        </div>
      </div>


      {/* ২. কি-ম্যাট্রিক্স (Stats Grid) */}
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[var(--color-bg-card)] p-6 rounded-2xl border border-[var(--color-border-light)] shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[var(--color-primary)]/10 rounded-xl">
                <stat.icon className="h-6 w-6 text-[var(--color-primary)]" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-[var(--color-text-muted)] text-[11px] uppercase font-black tracking-widest">{stat.title}</h3>
            <p className="text-3xl font-black text-[var(--color-text-primary)] mt-1">{stat.value}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] font-medium mt-1">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* ৩. গ্রাফ সেকশন */}
      <div className="grid  grid-cols-1 lg:grid-cols-3 gap-8">

        {/* রেভিনিউ চার্ট */}
        <div className="lg:col-span-2 bg-[var(--color-bg-card)] p-6 rounded-2xl border border-[var(--color-border-light)] shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-[var(--color-text-primary)] flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[var(--color-primary)]" /> Revenue Growth
            </h3>
            <select className="bg-[var(--color-bg-page)] border-[var(--color-border-light)] text-xs font-bold p-2 rounded-lg outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--color-text-primary)', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="amount" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* সাবস্ক্রিপশন ডিস্ট্রিবিউশন */}
        <div className="bg-[var(--color-bg-card)] p-6 rounded-2xl  border-[var(--color-border-light)] shadow-sm">
          <h3 className="font-black text-[var(--color-text-primary)] mb-6">Plan Distribution</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={planDistribution}>
                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: 'var(--color-bg-card)', borderRadius: '12px' }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {planDistribution.map((plan, i) => (
              <div key={i} className="flex justify-between items-center text-xs font-bold">
                <span className="flex items-center gap-2 text-[var(--color-text-muted)]">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: plan.color }} /> {plan.name}
                </span>
                <span className="text-[var(--color-text-primary)]">{plan.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ৪. নিচের সেকশন - রিসেন্ট অ্যাকশন ও মেয়াদ শেষ হওয়া স্কুল */}
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border-light)]">
            <h3 className="font-black text-[var(--color-text-primary)]">Expiring Subscriptions</h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[var(--color-bg-page)]">
              <tr className="text-[var(--color-text-muted)] text-[10px] uppercase font-black">
                <th className="px-6 py-4">School Name</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-[var(--color-bg-page)] transition-colors">
                  <td className="px-6 py-4 font-bold text-sm text-[var(--color-text-primary)]">Ideal High School</td>
                  <td className="px-6 py-4 text-xs text-red-500 font-bold">Oct 30, 2023</td>
                  <td className="px-6 py-4 text-xs font-bold text-[var(--color-text-secondary)]">Pro Plan</td>
                  <td className="px-6 py-4">
                    <button className="text-[var(--color-primary)] font-black text-[10px] uppercase hover:underline">Send Reminder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[var(--color-bg-card)] p-6 rounded-2xl border border-[var(--color-border-light)]">
          <h3 className="font-black text-[var(--color-text-primary)] mb-6">Master Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-[var(--color-bg-page)] rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-primary)] transition-all flex flex-col items-center gap-2 group">
              <Building2 className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
              <span className="text-xs font-black text-[var(--color-text-secondary)]">New School</span>
            </button>
            <button className="p-4 bg-[var(--color-bg-page)] rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-primary)] transition-all flex flex-col items-center gap-2 group">
              <Megaphone className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
              <span className="text-xs font-black text-[var(--color-text-secondary)]">Broadcast</span>
            </button>
            <button className="p-4 bg-[var(--color-bg-page)] rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-primary)] transition-all flex flex-col items-center gap-2 group">
              <CreditCard className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
              <span className="text-xs font-black text-[var(--color-text-secondary)]">Billing</span>
            </button>
            <button className="p-4 bg-[var(--color-bg-page)] rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-primary)] transition-all flex flex-col items-center gap-2 group">
              <Wrench className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
              <span className="text-xs font-black text-[var(--color-text-secondary)]">System</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}