import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import appSettings from "@/appsettings";

export const metadata: Metadata = {
  title: appSettings.appName,
  authors: [{ name: "Joel Ymele", url: "https://yourwebsite.com" }],
  description: appSettings.appDescription,
  keywords: ["meal planning", "meal tracker", "food management"],
};

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--geist-font",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className}`}>{children}</body>
    </html>
  );
}
