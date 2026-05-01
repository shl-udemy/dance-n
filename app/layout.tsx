import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
