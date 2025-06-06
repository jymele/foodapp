import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function deleteMember(formData: FormData) {
  const memberEmail = formData.get("member-email");
  const householdId = formData.get("household-id");

  if (!memberEmail || !householdId) {
    console.error("Member email or household ID is missing");
    return;
  }

  const prisma = new PrismaClient();

  // Delete the user household entry
  await prisma.userHousehold.delete({
    where: {
      // Replace this with the correct unique identifier for the userHousehold table
      id: formData.get("user-household-id") as string,
    },
  });

  revalidatePath("/settings");
}
