import { SectionCards } from "@/components/section-cards";

interface TeacherViewProps {
  stats: any;
}

export function TeacherView({ stats }: TeacherViewProps) {
  const cardStats = [
    {
      title: "Total Students",
      value: stats.totalStudents, // Global for now as per plan
      footerText: "Total students in the system",
    },
    {
      title: "Recent Notices",
      value: stats.notices.length,
      footerText: "Latest announcements",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Manage your classes and students.</p>
      </div>

      <SectionCards stats={cardStats} />

      <div className="px-4 lg:px-6">
        <h2 className="mb-4 text-lg font-semibold">Recent Notices</h2>
        <div className="grid gap-4">
          {stats.notices.map((notice: any) => (
            <div key={notice._id} className="p-4 border rounded-lg">
              <h3 className="font-semibold">{notice.title}</h3>
              <p className="text-sm text-muted-foreground">{notice.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
