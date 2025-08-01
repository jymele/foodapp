"use client";

import InvitationCard from "@/custom/InvitationCard";
import { Invitation } from "@/generated/prisma";
import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type Props = {
  invitations: Invitation[];
};

export default function InvitationList({ invitations }: Props) {
  if (!invitations || invitations.length === 0) {
    return null; // Don't show anything if no invitations
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-medium text-foreground mb-2">
          Pending Invitations
        </h2>
        <p className="text-muted-foreground">
          You have been invited to join these households
        </p>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {invitations.map((invitation) => (
          <motion.div key={invitation.id} variants={cardVariants}>
            <InvitationCard invitation={invitation} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
