"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function SignOut() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signOut({ callbackUrl: "/login" });
      }}
    >
      {loading ? "Signing out..." : "Sign Out"}
    </Button>
  );
}
