"use client"

import React from "react"
import DashboardLayout from "@/components/shared/dashboard/DashboardLayout"
import { superAdminMenuItems } from "@/components/shared/dashboard/menu-items"

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout
            title="Super Admin Dashboard"
            menuItems={superAdminMenuItems}
            activeColor="bg-blue-600"
            user={{
                name: "Shahriar Refat",
                role: "Super Admin",
                initials: "SR",
                subText: "Owner"
            }}
        >
            {children}
        </DashboardLayout>
    )
}
