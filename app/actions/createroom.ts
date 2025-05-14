"use server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";

export async function createRoom(formData: FormData) {
  console.log("Form data:", formData);

  const roomName = formData.get("roomname");
  const userEmail = formData.get("userEmail");

  const prisma = new PrismaClient();

  // Create the room
  const newRoom = await prisma.room.create({
    data: {
      name: roomName as string,
    },
  });

  // Assign the user to the room
  await prisma.userToRoom.create({
    data: {
      userEmail: userEmail as string,
      roomId: newRoom.id,
    },
  });

  redirect("/dashboard");
}
