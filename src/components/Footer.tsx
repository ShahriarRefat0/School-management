import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-bg-page pt-16 pb-10 px-6 border-t border-border-light">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* ১. লোগো এবং ব্র্যান্ড নাম */}
        <div className="flex items-center gap-3 mb-8 group cursor-pointer">
          <div className="bg-primary p-2 rounded-xl shadow-sm transition-transform group-hover:scale-105">
            <svg 
              className="w-6 h-6 text-white" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.85 9.58l8.15 4.44 8.15-4.44L12 5.14 3.85 9.58z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-text-dark tracking-tight">
            Schoology <span className="text-primary">BD</span>
          </span>
        </div>

        {/* ২. নেভিগেশন লিঙ্কস */}
        <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12 text-text-body font-medium">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#support" className="hover:text-primary transition-colors">Support</a>
          <a href="#privacy" className="hover:text-primary transition-colors">Privacy</a>
        </nav>

        {/* ৩. ডিভাইডার (ঐচ্ছিক কিন্তু সুন্দর দেখায়) */}
        <div className="w-full max-w-4xl h-px bg-border-light mb-8"></div>

        {/* ৪. কপিরাইট এবং ক্রেডিট */}
        <div className="text-center space-y-2">
          <p className="text-text-muted text-sm font-medium">
            © {new Date().getFullYear()} Schoology BD. All rights reserved.
          </p>
          <p className="text-text-muted/70 text-xs italic">
            Made with <span className="text-error">❤</span> for excellence in smart schools.
          </p>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-40">
        <button 
          aria-label="Chat Support"
          className="bg-primary hover:bg-primary-hover text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group"
        >
          <svg 
            className="w-7 h-7" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-text-dark text-white text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need help?
          </span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;