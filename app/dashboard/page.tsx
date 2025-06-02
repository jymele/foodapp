import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import MealCard from "@/custom/MealCard";
import checkIfLoggedIn from "@/utils/checkIfLoggedIn";
import ProfileIcon from "@/custom/ProfileIcon";

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

  return (
    <div className="mt-14 container mx-auto p-2">
      <div className="mx-auto container p-2 flex justify-between items-center">
        <div>
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-slate-950">
            Dashboard
          </h1>
          <p className="!text-muted-foreground text-[1.05rem] text-balance sm:text-base">
            {new Date().toLocaleDateString()}
          </p>
        </div>
        <div>
          {session!.user?.image && <ProfileIcon image={session!.user?.image} />}
        </div>
      </div>
      <div>
        <div>Meals from Room {}</div>
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
