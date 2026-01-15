import { SectionCards } from "@/components/section-cards";

interface StudentViewProps {
  stats: any;
}

export function StudentView({ stats }: StudentViewProps) {
  if (!stats) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Profile not found</h1>
        <p>Please contact administration.</p>
      </div>
    );
  }

  const cardStats = [
    {
      title: "Total Paid",
      value: `$${stats.totalPaid}`,
      footerText: "Total fees paid",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      footerText: "Unpaid months",
      trend: (stats.pendingPayments > 0 ? "down" : "neutral") as "down" | "neutral",
      footerTrendText: stats.pendingPayments > 0 ? "Action needed" : "All good",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {stats.profile.name}.</p>
      </div>

      <SectionCards stats={cardStats} />

      <div className="px-4 lg:px-6">
        <h2 className="mb-4 text-lg font-semibold">Payment History</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted">
              <tr>
                <th className="p-4">Month</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.payments.map((payment: any) => (
                <tr key={payment._id} className="border-t">
                  <td className="p-4">{payment.month}</td>
                  <td className="p-4">${payment.amount}</td>
                  <td className="p-4">{payment.status}</td>
                  <td className="p-4">{payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
