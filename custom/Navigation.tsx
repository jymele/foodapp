"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Session } from "next-auth";

export default function Navigation({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const userImage = session?.user?.image || null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
        className="p-2 bg-white rounded-lg cursor-pointer shadow-sm active:scale-95 transition duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
        title="Menu"
      >
        <Menu className="w-6 h-6 text-slate-950" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-white overflow-hidden absolute mt-3 shadow-sm rounded-lg min-w-max right-0"
          >
            <div className="p-3 flex items-center flex-between gap-4">
              <div>
                <Image
                  src={userImage || "/default-profile.png"}
                  alt="User Image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="text-sm">{session?.user?.name}</div>
            </div>
            <div className="border-t border-slate-200">
              <ul className="p-3 space-y-2">
                <li>
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-slate-950 hover:bg-slate-100 rounded-lg"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-slate-950 hover:bg-slate-100 rounded-lg"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="/logout"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
