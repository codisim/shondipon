import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";

interface AdminViewProps {
  stats: any;
}

export function AdminView({ stats }: AdminViewProps) {
  const cardStats = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      footerText: "All registered users",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      footerText: "Active students",
    },
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      footerText: "Active teachers",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      footerText: "All time reviews",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      trend: "up" as const,
      change: "+12.5%",
      footerTrendText: "Trending up",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of system performance.</p>
      </div>

      <SectionCards stats={cardStats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 px-4 lg:px-6">
        <div className="col-span-4">
          <h2 className="mb-4 text-lg font-semibold">Revenue Analytics</h2>
          <ChartAreaInteractive data={stats.monthlyRevenue} />
        </div>
        <div className="col-span-3">
           {/* Placeholder for Gender Chart - using a simple list for now as we don't have a PieChart component ready yet */}
           <div className="rounded-xl border bg-card text-card-foreground shadow">
             <div className="p-6 flex flex-col gap-4">
               <h3 className="font-semibold leading-none tracking-tight">Gender Distribution</h3>
               <div className="space-y-2">
                 {stats.genderDistribution.map((item: any) => (
                   <div key={item._id} className="flex items-center justify-between">
                     <span className="text-sm font-medium">{item._id || "Not Specified"}</span>
                     <span className="text-sm text-muted-foreground">{item.count}</span>
                   </div>
                 ))}
                 {stats.genderDistribution.length === 0 && <p className="text-sm text-muted-foreground">No data available</p>}
               </div>
             </div>
           </div>
        </div>
      </div>
      
      <div className="px-4 lg:px-6 mt-4">
         <h2 className="mb-4 text-lg font-semibold">Recent Payments</h2>
         <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="p-3 font-medium">User</th>
                  <th className="p-3 font-medium">Amount</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentPayments.map((payment: any) => (
                  <tr key={payment._id} className="border-t">
                    <td className="p-3">
                      <div className="font-medium">{payment.profile?.name || "Unknown"}</div>
                      <div className="text-xs text-muted-foreground">{payment.profile?.user?.email}</div>
                    </td>
                    <td className="p-3">${payment.amount}</td>
                    <td className="p-3">{payment.status}</td>
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
