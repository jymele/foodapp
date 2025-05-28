"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle, Plus } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      //   className="btn bg-white outline-slate-500/0 focus:outline-slate-400"
      disabled={pending}
    >
      {pending ? (
        <LoaderCircle className="animate-spin text-slate-400" />
      ) : (
        <Plus className="text-slate-700" />
      )}
    </button>
  );
}
