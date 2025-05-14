import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mt-14 container mx-auto">
      <Card>
        <CardContent>Hello {session.user?.name}</CardContent>
      </Card>
    </div>
  );
}
