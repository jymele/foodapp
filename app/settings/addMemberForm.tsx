import { PrismaClient } from "@/generated/prisma";
import { addMember } from "./actions";
import Form from "next/form";
import SubmitButton from "@/custom/SubmitButton";

type Props = {
  email: string;
};

export default async function AddMemberForm({ email }: Props) {
  const prisma = new PrismaClient();

  const userHousehold = await prisma.userHousehold.findFirst({
    where: { user_email: email as string },
  });

  if (!userHousehold?.admin) {
    return <></>;
  }

  return (
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
        value={userHousehold!.household_id}
      />
      <input type="hidden" name="inviter_email" value={email as string} />
      <SubmitButton classes="rounded-lg px-3.5 py-2.5 bg-white">
        Add
      </SubmitButton>
    </Form>
  );
}
