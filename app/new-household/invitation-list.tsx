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
  return (
    <div className="w-full mt-8">
      <h2 className="mb-4 mt-8 font-semibold text-center">Invitations</h2>
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        {invitations.map((invitation) => (
          <motion.div key={invitation.id} variants={cardVariants}>
            <InvitationCard invitation={invitation} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
