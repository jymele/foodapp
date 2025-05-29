import SignIn from "@/custom/signin";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
