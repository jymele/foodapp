export { auth } from "@/auth";
import { NextRequest } from "next/server";
import checkIfLoggedIn from "./utils/checkIfLoggedIn";
import { redirect } from "next/navigation";

const pathsWithHouseholdIds: string[] = ["/settings", "/addmeal", "/dashboard"];

export function middleware(request: NextRequest) {
  // Check if the user is logged in
  checkIfLoggedIn();

  // Check if the user is in a room for specific rooms
  const url = new URL(request.url);
  const path = url.pathname;
  //   console.log("Path is", path);
  if (!pathsWithHouseholdIds.includes(path)) {
    redirect("new-household");
  }
}

export const config = {
  matcher: ["/settings", "/addmeal", "/dashboard", "/new-household"],
};
