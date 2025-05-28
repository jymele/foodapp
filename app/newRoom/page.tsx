import Form from "next/form";
import { createRoom } from "./action";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import Link from "next/link";
import SubmitButton from "@/custom/SubmitButton";
import { Plus } from "lucide-react";

export default async function NewRoom() {
  const session = await auth();
  const prisma = new PrismaClient();

  if (!session) {
    redirect("/login");
  }

  const rooms = await prisma.userToRoom.findMany({
    where: { userEmail: session.user!.email as string },
  });

  if (rooms.length > 0) {
    return (
      <div className="mt-14 flex items-center justify-center flex-col container mx-auto p-2">
        <h1 className="mb-4">You already have a room</h1>

        <Link href="/dashboard">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto h-dvh flex flex-col items-center justify-center p-2">
      <h1 className="font-semibold mb-2 text-lg">Create a Room</h1>
      <Form
        action={createRoom}
        className="transition duration-200 bg-white px-3.5 py-2.5 w-fit rounded-md shadow-sm flex"
      >
        <input type="text" name="roomname" placeholder="Room Name" />
        <input
          type="hidden"
          name="userEmail"
          value={session.user!.email as string}
          className=""
          aria-required
          required
        />
        <SubmitButton>
          <Plus className="text-slate-700" />
        </SubmitButton>
      </Form>
    </div>
  );
}
