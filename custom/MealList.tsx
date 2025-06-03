"use client";
import { Meal } from "@/generated/prisma";
import MealCard from "./MealCard";

type Props = {
  meals: Meal[];
};

export default function MealList({ meals }: Props) {
  if (meals.length === 0) {
    return <div className="text-muted-foreground">No meals found.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </>
  );
}
