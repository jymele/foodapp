"use server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function createRoom(formData: FormData) {
  console.log("Form data:", formData);

  const roomName = formData.get("household-name");
  const userEmail = formData.get("user-email");

  if (!roomName || !userEmail) {
    console.error("Room name or user email is missing");
  } else {
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

export async function acceptInvitation(formData: FormData) {
  const invitationId = formData.get("invitation-id");
  const userEmail = formData.get("user-email");

  if (!invitationId || !userEmail) {
    console.error("Invitation ID or user email is missing");
    return;
  }

  // Find the invitation
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId as string },
  });

  if (!invitation) {
    console.error("Invitation not found");
    return;
  }

  // Create the user household
  await prisma.userHousehold.create({
    data: {
      user_email: userEmail as string,
      household_id: invitation.household_id,
      admin: false,
    },
  });

  // Delete the invitation
  await prisma.invitation.delete({
    where: { id: invitationId as string },
  });

  redirect("/dashboard");
}
