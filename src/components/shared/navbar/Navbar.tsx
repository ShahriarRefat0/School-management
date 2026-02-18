'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, GraduationCap, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Only track sections on the home page
      if (pathname === '/') {
        const sections = ['features', 'contact'];

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    } else {
      window.location.href = href;
    }
  };

  if (!mounted)
    return <div className="h-20 bg-bg-page border-b border-border-light"></div>;

  const navLinks = [
    { name: 'Features', href: '/#features', id: 'features' },
    { name: 'Gallery', href: '/gallery', id: 'gallery' },
    { name: 'Support', href: '/Support', id: 'support' },
    { name: 'Notice', href: '/#notice', id: 'notice' },
    { name: 'Contact Us', href: '/#contact', id: 'contact' },
  ];

  // Check if a link is active
  const isLinkActive = (link: (typeof navLinks)[0]) => {
    // For home page sections
    if (link.href.includes('#')) {
      const sectionId = link.href.split('#')[1];
      // On home page and section is active
      if (pathname === '/' && activeSection === sectionId) {
        return true;
      }
      // On home page but no section active (top of page) - Features should be active by default?
      // You can decide which section should be default
      return false;
    }
    // For regular pages
    else {
      return pathname === link.href;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-bg-card/80 backdrop-blur-md border-b border-border-light transition-colors duration-300">
      <div className="max-w-325 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-primary p-2 rounded-xl shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary tracking-tight">
              Schoology<span className="text-primary">BD</span>
            </span>
          </Link>

          {/* Desktop Links with Active State */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`text-sm font-semibold transition-colors relative ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-bg-page border border-border-light text-text-secondary hover:text-primary hover:border-primary/30 transition-all active:scale-90"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Login */}
            <Link
              href="/login"
              className="hidden sm:block text-sm font-bold text-text-secondary hover:text-primary px-4 py-2 transition-colors"
            >
              Login
            </Link>

            {/* Get Started Button */}
            <button className="hidden md:flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 shadow-lg shadow-primary/20 active:scale-95 transition-all">
              Get Started <ArrowRight size={16} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-text-secondary hover:bg-bg-page rounded-lg transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-bg-card border-b border-border-light animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-2 pb-8 space-y-4">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`block text-lg font-semibold border-b border-border-light/50 py-3 ${
                    isActive ? 'text-primary' : 'text-text-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login"
                className="w-full text-center py-3.5 rounded-2xl bg-bg-page border border-border-light text-text-primary font-bold"
              >
                Login
              </Link>
              <button className="w-full bg-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/20">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
