"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import { useState, useEffect } from "react";

type TimeScale = "day" | "week" | "month";

export default function SearchPage() {
  const [timeScale, setTimeScale] = useState<TimeScale>("day");

  return (
    <div>
      {/* <div className="flex gap-0.5 justify-center p-1 rounded-sm bg-slate-200 w-fit mx-auto">
        <Button
          variant="outline"
          className="rounded-sm"
          onClick={() => alert("ok")}
        >
          Day
        </Button>
        <Button
          variant="outline"
          className="rounded-sm"
          onClick={() => alert("ok")}
        >
          Week
        </Button>
        <Button
          variant="outline"
          className="rounded-sm"
          onClick={() => alert("ok")}
        >
          Month
        </Button>
      </div> */}

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
        <TabsContent value="week">Weeks</TabsContent>
        <TabsContent value="month">Months</TabsContent>
      </Tabs>
    </div>
  );
}
