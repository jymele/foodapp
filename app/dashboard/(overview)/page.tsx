"use server";
import { auth } from "@/auth";
import { Meal, PrismaClient } from "@/generated/prisma";
import Navigation from "@/custom/Navigation";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import AddMealForm from "./addMealForm";
import DashboardClient from "./dashboard-client";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const prisma = new PrismaClient();
  const userHousehold = await prisma.userHousehold.findFirst({
    where: { user_email: session!.user!.email as string },
  });

  const household = await prisma.household.findUnique({
    where: { id: userHousehold!.household_id },
  });

  const date = new Date();
  // Convert the date to the same timezone as the database date
  const today = formatDate(date);

  if (!household) {
    redirect("/new-household");
  }

  const todaysMeals: Meal[] = await prisma.meal.findMany({
    where: { household_id: household!.id, date: date },
  });

  return (
    <div className="page">
      <div className="mx-auto container py-2 flex flex-row-reverse mb-4">
        <Navigation session={session} />
      </div>
      <div className="mx-auto container flex justify-between items-center mb-6">
        <div>
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-slate-950">
            Dashboard
          </h1>
          <p className="!text-muted-foreground text-[1.05rem] text-balance sm:text-base">
            {today}
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <AddMealForm email={session?.user?.email || "unknown"} />
        <DashboardClient
          initialMeals={todaysMeals}
          householdId={household.id}
          userEmail={session?.user?.email || "unknown"}
        />
      </div>
    </div>
  );
}
