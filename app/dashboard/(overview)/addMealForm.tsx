"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarIcon, Plus } from "lucide-react";

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
  mealDate: z.string(),
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
      mealDate: new Date().toISOString(), // Default to today's date
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
        mealDate: data.mealDate,
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 border border-primary/15 p-2 rounded-lg bg-background mb-4"
        >
          <FormField
            control={form.control}
            name="mealName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Add the meal you will eat"
                    {...field}
                    className="border-none ring-0 shadow-none px-2 focus-visible:ring-0"
                  />
                </FormControl>
                {/* <FormDescription>
                  The name of the meal you will eat
                </FormDescription> */}
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
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center flex-row-reverse">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={loading}
                  aria-disabled={loading}
                  variant={"ghost"}
                  size={"sm"}
                  className={cn(
                    "justify-start text-left font-normal px-3",
                    !form.watch("mealDate") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {form.watch("mealDate")
                    ? format(new Date(form.watch("mealDate")), "MMM d, yyyy")
                    : "Pick date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={
                    form.watch("mealDate")
                      ? new Date(form.watch("mealDate"))
                      : undefined
                  }
                  onSelect={(date) => {
                    if (date) {
                      form.setValue("mealDate", date.toISOString());
                    }
                  }}
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button
              disabled={loading}
              aria-disabled={loading}
              type="submit"
              variant={"ghost"}
              size={"icon"}
            >
              <Plus />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
