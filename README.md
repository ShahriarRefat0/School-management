# 🎓 School Management System

A comprehensive, full-stack school management SaaS platform built with modern web technologies. Designed for educational institutions to manage students, teachers, academic schedules, payments, and communications seamlessly.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-7.4.2-2D3748?style=flat-square&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=flat-square&logo=tailwind-css)

---

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## ✨ Features

### Core Features

#### 🏫 **Multi-Tenant School Management**
- Create and manage multiple schools on a single platform
- School-specific settings and configurations
- Isolated data between institutions

#### 👥 **Role-Based Access Control**
- **Super Admin**: Platform administration, school oversight
- **Principal/Admin**: School management, staff coordination
- **Teacher**: Class management, grading, material uploads
- **Student**: Dashboard access, fee payments, progress tracking
- **Parent**: Student monitoring and progress updates
- **Accountant**: Financial management and reporting

#### 📚 **Academic Management**
- Class and section organization
- Subject assignment and management
- Attendance tracking (Present/Absent/Late)
- Exam scheduling and result management
- Study material distribution
- Performance feedback system
- Class timetable management
- Teacher-subject mapping

#### 💳 **Payment System**
- **SSLCommerz Integration** for real-time payments (Bangladesh-based)
- Fee collection and tracking
- Transaction history and reporting
- Multiple payment methods support
- Subscription plan management
- Invoice and receipt generation
- Payment status monitoring

#### 📢 **Communication System**
- School-wide announcements with expiry dates
- Teacher notices to specific classes
- Real-time notification system
- Support ticket management
- In-app messaging

#### 🧪 **Quiz & Assessment**
- Live quiz room creation
- Real-time quiz submissions
- Question bank management
- Performance tracking and analytics
- Exam designation support

#### 📊 **Analytics & Reporting**
- Fee collection reports
- Attendance analytics
- Performance charts (using Recharts)
- Transaction logs
- Expense tracking

---

## 🛠 Technology Stack

### Frontend
- **Next.js 16.1.6** - Full-stack React framework with Server-Side Rendering (SSR)
- **React 19.2.3** - Latest React with experimental features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Advanced animations
- **Recharts** - Data visualization
- **Radix UI & ShadcN UI** - Accessible component library
- **Lucide React** - 564+ icon library
- **Lenis** - Smooth scrolling

### Backend
- **Next.js API Routes** - Built-in serverless backend
- **Prisma ORM 7.4.2** - Type-safe database access
- **PostgreSQL** - Relational database
- **Supabase** - Authentication and real-time features

### Authentication & Security
- **Supabase Auth** - Email/password authentication
- **bcryptjs** - Password hashing
- **JWT** - Token-based sessions
- **Zod** - Schema validation

### Integrations
- **SSLCommerz** - Payment gateway integration
- **Cloudinary** - Image and file uploads
- **Supabase Storage** - File management

### UI & Notifications
- **React Hot Toast** - Toast notifications
- **Sonner** - Lightweight toast library
- **SweetAlert2** - Beautiful alerts
- **Date-fns** - Date manipulation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or higher
- **npm** or **yarn** package manager
- **PostgreSQL** 14+
- **Git**
- A **Supabase** account (for authentication)
- A **SSLCommerz** merchant account (for payments)
- A **Cloudinary** account (for file uploads)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/school-management.git
cd school-management
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/school_management

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Payment Gateway (SSLCommerz)
SSL_STORE_ID=your-store-id
SSL_STORE_PASS=your-store-password

# File Uploads (Cloudinary)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Set Up the Database

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## ⚙️ Configuration

### Prisma Configuration

The database schema is defined in `prisma/schema.prisma`. To create or modify database models:

1. Update `prisma/schema.prisma`
2. Create a migration: `npx prisma migrate dev --name description`
3. The database will be updated automatically

### Next.js Configuration

- `next.config.ts` - Server configuration, image optimization, analytics
- `tsconfig.json` - TypeScript settings with path aliases (`@/*`)
- `postcss.config.mjs` - CSS processing with Tailwind

### ESLint Configuration

Run linting:

```bash
npm run lint
```

---

## 📁 Project Structure

