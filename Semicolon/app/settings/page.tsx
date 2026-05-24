"use client";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black p-6 md:p-10 text-white">
      
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold md:text-5xl">
          Settings
        </h1>

        <p className="mt-2 text-sm text-slate-400 md:mt-4 md:text-base">
          Manage your preferences and account settings.
        </p>

        <div className="mt-8 space-y-6 md:mt-10">
          
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8">
            <h2 className="text-xl font-bold md:text-2xl">
              Export Reports
            </h2>

            <p className="mt-2 text-sm text-slate-400 md:mt-3 md:text-base">
              Download monthly summaries and analytics reports.
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}