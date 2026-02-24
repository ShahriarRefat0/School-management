"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/shared/logo/logo"
import {
    LayoutDashboard,
    Building2,
    ListOrdered,
    CreditCard,
    Receipt,
    Users,
    Megaphone,
    LifeBuoy,
    Settings2,
    LogOut
} from "lucide-react"

const menuItems = [
    { title: "Overview", url: "/dashboard/super-admin", icon: LayoutDashboard },
    { title: "Schools Management", url: "/dashboard/super-admin/schools", icon: Building2 },
    { title: "Subscription Plans", url: "/dashboard/super-admin/plans", icon: ListOrdered },
    { title: "All Subscriptions", url: "/dashboard/super-admin/subscriptions", icon: CreditCard },
    { title: "Transactions", url: "/dashboard/super-admin/transactions", icon: Receipt },
    { title: "Broadcast", url: "/dashboard/super-admin/announcements", icon: Megaphone },
    { title: "Support Tickets", url: "/dashboard/super-admin/support", icon: LifeBuoy },
    { title: "Global Settings", url: "/dashboard/super-admin/settings", icon: Settings2 },
]

interface SuperAdminSidebarProps {
    onLinkClick?: () => void
}

export function SuperAdminSidebar({ onLinkClick }: SuperAdminSidebarProps) {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === "/dashboard/super-admin") return pathname === path
        return pathname.startsWith(path)
    }

    return (
        <aside className="flex flex-col h-full w-full bg-[var(--sidebar)] border-r border-[var(--sidebar-border)] transition-all duration-300">

            {/* Header: Logo Container */}
            <div className="h-20 flex items-center px-6 border-b border-[var(--sidebar-border)]">
                <Link href="/dashboard/super-admin" className="block">
                    {/* লোগো জাম্পিং বন্ধ করতে একটি ফিক্সড হাইট ডিভ (h-10) ব্যবহার করা হয়েছে */}
                    <div className="flex items-center h-10 overflow-hidden">
                        {/* 
                           variant এর এরর দূর করতে তুমি (Logo as any) ব্যবহার করতে পারো 
                           অথবা তোমার Logo কম্পোনেন্টে গিয়ে props টাইপ ঠিক করতে হবে।
                        */}
                        <div className="dark:hidden block">
                             <Logo variant="light" className="w-auto h-8" />
                        </div>
                        <div className="dark:block hidden">
                             <Logo variant="dark" className="w-auto h-8" />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Navigation Content */}
            <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 custom-scrollbar">
                {menuItems.map((item) => {
                    const active = isActive(item.url)
                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            onClick={onLinkClick}
                            className={`
                                flex items-center justify-between px-4 h-11 rounded-xl transition-all duration-200 group
                                ${active
                                    ? "bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] shadow-lg shadow-blue-600/20"
                                    : "text-[var(--sidebar-foreground)] opacity-70 hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] hover:opacity-100"
                                }
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className={`h-5 w-5 ${active ? "text-[var(--sidebar-primary-foreground)]" : "text-[var(--sidebar-foreground)] group-hover:text-[var(--sidebar-accent-foreground)]"}`} />
                                <span className="font-medium text-[14px]">{item.title}</span>
                            </div>
                        </Link>
                    )
                })}
            </nav>

            {/* Footer: Logout */}
            <div className="p-4 border-t border-[var(--sidebar-border)]">
                <button
                    className="flex items-center gap-3 w-full px-4 h-12 text-[var(--sidebar-foreground)] opacity-70 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                    onClick={() => console.log("Logging out...")}
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--color-border-light);
                    border-radius: 10px;
                }
            `}</style>
        </aside>
    )
}