'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Loader2,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useAuth } from '@/hooks/useAuth';

const getStatus = (score) => {
  if (score >= 80) {
    return {
      label: 'Excellent',
      comment: 'Outstanding',
      color: 'text-emerald-600 dark:text-emerald-300',
    };
  }
  if (score >= 60) {
    return {
      label: 'Good Job',
      comment: 'Improving',
      color: 'text-amber-600 dark:text-amber-300',
    };
  }
  return {
    label: 'Keep Practicing',
    comment: 'Needs Effort',
    color: 'text-rose-600 dark:text-rose-300',
  };
};

const StudentProgressClient = () => {
  const { user, loading: authLoading } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (authLoading) return;

      if (!user?.email) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/exams/submit?email=${encodeURIComponent(user.email)}`,
        );
        const data = await res.json();

        if (data.success) {
          const mapped = data.data.map((item, idx) => {
            const percentage = item.totalQuestions
              ? Math.round((item.totalMark / item.totalQuestions) * 100)
              : 0;

            return {
              name: `Exam ${idx + 1}`,
              score: percentage,
              subject: item.examSubject || 'Exam',
              submittedAt: item.submittedAt,
            };
          });

          setResults(mapped);
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user, authLoading]);

  const averageScore = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.round(
      results.reduce((sum, r) => sum + r.score, 0) / results.length,
    );
  }, [results]);

  const bestScore = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.max(...results.map((r) => r.score));
  }, [results]);

  const lowestScore = useMemo(() => {
    if (results.length === 0) return 0;
    return Math.min(...results.map((r) => r.score));
  }, [results]);

  const status = getStatus(averageScore);

  if (loading || authLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-bg-card rounded-4xl border border-border-light">
        <Loader2 className="animate-spin mb-3 text-primary" size={30} />
        <p className="text-text-secondary text-sm font-semibold">
          Analyzing your progress...
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="bg-bg-card rounded-4xl border border-border-light p-12 text-center">
        <BookOpen
          size={36}
          className="text-slate-300 dark:text-slate-500 mx-auto mb-3"
        />
        <p className="text-text-primary font-bold mb-1">No exam data yet</p>
        <p className="text-text-secondary text-sm">
          Complete at least one exam to see your performance analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 rounded-4xl border border-border-light bg-linear-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
          <p className="text-[10px] uppercase tracking-[0.18em] font-black text-blue-100">
            Performance Summary
          </p>
          <p className="text-4xl font-black mt-3">{averageScore}%</p>
          <p className={`mt-2 text-sm font-bold text-white/90`}>
            {status.label}
          </p>
          <p className="text-xs text-blue-100 mt-1">{status.comment}</p>
        </div>

        {[
          { icon: Target, label: 'Exams Taken', value: `${results.length}` },
          { icon: Zap, label: 'Best Score', value: `${bestScore}%` },
          { icon: Award, label: 'Lowest Score', value: `${lowestScore}%` },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-4xl border border-border-light bg-bg-card p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 text-text-muted mb-3">
              <card.icon size={14} />
              <p className="text-[10px] uppercase tracking-[0.15em] font-black">
                {card.label}
              </p>
            </div>
            <p className="text-3xl font-black text-text-primary">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-4xl border border-border-light bg-bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={16} className="text-primary" />
          <p className="text-xs font-black uppercase tracking-[0.15em] text-text-secondary">
            Score Trend
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={results} barCategoryGap="35%">
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 11 }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickFormatter={(value) => `${value}%`}
                width={36}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Score']}
                labelFormatter={(label, payload) =>
                  `${label} - ${payload?.[0]?.payload?.subject || 'Exam'}`
                }
              />
              <Bar dataKey="score" radius={[8, 8, 4, 4]} barSize={26}>
                {results.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill="#2563eb"
                    fillOpacity={
                      entry.score >= 80 ? 1 : entry.score >= 60 ? 0.75 : 0.5
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-4xl border border-border-light bg-bg-card p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.15em] text-text-muted mb-4">
          Latest Attempts
        </p>
        <div className="space-y-3">
          {results.slice(0, 5).map((item) => (
            <div
              key={`${item.name}-${item.submittedAt}`}
              className="flex items-center justify-between rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-transparent dark:border-slate-700/60 px-4 py-3"
            >
              <div>
                <p className="font-bold text-text-primary text-sm">
                  {item.subject}
                </p>
                <p className="text-xs text-text-muted">
                  {new Date(item.submittedAt).toLocaleDateString()}
                </p>
              </div>
              <p
                className={`font-black text-base ${getStatus(item.score).color}`}
              >
                {item.score}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProgressClient;
