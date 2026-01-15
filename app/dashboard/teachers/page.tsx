import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { headers } from "next/headers"
import { getUsers } from "@/lib/actions/users"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default async function TeachersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const headersList = await headers();
  const userRolesHeader = headersList.get("x-user-roles");
  const userRoles = userRolesHeader ? JSON.parse(userRolesHeader) : [];
  
  const userData = {
    name: "User",
    email: "user@example.com",
    avatar: "",
    roles: userRoles,
  };

  const params = await searchParams;
  const page = Number(params.page) || 1;
  
  const { users: teachers } = await getUsers(page, 10, "", "TEACHER");

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
             <h1 className="text-2xl font-bold">Teachers Management</h1>
           </div>

           <div className="border rounded-lg">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Email</TableHead>
                   <TableHead>Roles</TableHead>
                   <TableHead>Created At</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {teachers.map((user: any) => (
                   <TableRow key={user._id}>
                     <TableCell>{user.email}</TableCell>
                     <TableCell>{user.roles.join(", ")}</TableCell>
                     <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
