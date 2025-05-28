"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      aria-disabled={loading}
      className="btn bg-white outline-slate-500/0 focus:outline-slate-400"
      onClick={() => {
        setLoading(true);
        signIn("google", { callbackUrl: "/dashboard" });
      }}
    >
      {loading ? "Loading..." : "Login with Google"}
    </button>
  );
}
