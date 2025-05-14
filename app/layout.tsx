import type { Metadata } from "next";
import { auth } from "@/auth";
import "./globals.css";
import SignOut from "@/custom/signout";

export const metadata: Metadata = {
  title: "Food App",
  description: "Plan your meals",
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
        {session && <SignOut />}
        {children}
      </body>
    </html>
  );
}
