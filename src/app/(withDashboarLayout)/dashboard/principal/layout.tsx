"use client"

import React from "react"
import DashboardLayout from "@/components/shared/dashboard/DashboardLayout"
import { principalMenuItems } from "@/components/shared/dashboard/menu-items"

export default function PrincipalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout
      title="Principal Dashboard"
      menuItems={principalMenuItems}
      activeColor="bg-blue-600"
      user={{
        name: "Dr. Robert Wilson",
        role: "admin",
        initials: "RW",
        subText: "Head Management"
      }}
    >
      {children}
    </DashboardLayout>
  )
}
