import DesktopNav from "@/app/ui/DesktopNav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/generated/prisma";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    // If the user is not logged in, redirect to the home page
    return redirect("/");
  }

  const prisma = new PrismaClient();

  if (session) {
    /**
     *   Check if the user is in a room for specific rooms
     **/
    const userHousehold = await prisma.userHousehold.findFirst({
      where: {
        user_email: session!.user!.email as string,
      },
    });

    if (userHousehold == null) {
      return redirect("/new-household");
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <DesktopNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
