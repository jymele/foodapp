"use client";
import { Meal } from "@/generated/prisma";
import MealList from "@/custom/MealList";

type Props = {
  todaysMeals: Meal[];
  weeksMeals: Meal[];
};

export default function DashboardClient({ todaysMeals, weeksMeals }: Props) {
  return (
    <div className="page">
      <div>
        <h1 className="text-lg font-semibold mb-4">Today's Meals</h1>
        <MealList meals={todaysMeals} />
      </div>
      <div>
        <h1 className="text-lg font-semibold mb-4">This Week's Meals</h1>
        <MealList meals={weeksMeals} />
      </div>
    </div>
  );
}
