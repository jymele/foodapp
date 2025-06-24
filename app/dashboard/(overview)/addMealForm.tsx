"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  mealName: z.string().min(3, "You must add a meal to save it"),
  userEmail: z.string().email("Did not recognize your email address"),
  mealDate: z.date({ required_error: "Please select a date" }),
});

type formProps = {
  email: string;
};

export default function AddMealForm({ email }: formProps) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealName: "",
      mealDate: new Date(), // Default to today's date
      userEmail: email,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await fetch("/api/meal/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealName: data.mealName,
        userEmail: data.userEmail,
        mealDate: data.mealDate.toISOString(),
      }),
    });

    // console.log("Response from server:", response);
    if (response.ok) {
      router.refresh();
      form.reset();
    } else {
      const errorData = await response.json();
      console.error("Error adding meal:", errorData.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Add a meal</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="mealName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Plantains"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The name of the meal you will eat
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mealDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Set a date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            aria-disabled={loading}
            type="submit"
            className="disabled:opacity-80 disabled:pointer-events-none"
          >
            <div>Send</div>
          </Button>
        </form>
      </Form>
    </div>
  );
}
