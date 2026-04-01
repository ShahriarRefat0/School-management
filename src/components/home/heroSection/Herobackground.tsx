const Herobackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-50 dark:bg-[#1e1e62]">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        // Using current color for the grid lines
      />
      
      {/* Added a helper div for grid color management because linear-gradient with currentColor can be tricky in some contexts */}
      <div
        className="absolute inset-0 opacity-[0.1] dark:opacity-[0.08] text-slate-300 dark:text-white"
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] text-slate-400 dark:text-white"
        style={{
          backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-400/10 dark:bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-transparent via-blue-500/5 dark:via-blue-900/10 to-transparent" />
    </div>
  );
};

export default Herobackground;
