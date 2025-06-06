"use client";

import InvitationCard from "@/custom/InvitationCard";
import { Invitation } from "@/generated/prisma";
import { motion } from "motion/react";

type Props = {
  invitations: Invitation[];
};

export default function InvitationList({ invitations }: Props) {
  return (
    <div className="w-full">
      <h2 className="mb-4 mt-8">Invitations</h2>
      <motion.div className="grid grid-cols-1 gap-4">
        {invitations.map((invitation) => (
          // <div key={invitation.id}>{invitation.inviter_email}</div>
          <InvitationCard key={invitation.id} invitation={invitation} />
        ))}
      </motion.div>
    </div>
  );
}
