"use server";
import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMember(formData: FormData) {
  const entryId = formData.get("user-household-id");

  if (!entryId) {
    console.error("Member ID is missing");
    return;
  }

  const prisma = new PrismaClient();

  // Delete the user household entry
  await prisma.userHousehold.delete({
    where: {
      id: entryId as string,
    },
  });

  revalidatePath("/settings");
}
