import { AdminView } from "@/components/dashboard/admin-view";
import { getAdminStats, getSuperAdminStats } from "@/lib/actions/dashboard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const headersList = await headers();
  const userRolesHeader = headersList.get("x-user-roles");
  const userRoles = userRolesHeader ? JSON.parse(userRolesHeader) : [];

  const isSuperAdmin = userRoles.includes("SUPER_ADMIN");
  const isAdmin = userRoles.includes("ADMIN");

  if (!isSuperAdmin && !isAdmin) {
    redirect("/dashboard"); // Or access denied page
  }

  let stats;
  if (isSuperAdmin) {
    stats = await getSuperAdminStats();
  } else {
    stats = await getAdminStats();
  }

  return <AdminView stats={stats} />;
}
