import SearchPage from "./client";
import { auth } from "@/auth";
import { PrismaClient } from "@/generated/prisma";
import {
  getEndofWeekFromDate,
  getStartofWeekFromDate,
  getUTCDate,
} from "@/utils/date";

export default async function Page() {
  const session = await auth();

  const prisma = new PrismaClient();
  const userHousehold = await prisma.userHousehold.findFirst({
    where: { user_email: session!.user!.email as string },
  });

  const household = await prisma.household.findUnique({
    where: { id: userHousehold!.household_id },
  });
  const date = new Date();
  const today = getUTCDate(date);

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
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div className="page">
      <h1 className="text-lg font-semibold mb-4">Search</h1>
      <SearchPage weekMeals={weeksMeals} />
    </div>
  );
}
