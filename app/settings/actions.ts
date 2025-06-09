"use server";
import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function deleteMember(formData: FormData) {
  const entryId = formData.get("member-id");

  if (!entryId) {
    console.error("Member ID is missing");
    return;
  }

  // Delete the user household entry
  await prisma.userHousehold.delete({
    where: {
      id: entryId as string,
    },
  });

  revalidatePath("/settings");
}

export async function addMember(formData: FormData) {
  const invitee_email = formData.get("invitee_email");
  const inviter_email = formData.get("inviter_email");
  const household_id = formData.get("household_id");

  await prisma.invitation.create({
    data: {
      household_id: household_id as string,
      invitee_email: invitee_email as string,
      inviter_email: inviter_email as string,
    },
  });

  revalidatePath("/settings");
}
