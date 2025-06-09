import { auth } from "@/auth";
import Navigation from "@/custom/Navigation";
import MembersBlock from "./member";
import { PrismaClient } from "@/generated/prisma";
import { redirect } from "next/navigation";
import { addMember } from "./actions";
import Form from "next/form";
import SubmitButton from "@/custom/SubmitButton";

export default async function ProfilePage() {
  const session = await auth();
  const prisma = new PrismaClient();

  const userHousehold = await prisma.userHousehold.findFirst({
    where: { user_email: session!.user!.email as string },
  });

  if (!userHousehold) {
    redirect("/new-household");
  }

  // find all the members in the room id
  const members = await prisma.userHousehold.findMany({
    where: { household_id: userHousehold?.household_id },
    // include: { user: true },
  });

  return (
    <div className="page flex flex-col gap-2">
      <div className="flex flex-row-reverse mb-6">
        <Navigation session={session} />
      </div>
      <Form
        action={addMember}
        className="bg-white flex items-center gap-4  rounded-lg shadow-sm overflow-hidden"
      >
        <input
          type="email"
          name="invitee_email"
          placeholder="user@gmail.com"
          className="flex-1 py-2.5 px-2 h-full outline-0"
          required
        />
        <input
          type="hidden"
          name="household_id"
          value={userHousehold.household_id}
        />
        <input
          type="hidden"
          name="inviter_email"
          value={session!.user!.email as string}
        />
        <SubmitButton classes="rounded-lg px-3.5 py-2.5 bg-white">
          Add
        </SubmitButton>
      </Form>
      <div>
        <MembersBlock members={members} admin={userHousehold?.admin} />
      </div>
    </div>
  );
}
