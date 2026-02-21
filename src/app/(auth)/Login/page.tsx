'use client';

import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export default function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-bg-card border border-border-light rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Left Branding */}
      <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-primary/20 to-indigo-500/10">
        <div>
          <GraduationCap size={48} className="text-primary mb-6" />
          <h2 className="text-3xl font-bold text-text-primary leading-tight">
            School <br /> Management System
          </h2>
          <p className="text-sm text-text-muted mt-3 max-w-sm">
            Manage academics, attendance and performance from one powerful dashboard.
          </p>
        </div>

        <p className="text-xs text-text-muted">
          © 2026 Your School Platform
        </p>
      </div>

      {/* Right Form */}
      <div className="p-8 md:p-10">
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome Back 👋
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Login to continue
        </p>

        <form className="space-y-5">
          <div>
            <label className="text-sm text-text-muted">
              Email / Username
            </label>
            <input
              className="mt-1 w-full px-4 py-2.5 rounded-xl bg-bg-page border border-border-light
                         focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="admin@school.com"
            />
          </div>

          <div>
            <label className="text-sm text-text-muted">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={show ? 'text' : 'password'}
                className="w-full px-4 py-2.5 rounded-xl bg-bg-page border border-border-light
                           focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-3 text-text-muted"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end text-sm">
            <a href="#" className="text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <button className="w-full py-3 rounded-xl bg-primary text-white font-semibold
                             hover:scale-[1.01] hover:shadow-lg transition">
            Login
          </button>
        </form>

        <p className="text-sm text-text-muted text-center mt-6">
          Don’t have an account?{' '}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}