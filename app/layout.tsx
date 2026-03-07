import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "בקשת ריקוד | Dance Request",
  description: "שלח בקשת ריקוד לאירוע / Send a dance request for the event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
