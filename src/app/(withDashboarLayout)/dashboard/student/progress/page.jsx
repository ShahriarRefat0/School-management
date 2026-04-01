import StudentProgressClient from './_components/StudentProgressClient';

const ProgressPage = () => {
  return (
    <main className="min-h-screen py-8 px-4 md:px-8 bg-bg-page">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 rounded-4xl bg-bg-card border border-border-light p-6 md:p-8 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">
            Dashboard
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
            Learning <span className="text-primary italic">Progress</span>
          </h1>
          <p className="text-text-secondary mt-2 text-sm">
            Detailed analysis of your exam performance over time.
          </p>
        </header>
        <StudentProgressClient />
      </div>
    </main>
  );
};

export default ProgressPage;
