import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const headersList = await headers();
  const userRolesHeader = headersList.get("x-user-roles");
  const userRoles = userRolesHeader ? JSON.parse(userRolesHeader) : [];

  if (userRoles.includes("SUPER_ADMIN") || userRoles.includes("ADMIN")) {
    redirect("/dashboard/admin");
  } else if (userRoles.includes("TEACHER")) {
    redirect("/dashboard/teacher");
  } else if (userRoles.includes("STUDENT")) {
    redirect("/dashboard/student");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Shondipon</h1>
      <p>Please select an option from the sidebar.</p>
    </div>
  );
}
