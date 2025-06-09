export { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { auth } from "@/auth";
// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "./generated/prisma";

// const pathsWithHouseholdIds: string[] = ["/settings", "/addmeal", "/dashboard"];
// const prisma = new PrismaClient();

// export async function middleware(request: NextRequest) {
//   const session = await auth();

//   /**
//    *   Check if the user is logged in
//    **/
//   if (!session) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   /**
//    *   Check if the user is in a room for specific rooms
//    **/
//   const url = new URL(request.url);
//   const path = url.pathname;

//   const userHousehold = await prisma.userHousehold.findFirst({
//     where: {
//       user_email: session.user!.email as string,
//     },
//   });

//   if (pathsWithHouseholdIds.includes(path) && userHousehold == null) {
//     return NextResponse.redirect(new URL("/new-household", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/settings", "/addmeal", "/dashboard", "/new-household"],
// };

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
