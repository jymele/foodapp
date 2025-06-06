"use client";
import { UserHousehold } from "@/generated/prisma";
import { motion } from "motion/react";

type Props = {
  members: UserHousehold[];
  admin?: boolean;
};

export default function MembersBlock({ members, admin }: Props) {
  return (
    <motion.div>
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between w-full border-t border-slate-200 py-4"
        >
          <div>
            {member.user_email}
            {member.admin && (
              <span className="text-xs text-blue-600"> (Admin)</span>
            )}
          </div>
          {admin && !member.admin && <div className="">Remove member</div>}
        </div>
      ))}
    </motion.div>
  );
}
