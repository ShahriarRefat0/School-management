"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    Headphones,
    Mail,
    FileText,
    Phone,
    ArrowRight,
    MessageCircle,
    HelpCircle,
    ChevronDown,
    Send
} from "lucide-react";
import Link from "next/link";

const Support = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const supportOptions = [
        {
            icon: <FileText className="w-8 h-8 text-blue-500" />,
            title: "Knowledge Base",
            description: "Browse through our extensive documentation and user guides.",
            action: "Read Articles",
            link: "/docs",
            color: "bg-blue-50 dark:bg-blue-900/10",
            borderColor: "border-blue-100 dark:border-blue-500/20",
            hoverBorder: "group-hover:border-blue-500 dark:group-hover:border-blue-400",
        },
        {
            icon: <Mail className="w-8 h-8 text-purple-500" />,
            title: "Email Support",
            description: "Get in touch with our team for detailed assistance via email.",
            action: "Send Email",
            link: "mailto:support@school.com",
            color: "bg-purple-50 dark:bg-purple-900/10",
            borderColor: "border-purple-100 dark:border-purple-500/20",
            hoverBorder: "group-hover:border-purple-500 dark:group-hover:border-purple-400",
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-teal-500" />,
            title: "Live Chat",
            description: "Chat with our support agents for real-time help (9 AM - 5 PM).",
            action: "Start Chat",
            link: "#",
            color: "bg-teal-50 dark:bg-teal-900/10",
            borderColor: "border-teal-100 dark:border-teal-500/20",
            hoverBorder: "group-hover:border-teal-500 dark:group-hover:border-teal-400",
        },
        {
            icon: <Phone className="w-8 h-8 text-amber-500" />,
            title: "Phone Support",
            description: "Call us directly for urgent matters and immediate resolution.",
            action: "+1 (555) 123-4567",
            link: "tel:+15551234567",
            color: "bg-amber-50 dark:bg-amber-900/10",
            borderColor: "border-amber-100 dark:border-amber-500/20",
            hoverBorder: "group-hover:border-amber-500 dark:group-hover:border-amber-400",
        },
    ];

    const faqs = [
        {
            question: "How do I reset my password?",
            answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email address."
        },
        {
            question: "How can I view my child's attendance?",
            answer: "Log in to the parent portal, navigate to the 'Attendance' section, and select your child's name to view their detailed attendance records."
        },
        {
            question: "How do I contact my child's teacher?",
            answer: "You can send a message directly through the 'Messages' tab in the portal or find their email address in the 'Directory' section."
        },
        {
            question: "Can I download exam results?",
            answer: "Yes, exam results are available in the 'Academics' section. You can download them as PDF files."
        },
        {
            question: "What are the support hours?",
            answer: "Our support team is available Monday to Friday from 9 AM to 5 PM EST. Emergency support is available 24/7."
        }
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden bg-bg-page transition-colors duration-300">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[10%] right-[5%] w-72 h-72 bg-purple-400/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20 dark:text-indigo-400 text-sm font-medium mb-4">
                        <Headphones size={14} />
                        <span>24/7 Support Center</span>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-bold text-text-primary mb-6">
                        Need Help? We've Got You <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">Covered</span>
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Our dedicated support team is here to assist you with any questions or issues. Choose the channel that works best for you.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {supportOptions.map((option, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className={`group relative p-8 rounded-2xl border ${option.borderColor} bg-white dark:bg-slate-900/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 dark:hover:bg-slate-800/80 cursor-pointer`}
                        >
                            {/* Hover Border Effect */}
                            <div className={`absolute inset-0 rounded-2xl border-2 border-transparent ${option.hoverBorder} opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none`} />

                            <div className={`w-16 h-16 rounded-xl ${option.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {option.icon}
                            </div>

                            <h3 className="text-xl font-bold text-text-primary mb-3">{option.title}</h3>
                            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                                {option.description}
                            </p>

                            <Link href={option.link} className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {option.action} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Contact and FAQ Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
                >
                    {/* Contact Form */}
                    <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5 dark:shadow-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                        <div className="relative z-10">
                            <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider text-xs uppercase mb-3 block">SUBMIT A REQUEST</span>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Get in touch</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">Fill in the details below and our team will respond as soon as possible.</p>

                            <form className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="John Doe"
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label htmlFor="role" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Select Role</label>
                                        <div className="relative">
                                            <select
                                                id="role"
                                                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Select Role</option>
                                                <option value="student">Student</option>
                                                <option value="parent">Parent</option>
                                                <option value="teacher">Teacher</option>
                                                <option value="other">Other</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            placeholder="How can we help?"
                                            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder="Describe your issue or question..."
                                        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none shadow-sm"
                                    ></textarea>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2 group transform active:scale-[0.98]"
                                >
                                    <Send size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* FAQ Links */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div>
                            <span className="text-blue-600 dark:text-blue-500 font-bold tracking-wider text-xs uppercase mb-3 block">FAQS</span>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Common questions</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-lg">Quick answers to the questions we get asked most.</p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={false}
                                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-500/30 shadow-lg shadow-blue-500/5' : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700'}`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="flex items-center justify-between w-full p-6 text-left"
                                    >
                                        <span className={`font-semibold text-lg ${openFaq === index ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`p-2 rounded-full transition-colors duration-300 ${openFaq === index ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                            <ChevronDown
                                                className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                                                size={20}
                                            />
                                        </div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-500/10 flex items-start gap-4 shadow-sm">
                            <div className="p-3 rounded-xl bg-white dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 shrink-0 shadow-sm dark:shadow-none">
                                <HelpCircle size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Still need help?</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Can't find the answer you're looking for? Our team is available to help you.</p>
                                <Link href="/contact" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 transition-colors">
                                    Visit Contact Page <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Support;
