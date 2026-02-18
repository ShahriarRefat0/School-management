'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Bell,
  ArrowRight,
  X,
  User,
  Tag,
  FileText,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react';
import { Notice } from '@/types/notice';
import { motion, AnimatePresence } from 'framer-motion';

const dummyNotices: Notice[] = [
  {
    id: '1',
    title: 'Annual Sports Competition 2026',
    date: 'February 15, 2026',
    description:
      'Prepare for our annual sports event. Registration starts from next Monday.',
    category: 'Event',
    details: {
      venue: 'School Sports Complex, Main Ground',
      time: '9:00 AM - 5:00 PM',
      organizer: 'Sports Department',
      contactPerson: 'Mr. Karim (Sports Teacher)',
      contactNumber: '+123 5557 890',
      registrationDeadline: 'February 20, 2026',
      participants: 'Students from Class 3-12',
      prizes: 'Trophies, Medals, and Certificates for winners',
    },
  },
  {
    id: '2',
    title: 'Mid-term Examination Schedule',
    date: 'February 12, 2026',
    description:
      'The schedule for the upcoming mid-term exams has been published. Please check your dashboard.',
    category: 'Academic',
    details: {
      examPeriod: 'March 1-15, 2026',
      guidelines: 'Bring own stationery, no electronic devices allowed',
      contactPerson: "Vice Principal's Office",
      contactNumber: '+123 5557 891',
      resultDate: 'March 25, 2026',
      subjects: 'Mathematics, Science, English, Bengali, Social Studies',
    },
  },
  {
    id: '3',
    title: 'Holiday Notice: Martyr Day',
    date: 'February 10, 2026',
    description:
      'The school will remain closed on February 21st in observance of Martyr Day.',
    category: 'Holiday',
    details: {
      holidayDate: 'February 21, 2026 (Monday)',
      reason: 'International Mother Language Day / Martyr Day',
      nextWorkingDay: 'February 22, 2026 (Tuesday)',
      note: 'Students are encouraged to participate in local tribute events',
    },
  },
  {
    id: '4',
    title: 'New Library Books Added',
    date: 'February 08, 2026',
    description:
      'Over 500 new science and literature books have been added to our central library.',
    category: 'Administrative',
    details: {
      bookCount: '542 new books',
      categories: 'Science, Literature, History, Art, Reference',
      borrowingLimit: '3 books for 2 weeks',
      librarian: 'Mrs. Fatema Begum',
      contactNumber: '+123 5557 892',
      libraryHours: '9:00 AM - 5:00 PM (Sun-Thu)',
    },
  },
  {
    id: '5',
    title: 'Parent-Teacher Meeting',
    date: 'February 05, 2026',
    description:
      'A parent-teacher meeting for Class 6-10 will be held on coming Friday at 10:00 AM.',
    category: 'Academic',
    details: {
      date: 'February 24, 2026',
      time: '10:00 AM - 1:00 PM',
      venue: 'School Auditorium',
      classes: '6, 7, 8, 9, 10',
      coordinator: 'Academic Coordinator Office',
      contactNumber: '+123 5557 893',
      important: 'Report cards will be distributed',
    },
  },
];

const categoryColors = {
  Academic: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  Holiday: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  Event: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  Administrative:
    'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
};

const NoticeBoard = () => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedNotice(null), 300);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <section
      id="notice"
      className="py-20 bg-bg-page border-border-light transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <p className="text-primary font-bold tracking-[0.2em] text-[11px] uppercase mb-3">
            Stay Updated
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Notice <span className="text-primary">Board</span>
          </h2>
          <div className="w-12 h-1 bg-primary mt-4 rounded-full" />
        </div>

        {/* Notice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyNotices.map((notice) => (
            <div
              key={notice.id}
              className="group bg-bg-card border border-border-light p-6 rounded-2xl hover:border-primary/30 transition-all duration-300 shadow-sm cursor-pointer"
              onClick={() => openModal(notice)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  {/* Category and Date */}
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full ${categoryColors[notice.category as keyof typeof categoryColors] || 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
                    >
                      {notice.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {notice.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                    {notice.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                    {notice.description}
                  </p>

                  {/* Details Button */}
                  <button className="flex items-center gap-2 text-[12px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 uppercase tracking-widest pt-2">
                    Read More <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl bg-bg-page border border-border-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(notice);
                  }}
                >
                  <Bell className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Notices Button */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10">
            View All Notices
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedNotice && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Container */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
              onClick={closeModal}
            >
              {/* Modal Content - Single Card without scroll */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="bg-bg-card border border-border-light rounded-2xl shadow-2xl max-w-2xl w-auto min-w-[320px] pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="border-b border-border-light p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div>
                        <span
                          className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full inline-block mb-2 ${categoryColors[selectedNotice.category as keyof typeof categoryColors]}`}
                        >
                          {selectedNotice.category}
                        </span>
                        <h3 className="text-xl font-bold text-text-primary">
                          {selectedNotice.title}
                        </h3>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-10 h-10 rounded-xl bg-bg-page border border-border-light flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Body - No scroll, fits in one card */}
                <div className="p-6">
                  <div className="space-y-5">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-text-muted bg-bg-page border border-border-light rounded-xl px-4 py-3">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        {selectedNotice.date}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="bg-bg-page border border-border-light rounded-xl p-4">
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {selectedNotice.description}
                      </p>
                    </div>

                    {/* Key Details - 2 Column Grid */}
                    {selectedNotice.details && (
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(selectedNotice.details)
                          .slice(0, 4)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className="bg-bg-page border border-border-light rounded-xl p-3"
                            >
                              <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1">
                                {key
                                  .replace(/([A-Z])/g, ' $1')
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </p>
                              <p className="text-xs text-text-primary font-medium truncate">
                                {value}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Contact Info if available */}
                    {(selectedNotice.details?.contactPerson ||
                      selectedNotice.details?.contactNumber) && (
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                        <h4 className="text-xs font-bold text-text-primary mb-2 flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-primary" />
                          Contact Information
                        </h4>
                        <div className="space-y-1.5 text-xs">
                          {selectedNotice.details?.contactPerson && (
                            <p className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-text-muted" />
                              <span className="text-text-secondary">
                                {selectedNotice.details.contactPerson}
                              </span>
                            </p>
                          )}
                          {selectedNotice.details?.contactNumber && (
                            <p className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-text-muted" />
                              <span className="text-text-secondary">
                                {selectedNotice.details.contactNumber}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Location/Venue if available */}
                    {selectedNotice.details?.venue && (
                      <div className="flex items-center gap-2 text-xs bg-bg-page border border-border-light rounded-xl p-3">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span className="text-text-secondary">
                          {selectedNotice.details.venue}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-border-light p-6 flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 border border-border-light rounded-xl font-bold text-xs hover:bg-bg-page transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-5 py-2.5 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
                    Mark as Read
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NoticeBoard;
