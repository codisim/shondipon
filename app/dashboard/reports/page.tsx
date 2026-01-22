import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { headers } from "next/headers"
import { getAccountantStats } from "@/lib/actions/dashboard"
import { Button } from "@/components/ui/button"
import { IconDownload } from "@tabler/icons-react"

export default async function ReportsPage() {
  const headersList = await headers();
  const userRolesHeader = headersList.get("x-user-roles");
  const userRoles = userRolesHeader ? JSON.parse(userRolesHeader) : [];
  
  const userData = {
    name: "User",
    email: "user@example.com",
    avatar: "",
    roles: userRoles,
  };

  // Reuse accountant stats for reports for now
  const stats = await getAccountantStats();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={userData} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-6">
           <div className="flex items-center justify-between mb-6">
             <h1 className="text-2xl font-bold">Financial Reports</h1>
             <Button variant="outline">
               <IconDownload className="mr-2 size-4" /> Export PDF
             </Button>
           </div>

           <div className="grid gap-6">
             <div className="rounded-lg border p-6">
               <h2 className="text-lg font-semibold mb-4">Revenue Summary</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="p-4 bg-muted rounded-lg">
                   <p className="text-sm text-muted-foreground">Total Revenue</p>
                   <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                 </div>
                 <div className="p-4 bg-muted rounded-lg">
                   <p className="text-sm text-muted-foreground">Pending Payments</p>
                   <p className="text-2xl font-bold">{stats.pendingPaymentsCount}</p>
                 </div>
               </div>
             </div>

             <div className="rounded-lg border p-6">
               <h2 className="text-lg font-semibold mb-4">Recent Transactions Log</h2>
               <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="p-3 font-medium">Date</th>
                      <th className="p-3 font-medium">User</th>
                      <th className="p-3 font-medium">Amount</th>
                      <th className="p-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentTransactions.map((payment: any) => (
                      <tr key={payment._id} className="border-t">
                        <td className="p-3">{new Date(payment.createdAt).toLocaleDateString()}</td>
                        <td className="p-3">{payment.profile?.name || payment.profile?.user?.email || "Unknown"}</td>
                        <td className="p-3">${payment.amount}</td>
                        <td className="p-3">{payment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
