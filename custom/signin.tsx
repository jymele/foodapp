"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      aria-disabled={loading}
      disabled={loading}
      className="btn bg-white outline-slate-500/0 focus:outline-slate-400 flex gap-4 items-center justify-center text-slate-950 hover:bg-slate-100 active:scale-95 transition duration-200 focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 rounded-lg shadow-sm w-full max-w-xs h-12 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={() => {
        setLoading(true);
        signIn("google", { callbackUrl: "/dashboard" });
      }}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <FaGoogle />}Login
      with Google
    </button>
  );
}
