"use client"

import React from "react"
import DashboardLayout from "@/components/shared/dashboard/DashboardLayout"
import { parentMenuItems } from "@/components/shared/dashboard/menu-items"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout
      title="Parent Dashboard"
      menuItems={parentMenuItems}
      activeColor="bg-blue-600"
      user={{
        name: "Rahim Ahmed",
        role: "Parent",
        initials: "RA",
        subText: "Guardian of Sakib"
      }}
    >
      {children}
    </DashboardLayout>
  )
}

