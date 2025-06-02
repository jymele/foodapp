"use client";
import Image from "next/image";

type Props = {
  image: string | null | undefined;
};

export default function ProfileIcon({ image }: Props) {
  return (
    <div className="relative">
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
