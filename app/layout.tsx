import type { Metadata } from "next";
import { auth } from "@/auth";
import "./globals.css";
import SignOut from "@/custom/signout";
import appSettings from "@/appsettings";

export const metadata: Metadata = {
  title: appSettings.appName,
  authors: [{ name: "Joel Ymele", url: "https://yourwebsite.com" }],
  description: appSettings.appDescription,
  keywords: ["meal planning", "meal tracker", "food management"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {/* {session && <SignOut />} */}
        {children}
      </body>
    </html>
  );
}
