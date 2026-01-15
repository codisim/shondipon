import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { headers } from "next/headers"
import { getUsers, deleteUser } from "@/lib/actions/users"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconTrash, IconEdit } from "@tabler/icons-react"
import Link from "next/link"

export default async function UsersPage({
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
  const search = (params.search as string) || "";
  
  const { users, totalPages } = await getUsers(page, 10, search);

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
             <h1 className="text-2xl font-bold">Users Management</h1>
             <Button>Add User</Button>
           </div>

           <div className="border rounded-lg">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Email</TableHead>
                   <TableHead>Roles</TableHead>
                   <TableHead>Created At</TableHead>
                   <TableHead className="text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {users.map((user: any) => (
                   <TableRow key={user._id}>
                     <TableCell>{user.email}</TableCell>
                     <TableCell>{user.roles.join(", ")}</TableCell>
                     <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                     <TableCell className="text-right">
                       <div className="flex justify-end gap-2">
                         <Button variant="ghost" size="icon">
                           <IconEdit className="size-4" />
                         </Button>
                         <form action={async () => {
                           "use server";
                           await deleteUser(user._id);
                         }}>
                           <Button variant="ghost" size="icon" className="text-destructive">
                             <IconTrash className="size-4" />
                           </Button>
                         </form>
                       </div>
                     </TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </div>
           
           <div className="flex items-center justify-center gap-2 mt-4">
             {page > 1 && (
               <Link href={`/dashboard/users?page=${page - 1}`}>
                 <Button variant="outline" size="sm">Previous</Button>
               </Link>
             )}
             <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
             {page < totalPages && (
               <Link href={`/dashboard/users?page=${page + 1}`}>
                 <Button variant="outline" size="sm">Next</Button>
               </Link>
             )}
           </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
