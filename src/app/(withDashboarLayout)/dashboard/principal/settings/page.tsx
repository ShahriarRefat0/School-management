"use client";

import { useState } from "react";
import { User, Bell } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    weeklyReports: true,
    pendingApprovals: true,
    attendanceAlerts: false,
    financeUpdates: true,
  });

  return (
    <div
      className="
        min-h-screen p-6
        bg-gray-50 text-gray-900
        dark:bg-gradient-to-br dark:from-[#050B18] dark:to-[#020617] dark:text-white
      "
    >
      {/* Profile Information */}
      <div
        className="
          rounded-2xl p-6 mb-8
          bg-white border border-gray-200
          dark:bg-white/5 dark:border-white/10
        "
      >
        <div className="flex items-center gap-2 mb-6">
          <User className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold">Profile Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" value="Dr. Ramesh Gupta" />
          <Input label="Email" value="principal@edumanage.in" />
          <Input label="Phone" value="+91 98765 43210" />
          <Input label="Role" value="Principal" disabled />
        </div>

        <button
          className="
            mt-6 px-5 py-2.5 rounded-xl font-medium transition
            bg-purple-600 text-white hover:bg-purple-700
          "
        >
          Save Changes
        </button>
      </div>

      {/* Notification Preferences */}
      <div
        className="
          rounded-2xl p-6
          bg-white border border-gray-200
          dark:bg-white/5 dark:border-white/10
        "
      >
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-semibold">Notification Preferences</h2>
        </div>

        <div className="space-y-5">
          <Toggle
            label="Email me weekly reports"
            enabled={notifications.weeklyReports}
            onChange={() =>
              setNotifications({
                ...notifications,
                weeklyReports: !notifications.weeklyReports,
              })
            }
          />
          <Toggle
            label="Alert on pending approvals"
            enabled={notifications.pendingApprovals}
            onChange={() =>
              setNotifications({
                ...notifications,
                pendingApprovals: !notifications.pendingApprovals,
              })
            }
          />
          <Toggle
            label="Attendance anomaly alerts"
            enabled={notifications.attendanceAlerts}
            onChange={() =>
              setNotifications({
                ...notifications,
                attendanceAlerts: !notifications.attendanceAlerts,
              })
            }
          />
          <Toggle
            label="Finance collection updates"
            enabled={notifications.financeUpdates}
            onChange={() =>
              setNotifications({
                ...notifications,
                financeUpdates: !notifications.financeUpdates,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Input({
  label,
  value,
  disabled = false,
}: {
  label: string;
  value: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-500 dark:text-gray-400">
        {label}
      </label>
      <input
        value={value}
        disabled={disabled}
        className="
          w-full rounded-xl px-4 py-3 text-sm outline-none transition
          bg-gray-100 border border-gray-200
          dark:bg-white/10 dark:border-white/10
          disabled:opacity-60
        "
        readOnly
      />
    </div>
  );
}

function Toggle({
  label,
  enabled,
  onChange,
}: {
  label: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <button
        onClick={onChange}
        className={`
          w-12 h-6 rounded-full transition relative
          ${enabled ? "bg-indigo-500" : "bg-gray-300 dark:bg-white/20"}
        `}
      >
        <span
          className={`
            absolute top-0.5 h-5 w-5 rounded-full bg-white transition
            ${enabled ? "right-0.5" : "left-0.5"}
          `}
        />
      </button>
    </div>
  );
}