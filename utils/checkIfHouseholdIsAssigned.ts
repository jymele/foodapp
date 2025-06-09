import { auth } from "@/auth";
import { PrismaClient } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const pathsToCheck: string[] = ["/settings", "/addmeal", "/dashboard"];
const prisma = new PrismaClient();

export default async function checkIfHouseholdIsAssigned() {
  const headerList = await headers();
  const pathname = headerList.get("x-invoke-path") || "/";

  const session = await auth();

  /**
   *   Check if the user is in a room for specific rooms
   **/
  const userHousehold = await prisma.userHousehold.findFirst({
    where: {
      user_email: session!.user!.email as string,
    },
  });

  if (pathsToCheck.includes(pathname) && userHousehold == null) {
    return redirect("/new-household");
  }
}
