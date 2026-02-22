"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/shared/logo/logo"
import {
    LayoutDashboard,
    BookOpen,
    UserCheck,
    GraduationCap,
    Upload,
    Megaphone,
    Users,
    LogOut,
} from "lucide-react"

const menuItems = [
    { title: "Dashboard", url: "/dashboard/teacher", icon: LayoutDashboard },
    { title: "My Classes", url: "/dashboard/teacher/my-classes", icon: BookOpen, badge: "4" },
    { title: "Take Attendance", url: "/dashboard/teacher/attendance", icon: UserCheck, badge: "2" },
    { title: "Enter Results", url: "/dashboard/teacher/results", icon: GraduationCap },
    { title: "Study Materials", url: "/dashboard/teacher/study-materials", icon: Upload },
    { title: "Notices", url: "/dashboard/teacher/notices", icon: Megaphone, badge: "new" },
    { title: "Feedback", url: "/dashboard/teacher/feedback", icon: Users },
]

interface TeacherSidebarProps {
    onLinkClick?: () => void
}

export function TeacherSidebar({ onLinkClick }: TeacherSidebarProps) {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === "/dashboard/teacher") return pathname === path
        return pathname.startsWith(path) && path !== "/dashboard/teacher"
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
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
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
                                    flex px-1.5 h-5 min-w-[20px] items-center justify-center rounded-full text-[10px] font-bold uppercase
                                    ${active ? "bg-white text-indigo-600" : "bg-indigo-600 text-white"}
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
