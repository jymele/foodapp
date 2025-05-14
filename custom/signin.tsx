"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signIn("google", { callbackUrl: "/dashboard" });
      }}
    >
      {loading ? "Loading..." : "Login with Google"}
    </Button>
  );
}
