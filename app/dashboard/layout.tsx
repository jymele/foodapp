import DesktopNav from "@/app/ui/DesktopNav";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <div className="flex min-h-screen w-full">
      <DesktopNav session={session} />
      <div className="flex-1">{children}</div>
    </div>
  );
}
