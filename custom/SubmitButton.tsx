"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  classes?: string;
  children: Readonly<React.ReactNode>;
};

export default function SubmitButton({ classes, children }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={`cursor-pointer ` + classes}
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
    </Button>
  );
}
