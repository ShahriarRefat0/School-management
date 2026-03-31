'use client';

import React from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Users,
  TrendingUp,
  ArrowRight,
  Info,
  ShieldCheck,
  Heart,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useRoleGuard } from '@/hooks/useRoleGurad';

// Simple className merger
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300',
      className,
    )}
  >
    {children}
  </div>
);

const FeatureCard = ({
  title,
  desc,
  icon: Icon,
  iconBg,
  iconColor,
  link,
}: any) => (
  <Link href={link || '#'}>
    <Card className="p-6 group cursor-pointer h-full border-b-4 border-b-transparent hover:border-b-blue-600">
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
            iconBg,
          )}
        >
          <Icon className={iconColor} size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
        </div>
        <div className="flex items-center text-blue-600 text-sm font-semibold mt-auto">
          View Details <ArrowRight size={14} className="ml-1" />
        </div>
      </div>
    </Card>
  </Link>
);

export default function ParentDashboard() {
  const { user, role, loading } = useRoleGuard('parent');

  if (loading) {
    return (
      <div className="h-[80vh] w-full flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <GraduationCap className="absolute text-blue-200" size={20} />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-800 animate-pulse">
            Verifying Access...
          </h3>
          <p className="text-sm text-gray-500">Preparing your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-4 md:p-8 animate-fadeIn">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
            Welcome, {user?.name || 'Parent'}! 👋
          </h2>
          <p className="text-blue-100 max-w-xl text-lg font-medium opacity-90 leading-relaxed">
            Stay connected with your child's education and progress. Our portal
            helps you navigate through the modern learning management system
            with ease.
          </p>
        </div>
        <GraduationCap className="absolute right-[-20px] bottom-[-20px] text-white/10 w-64 h-64 -rotate-12" />
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          title="Results & Progress"
          desc="Check your child's examination results and overall academic performance."
          icon={TrendingUp}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          link="/dashboard/parent/results"
        />
        <FeatureCard
          title="Academic System"
          desc="Learn about our teaching methodology and how we ensure student success."
          icon={BookOpen}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          link="/dashboard/parent/about"
        />
        <FeatureCard
          title="Features & Benefits"
          desc="Explore the exclusive features and benefits available for parents and students."
          icon={CheckCircle2}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          link="/dashboard/parent/benefits"
        />
        <FeatureCard
          title="Teacher Profiles"
          desc="Get to know the educators guiding your child and their professional experience."
          icon={Users}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
          link="/dashboard/parent/teachers"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 bg-gray-50 border-none">
          <div className="flex items-center gap-3 mb-6">
            <Info className="text-blue-600" />
            <h3 className="text-xl font-bold text-gray-800">
              Important Notes for Parents
            </h3>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Education is not limited to the classroom. As a parent, your
              awareness and cooperation play a vital role in your child's mental
              and academic development.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <li className="flex items-center gap-2 text-sm font-medium">
                <ShieldCheck size={18} className="text-green-500" /> Secure
                Campus Environment
              </li>
              <li className="flex items-center gap-2 text-sm font-medium">
                <Heart size={18} className="text-red-400" /> Mental Health
                Support
              </li>
              <li className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 size={18} className="text-blue-500" /> Regular
                Class Attendance
              </li>
              <li className="flex items-center gap-2 text-sm font-medium">
                <Users size={18} className="text-purple-500" /> Parent-Teacher
                Meetings
              </li>
            </ul>
          </div>
        </Card>

        <div className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2">Need Assistance?</h4>
            <p className="text-sm text-blue-600 mb-4">
              If you have any questions or feedback, please feel free to contact
              our official support team.
            </p>
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
