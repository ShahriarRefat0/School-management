"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // যদি তোমার custom Button থাকে
import { Input } from "@/components/ui/input";   // যদি তোমার custom Input থাকে
import { UserPlus, Save, X } from "lucide-react";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddStudentModal({ isOpen, onClose }: AddStudentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-bg-card w-full max-w-xl rounded-xl border border-border-light shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <UserPlus size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Add New Student</h2>
              <p className="text-sm text-text-muted">
                Fill in the details to register a new student.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-bg-page transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">Full Name</label>
              <Input placeholder="e.g. Zahirul Islam" required className="rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">Student ID</label>
              <Input placeholder="Auto generated" disabled className="rounded-xl opacity-60" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">Class</label>
              <Input placeholder="e.g. X" required className="rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">Section</label>
              <Input placeholder="e.g. A" required className="rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">Roll Number</label>
              <Input placeholder="e.g. 05" required className="rounded-xl" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">Parent Phone</label>
              <Input type="tel" placeholder="+880 1XXX XXXXXX" required className="rounded-xl" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-text-secondary ml-1">Mailing Address</label>
            <Input placeholder="Full residential address" required className="rounded-xl" />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border-light">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl font-bold flex items-center gap-2"
            >
              <X size={16} /> Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl font-bold bg-primary hover:bg-primary/90 flex items-center gap-2"
            >
              <Save size={16} /> {isSubmitting ? "Saving..." : "Save Student"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}