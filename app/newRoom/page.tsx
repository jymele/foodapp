import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Form from "next/form";
import { createRoom } from "@/app/actions/createroom";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewRoom() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-2 mt-14">
      <h1>Create a Room</h1>
      <Form action={createRoom}>
        <Input type="text" name="roomname" placeholder="Room Name" />
        <input
          type="hidden"
          name="userEmail"
          value={session.user!.email as string}
        />
        <Button type="submit" className="mt-2">
          Create Room
        </Button>
      </Form>
    </div>
  );
}
