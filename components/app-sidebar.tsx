"use client"

import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconSchool,
  IconUsers,
  IconUser,
  IconCash,
  IconBell,
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// This would ideally come from a context or prop, but for now we'll simulate or fetch
// Since AppSidebar is a client component, we might need to pass data from the layout or page
// For this refactor, I'll assume we pass user info as props or use a hook if available.
// However, the existing usage in page.tsx is <AppSidebar variant="inset" /> without props.
// I will update it to accept user info.

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    name: string;
    email: string;
    avatar: string;
    roles: string[];
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  // Default user if not provided (fallback)
  const currentUser = user || {
    name: "Guest",
    email: "guest@example.com",
    avatar: "",
    roles: [],
  };

  const isSuperAdmin = currentUser.roles.includes("SUPER_ADMIN");
  const isAccountant = currentUser.roles.includes("ACCOUNTANT");
  const isAdmin = currentUser.roles.includes("ADMIN");
  const isTeacher = currentUser.roles.includes("TEACHER");
  const isStudent = currentUser.roles.includes("STUDENT");

  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      isActive: true,
    },
  ];

  if (isSuperAdmin) {
    navMain.push(
      {
        title: "Users",
        url: "/dashboard/users",
        icon: IconUsers,
        isActive: false,
      },
      {
        title: "Students",
        url: "/dashboard/students",
        icon: IconSchool,
        isActive: false,
      },
      {
        title: "Teachers",
        url: "/dashboard/teachers",
        icon: IconUser,
        isActive: false,
      },
      {
        title: "Payments",
        url: "/dashboard/payments",
        icon: IconCash,
        isActive: false,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: IconChartBar,
        isActive: false,
      },
      {
        title: "Notices",
        url: "/dashboard/notices",
        icon: IconBell,
        isActive: false,
      }
    );
  }

  if (isAdmin && !isSuperAdmin) {
    navMain.push(
      {
        title: "Students",
        url: "/dashboard/students",
        icon: IconSchool,
        isActive: false,
      },
      {
        title: "Teachers",
        url: "/dashboard/teachers",
        icon: IconUser,
        isActive: false,
      },
      {
        title: "Payments",
        url: "/dashboard/payments",
        icon: IconCash,
        isActive: false,
      },
      {
        title: "Notices",
        url: "/dashboard/notices",
        icon: IconBell,
        isActive: false,
      }
    );
  }

  if (isAccountant && !isSuperAdmin) {
    navMain.push(
      {
        title: "Payments",
        url: "/dashboard/payments",
        icon: IconCash,
        isActive: false,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: IconChartBar,
        isActive: false,
      }
    );
  }

  if (isTeacher && !isSuperAdmin && !isAdmin) {
    navMain.push(
      {
        title: "My Students",
        url: "/dashboard/my-students",
        icon: IconUsers,
        isActive: false,
      },
      {
        title: "Notices",
        url: "/dashboard/notices",
        icon: IconBell,
        isActive: false,
      }
    );
  }

  if (isStudent && !isSuperAdmin && !isAdmin && !isTeacher) {
    navMain.push(
      {
        title: "My Payments",
        url: "/dashboard/my-payments",
        icon: IconCash,
        isActive: false,
      },
      {
        title: "Notices",
        url: "/dashboard/notices",
        icon: IconBell,
        isActive: false,
      }
    );
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Shondipon</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
