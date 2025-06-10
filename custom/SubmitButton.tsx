"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

type Props = {
  classes?: string;
  children: Readonly<React.ReactNode>;
};

export default function SubmitButton({ classes, children }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`transition duration-150 cursor-pointer ` + classes}
      disabled={pending}
    >
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" />
          <span className="sr-only">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
