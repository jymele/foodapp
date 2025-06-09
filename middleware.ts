// export { auth  } from "@/auth";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "./generated/prisma";

const pathsWithHouseholdIds: string[] = ["/settings", "/addmeal", "/dashboard"];
const prisma = new PrismaClient();

export async function middleware(request: NextRequest) {
  const session = await auth();

  /**
   *   Check if the user is logged in
   **/
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /**
   *   Check if the user is in a room for specific rooms
   **/
  const url = new URL(request.url);
  const path = url.pathname;

  const userHousehold = await prisma.userHousehold.findFirst({
    where: {
      user_email: session.user!.email as string,
    },
  });

  if (pathsWithHouseholdIds.includes(path) && userHousehold == null) {
    return NextResponse.redirect(new URL("/new-household", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/settings", "/addmeal", "/dashboard", "/new-household"],
};
