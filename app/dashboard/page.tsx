import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import Link from "next/link";
import checkIfLoggedIn from "@/utils/checkIfLoggedIn";

export default async function DashboardPage() {
  const session = await auth();

  checkIfLoggedIn();

  const prisma = new PrismaClient();
  const roomAssignment = await prisma.userToRoom.findFirst({
    where: { userEmail: session!.user!.email as string },
  });

  if (!roomAssignment) {
    redirect("/newRoom");
  }

  const room = await prisma.room.findUnique({
    where: { id: roomAssignment.roomId },
  });

  // Get the meals assigned to the room
  const meals = await prisma.meal.findMany({
    where: { roomId: room!.id },
  });

  console.log("Meals:", meals);

  return (
    <div className="mt-14 container mx-auto p-2">
      <div className="bg-white p-2 rounded-md">
        <p>{room?.name}</p>
        <p>Hello {session!.user?.name}</p>
        <p>{session!.user?.email}</p>
        <Link
          href="addmeal"
          className="transition duration-200 mt-4 hover:underline"
        >
          Add a meal
        </Link>
      </div>

      <div>
        <div>Meals from Room {}</div>
        {meals.map((meal) => (
          <div key={meal.id} className="bg-white p-2 rounded-md mt-4">
            <h2 className="text-lg font-semibold">{meal.name}</h2>
            <p>{new Date(meal.date).toLocaleDateString()}</p>
            <p>{meal.description}</p>
            <p>Added by: {meal.addedByEmail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
