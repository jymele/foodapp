import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function checkIfLoggedIn() {
  const session = await auth();
  if (!session) {
    redirect("/"); // User is not logged in
  }
}
