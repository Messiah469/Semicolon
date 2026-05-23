export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-black p-10 text-white">

      <h1 className="text-5xl font-bold">
        Analytics
      </h1>

      <p className="mt-4 text-slate-400">
        Expense breakdown and financial trends.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">

          <h2 className="text-2xl font-bold">
            Monthly Spending
          </h2>

          <div className="mt-10 space-y-6">

            <div>
              <div className="mb-2 flex justify-between">
                <p>Food</p>
                <p>32%</p>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div className="h-3 w-[32%] rounded-full bg-blue-500"></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <p>Shopping</p>
                <p>21%</p>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div className="h-3 w-[21%] rounded-full bg-purple-500"></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <p>Travel</p>
                <p>17%</p>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div className="h-3 w-[17%] rounded-full bg-green-500"></div>
              </div>
            </div>

          </div>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">

          <h2 className="text-2xl font-bold">
            Financial Health
          </h2>

          <div className="mt-10">

            <div className="rounded-2xl bg-slate-900 p-6">
              <p className="text-slate-400">
                Savings Ratio
              </p>

              <h3 className="mt-4 text-4xl font-bold text-green-400">
                43%
              </h3>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-900 p-6">
              <p className="text-slate-400">
                Recurring Expenses
              </p>

              <h3 className="mt-4 text-4xl font-bold text-purple-400">
                ₹3,200
              </h3>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}