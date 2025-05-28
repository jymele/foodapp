import Form from "next/form";
import { createRoom } from "@/app/actions/createroom";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";
import Link from "next/link";
import SubmitButton from "@/custom/SubmitButton";

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
    <div className="container mx-auto p-2 mt-14">
      <h1>Create a Room</h1>
      <Form
        action={createRoom}
        className="transition duration-200 bg-white px-3.5 py-2.5 w-fit cursor-pointer rounded-md flex"
      >
        <input type="text" name="roomname" placeholder="Room Name" />
        <input
          type="hidden"
          name="userEmail"
          value={session.user!.email as string}
          aria-required
          required
        />
        <SubmitButton />
      </Form>
    </div>
  );
}
