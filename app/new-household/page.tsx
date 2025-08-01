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
    <div className="container mx-auto min-h-dvh flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-medium text-foreground mb-2">
            Create your household
          </h1>
          <p className="text-muted-foreground text-lg">
            Give your household a name to get started
          </p>
        </div>

        {/* Gemini-style Input */}
        <div className="relative">
          <Form action={createRoom} className="w-full">
            <div className="relative flex items-center bg-background border border-border rounded-3xl shadow-lg hover:shadow-xl transition-all duration-200 focus-within:shadow-xl focus-within:border-ring">
              <Input
                type="text"
                name="household-name"
                placeholder="Enter household name..."
                className="flex-1 border-0 bg-transparent text-lg px-6 py-4 rounded-3xl shadow-none focus-visible:ring-0 focus-visible:border-transparent placeholder:text-muted-foreground"
                autoFocus
              />
              <input
                type="hidden"
                name="user-email"
                value={session!.user!.email as string}
                aria-required
                required
              />
              <div className="pr-2">
                <SubmitButton classes="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 border-0">
                  <Plus className="h-5 w-5" />
                </SubmitButton>
              </div>
            </div>
          </Form>
        </div>

        {/* Invitations */}
        <div className="mt-12">
          <InvitationList invitations={invitations} />
        </div>
      </div>
    </div>
  );
}
