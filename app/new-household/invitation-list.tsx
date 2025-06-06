"use client";

import { Invitation } from "@/generated/prisma";

type Props = {
  invitations: Invitation[];
};

export default function InvitationList({ invitations }: Props) {
  return <div>Invitations</div>;
}
