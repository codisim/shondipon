import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { headers } from "next/headers"
import { getAdminStats, getTeacherStats, getStudentStats, getSuperAdminStats, getAccountantStats } from "@/lib/actions/dashboard"
import { AdminView } from "@/components/dashboard/admin-view"
import { TeacherView } from "@/components/dashboard/teacher-view"
import { StudentView } from "@/components/dashboard/student-view"
import { SuperAdminView } from "@/components/dashboard/super-admin-view"
import { AccountantView } from "@/components/dashboard/accountant-view"

export default async function Page() {
  const headersList = await headers();
  const userRolesHeader = headersList.get("x-user-roles");
  const userId = headersList.get("x-user-id");
  const userRoles = userRolesHeader ? JSON.parse(userRolesHeader) : [];
  
  const isSuperAdmin = userRoles.includes("SUPER_ADMIN");
  const isAccountant = userRoles.includes("ACCOUNTANT");
  const isAdmin = userRoles.includes("ADMIN");
  const isTeacher = userRoles.includes("TEACHER");
  const isStudent = userRoles.includes("STUDENT");

  let stats = null;

  if (isSuperAdmin) {
    stats = await getSuperAdminStats();
  } else if (isAccountant) {
    stats = await getAccountantStats();
  } else if (isAdmin) {
    stats = await getAdminStats();
  } else if (isTeacher && userId) {
    stats = await getTeacherStats(userId);
  } else if (isStudent && userId) {
    stats = await getStudentStats(userId);
  }

  const userData = {
    name: "User", // We might want to fetch real name if available in headers or separate call
    email: "user@example.com", // Placeholder or fetch
    avatar: "",
    roles: userRoles,
  };

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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
             {isSuperAdmin && <SuperAdminView stats={stats} />}
             {isAccountant && !isSuperAdmin && <AccountantView stats={stats} />}
             {isAdmin && !isSuperAdmin && <AdminView stats={stats} />}
             {isTeacher && !isSuperAdmin && !isAdmin && <TeacherView stats={stats} />}
             {isStudent && !isSuperAdmin && !isAdmin && !isTeacher && <StudentView stats={stats} />}
             
             {/* Fallback if no role matches or multiple roles handling needed */}
             {!isSuperAdmin && !isAccountant && !isAdmin && !isTeacher && !isStudent && (
               <div className="p-6">
                 <h1 className="text-2xl font-bold">Welcome</h1>
                 <p>You are logged in but have no specific dashboard role assigned.</p>
               </div>
             )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
