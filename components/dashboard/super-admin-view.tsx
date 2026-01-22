import { SectionCards } from "@/components/section-cards";
import { Button } from "@/components/ui/button";
import { IconSettings, IconUsers } from "@tabler/icons-react";

interface SuperAdminViewProps {
  stats: any;
}

export function SuperAdminView({ stats }: SuperAdminViewProps) {
  const cardStats = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      footerText: "System-wide revenue",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      footerText: "All registered accounts",
    },
    {
      title: "Admins",
      value: stats.totalAdmins,
      footerText: "System administrators",
    },
    {
      title: "Active Students",
      value: stats.totalStudents,
      footerText: "Currently enrolled",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Full system control and overview.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">
             <IconUsers className="mr-2 size-4" /> Manage Roles
           </Button>
           <Button>
             <IconSettings className="mr-2 size-4" /> System Settings
           </Button>
        </div>
      </div>

      <SectionCards stats={cardStats} />

      <div className="px-4 lg:px-6">
         <h2 className="mb-4 text-lg font-semibold">Recent System Activity</h2>
         <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="p-3 font-medium">User Email</th>
                  <th className="p-3 font-medium">Role</th>
                  <th className="p-3 font-medium">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentActivity.map((user: any) => (
                  <tr key={user._id} className="border-t">
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.roles.join(", ")}</td>
                    <td className="p-3">{new Date(user.updatedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
