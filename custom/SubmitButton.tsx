"use client";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  classes?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  children: Readonly<React.ReactNode>;
};

export default function SubmitButton({ classes, children, variant }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant ? variant : "default"}
      className={classes}
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
