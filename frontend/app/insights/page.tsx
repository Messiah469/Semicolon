export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="text-5xl font-bold">
        AI Insights
      </h1>

      <p className="mt-4 text-slate-400">
        AI-generated recommendations based on your spending behavior.
      </p>

      <div className="mt-10 space-y-6">

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold text-blue-400">
            Food Spending Increased
          </h2>

          <p className="mt-4 text-slate-300">
            Your food delivery expenses increased by 28% this month.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold text-purple-400">
            Subscription Alert
          </h2>

          <p className="mt-4 text-slate-300">
            Netflix, Spotify, and YouTube Premium recurring subscriptions detected.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
          <h2 className="text-2xl font-bold text-green-400">
            Savings Improvement
          </h2>

          <p className="mt-4 text-slate-300">
            Your savings ratio improved compared to last month.
          </p>
        </div>

      </div>

    </main>
  );
}