```
school-management/
├── src/
│   ├── app/                           # Next.js app directory
│   │   ├── (withCommonLayout)/        # Public pages layout
│   │   │   ├── page.tsx               # Home page
│   │   │   ├── about/                 # About page
│   │   │   ├── pricing/               # Pricing plans
│   │   │   ├── contact/               # Contact form
│   │   │   ├── blogs/                 # Blog posts
│   │   │   ├── login/                 # Login page
│   │   │   └── support/               # Support center
│   │   │
│   │   ├── (withDashboardLayout)/     # Dashboard pages
│   │   │   ├── dashboard/
│   │   │   │   ├── principal/         # Principal dashboard
│   │   │   │   ├── teacher/           # Teacher dashboard
│   │   │   │   ├── student/           # Student dashboard
│   │   │   │   ├── parent/            # Parent dashboard
│   │   │   │   └── accountant/        # Accountant dashboard
│   │   │   │
│   │   ├── api/                       # API routes
│   │   │   ├── auth/                  # Authentication endpoints
│   │   │   ├── payment/               # Payment endpoints
│   │   │   ├── exams/                 # Exam management
│   │   │   ├── subscription/          # Subscription management
│   │   │   └── upload-pdf/            # File upload handler
│   │   │
│   │   ├── actions/                   # Server actions
│   │   │   ├── student.ts             # Student operations
│   │   │   ├── teacher.ts             # Teacher operations
│   │   │   ├── announcements.ts       # Announcement operations
│   │   │   ├── payment.ts             # Payment operations
│   │   │   └── ...                    # Other operations
│   │   │
│   │   ├── layout.tsx                 # Root layout
│   │   ├── error.tsx                  # Error boundary
│   │   └── not-found.tsx              # 404 page
│   │
│   ├── components/                    # Reusable React components
│   │   ├── home/                      # Homepage sections
│   │   ├── dashboard/                 # Dashboard components
│   │   ├── auth/                      # Auth-related components
│   │   ├── shared/                    # Shared components
│   │   ├── ui/                        # UI primitives
│   │   └── ...
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAuth.ts                 # Authentication hook
│   │   ├── useRoleGuard.ts            # Role checking hook
│   │   └── use-mobile.ts              # Mobile detection
│   │
│   ├── lib/                           # Utility functions
│   │   ├── prisma.ts                  # Prisma client singleton
│   │   ├── getCurrentUser.ts          # Get authenticated user
│   │   ├── utils.ts                   # Helper functions
│   │   └── supabase/                  # Supabase clients
│   │       ├── client.ts              # Client-side Supabase
│   │       ├── server.ts              # Server-side Supabase
│   │       └── admin.ts               # Admin Supabase client
│   │
│   ├── context/                       # React Context
│   │   └── AuthProvider.tsx           # Authentication context
│   │
│   ├── types/                         # TypeScript types
│   │   ├── roles.ts                   # Role definitions
│   │   └── notice.ts                  # Notice types
│   │
│   └── proxy.ts                       # Proxy configuration
│
├── prisma/
│   ├── schema.prisma                  # Database schema definition
│   └── migrations/                    # Database migrations
│
├── public/                            # Static assets
│   └── schools/                       # School-specific assets
│
├── scripts/                           # Utility scripts
│   ├── check_db.ts                    # Database health check
│   └── test-results.ts                # Test utilities
│
├── next.config.ts                     # Next.js configuration
├── tsconfig.json                      # TypeScript configuration
├── tailwind.config.ts                 # Tailwind CSS configuration
├── postcss.config.mjs                 # PostCSS configuration
├── eslint.config.mjs                  # ESLint configuration
├── package.json                       # Dependencies
└── README.md                          # This file
```

---

## 💾 Database Schema

### Core Models

#### **School**
- Multi-tenant organization container
- School configuration and settings

#### **User**
- Central user model (all roles inherit from this)
- Email, password, role assignment
- Contains both super_admin and role-specific users

#### **Student**
- Student records linked to schools
- Enrollment dates
- Parent associations

#### **Teacher**
- Teacher information
- Subject assignments
- Class associations

#### **Parent**
- Guardian information
- Student relationships

#### **Class**
- Grade levels
- Section divisions
- Academic year tracking

#### **Exam**
- Exam scheduling
- Subject mapping
- Exam types

#### **Result**
- Student grades and marks
- Subject performance

#### **Fee**
- Fee structures
- Amount and due dates

#### **Payment**
- Payment transactions
- SSLCommerz integration
- Transaction status tracking

#### **Announcement**
- School-wide messages
- Expiry date management
- Category classification

#### **Notification**
- User-specific alerts
- Read/unread status

#### **SupportTicket**
- Help request management
- Status tracking
- Ticket assignment

#### **QuizRoom & QuizSubmission**
- Live quiz management
- Real-time submission tracking
- Performance analytics

### User Roles

```typescript
enum Role {
  SUPER_ADMIN = "super_admin"    // Platform administrator
  ADMIN = "admin"                // Principal/School admin
  TEACHER = "teacher"            // Instructor
  STUDENT = "student"            // Learner
  PARENT = "parent"              // Guardian
  ACCOUNTANT = "accountant"      // Finance staff
}
```

---

## 🔐 User Roles & Permissions

### Super Admin
- ✅ Create and manage schools
- ✅ View all platform analytics
- ✅ Manage system configurations
- ✅ Access all school data

### Principal/Admin
- ✅ Manage teachers and students
- ✅ Create classes and assign sections
- ✅ Publish announcements
- ✅ View school-wide reports
- ✅ Manage fees and payments
- ✅ Configure school settings

### Teacher
- ✅ Manage assigned classes
- ✅ Enter student grades
- ✅ Mark attendance
- ✅ Upload study materials
- ✅ Send notices to classes
- ✅ View student results

