import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nili-bamaagal.vercel.app"),
  title: {
    default: "במעגל עם נילי | ריקודי עם עם נילי אלגזר",
    template: "%s | במעגל עם נילי",
  },
  description: "נילי אלגזר – מדריכת ריקודי עם עם מעל 20 שנות ניסיון. הרקדות קבועות ופתוחות בבאר שבע, רעננה, רמת גן וצורה. לכל הרמות.",
  keywords: ["ריקודי עם", "נילי אלגזר", "הרקדות", "ריקוד עממי", "מדריכת ריקודים", "ריקודי עם לבוגרים", "במעגל עם נילי"],
  authors: [{ name: "נילי אלגזר" }],
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "https://nili-bamaagal.vercel.app",
    siteName: "במעגל עם נילי",
    title: "במעגל עם נילי | ריקודי עם עם נילי אלגזר",
    description: "נילי אלגזר – מדריכת ריקודי עם עם מעל 20 שנות ניסיון. הרקדות קבועות ופתוחות ברחבי הארץ.",
    images: [{ url: "/nili-logo-1.jpg", width: 1200, height: 630, alt: "נילי אלגזר – מדריכת ריקודי עם" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "במעגל עם נילי | ריקודי עם",
    description: "נילי אלגזר – מדריכת ריקודי עם עם מעל 20 שנות ניסיון.",
    images: ["/nili-logo-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "dx492KTzRVmEd2YHStTVOSdV64Dv0E4pR06ToVqajbg",
  },
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
