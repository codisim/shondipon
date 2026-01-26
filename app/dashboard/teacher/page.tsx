import { TeacherView } from "@/components/dashboard/teacher-view";
import { getTeacherStats } from "@/lib/actions/dashboard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function TeacherDashboardPage() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

  if (!userId) {
    redirect("/login");
  }

  const stats = await getTeacherStats(userId);

  return <TeacherView stats={stats} />;
}
