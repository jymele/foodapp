import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import checkIfLoggedIn from "@/utils/checkIfLoggedIn";
import ProfileIcon from "@/custom/ProfileIcon";
import appSettings from "@/appsettings";
import DashboardClient from "./client";

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysMeals = meals.filter((meal) => {
    const mealDate = new Date(meal.date);
    mealDate.setHours(0, 0, 0, 0);
    return mealDate.getTime() === today.getTime();
  });

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const weeksMeals = meals.filter((meal) => {
    const mealDate = new Date(meal.date);
    mealDate.setHours(0, 0, 0, 0);
    return mealDate >= startOfWeek && mealDate <= endOfWeek;
  });

  return (
    <div className="page">
      <div className="mx-auto container flex justify-between items-center">
        <div>
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-slate-950">
            Dashboard
          </h1>
          <p className="!text-muted-foreground text-[1.05rem] text-balance sm:text-base">
            {new Date().toDateString()}
          </p>
        </div>
        <div>
          {session!.user?.image && <ProfileIcon image={session!.user?.image} />}
        </div>
      </div>
      <div>
        <DashboardClient todaysMeals={todaysMeals} weeksMeals={weeksMeals} />
      </div>
    </div>
  );
}