### Student
- ✅ View personal grades
- ✅ Check attendance
- ✅ Pay fees online
- ✅ Download study materials
- ✅ Submit assignments
- ✅ Receive notifications

### Parent
- ✅ Monitor student progress
- ✅ View attendance
- ✅ Receive notifications
- ✅ View fee statements

### Accountant
- ✅ Record expenses
- ✅ View payment records
- ✅ Generate financial reports
- ✅ Manage subscription billing

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/signup              # User registration
POST   /api/auth/login               # User login
POST   /api/auth/logout              # User logout
GET    /api/auth/role                # Get current user role
POST   /api/auth/reset-password      # Reset password
```

### Student Management
```
GET    /api/students                 # List all students
POST   /api/students                 # Create student
GET    /api/students/:id             # Get student details
PATCH  /api/students/:id             # Update student
DELETE /api/students/:id             # Delete student
POST   /api/students/bulk-import     # Bulk student import
```

### Teacher Management
```
GET    /api/teachers                 # List teachers
POST   /api/teachers                 # Create teacher
PATCH  /api/teachers/:id             # Update teacher
POST   /api/teachers/:id/assign-subject # Assign subject
```

### Exam Management
```
GET    /api/exams                    # List exams
POST   /api/exams                    # Create exam
GET    /api/exams/:id                # Get exam details
PATCH  /api/exams/:id                # Update exam
DELETE /api/exams/:id                # Delete exam
POST   /api/exams/:id/results        # Upload results
```

### Payments
```
POST   /api/payment/initiate         # Start SSLCommerz payment
POST   /api/payment/success          # Payment success webhook
POST   /api/payment/fail             # Payment failure webhook
POST   /api/payment/cancel           # Payment cancel webhook
GET    /api/payment/history          # Payment transaction history
```

### Subscriptions
```
GET    /api/subscription/plans       # List pricing plans
POST   /api/subscription/activate    # Activate plan
GET    /api/subscription/status      # Check subscription status
```

### File Uploads
```
POST   /api/upload-pdf               # Upload to Cloudinary
```

### Admin
```
GET    /api/admin/transactions       # View all transactions
GET    /api/admin/analytics          # Platform analytics
```

---

## 🔧 Development

### Running the Development Server

```bash
npm run dev
```

Server runs on `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This will:
- Generate Prisma client
- Compile TypeScript
- Bundle Next.js application
- Optimize for production

### Running Production Build

```bash
npm start
```

### Code Quality

**Run ESLint:**
```bash
npm run lint
```

**Format Code (if configured):**
```bash
npm run format
```

### Database Management

**View Database (Prisma Studio):**
```bash
npx prisma studio
```

**Check Migration Status:**
```bash
npx prisma migrate status
```

**Create New Migration:**
```bash
npx prisma migrate dev --name description_of_changes
```

---

## 🚀 Deployment

### Prerequisites for Deployment
1. PostgreSQL database hosted (Supabase, Railway, Vercel Postgres, etc.)
2. Supabase account configured
3. SSLCommerz merchant account
4. Cloudinary account
5. Hosting platform (Vercel, Railway, Render, etc.)

### Deployment Steps

#### **1. Environment Configuration**
Set all environment variables on your hosting platform:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
DATABASE_URL=...
SSL_STORE_ID=...
SSL_STORE_PASS=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

#### **2. Run Production Migrations**
```bash
npx prisma migrate deploy
```

#### **3. Deploy to Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```

#### **4. Deploy to Other Platforms**
- **Railway**: Connect GitHub, set environment variables
- **Render**: Create Web Service, set environment variables
- **Self-hosted**: Deploy Docker container or Node.js app

### Pre-Deployment Checklist
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Supabase RLS policies configured (if needed)
- [ ] Payment gateway credentials verified
- [ ] SSL certificates configured
- [ ] Email service configured
- [ ] Cloudinary API keys tested
- [ ] Performance optimized for production

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Guidelines
- Follow existing code style
- Write TypeScript for type-safety
- Test your changes thoroughly
- Update documentation as needed
- Keep commits atomic and descriptive

### Bug Reports
Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 💬 Support

For support and inquiries:

- 📨 **Email**: support@schoolmanagement.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/school-management/issues)
- 📖 **Documentation**: Complete docs in `/docs` directory
- 💬 **Discord**: [Join our community](https://discord.gg/yourserver)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [Supabase](https://supabase.com/) - Authentication & Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/ui](https://ui.shadcn.com/) - UI Components
- [SSLCommerz](https://www.sslcommerz.com/) - Payment Gateway
- All open-source contributors

---

## 📊 Project Statistics

- **Total Models**: 20+
- **API Endpoints**: 50+
- **User Roles**: 6
- **Components**: 100+
- **Total Routes**: 30+
- **Lines of Code**: 10,000+

---

<div align="center">

**Made with ❤️ for educational institutions**

[⬆ Back to top](#table-of-contents)

</div>
