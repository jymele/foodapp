import { acceptInvitation, rejectInvitation } from "@/app/new-household/action";
import { Invitation } from "@/generated/prisma";
import Form from "next/form";

type Props = {
  invitation: Invitation;
};

export default function InvitationCard({ invitation }: Props) {
  return (
    <div className="flex items-center justify-between w-full border-t border-slate-200 py-4">
      <h2 className="font-semibold leading-none tracking-tight text-slate-950">
        {invitation.inviter_email}
      </h2>

      <div className="flex items-center gap-4">
        {/* Accept this invitation to join */}
        <Form action={acceptInvitation}>
          <input type="hidden" name="invitation-id" value={invitation.id} />
          <input
            type="hidden"
            name="user-email"
            value={invitation.invitee_email}
          />
          <button className="cursor-pointer" type="submit">
            Accept
          </button>
        </Form>

        {/* Reject the invitation */}
        <Form action={rejectInvitation}>
          <input type="hidden" name="invitation-id" value={invitation.id} />
          <button className="cursor-pointer text-red-700" type="submit">
            Reject
          </button>
        </Form>
      </div>
    </div>
  );
}
