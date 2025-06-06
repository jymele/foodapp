import checkIfLoggedIn from "@/utils/checkIfLoggedIn";
import { auth } from "@/auth";
import Navigation from "@/custom/Navigation";
import MembersBlock from "./member";
import { PrismaClient } from "@/generated/prisma";

export default async function ProfilePage() {
  checkIfLoggedIn();

  const session = await auth();
  const prisma = new PrismaClient();

  const userHousehold = await prisma.userHousehold.findFirst({
    where: { user_email: session!.user?.email as string },
  });

  // find all the members in the room id
  const members = await prisma.userHousehold.findMany({
    where: { household_id: userHousehold?.household_id },
    // include: { user: true },
  });

  console.log(members);

  return (
    <div className="page flex flex-col gap-2">
      <div className="flex flex-row-reverse mb-6">
        <Navigation session={session} />
      </div>
      <div>
        <MembersBlock members={members} />
      </div>
    </div>
  );
}
