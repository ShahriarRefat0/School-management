"use client";
import React from 'react';
import { GraduationCap, Construction } from 'lucide-react';

export default function ResultsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fadeIn">
            <div className="w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-3xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                <GraduationCap size={48} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-text-primary">Enter Results</h1>
                <p className="text-text-muted mt-2 max-w-md mx-auto">
                    Input and manage exam scores and performance reports for your students.
                </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-bold border border-amber-200 dark:border-amber-800">
                <Construction size={16} /> Under Construction
            </div>
        </div>
    );
}
