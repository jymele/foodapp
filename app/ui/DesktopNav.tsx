import { Button } from "@/components/ui/button";
import { House, Power } from "lucide-react";
import Link from "next/link";

// const links

export default function DesktopNav() {
  return (
    <div className="hidden md:block">
      <div className="flex flex-col h-full">
        <div className="w-48 h-48 bg-teal-800 text-white flex items-center justify-center">
          Meal App
        </div>
        <ul className="space-y-2 flex-1">
          <li>
            <Link
              href="/dashboard"
              className="block px-4 py-3 text-sm text-slate-950 hover:bg-teal-800/10 hover:text-teal-950 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <House className="w-4 h-4" />
                Dashboard
              </div>
            </Link>
          </li>
        </ul>
        <div>
          <Link href="/logout" className="px-4 py-3 flex items-center gap-2">
            <Power className="w-6 h-6" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
