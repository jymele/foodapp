"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      aria-disabled={loading}
      disabled={loading}
      variant={"tonal"}
      size={"lg"}
      onClick={() => {
        setLoading(true);
        signIn("google", { callbackUrl: "/dashboard" });
      }}
    >
      {loading ? <LoaderCircle className="animate-spin" /> : <FaGoogle />}Login
      with Google
    </Button>
  );
}
