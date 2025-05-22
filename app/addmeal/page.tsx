"use client";
import Form from "next/form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import submitMeal from "../actions/submitMeal";

export default function AddMealPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1>Add a Meal</h1>
      <Form
        action={async () =>
          submitMeal(mealName, mealType, date as Date, description)
        }
        className="grid grid-cols-1 gap-8"
      >
        <div className="space-y-2">
          <Label htmlFor="meal-name">Meal Name</Label>
          <Input
            id="meal-name"
            placeholder="Enter meal name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meal-type">Meal Type</Label>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger id="meal-type">
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Add notes about your meal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <Button type="submit" className="w-full">
          Add Meal
        </Button>
      </Form>
    </div>
  );
}
