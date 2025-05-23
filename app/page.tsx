import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  if (!session) {
    redirect("/login");
  }

  return <div>Blank Page</div>;
}
