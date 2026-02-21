"use client";

import { Users, Activity, Calendar, Eye } from "lucide-react";

const stats = [
  {
    title: "Total Teachers",
    value: "48",
    subtitle: "Across 12 departments",
    icon: Users,
  },
  {
    title: "Avg Engagement",
    value: "91/100",
    subtitle: "Highest this academic year",
    icon: Activity,
  },
  {
    title: "Attendance Rate",
    value: "96.4%",
    subtitle: "Last 30 days",
    icon: Calendar,
  },
];

const teachers = [
  {
    name: "Dr. Meera Iyer",
    subject: "Physics",
    engagement: "High",
    status: "Active",
  },
  {
    name: "Rajesh Kumar",
    subject: "Mathematics",
    engagement: "High",
    status: "Active",
  },
  {
    name: "Anita Sharma",
    subject: "English",
    engagement: "Medium",
    status: "Active",
  },
  {
    name: "Vikram Patel",
    subject: "Chemistry",
    engagement: "High",
    status: "Active",
  },
];

export default function TeachersPage() {
  return (
    <div
      className="
        min-h-screen p-6 transition-colors
        bg-gray-50 text-gray-900
        dark:bg-gradient-to-br dark:from-[#050B18] dark:to-[#020617] dark:text-white
      "
    >
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="
              rounded-2xl p-6 flex justify-between items-center transition
              bg-white border border-gray-200
              dark:bg-white/5 dark:border-white/10
            "
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <h2 className="text-3xl font-bold mt-1">{stat.value}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.subtitle}
              </p>
            </div>
            <stat.icon className="w-8 h-8 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Teachers Directory */}
      <div
        className="
          rounded-2xl p-6 transition
          bg-white border border-gray-200
          dark:bg-white/5 dark:border-white/10
        "
      >
        <h2 className="text-lg font-semibold mb-1">Teachers Directory</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Read-only overview of all staff
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className="
                  border-b
                  text-gray-500 border-gray-200
                  dark:text-gray-400 dark:border-white/10
                "
              >
                <th className="py-3 text-left">Name</th>
                <th className="py-3 text-left">Subject</th>
                <th className="py-3 text-left">Engagement</th>
                <th className="py-3 text-left">Status</th>
                <th className="py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {teachers.map((t, i) => (
                <tr
                  key={i}
                  className="
                    border-b transition
                    border-gray-100 hover:bg-gray-50
                    dark:border-white/5 dark:hover:bg-white/5
                  "
                >
                  <td className="py-4 font-medium">{t.name}</td>
                  <td className="py-4 text-gray-500 dark:text-gray-400">
                    {t.subject}
                  </td>
                  <td
                    className={`py-4 font-medium ${
                      t.engagement === "High"
                        ? "text-green-600 dark:text-green-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {t.engagement}
                  </td>
                  <td className="py-4 text-green-600 dark:text-green-400">
                    {t.status}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      className="
                        inline-flex items-center gap-1 text-sm transition
                        text-gray-500 hover:text-gray-900
                        dark:text-gray-400 dark:hover:text-white
                      "
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}