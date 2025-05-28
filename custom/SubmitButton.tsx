"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="transition duration-150 hover:scale-110"
      disabled={pending}
    >
      {pending ? (
        <LoaderCircle className="animate-spin text-slate-400" />
      ) : (
        children
      )}
    </button>
  );
}
