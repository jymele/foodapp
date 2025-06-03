"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { LogOut, LoaderCircle, Menu, Settings, House } from "lucide-react";

export default function Navigation({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-slate-950 hover:bg-slate-100 rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <House className="w-4 h-4" />
                      Dashboard
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-slate-950 hover:bg-slate-100 rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <Settings className="w-4 h-4" />
                      Settings
                    </div>
                  </Link>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full cursor-pointer"
                    disabled={loading}
                    onClick={() => {
                      setLoading(true);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <div className="flex items-center justify-between gap-6">
                      {loading ? (
                        <LoaderCircle className="animate-spin w-4 h-4" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                      Logout
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
