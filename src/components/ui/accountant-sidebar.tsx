"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  TrendingDown,
  FileText,
  History,
  Settings,
  CreditCard,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/accountant",
    icon: LayoutDashboard,
  },
  {
    title: "Fee Collection",
    url: "/dashboard/accountant/fee-collection",
    icon: CreditCard,
    badge: "12",
  },
  {
    title: "Student Due List",
    url: "/dashboard/accountant/due-list",
    icon: Receipt,
    badge: "48",
  },
  {
    title: "Salary Management",
    url: "/dashboard/accountant/salary",
    icon: Wallet,
  },
  {
    title: "Expense Management",
    url: "/dashboard/accountant/expenses",
    icon: TrendingDown,
  },
  {
    title: "Financial Reports",
    url: "/dashboard/accountant/reports",
    icon: FileText,
  },
  {
    title: "Payment History",
    url: "/dashboard/accountant/history",
    icon: History,
  },
  {
    title: "Settings",
    url: "/dashboard/accountant/settings",
    icon: Settings,
  },
]

export function AccountantSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/dashboard/accountant") return pathname === path
    return pathname.startsWith(path)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="text-lg font-bold px-4 py-4">
        💰 Finance Panel
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                  >
                    <Link href={item.url} className="flex justify-between w-full">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>

                      {item.badge && (
                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-md">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 text-sm text-muted-foreground">
        Logged in as <br />
        <span className="font-semibold text-foreground">
          Abdul Karim
        </span>
      </SidebarFooter>
    </Sidebar>
  )
}
