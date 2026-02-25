"use client"

import React from "react"
import DashboardLayout from "@/components/shared/dashboard/DashboardLayout"
import { teacherMenuItems } from "@/components/shared/dashboard/menu-items"

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout
      title="Teacher Dashboard"
      menuItems={teacherMenuItems}
      activeColor="bg-indigo-600"
      user={{
        name: "Abu Raihan",
        role: "Senior Teacher",
        initials: "AR",
        subText: "Science Department"
      }}
    >
      {children}
    </DashboardLayout>
  )
}

