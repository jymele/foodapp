import DesktopNav from "../ui/DesktopNav";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full">
      <DesktopNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
