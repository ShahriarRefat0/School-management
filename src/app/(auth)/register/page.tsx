'use client';

import { GraduationCap } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-bg-card border border-border-light rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Left */}
      <div className="hidden md:flex flex-col justify-center p-10 bg-gradient-to-br from-indigo-500/20 to-primary/10">
        <GraduationCap size={48} className="text-primary mb-6" />
        <h2 className="text-3xl font-bold text-text-primary">
          Create Your Account
        </h2>
        <p className="text-sm text-text-muted mt-3">
          Join your school’s digital management system.
        </p>
      </div>

      {/* Right */}
      <div className="p-8 md:p-10">
        <h1 className="text-2xl font-bold text-text-primary">
          Register ✨
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Fill in the details below
        </p>

        <form className="space-y-4">
          <input
            placeholder="Full Name"
            className="w-full px-4 py-2.5 rounded-xl bg-bg-page border border-border-light
                       focus:border-primary outline-none"
          />

          <input
            placeholder="Email"
            className="w-full px-4 py-2.5 rounded-xl bg-bg-page border border-border-light
                       focus:border-primary outline-none"
          />

          <select
            className="w-full px-4 py-2.5 rounded-xl bg-bg-page border border-border-light
                       focus:border-primary outline-none"
          >
            <option>Principal</option>
            <option>Teacher</option>
            <option>Student</option>
            <option>Parent</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2.5 rounded-xl bg-bg-page border border-border-light
                       focus:border-primary outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2.5 rounded-xl bg-bg-page border border-border-light
                       focus:border-primary outline-none"
          />

          <button className="w-full py-3 rounded-xl bg-primary text-white font-semibold
                             hover:scale-[1.01] hover:shadow-lg transition mt-2">
            Create Account
          </button>
        </form>

        <p className="text-sm text-text-muted text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}