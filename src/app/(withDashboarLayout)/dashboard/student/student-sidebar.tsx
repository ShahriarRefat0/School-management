"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/shared/logo/logo"
import {
    LayoutDashboard,
    CalendarCheck,
    GraduationCap,
    Bell,
    CreditCard,
    User,
    LogOut,
} from "lucide-react"

const menuItems = [
    { title: "Dashboard", url: "/dashboard/student", icon: LayoutDashboard },
    { title: "Attendance", url: "/dashboard/student/attendance", icon: CalendarCheck },
    { title: "Results", url: "/dashboard/student/results", icon: GraduationCap },
    { title: "Notices", url: "/dashboard/student/notices", icon: Bell, badge: "3" },
    { title: "Payments", url: "/dashboard/student/payments", icon: CreditCard },
    { title: "Profile", url: "/dashboard/student/profile", icon: User },
]

interface StudentSidebarProps {
    onLinkClick?: () => void
}

export function StudentSidebar({ onLinkClick }: StudentSidebarProps) {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === "/dashboard/student") return pathname === path
        return pathname.startsWith(path) && path !== "/dashboard/student"
    }

    return (
        <aside className="flex flex-col h-full w-full bg-sidebar border-r border-sidebar-border transition-all duration-300">

            {/* Header: Logo */}
            <div className="h-20 flex items-center px-6 border-b border-sidebar-border">
                <Link href="/">
                    <Logo variant="dark" />
                </Link>
            </div>

            {/* Navigation Content */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const active = isActive(item.url)
                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            onClick={onLinkClick}
                            className={`
                                flex items-center justify-between px-4 h-12 rounded-xl transition-all duration-200 group
                                ${active
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`h-5 w-5 ${active ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                                <span className="font-medium">{item.title}</span>
                            </div>

                            {item.badge && (
                                <span className={`
                                    flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold
                                    ${active ? "bg-white text-blue-600" : "bg-blue-600 text-white"}
                                `}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer: Logout */}
            <div className="p-4 border-t border-white/5">
                <button
                    className="flex items-center gap-3 w-full px-4 h-12 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                    onClick={() => console.log("Logging out...")}
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    )
}