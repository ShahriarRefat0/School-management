'use client';
import { useParams } from 'next/navigation';
import {
  User,
  GraduationCap,
  Calendar,
  BookOpen,
  ShieldCheck,
  ArrowLeft,
  IdCard,
  Droplets,
  Phone,
  MapPin,
  CalendarCheck,
} from 'lucide-react';
import Link from 'next/link';
import { childrenData } from '../page';
// আগের ফাইল থেকে ডেটা ইমপোর্ট করছি (যদি ফাইল আলাদা হয় তবে পাথ ঠিক করে নেবেন)

export default function ChildDetailPage() {
  const params = useParams();
  const studentId = params.studentId;

  // মেইন লিস্ট থেকে আইডি ফিল্টার করে ডেটা বের করা হচ্ছে
  const student = childrenData.find((c) => c.id === studentId);

  if (!student) {
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-bold text-text-primary">
          শিক্ষার্থী পাওয়া যায়নি!
        </h2>
        <Link
          href="/dashboard/parent/children"
          className="text-primary underline mt-4 inline-block"
        >
          তালিকায় ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <Link
        href="/dashboard/parent/children"
        className="inline-flex items-center gap-2 text-sm font-bold text-text-muted hover:text-primary transition-colors mb-4"
      >
        <ArrowLeft size={16} /> সন্তানদের তালিকায় ফিরে যান
      </Link>

      {/* Header Profile Card */}
      <div className="bg-bg-card rounded-3xl border border-border-light p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
        <div className="relative">
          <div className="w-32 h-32 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-4xl font-bold border-2 border-primary/20">
            {student.name.charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-xl border-4 border-bg-card">
            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-black text-text-primary">
            {student.name}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/10 flex items-center gap-1">
              <IdCard size={12} /> আইডি: {student.id}
            </span>
            <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-500/10 flex items-center gap-1">
              <ShieldCheck size={12} /> ভেরিফাইড স্টুডেন্ট
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Info */}
        <div className="bg-bg-card rounded-2xl border border-border-light p-6 space-y-6">
          <h3 className="font-bold text-text-primary flex items-center gap-2 border-b border-border-light pb-4">
            <GraduationCap className="text-primary" size={20} /> একাডেমিক তথ্য
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <InfoItem
              label="শ্রেণি ও শাখা"
              value={`${student.class} (${student.section} শাখা)`}
              icon={BookOpen}
            />
            <InfoItem label="রোল নম্বর" value={student.roll} icon={IdCard} />
            <InfoItem
              label="GPA (সর্বশেষ)"
              value={student.gpa}
              icon={GraduationCap}
            />
            <InfoItem label="জন্ম তারিখ" value={student.dob} icon={Calendar} />
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-bg-card rounded-2xl border border-border-light p-6 space-y-6">
          <h3 className="font-bold text-text-primary flex items-center gap-2 border-b border-border-light pb-4">
            <User className="text-primary" size={20} /> ব্যক্তিগত তথ্য
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <InfoItem
              label="রক্তের গ্রুপ"
              value={student.bloodGroup}
              icon={Droplets}
            />
            <InfoItem label="অভিভাবক" value={student.guardian} icon={User} />
            <InfoItem label="যোগাযোগ" value={student.contact} icon={Phone} />
            <InfoItem
              label="উপস্থিতি"
              value={student.attendance}
              icon={CalendarCheck}
            />
          </div>
        </div>
      </div>

      {/* Address Card */}
      <div className="bg-bg-card rounded-2xl border border-border-light p-6 flex items-start gap-4">
        <div className="p-3 bg-primary/5 rounded-xl text-primary">
          <MapPin size={20} />
        </div>
        <div>
          <p className="text-[10px] uppercase font-black text-text-muted tracking-[0.2em] mb-1">
            বর্তমান ঠিকানা
          </p>
          <p className="text-text-secondary font-medium">{student.address}</p>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: any;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-bg-page/50 border border-border-light/50 transition-colors hover:bg-bg-page">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-bg-card rounded-lg text-text-muted border border-border-light shadow-sm">
          <Icon size={16} />
        </div>
        <span className="text-xs font-bold text-text-muted">{label}</span>
      </div>
      <span className="text-sm font-black text-text-primary">{value}</span>
    </div>
  );
}
