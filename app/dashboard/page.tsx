import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import Link from "next/link";

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

  const room = await prisma.room.findUnique({
    where: { id: rooms[0].roomId },
  });

  return (
    <div className="mt-14 container mx-auto p-2">
      <div className="bg-white p-2 rounded-md">
        <p>{room?.name}</p>
        <p>Hello {session.user?.name}</p>
        <p>{session.user?.email}</p>
        <Link
          href="addmeal"
          className="transition duration-200 mt-4 hover:underline"
        >
          Add a meal
        </Link>
      </div>
    </div>
  );
}
