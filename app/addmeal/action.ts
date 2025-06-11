"use server";
import { PrismaClient } from "@/generated/prisma";
import { redirect } from "next/navigation";

export default async function submitMeal(formdata: FormData) {
  const mealName = formdata.get("meal-name") as string;
  const userEmail = formdata.get("user-email") as string;
  const date = formdata.get("date") as string;
  const description = formdata.get("description") as string;

  const prisma = new PrismaClient();

  // Get the room ID for the user
  const userHousehold = await prisma.userHousehold.findFirst({
    where: { user_email: userEmail },
  });

  if (!userHousehold) {
    console.error("User is not assigned to any room.");
    return;
  }

  await prisma.meal.create({
    data: {
      name: mealName,
      // type: mealType,
      date: new Date(date),
      description: description,
      household_id: userHousehold.household_id,
      created_by_email: userEmail,
    },
  });

  redirect("/dashboard");
}
