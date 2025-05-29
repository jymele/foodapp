"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, LoaderCircle } from "lucide-react";

export default function SignOut() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className="btn outline-slate-500/0 focus:outline-slate-400 bg-white absolute top-4 right-4 "
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signOut({ callbackUrl: "/" });
      }}
    >
      {!loading && <LogOut />}
      {loading && <LoaderCircle className="animate-spin" />}
    </button>
  );
}
