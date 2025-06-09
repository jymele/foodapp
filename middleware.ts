// export { auth  } from "@/auth";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const pathsWithHouseholdIds: string[] = ["/settings", "/addmeal", "/dashboard"];

export async function middleware(request: NextRequest) {
  // Check if the user is logged in
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if the user is in a room for specific rooms
  const url = new URL(request.url);
  const path = url.pathname;
  //   console.log("Path is", path);
  if (!pathsWithHouseholdIds.includes(path)) {
    return NextResponse.redirect(new URL("/new-household", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/settings", "/addmeal", "/dashboard", "/new-household"],
};
