import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import checkIfLoggedIn from "@/utils/checkIfLoggedIn";
import DashboardClient from "./client";
import Navigation from "@/custom/Navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  checkIfLoggedIn();

  const prisma = new PrismaClient();
  const userHousehold = await prisma.userHousehold.findFirst({
    where: { user_email: session!.user!.email as string },
  });

  if (!userHousehold) {
    redirect("/new-household");
  }

  const household = await prisma.household.findUnique({
    where: { id: userHousehold.household_id },
  });

  // Get the meals assigned to the room
  const meals = await prisma.meal.findMany({
    where: { household_id: household!.id },
  });

  console.log(meals);

  const date = new Date();
  // Convert the date to the same timezone as the database date
  const today = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );

  console.log("day", today);

  const todaysMeals = meals.filter((meal) => {
    const mealDate = new Date(meal.date);
    return mealDate.getTime() === today.getTime();
  });

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const weeksMeals = meals.filter((meal) => {
    const mealDate = new Date(meal.date);
    return mealDate >= startOfWeek && mealDate <= endOfWeek;
  });

  return (
    <div className="page">
      <div className="mx-auto container py-2 flex flex-row-reverse mb-4">
        <Navigation session={session} />
      </div>
      <div className="mx-auto container flex justify-between">
        <div className="mb-6">
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-slate-950">
            Dashboard
          </h1>
          <p className="!text-muted-foreground text-[1.05rem] text-balance sm:text-base">
            {new Date().toDateString()}
          </p>
        </div>
        <div>
          <Link
            className="px-3.5 py-2.5 rounded-lg shadow-sm bg-white"
            href="/addmeal"
          >
            Add meal
          </Link>
        </div>
      </div>
      <div>
        <DashboardClient todaysMeals={todaysMeals} weeksMeals={weeksMeals} />
      </div>
    </div>
  );
}
