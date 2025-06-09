import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const pathsToCheck: string[] = [
  "/settings",
  "/addmeal",
  "/dashboard",
  "/new-household",
];

export default async function checkIfLoggedIn() {
  const headerList = await headers();
  const pathname = headerList.get("x-invoke-path") || "/";
  const session = await auth();
  if (pathsToCheck.includes(pathname) && !session) {
    redirect("/"); // User is not logged in
  }
}
