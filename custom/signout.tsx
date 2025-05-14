"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { LogOut, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SignOut() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      variant="destructive"
      size="icon"
      className="absolute top-4 right-4"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signOut({ callbackUrl: "/login" });
      }}
    >
      {!loading && <LogOut />}
      {loading && <LoaderCircle className="animate-spin" />}
    </Button>
  );
}
