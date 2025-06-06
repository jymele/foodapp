import { acceptInvitation } from "@/app/new-household/action";
import { Invitation } from "@/generated/prisma";
import Form from "next/form";

type Props = {
  invitation: Invitation;
};

export default function InvitationCard({ invitation }: Props) {
  return (
    <Form
      action={acceptInvitation}
      className="flex items-center justify-between w-full"
    >
      <h2 className="font-semibold leading-none tracking-tight text-slate-950">
        {invitation.inviter_email}
      </h2>
      <input type="hidden" name="invitation-id" value={invitation.id} />
      <input type="hidden" name="user-email" value={invitation.invitee_email} />
      <div>
        <button className="cursor-pointer" type="submit">
          Accept
        </button>
      </div>
    </Form>
  );
}
