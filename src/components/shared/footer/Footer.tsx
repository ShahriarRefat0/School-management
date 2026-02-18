'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Linkedin,
  Github,
  MapPin,
  Phone,
  Send,
  Smartphone,
  Monitor,
  Apple,
  LayoutTemplate,
  Chrome,
  Terminal,
  Grid2x2,
} from 'lucide-react';
import PlayStoreIcon from '@/components/icon/PlayStore';
import WindowsIcon from '@/components/icon/Windows';
import LinuxIcon from '@/components/icon/LinuxIcon';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-bg-card pt-20 pb-8 px-6 border-t border-border-light transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-307.5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.85 9.58l8.15 4.44 8.15-4.44L12 5.14 3.85 9.58z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-text-primary tracking-tight">
                Schoology <span className="text-primary">BD</span>
              </span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Leading the digital transformation of schools globally with
              innovative management tools and seamless experiences.
            </p>

            <div className="pt-4">
              <h4 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-4">
                Connect With Us
              </h4>
              <div className="flex gap-3">
                {[
                  {
                    icon: <Facebook size={18} />,
                    link: '#',
                    color: 'hover:bg-blue-600',
                  },
                  {
                    icon: <Linkedin size={18} />,
                    link: '#',
                    color: 'hover:bg-blue-700',
                  },
                  {
                    icon: <Github size={18} />,
                    link: '#',
                    color: 'hover:bg-blue-700',
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    className={`w-10 h-10 rounded-xl border border-border-light flex items-center justify-center text-text-muted transition-all duration-300 hover:text-white hover:border-transparent ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-5 flex items-center gap-2">
                <Smartphone size={20} className="text-primary" /> Mobile Apps
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <button className="flex items-center gap-3 bg-bg-page border border-border-light p-3 rounded-2xl hover:border-primary/50 transition-all group">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center">
                    <PlayStoreIcon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-text-muted leading-none">
                      Get it on
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      Google Play
                    </p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-bg-page border border-border-light p-3 rounded-2xl hover:border-primary/50 transition-all group">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Apple size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-text-muted leading-none">
                      Download on the
                    </p>
                    <p className="text-sm font-bold text-text-primary">
                      App Store
                    </p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-text-primary mb-5 flex items-center gap-2">
                <Monitor size={20} className="text-primary" /> Desktop Apps
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Windows', icon: <WindowsIcon size={16} /> },
                  { name: 'macOS', icon: <Apple size={16} /> },
                  { name: 'Linux', icon: <Terminal size={16} /> },
                  { name: 'Chrome', icon: <Chrome size={16} /> },
                ].map((app) => (
                  <button
                    key={app.name}
                    className="flex items-center gap-2 bg-secondary/50 border border-border-light px-3 py-2 rounded-xl text-xs font-bold text-text-secondary hover:text-primary hover:border-primary transition-all"
                  >
                    {app.icon} {app.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <h3 className="text-lg font-bold text-text-primary mb-6">
              Information
            </h3>
            <ul className="space-y-4">
              {[
                'About Schoology',
                'Blogs & News',
                'Success Stories',
                'Exam Suite',
                'Hostel & Transport',
                'Contact Us',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-text-secondary font-medium hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-6">
                Newsletter
              </h3>
              <p className="text-sm text-text-muted mb-4">
                Stay updated with the latest features.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-bg-page border border-border-light rounded-2xl py-4 px-5 focus:outline-none focus:border-primary text-text-primary transition-all"
                />
                <button className="absolute right-2 top-2 p-2.5 bg-primary text-white rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all">
                  <Send size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4 border-t border-border-light pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0" size={18} />
                <span className="text-sm text-text-secondary">
                  103, Oxford House, Manchester, UK
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span className="text-sm font-bold text-text-primary">
                  +880 1234 567 890
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 border-t border-border-light overflow-x-auto scrollbar-hide">
          <div className="flex items-center justify-between min-w-200 opacity-60 hover:opacity-100 transition-opacity">
            <div className="text-xs font-black tracking-widest text-text-muted uppercase">
              Forbes Featured
            </div>
            <div className="text-xs font-black tracking-widest text-text-muted uppercase">
              Capterra Rated 4.8
            </div>
            <div className="text-xs font-black tracking-widest text-text-muted uppercase">
              AppStore Foundations
            </div>
            <div className="text-xs font-black tracking-widest text-text-muted uppercase">
              QS Reimagine Education
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-text-muted text-sm font-medium">
            © {new Date().getFullYear()}{' '}
            <span className="text-text-primary font-bold">
              Schoology BD Inc.
            </span>{' '}
            All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {['Visa', 'Mastercard', 'bKash', 'Nagad'].map((pay) => (
              <span
                key={pay}
                className="px-3 py-1 bg-bg-page border border-border-light rounded-lg text-[10px] font-black text-text-muted uppercase tracking-tighter"
              >
                {pay}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

const PlayCircle = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 3.5L19 12L5 20.5V3.5Z" fill="currentColor" />
  </svg>
);

export default Footer;
