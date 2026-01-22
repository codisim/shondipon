import { Header } from "@/components/shared/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
  <Header />
  {children}
  </>;
}
