"use client";
import submitMeal from "./action";
import Form from "next/form";
import { useFormState } from "react-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  mealName: z.string().min(1, "Meal name is required"),
  userEmail: z.string().email("Invalid email address"),
  mealDate: z.string().min(1, "Meal date is required"),
});

export default function AddMealForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealName: "",
      mealDate: new Date().toISOString().split("T")[0], // Default to today's date
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submitted with data:", data);
  }

  return (
    <div>
      <h2>Meal Form</h2>
      <Form action={submitMeal}></Form>
    </div>
  );
}
