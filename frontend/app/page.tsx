export default function Home() {
  return (
    <main className="relative min-h-screen overflown-hidden bg-black text-white">
      <div className="absolute left-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-blue-600/20 blur-3xl"></div>

      <div className="absolute right-[-120px] top-[400px] h-[320px] w-[320px] rounded-full bg-purple-600/20 blur-3xl"></div>

      <div className="absolute bottom-[-100px] left-[40%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl"></div>
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          FinSight AI
        </h1>

        <button className="rounded-xl border border-slate-700 px-5 py-2 text-sm hover:bg-slate-900">
          Dashboard
        </button>
      </nav>

      <section className="flex flex-col items-center px-6 pt-24 text-center">
        <p className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
          AI-Powered Financial Intelligence
        </p>

        <h1 className="mt-8 max-w-5xl text-6xl font-bold leading-tight md:text-7xl">
          Understand Your
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {" "}Bank Statement{" "}
          </span>
          Instantly
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
          Upload your bank statement and receive
          AI-generated insights, expense analysis,
          recurring payment detection, and financial
          recommendations in seconds.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold transition hover:scale-105">
            Upload Statement
          </button>

          <button className="rounded-2xl border border-slate-700 px-8 py-4 text-lg hover:bg-slate-900">
            View Demo
          </button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-slate-500">
          <p>Secure Uploads</p>
          <p>AI Insights</p>
          <p>Expense Analytics</p>
          <p>Recurring Payments</p>
        </div>
      </section>

      <section className="mt-28 grid gap-8 px-8 pb-24 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-2 hover:border-blue-500">
          <div className="mb-6 w-fit rounded-2xl bg-blue-500/10 p-4 text-3xl">
            📊
          </div>

          <h2 className="text-2xl font-semibold">
            Smart Categorization
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Automatically classifies transactions into food, travel,
            subscriptions, shopping, salary, EMI, and more.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-2 hover:border-purple-500">
          <div className="mb-6 w-fit rounded-2xl bg-purple-500/10 p-4 text-3xl">
            📈
          </div>

          <h2 className="text-2xl font-semibold">
            Expense Analytics
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Visualize spending trends with interactive charts,
            summaries, and monthly comparisons.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8 transition hover:-translate-y-2 hover:border-green-500">
          <div className="mb-6 w-fit rounded-2xl bg-green-500/10 p-4 text-3xl">
            🤖
          </div>

          <h2 className="text-2xl font-semibold">
            AI Financial Insights
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Receive intelligent recommendations, recurring payment
            alerts, and unusual transaction detection instantly.
          </p>
        </div>
      </section>
      <section className="px-8 pb-32">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <h2 className="text-5xl font-bold">
              AI Financial Dashboard
            </h2>

            <p className="mt-4 text-lg text-slate-400">
              Smart insights generated instantly from your bank statement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Total Income
              </p>

              <h3 className="mt-4 text-4xl font-bold text-green-400">
                ₹82,000
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Total Expenses
              </p>

              <h3 className="mt-4 text-4xl font-bold text-red-400">
                ₹46,500
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Savings
              </p>

              <h3 className="mt-4 text-4xl font-bold text-blue-400">
                ₹35,500
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Financial Score
              </p>

              <h3 className="mt-4 text-4xl font-bold text-purple-400">
                82/100
              </h3>
            </div>

          </div>

          <div className="mt-10 rounded-[32px] border border-slate-800 bg-slate-950 p-10">
            <h3 className="text-3xl font-bold">
              AI Insights
            </h3>

            <div className="mt-8 space-y-5">

              <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                You spent 28% more on food delivery this month.
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                Netflix and Spotify recurring subscriptions detected.
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                Your savings ratio is healthier than last month.
              </div>

            </div>
          </div>

        </div>
      </section>
      <section className="px-8 pb-32">
        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <h2 className="text-5xl font-bold">
              AI Financial Dashboard
            </h2>

            <p className="mt-4 text-lg text-slate-400">
              Smart insights generated instantly from your bank statement.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Total Income
              </p>

              <h3 className="mt-4 text-4xl font-bold text-green-400">
                ₹82,000
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Total Expenses
              </p>

              <h3 className="mt-4 text-4xl font-bold text-red-400">
                ₹46,500
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Savings
              </p>

              <h3 className="mt-4 text-4xl font-bold text-blue-400">
                ₹35,500
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Financial Score
              </p>

              <h3 className="mt-4 text-4xl font-bold text-purple-400">
                82/100
              </h3>
            </div>

          </div>

          <div className="mt-10 rounded-[32px] border border-slate-800 bg-slate-950 p-10">
            <h3 className="text-3xl font-bold">
              AI Insights
            </h3>

            <div className="mt-8 space-y-5">

              <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                You spent 28% more on food delivery this month.
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                Netflix and Spotify recurring subscriptions detected.
              </div>

              <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                Your savings ratio is healthier than last month.
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}