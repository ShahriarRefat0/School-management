import { ReactNode } from 'react';

export default function PrincipalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-page">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border-light bg-bg-card">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border-light">
          <h2 className="text-lg font-bold text-primary">
            Schoology BD
          </h2>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2 text-sm">
          <MenuItem label="Dashboard" active />
          <MenuItem label="Students" />
          <MenuItem label="Teachers" />
          <MenuItem label="Attendance" />
          <MenuItem label="Finance" />
          <MenuItem label="Reports" />
          <MenuItem label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-bg-card border-b border-border-light flex items-center justify-between px-6">
          <div>
            <p className="text-sm text-text-muted">Welcome back</p>
            <p className="font-semibold text-text-primary">
              Principal Panel
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-text-muted hover:text-text-primary">
              🔔
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
              P
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ---------- Menu Item Component ---------- */
function MenuItem({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`px-4 py-2 rounded-lg cursor-pointer transition
        ${
          active
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-text-muted hover:bg-bg-page hover:text-text-primary'
        }`}
    >
      {label}
    </div>
  );
}
