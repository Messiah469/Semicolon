export default function Home() {
  return (
    <main className="relative min-h-screen overflown-hidden bg-black text-white">
      {/*
      <div className="absolute left-[-120px] top-[120px] h-[320px] w-[320px] rounded-full bg-blue-600/20 blur-3xl"></div>

      <div className="absolute right-[-120px] top-[400px] h-[320px] w-[320px] rounded-full bg-purple-600/20 blur-3xl"></div>

      <div className="absolute bottom-[-100px] left-[40%] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl"></div>
    */}
    <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute -right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[30%] h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>

      {/*
      <nav className="flex items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide">
          FinSight AI
        </h1>

        <button className="rounded-xl border border-slate-700 px-5 py-2 text-sm hover:bg-slate-900">
          Dashboard
        </button>
      </nav>
        */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 lg:px-24 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
            F
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            FinSight AI
          </h1>
        </div>
        <button className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium transition-all hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-blue-500/50 active:scale-95">
          Dashboard
        </button>
      </nav>
       { /*
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
        */}
          <section className="relative z-10 flex flex-col items-center px-6 pt-32 pb-20 text-center md:pt-40">
        <div className="group rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all hover:bg-blue-500/20">
          ✨ AI-Powered Financial Intelligence
        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
          Understand Your <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Bank Statement
          </span>{" "}
          Instantly.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
          Upload your bank statement and receive AI-generated insights, expense analysis, recurring payment detection, and financial recommendations in seconds.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:bg-slate-100 hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] active:scale-95">
            Upload Statement
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold transition-all hover:bg-white/10 active:scale-95">
            View Demo
          </button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
          <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Secure Uploads</p>
          <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> AI Insights</p>
          <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span> Expense Analytics</p>
          <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span> Recurring Payments</p>
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
          

        


        {/*
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
        */}

          {/* 1. FEATURE CARDS SECTION */}
      <section className="relative z-10 mx-auto mt-28 grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3 lg:px-12">
        <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <div className="mb-6 inline-flex w-fit rounded-2xl bg-blue-500/20 p-4 text-3xl shadow-inner transition-transform group-hover:scale-110">
            📊
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Smart Categorization
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Automatically classifies transactions into food, travel, subscriptions, shopping, salary, EMI, and more.
          </p>
        </div>

        <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
          <div className="mb-6 inline-flex w-fit rounded-2xl bg-purple-500/20 p-4 text-3xl shadow-inner transition-transform group-hover:scale-110">
            📈
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Expense Analytics
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Visualize spending trends with interactive charts, summaries, and monthly comparisons.
          </p>
        </div>

        <div className="group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div className="mb-6 inline-flex w-fit rounded-2xl bg-emerald-500/20 p-4 text-3xl shadow-inner transition-transform group-hover:scale-110">
            🤖
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            AI Financial Insights
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Receive intelligent recommendations, recurring payment alerts, and unusual transaction detection instantly.
          </p>
        </div>
      </section>

      {/* 2. DASHBOARD SECTION */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            AI Financial Dashboard
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Smart insights generated instantly from your bank statement.
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
            <p className="text-sm font-medium text-slate-400">Total Income</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-emerald-400">₹82,000</h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
            <p className="text-sm font-medium text-slate-400">Total Expenses</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-rose-400">₹46,500</h3>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
            <p className="text-sm font-medium text-slate-400">Savings</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-blue-400">₹35,500</h3>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
            <p className="relative z-10 text-sm font-medium text-slate-400">Financial Score</p>
            <h3 className="relative z-10 mt-2 text-3xl font-bold tracking-tight text-purple-400">82/100</h3>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="relative mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
          {/* Subtle internal glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]"></div>
          
          <h3 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Insights
            </span>
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-sm leading-relaxed text-slate-300 shadow-inner">
              You spent <span className="font-semibold text-rose-400">28% more</span> on food delivery this month.
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-sm leading-relaxed text-slate-300 shadow-inner">
              <span className="font-semibold text-purple-400">Netflix</span> and <span className="font-semibold text-emerald-400">Spotify</span> recurring subscriptions detected.
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-sm leading-relaxed text-slate-300 shadow-inner">
              Your savings ratio is <span className="font-semibold text-blue-400">healthier than last month</span>.
            </div>
          </div>
        </div>
      </section>





          {/*
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
      */}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">

            {/* Income Card */}
            <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <p className="text-sm font-medium text-slate-400">
                Total Income
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-emerald-400">
                ₹82,000
              </h3>
            </div>

            {/* Expenses Card */}
            <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]">
              <p className="text-sm font-medium text-slate-400">
                Total Expenses
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-rose-400">
                ₹46,500
              </h3>
            </div>

            {/* Savings Card */}
            <div className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <p className="text-sm font-medium text-slate-400">
                Savings
              </p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-blue-400">
                ₹35,500
              </h3>
            </div>

            {/* Financial Score Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent"></div>
              <p className="relative z-10 text-sm font-medium text-slate-400">
                Financial Score
              </p>
              <h3 className="relative z-10 mt-2 text-3xl font-bold tracking-tight text-purple-400">
                82<span className="text-xl text-purple-400/50">/100</span>
              </h3>
            </div>

          </div>

          {/* AI Insights Panel */}
          <div className="relative mt-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10">
            {/* Subtle internal background glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]"></div>

            <h3 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ✨ AI Insights
              </span>
            </h3>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              
              <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-sm leading-relaxed text-slate-300 shadow-inner transition-colors hover:border-white/10 hover:bg-black/60">
                You spent <span className="font-semibold text-rose-400">28% more</span> on food delivery this month compared to your average.
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-sm leading-relaxed text-slate-300 shadow-inner transition-colors hover:border-white/10 hover:bg-black/60">
                <span className="font-semibold text-purple-400">Netflix</span> and <span className="font-semibold text-emerald-400">Spotify</span> recurring subscriptions detected.
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-6 text-sm leading-relaxed text-slate-300 shadow-inner transition-colors hover:border-white/10 hover:bg-black/60">
                Great job! Your savings ratio is <span className="font-semibold text-blue-400">healthier than last month</span>.
              </div>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}