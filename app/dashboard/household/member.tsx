"use client";
import { UserHousehold } from "@/generated/prisma";
import { motion } from "motion/react";
import Form from "next/form";
import { deleteMember } from "./actions";
import SubmitButton from "@/custom/SubmitButton";

type Props = {
  members: UserHousehold[];
  admin?: boolean;
};

export default function MembersBlock({ members, admin }: Props) {
  return (
    <div>
      <h2 className="text-center font-semibold p-4">Household Members</h2>
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
            {/* Delete member */}
            {admin && !member.admin && (
              <Form action={deleteMember} className="">
                <input type="hidden" name="member-id" value={member.id} />
                <SubmitButton classes="text-red-700">
                  <span className="sr-only">Remove member</span>
                  Remove member
                </SubmitButton>
              </Form>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
