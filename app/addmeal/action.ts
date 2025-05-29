"use server";
import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export default async function submitMeal(formdata: FormData) {
  const mealName = formdata.get("meal-name") as string;
  const mealType = formdata.get("meal-type") as string;
  const userEmail = formdata.get("user-email") as string;
  const date = formdata.get("date") as string;
  const description = formdata.get("description") as string;

  const prisma = new PrismaClient();

  // Get the room ID for the user
  const userToRoom = await prisma.userToRoom.findFirst({
    where: { userEmail: userEmail },
  });

  if (!userToRoom) {
    console.error("User is not assigned to any room.");
    return;
  }

  // Add the meal to the database
  const data = await prisma.meal.create({
    data: {
      name: mealName,
      // type: mealType,
      date: new Date(date),
      description: description,
      roomId: userToRoom.id,
      addedByEmail: userEmail,
    },
  });

  console.log("Meal added:", data);
  // Optionally, you can revalidate the path to update the UI

  revalidatePath("/addmeal");
}
