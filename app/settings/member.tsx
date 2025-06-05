"use client";
import { UserToRoom } from "@/generated/prisma";
import { motion } from "motion/react";

type Props = {
  members: UserToRoom[];
};

export default function MembersBlock({ members }: Props) {
  return (
    <motion.div>
      {members.map((item) => (
        <div key={item.id}>
          {item.userEmail} - {item.admin ? "admin" : ""}
        </div>
      ))}
    </motion.div>
  );
}
