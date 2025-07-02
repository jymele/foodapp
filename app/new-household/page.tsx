import Form from "next/form";
import { createRoom } from "./action";
import { auth } from "@/auth";
import { PrismaClient } from "@/generated/prisma";
import Link from "next/link";
import SubmitButton from "@/custom/SubmitButton";
import { Plus } from "lucide-react";
import InvitationList from "./invitation-list";
import { Input } from "@/components/ui/input";

export default async function NewRoom() {
  const session = await auth();

  if (!session) {
    // If the user is not logged in, redirect to the home page
    return (
      <div className="mt-14 flex items-center justify-center flex-col container mx-auto p-2">
        <h1 className="mb-4">You need to be logged in to create a household</h1>
        <Link href="/">Go to Home</Link>
      </div>
    );
  }

  const prisma = new PrismaClient();

  const households = await prisma.userHousehold.findMany({
    where: { user_email: session!.user!.email as string },
  });

  if (households.length > 0) {
    return (
      <div className="mt-14 flex items-center justify-center flex-col container mx-auto p-2">
        <h1 className="mb-4">You are already assigned to a household</h1>

        <Link href="/dashboard">Go to Dashboard</Link>
      </div>
    );
  }

  // Get all the list of invitations where this user email is the invitee_email
  const invitations = await prisma.invitation.findMany({
    where: { invitee_email: session!.user!.email as string },
  });

  return (
    <div className="container mx-auto h-dvh flex flex-col items-center justify-center p-2">
      <h1 className="font-semibold mb-2 text-lg">Create a Household</h1>
      <Form
        action={createRoom}
        className="transition duration-200 bg-white px-3.5 py-2.5 w-fit rounded-md shadow-sm flex"
      >
        <Input type="text" name="household-name" placeholder="Household Name" />
        <input
          type="hidden"
          name="user-email"
          value={session!.user!.email as string}
          className=""
          aria-required
          required
        />
        <SubmitButton>
          <Plus />
        </SubmitButton>
      </Form>

      <InvitationList invitations={invitations} />
    </div>
  );
}
