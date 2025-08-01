import { acceptInvitation, rejectInvitation } from "@/app/new-household/action";
import { Invitation } from "@/generated/prisma";
import Form from "next/form";
import SubmitButton from "./SubmitButton";

type Props = {
  invitation: Invitation;
};

export default function InvitationCard({ invitation }: Props) {
  return (
    <div className="flex items-center justify-between w-full bg-background border border-border rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div>
        <h2 className="font-medium text-foreground">
          Invitation from {invitation.inviter_email}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Join their household
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Accept this invitation to join */}
        <Form action={acceptInvitation}>
          <input type="hidden" name="invitation-id" value={invitation.id} />
          <input
            type="hidden"
            name="user-email"
            value={invitation.invitee_email}
          />
          <SubmitButton classes="rounded-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            Accept
          </SubmitButton>
        </Form>

        {/* Reject the invitation */}
        <Form action={rejectInvitation}>
          <input type="hidden" name="invitation-id" value={invitation.id} />
          <SubmitButton
            variant="outline"
            classes="rounded-full px-4 py-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Decline
          </SubmitButton>
        </Form>
      </div>
    </div>
  );
}
