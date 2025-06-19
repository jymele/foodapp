"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import MealList from "@/custom/MealList";
import { Meal } from "@/generated/prisma";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
type SearchPageProps = {
  weekMeals?: Meal[]; // Replace with actual type if available
};

export default function SearchPage({ weekMeals }: SearchPageProps) {
  return (
    <div>
      <Tabs defaultValue="week" className="w-full gap-4">
        <TabsList className="w-fit mx-auto gap-4">
          <TabsTrigger value="week" className="tabtrigger">
            This Week
          </TabsTrigger>
          <TabsTrigger value="custom-search" className="tabtrigger">
            Custom
          </TabsTrigger>
        </TabsList>
        <TabsContent value="week">
          {weekMeals && weekMeals.length > 0 ? (
            <MealList meals={weekMeals} />
          ) : (
            <p className="text-muted-foreground">
              No meals found for this week.
            </p>
          )}
        </TabsContent>
        <TabsContent value="custom-search">Months</TabsContent>
      </Tabs>
    </div>
  );
}
