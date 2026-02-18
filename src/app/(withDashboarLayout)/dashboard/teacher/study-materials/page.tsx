"use client";
import React from 'react';
import { Upload, Construction } from 'lucide-react';

export default function StudyMaterialsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fadeIn">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Upload size={48} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-text-primary">Upload Study Materials</h1>
                <p className="text-text-muted mt-2 max-w-md mx-auto">
                    Share lecture notes, assignments, and reading resources with your students.
                </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-bold border border-amber-200 dark:border-amber-800">
                <Construction size={16} /> Under Construction
            </div>
        </div>
    );
}
