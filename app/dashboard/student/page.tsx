import { StudentView } from "@/components/dashboard/student-view";
import { getStudentStats } from "@/lib/actions/dashboard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function StudentDashboardPage() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

  if (!userId) {
    redirect("/login");
  }

  const stats = await getStudentStats(userId);

  return <StudentView stats={stats} />;
}
