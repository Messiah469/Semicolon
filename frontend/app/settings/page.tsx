export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="text-5xl font-bold">
        Settings
      </h1>

      <p className="mt-4 text-slate-400">
        Manage your preferences and account settings.
      </p>

      <div className="mt-10 space-y-6">

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold">
            Notifications
          </h2>

          <p className="mt-3 text-slate-400">
            Enable alerts for unusual transactions and spending spikes.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold">
            Export Reports
          </h2>

          <p className="mt-3 text-slate-400">
            Download monthly summaries and analytics reports.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold">
            Security
          </h2>

          <p className="mt-3 text-slate-400">
            Secure your account and manage privacy settings.
          </p>
        </div>

      </div>

    </main>
  );
}
