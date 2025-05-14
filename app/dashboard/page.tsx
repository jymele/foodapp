import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PrismaClient } from "@/generated/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const prisma = new PrismaClient();
  const rooms = await prisma.userToRoom.findMany({
    where: { userEmail: session.user!.email as string },
  });

  if (rooms.length === 0) {
    redirect("/newRoom");
  }

  console.log("User's rooms:", rooms);

  return (
    <div className="mt-14 container mx-auto p-2">
      <Card>
        <CardContent>
          <p>Hello {session.user?.name}</p>
          <p>{session.user?.email}</p>
        </CardContent>
      </Card>
    </div>
  );
}
