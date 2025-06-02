"use client";
import Image from "next/image";
import { motion } from "motion/react";

type Props = {
  image: string | null | undefined;
};

export default function ProfileIcon({ image }: Props) {
  return (
    <div className="relative p-1">
      <motion.div
        className="absolute inset-0 bg-blue-600 rounded-full -z-10"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <Image
        src={image || ""}
        alt="User Image"
        width={50}
        height={50}
        className="rounded-full"
      />
      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500 border-2 border-white"></span>
    </div>
  );
}
