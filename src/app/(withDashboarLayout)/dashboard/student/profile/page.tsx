"use client"

import React from "react"
import { User, Mail, Phone, MapPin, Calendar, Book, Shield, GraduationCap, Edit3 } from "lucide-react"

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Profile</h1>

            {/* Profile Header */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-32 bg-slate-900 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
                </div>
                <div className="px-8 pb-8">
                    <div className="relative flex flex-col items-center -mt-12 md:flex-row md:items-end md:-mt-16 md:space-x-6">
                        <div className="h-32 w-32 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-lg">
                            {/* Placeholder Avatar */}
                            <div className="h-full w-full bg-slate-300 flex items-center justify-center text-slate-500 font-bold text-4xl">
                                AS
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:pb-2 text-center md:text-left flex-1">
                            <h2 className="text-2xl font-bold text-slate-900">Alex Smith</h2>
                            <p className="text-slate-500 font-medium">Class 10 - Science Group</p>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide border border-emerald-200">
                                    Active Student
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 md:mt-0 md:pb-2">
                            <button className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg shadow-slate-900/10">
                                <Edit3 className="h-4 w-4" /> Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Personal Information */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                        <User className="h-5 w-5 text-blue-600" /> Personal Details
                    </h3>
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-50 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Student ID</span>
                            <span className="text-sm font-semibold text-slate-900">ST-2024-00123</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-50 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Date of Birth</span>
                            <span className="text-sm font-semibold text-slate-900">15 Aug, 2008</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-50 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Gender</span>
                            <span className="text-sm font-semibold text-slate-900">Male</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-50 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Blood Group</span>
                            <span className="text-sm font-semibold text-slate-900">O+</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Nationality</span>
                            <span className="text-sm font-semibold text-slate-900">Bangladeshi</span>
                        </div>
                    </div>
                </div>

                {/* Academic Information */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                        <GraduationCap className="h-5 w-5 text-blue-600" /> Academic Details
                    </h3>
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-50 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Class & Section</span>
                            <span className="text-sm font-semibold text-slate-900">Class 10 (A)</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-50 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Roll Number</span>
                            <span className="text-sm font-semibold text-slate-900">12</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-50 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Group</span>
                            <span className="text-sm font-semibold text-slate-900">Science</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 border-b border-slate-50 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Admission Date</span>
                            <span className="text-sm font-semibold text-slate-900">Jan 10, 2024</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between py-2 hover:bg-slate-50 px-2 rounded-lg transition-colors">
                            <span className="text-sm font-medium text-slate-500">Session</span>
                            <span className="text-sm font-semibold text-slate-900">2025-2026</span>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 border-b border-slate-100 pb-3">
                        <Phone className="h-5 w-5 text-blue-600" /> Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-3 rounded-lg border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all group">
                                <div className="p-2 bg-white rounded-full text-blue-500 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Phone Number</p>
                                    <p className="text-sm font-semibold text-slate-800 mt-0.5">+880 1712 345678</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-3 rounded-lg border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all group">
                                <div className="p-2 bg-white rounded-full text-blue-500 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email Address</p>
                                    <p className="text-sm font-semibold text-slate-800 mt-0.5">alex.smith@example.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-3 rounded-lg border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-100 hover:shadow-sm transition-all group h-full">
                                <div className="p-2 bg-white rounded-full text-blue-500 shadow-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Present Address</p>
                                    <p className="text-sm font-semibold text-slate-800 mt-0.5">House #12, Road #5, Dhanmondi, Dhaka-1209</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}