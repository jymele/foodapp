import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import checkIfLoggedIn from "@/utils/checkIfLoggedIn";
import DashboardClient from "./client";
import Navigation from "@/custom/Navigation";
import Link from "next/link";
import {
  getUTCDate,
  getStartofWeekFromDate,
  getEndofWeekFromDate,
} from "@/utils/date";

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

  const date = new Date();
  // Convert the date to the same timezone as the database date
  const today = getUTCDate(date);

  const todaysMeals = await prisma.meal.findMany({
    where: { household_id: household!.id, date: today },
  });

  const startOfWeek = getStartofWeekFromDate(today);
  const endOfWeek = getEndofWeekFromDate(today);

  const weeksMeals = await prisma.meal.findMany({
    where: {
      household_id: household!.id,
      date: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  });

  return (
    <div className="page">
      <div className="mx-auto container py-2 flex flex-row-reverse mb-4">
        <Navigation session={session} />
      </div>
      <div className="mx-auto container flex justify-between items-center">
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
