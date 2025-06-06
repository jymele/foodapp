"use client";

import { Invitation } from "@/generated/prisma";
import { motion } from "motion/react";

type Props = {
  invitations: Invitation[];
};

export default function InvitationList({ invitations }: Props) {
  return (
    <div>
      <h2>Invitations</h2>
      <motion.div>
        {invitations.map((invitation) => (
          <div key={invitation.id}>{invitation.inviter_email}</div>
        ))}
      </motion.div>
    </div>
  );
}
