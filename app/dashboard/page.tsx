import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-14 container mx-auto">Hello {session.user?.name}</div>
  );
}
