"use client";
import { Meal } from "@/generated/prisma";
import MealList from "@/custom/MealList";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

type Props = {
  todaysMeals: Meal[];
  weeksMeals: Meal[];
};

export default function DashboardClient({ todaysMeals, weeksMeals }: Props) {
  const [toggleDay, setToggleDay] = useState(true);
  const [toggleWeek, setToggleWeek] = useState(false);

  const handleSwitch = () => {
    if (toggleDay) {
      setToggleDay(false);
      setTimeout(() => setToggleWeek(true), 350);
    } else if (toggleWeek) {
      setToggleWeek(false);
      setTimeout(() => setToggleDay(true), 350);
    }
  };

  return (
    <>
      <div className="py-2 mb-4">
        <div className="mx-auto rounded-full bg-slate-200  p-1 w-fit flex gap-1">
          <button
            className="toggle-button disabled:text-slate-400 cursor-pointer"
            onClick={handleSwitch}
            aria-disabled={toggleDay}
            disabled={toggleDay}
          >
            Today
          </button>
          <button
            className="toggle-button"
            onClick={handleSwitch}
            aria-disabled={!toggleDay}
            disabled={!toggleDay}
          >
            This Week
          </button>
        </div>
      </div>
      <AnimatePresence>
        {toggleDay && <MealList meals={todaysMeals} />}
        {toggleWeek && <MealList meals={weeksMeals} />}
      </AnimatePresence>
    </>
  );
}
