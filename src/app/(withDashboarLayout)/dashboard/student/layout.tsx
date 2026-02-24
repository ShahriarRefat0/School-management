"use client"

import React from "react"
import DashboardLayout from "@/components/shared/dashboard/DashboardLayout"
import { studentMenuItems } from "@/components/shared/dashboard/menu-items"

export default function StudentDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DashboardLayout
            title="Student Dashboard"
            menuItems={studentMenuItems}
            activeColor="bg-blue-600"
            user={{
                name: "Alex Smith",
                role: "Student",
                initials: "AS",
                subText: "Class 10 - A"
            }}
        >
            {children}
        </DashboardLayout>
    )
}

