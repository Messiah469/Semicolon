export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <div className="flex">

        <aside className="flex min-h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 p-8">

          <h1 className="text-3xl font-bold">
            FinSight AI
          </h1>

          <div className="mt-16 space-y-4">

            <button className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-left text-lg font-medium">
              Dashboard
            </button>

        <a
        href="/transactions"
        className="block w-full rounded-2xl px-5 py-4 text-left text-lg text-slate-400 hover:bg-slate-900"
        >
        Transactions
        </a>

        <a
        href="/analytics"
        className="block w-full rounded-2xl px-5 py-4 text-left text-lg text-slate-400 hover:bg-slate-900"
        >
        Analytics
        </a> 

        <a
        href="/insights"
        className="block w-full rounded-2xl px-5 py-4 text-left text-lg text-slate-400 hover:bg-slate-900"
        >
        AI Insights
        </a>  

        <a
        href="/settings"
        className="block w-full rounded-2xl px-5 py-4 text-left text-lg text-slate-400 hover:bg-slate-900"
        >
        Settings
        </a>      

          </div>

        </aside>

        <section className="flex-1 p-10">

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-5xl font-bold">
                Financial Dashboard
              </h2>

              <p className="mt-3 text-lg text-slate-400">
                AI-powered analysis of your financial activity.
              </p>
            </div>

            <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-4 text-lg font-semibold">
              Upload Statement
            </button>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Income
              </p>

              <h3 className="mt-4 text-4xl font-bold text-green-400">
                ₹82,000
              </h3>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
              <p className="text-slate-400">
                Expenses
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

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <div className="rounded-[32px] border border-slate-800 bg-slate-950 p-10">

              <h3 className="text-3xl font-bold">
                Expense Breakdown
              </h3>

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

            <div className="rounded-[32px] border border-slate-800 bg-slate-950 p-10">

              <h3 className="text-3xl font-bold">
                AI Insights
              </h3>

              <div className="mt-8 space-y-5">

                <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                  Food delivery spending increased by 28%.
                </div>

                <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                  3 recurring subscriptions detected.
                </div>

                <div className="rounded-2xl bg-slate-900 p-5 text-slate-300">
                  Savings trend improved compared to last month.
                </div>

              </div>

            </div>

          </div>

          <div className="mt-10 rounded-[32px] border border-slate-800 bg-slate-950 p-10">

            <div className="flex items-center justify-between">

              <h3 className="text-3xl font-bold">
                Recent Transactions
              </h3>

              <button className="rounded-xl border border-slate-700 px-5 py-2 hover:bg-slate-900">
                View All
              </button>

            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">

              <table className="w-full">

                <thead className="bg-slate-900 text-slate-400">

                  <tr>
                    <th className="px-6 py-4 text-left">
                      Merchant
                    </th>

                    <th className="px-6 py-4 text-left">
                      Category
                    </th>

                    <th className="px-6 py-4 text-left">
                      Amount
                    </th>

                    <th className="px-6 py-4 text-left">
                      Date
                    </th>
                  </tr>

                </thead>

                <tbody>

                  <tr className="border-t border-slate-800">
                    <td className="px-6 py-5">
                      Swiggy
                    </td>

                    <td className="px-6 py-5 text-blue-400">
                      Food
                    </td>

                    <td className="px-6 py-5 text-red-400">
                      -₹450
                    </td>

                    <td className="px-6 py-5 text-slate-400">
                      12 May
                    </td>
                  </tr>

                  <tr className="border-t border-slate-800">
                    <td className="px-6 py-5">
                      Netflix
                    </td>

                    <td className="px-6 py-5 text-purple-400">
                      Subscription
                    </td>

                    <td className="px-6 py-5 text-red-400">
                      -₹649
                    </td>

                    <td className="px-6 py-5 text-slate-400">
                      11 May
                    </td>
                  </tr>

                  <tr className="border-t border-slate-800">
                    <td className="px-6 py-5">
                      Salary
                    </td>

                    <td className="px-6 py-5 text-green-400">
                      Income
                    </td>

                    <td className="px-6 py-5 text-green-400">
                      +₹50,000
                    </td>

                    <td className="px-6 py-5 text-slate-400">
                      10 May
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}