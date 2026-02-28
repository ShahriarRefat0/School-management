import {
    LayoutDashboard,
    CalendarCheck,
    GraduationCap,
    Bell,
    CreditCard,
    User,
    BookOpen,
    UserCheck,
    Upload,
    Megaphone,
    Users,
    Building2,
    ListOrdered,
    Receipt,
    LifeBuoy,
    Settings2,
    Wallet,
    TrendingDown,
    FileText,
    History,
    Settings,
    UserCheck as UserCheckIcon,
    LineChart,
    ClipboardList,
    MessageCircle,
    LayoutDashboard as LayoutDashboardIcon,
    Users2
} from "lucide-react"
import { DashboardMenuItem } from "./types"

export const studentMenuItems: DashboardMenuItem[] = [
    { title: "Dashboard", url: "/dashboard/student", icon: LayoutDashboard },
    { title: "Attendance", url: "/dashboard/student/attendance", icon: CalendarCheck },
    { title: "Results", url: "/dashboard/student/results", icon: GraduationCap },
    { title: "Notices", url: "/dashboard/student/notices", icon: Bell, badge: "3" },
    { title: "Payments", url: "/dashboard/student/payments", icon: CreditCard },
    { title: "Profile", url: "/dashboard/student/profile", icon: User },
]

export const teacherMenuItems: DashboardMenuItem[] = [
    { title: "Dashboard", url: "/dashboard/teacher", icon: LayoutDashboard },
    { title: "My Classes", url: "/dashboard/teacher/my-classes", icon: BookOpen, badge: "4" },
    { title: "Take Attendance", url: "/dashboard/teacher/attendance", icon: UserCheck, badge: "2" },
    { title: "Enter Results", url: "/dashboard/teacher/results", icon: GraduationCap },
    { title: "Study Materials", url: "/dashboard/teacher/study-materials", icon: Upload },
    { title: "Notices", url: "/dashboard/teacher/notices", icon: Megaphone, badge: "new" },
    { title: "Feedback", url: "/dashboard/teacher/feedback", icon: Users },
]

export const superAdminMenuItems: DashboardMenuItem[] = [
    { title: "Overview", url: "/dashboard/super-admin", icon: LayoutDashboard },
    { title: "Schools Management", url: "/dashboard/super-admin/schools", icon: Building2 },
    { title: "Subscription Plans", url: "/dashboard/super-admin/plans", icon: ListOrdered },
    { title: "All Users", url: "/dashboard/super-admin/all-users", icon: CreditCard },
    { title: "Transactions", url: "/dashboard/super-admin/transactions", icon: Receipt },
    { title: "Support Tickets", url: "/dashboard/super-admin/support", icon: LifeBuoy },
    { title: "Global Settings", url: "/dashboard/super-admin/settings", icon: Settings2 },
]

export const accountantMenuItems: DashboardMenuItem[] = [
    { title: "Dashboard", url: "/dashboard/accountant", icon: LayoutDashboard },
    { title: "Student Due List", url: "/dashboard/accountant/due-list", icon: Receipt, badge: "48" },
    { title: "Salary Management", url: "/dashboard/accountant/salary", icon: Wallet },
    { title: "Expense Management", url: "/dashboard/accountant/expenses", icon: TrendingDown },
    { title: "Financial Reports", url: "/dashboard/accountant/reports", icon: FileText },
    { title: "Payment History", url: "/dashboard/accountant/history", icon: History },
    { title: "Settings", url: "/dashboard/accountant/settings", icon: Settings },
]

export const parentMenuItems: DashboardMenuItem[] = [
    { title: "Dashboard", url: "/dashboard/parents", icon: LayoutDashboard },
    { title: "Attendance", url: "/dashboard/parents/attendance", icon: UserCheckIcon, badge: "Today" },
    { title: "Performance", url: "/dashboard/parents/performance", icon: LineChart, badge: "New" },
    { title: "Fees Status", url: "/dashboard/parents/fees-status", icon: CreditCard, badge: "Due" },
    { title: "Notices", url: "/dashboard/parents/notices", icon: ClipboardList, badge: "3" },
    { title: "Contact Teacher", url: "/dashboard/parents/contact-teacher", icon: MessageCircle },
    { title: "Settings", url: "/dashboard/parents/settings", icon: Settings },
]

export const principalMenuItems: DashboardMenuItem[] = [
    { title: "Dashboard", url: "/dashboard/principal", icon: LayoutDashboard },
    { title: "Announcements", url: "/dashboard/principal/announcements", icon: Megaphone },
    { title: "Students", url: "/dashboard/principal/students", icon: Users2 },
    { title: "Teachers", url: "/dashboard/principal/teachers", icon: Users },
    { title: "Attendance", url: "/dashboard/principal/attendance", icon: UserCheckIcon },
    { title: "Performance", url: "/dashboard/principal/performance", icon: LineChart },
    { title: "Finance", url: "/dashboard/principal/finance", icon: Wallet },
    { title: "Reports", url: "/dashboard/principal/reports", icon: FileText },
    { title: "Settings", url: "/dashboard/principal/settings", icon: Settings },
]
