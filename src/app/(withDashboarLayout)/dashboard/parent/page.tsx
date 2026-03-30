'use client';

import { useEffect, useState } from 'react';
import {
  LineChart as LineIcon,
  CheckCircle2,
  GraduationCap,
  CreditCard,
  TrendingUp,
  BookOpen,
  Bell,
  MessageSquare,
  TrendingDown,
  Calendar,
  Search,
  MoreVertical,
  Download,
  Users,
  Clock,
  ArrowRight,
  FileText,
  Loader2,
} from 'lucide-react';
import { getParentDashboardData } from '@/app/actions/parent/dashboard';
import Link from 'next/link';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

// Simple className merger
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Card Component
const Card = ({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={cn(
      'bg-bg-card rounded-2xl border border-border-light shadow-sm hover:shadow-xl hover:border-blue-200/60 transition-all duration-500',
      className,
    )}
    style={style}
  >
    {children}
  </div>
);

// Stat Card Component
const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBg,
  iconColor,
  subtitle,
  badge,
  index,
  link,
}: any) => {
  const content = (
    <Card
      className={cn(
        "relative p-6 rounded-2xl border border-border-light shadow-sm transition-all duration-300 animate-fadeIn",
        link ? "hover:shadow-md hover:border-primary/30 cursor-pointer group" : "hover:shadow-md"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col gap-4 relative z-10">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110',
            iconBg,
          )}
        >
          <Icon className={iconColor} size={20} />
        </div>

        <div>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
            {title}
          </p>

          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">{value}</h3>

            {change && (
              <span
                className={cn(
                  'text-[10px] font-bold flex items-center gap-0.5',
                  changeType === 'up' ? 'text-emerald-500' : 'text-red-500',
                )}
              >
                {changeType === 'up' ? (
                  <TrendingUp size={10} />
                ) : (
                  <TrendingDown size={10} />
                )}
                {change}
              </span>
            )}
          </div>

          {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
        </div>

        {badge && (
          <span className="absolute top-4 right-4 text-[10px] font-bold text-text-primary bg-bg-page px-2 py-1 rounded-md border border-border-light shadow-sm">
            {badge}
          </span>
        )}
        
        {link && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight size={14} className="text-primary" />
          </div>
        )}
      </div>
    </Card>
  );

  return link ? <Link href={link}>{content}</Link> : content;
};

export default function ParentDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getParentDashboardData();
      if (res.success) {
        setData(res.data);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Loader2 className="animate-spin text-blue-600" size={60} />
          <GraduationCap
            className="absolute inset-0 m-auto text-blue-900/20"
            size={30}
          />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-black text-text-primary tracking-tight animate-pulse">
            Syncing Parent Portal...
          </p>
          <p className="text-text-muted text-sm font-medium">
            Fetching the latest updates for {data?.studentName || 'your child'}
          </p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Current GPA',
      value: data?.stats?.cgpa || '0.00',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-500/10',
      link: '/dashboard/parent/results',
    },
    {
      title: 'Student ID',
      value: data?.studentId || 'N/A',
      icon: Users,
      color: 'text-purple-600',
      bg: 'bg-purple-500/10',
      link: '/dashboard/parent/profile',
    },
    {
      title: 'About Website',
      value: 'Learn More',
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-500/10',
      link: '/dashboard/parent/about',
    },
    {
      title: 'Benefits',
      value: 'Discover',
      icon: CheckCircle2,
      color: 'text-amber-600',
      bg: 'bg-amber-500/10',
      link: '/dashboard/parent/benefits',
    },
  ];

  const gpaData = data?.gpaData || [
    { exam: 'Jan', gpa: 4.2 },
    { exam: 'Feb', gpa: 4.4 },
    { exam: 'Mar', gpa: 4.3 },
    { exam: 'Apr', gpa: 4.6 },
    { exam: 'May', gpa: 4.85 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn p-2 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
            Welcome back, {data?.parentName?.split(' ')[0]}! 👋
          </h2>
          <p className="text-blue-100 max-w-md text-base md:text-lg font-medium opacity-90 leading-relaxed italic">
            Monitoring{' '}
            <span className="text-white font-black underline decoration-blue-400 underline-offset-4">
              {data?.studentName}
            </span>
            's progress today. Everything looks great!
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <StatCard
            key={i}
            title={s.title}
            value={s.value}
            icon={s.icon}
            iconColor={s.color}
            iconBg={s.bg}
            index={i}
            link={s.link}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp size={18} className="text-blue-500" />
                </div>
                <h3 className="font-bold text-text-primary">GPA Progress</h3>
              </div>
              <select className="bg-bg-page border border-border-light text-text-muted text-xs rounded-lg px-2 py-1 outline-none">
                <option>2026 Academic Year</option>
                <option>2025 Academic Year</option>
              </select>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gpaData}>
                  <defs>
                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0.1}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="rgba(100,116,139,0.1)"
                  />
                  <XAxis
                    dataKey="exam"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                    dy={10}
                  />
                  <YAxis
                    domain={[3.5, 5]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border-light)',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    }}
                    itemStyle={{ color: 'var(--color-text-primary)' }}
                    labelStyle={{ color: 'var(--color-text-muted)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="gpa"
                    stroke="var(--color-primary)"
                    strokeWidth={4}
                    dot={{
                      r: 4,
                      fill: 'var(--color-primary)',
                      strokeWidth: 2,
                      stroke: 'var(--color-bg-card)',
                    }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          {/* Feedback section removed */}
        </div>
      </div>
    </div>
  );
}
