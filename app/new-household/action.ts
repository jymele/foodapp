"use server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";

export async function createRoom(formData: FormData) {
  console.log("Form data:", formData);

  const roomName = formData.get("household-name");
  const userEmail = formData.get("user-email");

  if (!roomName || !userEmail) {
    console.error("Room name or user email is missing");
  } else {
    const prisma = new PrismaClient();

    // Create the room
    const newHousehold = await prisma.household.create({
      data: {
        name: roomName as string,
      },
    });

    // Assign the user to the room
    await prisma.userHousehold.create({
      data: {
        user_email: userEmail as string,
        household_id: newHousehold.id,
        admin: true,
      },
    });

    redirect("/dashboard");
  }
}
