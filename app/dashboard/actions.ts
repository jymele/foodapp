"use server";
import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function deleteMealById(formdata: FormData) {
  const mealId = formdata.get("meal-id");

  if (!mealId) {
    throw new Error("Meal id is not provided");
  }

  await prisma.meal.delete({ where: { id: mealId as string } });

  revalidatePath("/dashboard");
}
