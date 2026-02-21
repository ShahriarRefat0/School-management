"use client";

import { Plus, Eye, Send, Megaphone } from "lucide-react";

const announcements = [
  {
    title: "Annual Day Celebration — March 15",
    audience: "All",
    date: "Feb 12, 2026",
    status: "Published",
  },
  {
    title: "Parent-Teacher Meeting Schedule",
    audience: "Parents & Teachers",
    date: "Feb 10, 2026",
    status: "Draft",
  },
  {
    title: "Winter Break Extended Notice",
    audience: "All",
    date: "Jan 28, 2026",
    status: "Published",
  },
  {
    title: "New Library Resources Available",
    audience: "Students & Teachers",
    date: "Jan 25, 2026",
    status: "Draft",
  },
  {
    title: "Sports Day Registration Open",
    audience: "Students",
    date: "Jan 18, 2026",
    status: "Published",
  },
];

export default function AnnouncementsPage() {
  const publishedCount = announcements.filter(
    (a) => a.status === "Published"
  ).length;
  const draftCount = announcements.filter(
    (a) => a.status === "Draft"
  ).length;

  return (
    <div className="min-h-screen p-6 transition-colors
      bg-gray-50 text-gray-900
      dark:bg-gradient-to-br dark:from-[#050B18] dark:to-[#020617] dark:text-white
    ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {publishedCount} published · {draftCount} drafts
        </p>

        <button className="
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition
          bg-purple-600 hover:bg-purple-700 text-white
        ">
          <Plus size={16} />
          New Announcement
        </button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {announcements.map((item, i) => (
          <div
            key={i}
            className="
              flex justify-between items-center rounded-2xl p-5 transition
              bg-white border border-gray-200 hover:bg-gray-50
              dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10
            "
          >
            {/* Left */}
            <div className="flex items-start gap-3">
              <Megaphone className="w-5 h-5 text-gray-400 dark:text-gray-400 mt-1" />
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.audience} · {item.date}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-medium ${
                  item.status === "Published"
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {item.status}
              </span>

              <button className="
                flex items-center gap-1 text-sm transition
                text-gray-500 hover:text-gray-900
                dark:text-gray-400 dark:hover:text-white
              ">
                <Eye size={16} />
                View
              </button>

              {item.status === "Draft" && (
                <button className="
                  flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition
                  bg-purple-100 text-purple-700 hover:bg-purple-200
                  dark:bg-purple-600/20 dark:text-purple-400 dark:hover:bg-purple-600/30
                ">
                  <Send size={14} />
                  Publish
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}