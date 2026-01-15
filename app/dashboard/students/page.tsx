import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { headers } from "next/headers"
import { getUsers, deleteUser, updateUserRole, updateUserStatus } from "@/lib/actions/users"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FilterBar } from "@/components/dashboard/filter-bar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical, IconTrash, IconEdit, IconUserCog } from "@tabler/icons-react"

export default async function StudentsPage({
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
  const gender = (params.gender as string) || "";
  const status = (params.status as string) || "";
  
  // Fetch students with filters
  const { users: students, totalPages } = await getUsers(page, 10, search, "STUDENT", gender, status);

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
             <h1 className="text-2xl font-bold">Students Management</h1>
             <Button>Add Student</Button>
           </div>

           <FilterBar showGender showStatus />

           <div className="border rounded-lg">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Name</TableHead>
                   <TableHead>Email</TableHead>
                   <TableHead>Gender</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead>Joined</TableHead>
                   <TableHead className="text-right">Actions</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {students.map((user: any) => (
                   <TableRow key={user._id}>
                     <TableCell className="font-medium">{user.profile?.name || "N/A"}</TableCell>
                     <TableCell>{user.email}</TableCell>
                     <TableCell>{user.profile?.gender || "N/A"}</TableCell>
                     <TableCell>
                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                         user.profile?.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 
                         user.profile?.status === 'INACTIVE' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                       }`}>
                         {user.profile?.status || "N/A"}
                       </span>
                     </TableCell>
                     <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                     <TableCell className="text-right">
                       <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                           <Button variant="ghost" size="icon">
                             <IconDotsVertical className="size-4" />
                           </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end">
                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
                           <DropdownMenuItem>
                             <IconEdit className="mr-2 size-4" /> Edit Profile
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem onClick={async () => {
                             "use server";
                             await updateUserStatus(user._id, "ACTIVE");
                           }}>
                             Mark Active
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={async () => {
                             "use server";
                             await updateUserStatus(user._id, "INACTIVE");
                           }}>
                             Mark Inactive
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                           <DropdownMenuItem onClick={async () => {
                             "use server";
                             await updateUserRole(user._id, "ADMIN");
                           }}>
                             Make Admin
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={async () => {
                             "use server";
                             await updateUserRole(user._id, "TEACHER");
                           }}>
                             Make Teacher
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem className="text-destructive" onClick={async () => {
                             "use server";
                             await deleteUser(user._id);
                           }}>
                             <IconTrash className="mr-2 size-4" /> Delete
                           </DropdownMenuItem>
                         </DropdownMenuContent>
                       </DropdownMenu>
                     </TableCell>
                   </TableRow>
                 ))}
                 {students.length === 0 && (
                   <TableRow>
                     <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                       No students found matching your filters.
                     </TableCell>
                   </TableRow>
                 )}
               </TableBody>
             </Table>
           </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
