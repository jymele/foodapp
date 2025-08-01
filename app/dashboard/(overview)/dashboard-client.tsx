"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Meal } from "@/generated/prisma";
import MealList from "@/custom/MealList";

type DashboardClientProps = {
  initialMeals: Meal[];
  householdId: string;
  userEmail: string;
};

export default function DashboardClient({
  initialMeals,
  householdId,
  userEmail,
}: DashboardClientProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [loading, setLoading] = useState(false);

  const fetchMealsForDate = async (date: Date) => {
    setLoading(true);
    try {
      // You can implement an API endpoint to fetch meals for a specific date
      const response = await fetch(
        `/api/meal/by-date?date=${date.toISOString()}&householdId=${householdId}`
      );
      if (response.ok) {
        const data = await response.json();
        setMeals(data.meals || []);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      fetchMealsForDate(date);
    }
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div>
      {/* Date Selector */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {isToday ? "Today's Meals" : "Meals"}
          </h2>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Meals List */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Loading meals...</p>
        </div>
      ) : (
        <MealList meals={meals} />
      )}
    </div>
  );
}
