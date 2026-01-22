import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

interface AccountantViewProps {
  stats: any;
}

export function AccountantView({ stats }: AccountantViewProps) {
  const cardStats = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      footerText: "Collected so far",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPaymentsCount,
      footerText: "Invoices awaiting payment",
      trend: "down" as const, // Assuming pending is bad, so 'down' might be good or bad depending on context. Let's say neutral for now.
      footerTrendText: "Needs attention",
    },
  ];

  // Transform daily revenue for chart
  const chartData = stats.dailyRevenue.map((d: any) => ({
    month: d.date, // Reusing 'month' key for x-axis label as per ChartAreaInteractive expectation
    revenue: d.revenue,
  }));

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Accountant Dashboard</h1>
        <p className="text-muted-foreground">Financial overview and reports.</p>
      </div>

      <SectionCards stats={cardStats} />

      <div className="px-4 lg:px-6">
        <h2 className="mb-4 text-lg font-semibold">Daily Revenue (Last 7 Days)</h2>
        <ChartAreaInteractive data={chartData} />
      </div>

      <div className="px-4 lg:px-6 mt-4">
         <h2 className="mb-4 text-lg font-semibold">Recent Transactions</h2>
         <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="p-3 font-medium">Payer</th>
                  <th className="p-3 font-medium">Amount</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentTransactions.map((payment: any) => (
                  <tr key={payment._id} className="border-t">
                    <td className="p-3">
                      <div className="font-medium">{payment.profile?.name || "Unknown"}</div>
                      <div className="text-xs text-muted-foreground">{payment.profile?.user?.email}</div>
                    </td>
                    <td className="p-3">${payment.amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                         payment.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                       }`}>
                         {payment.status}
                       </span>
                    </td>
                    <td className="p-3">{new Date(payment.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
