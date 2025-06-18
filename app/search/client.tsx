"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import MealCard from "@/custom/MealCard";
import MealList from "@/custom/MealList";
import { Meal } from "@/generated/prisma";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { useState, useEffect } from "react";

type TimeScale = "day" | "week" | "month";

type SearchPageProps = {
  weekMeals?: Meal[]; // Replace with actual type if available
};

export default function SearchPage({ weekMeals }: SearchPageProps) {
  const [timeScale, setTimeScale] = useState<TimeScale>("day");

  return (
    <div>
      <Tabs defaultValue="day" className="w-full gap-2">
        <TabsList className="w-fit mx-auto gap-4">
          <TabsTrigger value="day" className=" tabtrigger">
            Day
          </TabsTrigger>
          <TabsTrigger value="week" className=" tabtrigger">
            Week
          </TabsTrigger>
          <TabsTrigger value="month" className=" tabtrigger">
            Month
          </TabsTrigger>
        </TabsList>
        <TabsContent value="day">Days</TabsContent>
        <TabsContent value="week">
          {weekMeals && weekMeals.length > 0 ? (
            <MealList meals={weekMeals} />
          ) : (
            <p className="text-muted-foreground">
              No meals found for this week.
            </p>
          )}
        </TabsContent>
        <TabsContent value="month">Months</TabsContent>
      </Tabs>
    </div>
  );
}
