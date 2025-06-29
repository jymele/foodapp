"use client";
import { Meal } from "@/generated/prisma";
import MealCard from "./MealCard";
import { motion } from "motion/react";

type Props = {
  meals: Meal[];
};

export default function MealList({ meals }: Props) {
  if (meals.length === 0) {
    return <div className="text-muted-foreground">No meals found.</div>;
  }

  return (
    <>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {meals.map((meal, index) => (
          <MealCard key={meal.id} index={index} meal={meal} />
        ))}
      </motion.div>
    </>
  );
}
