"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/shared/logo/logo";

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
    <nav className="sticky top-0 z-50 bg-bg-card/80 backdrop-blur-md border-b border-border-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ১. লোগো সেকশন - এখানে text-text-dark নিশ্চিত করা হয়েছে */}
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-primary p-2 rounded-lg shadow-sm group-hover:rotate-3 transition-transform">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.85 9.58l8.15 4.44 8.15-4.44L12 5.14 3.85 9.58z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-text-primary tracking-tight">
                Schoology <span className="text-primary">BD</span>
              </span>
            </div>
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
        <div className="md:hidden bg-bg-card border-b border-border-light shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {["Features", "Pricing", "Support", "Privacy"].map((item) => (
  <Link
    key={item}
    href={`/${item.toLowerCase()}`}
    className="text-text-secondary font-semibold hover:text-primary transition-colors relative group"
  >
    {item}
  </Link>
))}

            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl">
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
