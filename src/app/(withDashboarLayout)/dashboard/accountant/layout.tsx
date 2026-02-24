"use client"

import React from "react"
import DashboardLayout from "@/components/shared/dashboard/DashboardLayout"
import { accountantMenuItems } from "@/components/shared/dashboard/menu-items"

export default function AccountantDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout
            title="Accountant Dashboard"
            menuItems={accountantMenuItems}
            activeColor="bg-blue-600"
            user={{
                name: "John Doe",
                role: "Accountant",
                initials: "JD",
                subText: "Finance Dept"
            }}
        >
            {children}
        </DashboardLayout>
    )
}

