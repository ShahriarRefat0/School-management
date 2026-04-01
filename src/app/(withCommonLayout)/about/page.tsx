'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, GraduationCap, Building2, Globe, ShieldCheck } from 'lucide-react';

const StatsCard = ({ icon: Icon, value, label, delay = 0 }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-bg-card/40 backdrop-blur-xl border border-border-light p-6 rounded-3xl text-center group hover:border-primary/30 transition-all duration-300 shadow-sm"
  >
    <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
      <Icon className="w-7 h-7" />
    </div>
    <h4 className="text-3xl font-black text-text-primary mb-1">{value}</h4>
    <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">{label}</p>
  </motion.div>
);

const AboutPage = () => {
  return (
    <main className="bg-bg-page min-h-screen transition-colors duration-300 overflow-hidden relative">
      {/* Background Ambient Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -left-32 top-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pb-32">
        {/* --- Hero Section --- */}
        <div className="pt-32 pb-20 md:pt-40 md:pb-32 text-center max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              Empowering Education
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-secondary leading-tight mb-6 tracking-tight">
              Transforming the Future <br className="hidden md:block" /> of Global Education
            </h1>
            <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Schoology is a complete, next-generation school management system designed to make digital transformation seamless, secure, and accessible for everyone.
            </p>
          </motion.div>
        </div>

        {/* --- Stats Section --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-32 relative z-10">
          <StatsCard icon={Building2} value="500+" label="Schools" delay={0.1} />
          <StatsCard icon={Users} value="250k+" label="Students" delay={0.2} />
          <StatsCard icon={GraduationCap} value="10k+" label="Teachers" delay={0.3} />
          <StatsCard icon={Globe} value="12+" label="Countries" delay={0.4} />
        </div>

        {/* --- Mission & Vision --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-32 relative z-10">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-bg-card to-bg-page border border-border-light p-10 md:p-14 rounded-[3rem] shadow-lg shadow-black/5 group hover:border-primary/20 transition-colors"
          >
            <div className="w-16 h-16 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-text-primary mb-6 tracking-tight">Our Mission</h3>
            <p className="text-text-secondary leading-relaxed text-lg mb-6">
              Our mission is to bridge the gap between technology and education by providing institutions with an intuitive, scalable, and highly secure platform. 
            </p>
            <p className="text-text-secondary leading-relaxed text-lg">
              We empower administrative bodies, teachers, and parents to collaborate seamlessly, ensuring that students remain the primary focus of every educational journey.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-bl from-bg-card to-bg-page border border-border-light p-10 md:p-14 rounded-[3rem] shadow-lg shadow-black/5 group hover:border-primary/20 transition-colors"
          >
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-text-primary mb-6 tracking-tight">Our Vision</h3>
            <p className="text-text-secondary leading-relaxed text-lg mb-6">
              We envision a fully connected digital ecosystem where geographical boundaries do not limit access to quality education management.
            </p>
            <p className="text-text-secondary leading-relaxed text-lg">
              By continuously innovating and integrating AI, we aim to become the universal standard for smart schooling, nurturing a generation ready for tomorrow's challenges.
            </p>
          </motion.div>
        </div>

        {/* --- Core Values --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <span className="text-primary font-bold tracking-[0.2em] text-[11px] uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-primary leading-tight mb-6 tracking-tight">
            Built on Trust, <br /> Engineering Excellence
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              title: "Unmatched Security",
              desc: "Enterprise-grade encryption and cloud backups keep your data protected 24/7.",
              icon: ShieldCheck,
              color: "text-purple-600",
              bgColor: "bg-purple-500/10"
            },
            {
              title: "Continuous Innovation",
              desc: "We regularly update our features based on modern educational methodologies and feedback.",
              icon: Target,
              color: "text-rose-600",
              bgColor: "bg-rose-500/10"
            },
            {
              title: "Global Community",
              desc: "Join an expanding network of diverse institutions transforming education worldwide.",
              icon: Globe,
              color: "text-amber-600",
              bgColor: "bg-amber-500/10"
            }
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-bg-card/40 backdrop-blur-xl border border-border-light p-8 rounded-[2rem] hover:border-primary/20 hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${value.bgColor} ${value.color}`}>
                <value.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-text-primary mb-3 drop-shadow-sm">{value.title}</h4>
              <p className="text-text-secondary leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default AboutPage;
