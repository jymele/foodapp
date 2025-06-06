"use client";
import { UserHousehold } from "@/generated/prisma";
import { motion } from "motion/react";

type Props = {
  members: UserHousehold[];
};

export default function MembersBlock({ members }: Props) {
  return (
    <motion.div>
      {members.map((item) => (
        <div key={item.id}>
          {item.user_email} - {item.admin ? "admin" : ""}
        </div>
      ))}
    </motion.div>
  );
}
