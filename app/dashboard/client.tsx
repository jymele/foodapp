"use client";
import { Meal } from "@/generated/prisma";
import MealList from "@/custom/MealList";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  todaysMeals: Meal[];
  weeksMeals: Meal[];
};

export default function DashboardClient({ todaysMeals, weeksMeals }: Props) {
  const [toggleDay, setToggleDay] = useState(true);

  return (
    <div className="page">
      <div className="p-2">
        <div className="mx-auto rounded-full bg-slate-200  p-1 w-fit flex gap-1">
          <button
            className="toggle-button disabled:text-slate-400 cursor-pointer"
            onClick={() => setToggleDay(true)}
            aria-disabled={toggleDay}
            disabled={toggleDay}
          >
            Today
          </button>
          <button
            className="toggle-button"
            onClick={() => setToggleDay(false)}
            aria-disabled={!toggleDay}
            disabled={!toggleDay}
          >
            This Week
          </button>
        </div>
      </div>
      <AnimatePresence>
        {toggleDay && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-lg font-semibold mb-4">Today</h1>
            <MealList meals={todaysMeals} />
          </motion.div>
        )}
        {!toggleDay && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-lg font-semibold mb-4">This Week</h1>
            <MealList meals={weeksMeals} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
