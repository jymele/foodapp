"use client";
import { Power, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { links } from "@/app/lib/links";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DesktopNav() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  return (
    <div className="hidden md:block p-1">
      <div className="flex flex-col h-full">
        <div className="w-48 h-48 bg-teal-800 rounded-lg text-2xl text-white flex items-center justify-center">
          Meal App
        </div>
        <ul className="space-y-1 flex-1 pt-1">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={clsx(
                  "transition duration-200 block px-4 py-3 text-sm text-slate-950 hover:bg-teal-800/10 hover:text-teal-950 rounded-lg",
                  pathname === link.href && "!bg-teal-700 !text-teal-50"
                )}
              >
                <div className="flex items-center gap-2">
                  {link.icon}
                  <span className="text-base">{link.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <button
            aria-disabled={loading}
            disabled={loading}
            className="transition duration-200 hover:text-red-800 cursor-pointer px-4 py-3 flex items-center gap-2 rounded-lg"
            onClick={() => {
              setLoading(true);
              signOut({ callbackUrl: "/" });
            }}
          >
            {loading ? (
              <LoaderCircle className="animate-spin w-6 h-6" />
            ) : (
              <Power className="w-6 h-6" />
            )}
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
