import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "במעגל עם נילי",
  description: "נילי אלגזר – מדריכת ריקודי עם | הרקדות קבועות ופתוחות ברחבי הארץ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased pt-16 sm:pt-20">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
