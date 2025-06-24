"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

export default function ProfileImage({
  imgSrc,
  name,
}: {
  imgSrc: string;
  name: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        src={imgSrc}
        height="500"
        width="500"
        className={clsx(
          "mx-auto -mt-20 md:mt-0 md:mx-0 rounded-full w-36 h-36 ring-3 ring-slate-50",
          !loaded ? "hidden" : ""
        )}
        alt={name}
        priority
        onLoad={() => setLoaded(true)}
      />

      {!loaded && <ProfileImageLoading />}
    </>
  );
}

export function ProfileImageLoading() {
  return (
    <div className="mx-auto -mt-20 md:mt-0 md:mx-0 rounded-full w-36 h-36 bg-teal-800 ring-slate-50 animate-pulse"></div>
  );
}
