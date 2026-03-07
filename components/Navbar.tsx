"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/RamatGan", label: "רוקדים ברמת גן" },
  { href: "/Tzora", label: "רוקדים בצורעה" },
  { href: "/Raanana", label: "רוקדים ברעננה" },
  { href: "/BeerSheva", label: "רוקדים בבאר שבע" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between flex-wrap gap-2">
          <Link
            href="/"
            className="text-2xl font-bold text-orange-600 shrink-0"
          >
            במעגל עם נילי
          </Link>
          <div className="flex flex-wrap gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === href
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-700 hover:bg-orange-100 hover:text-orange-700"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/request"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                pathname === "/request"
                  ? "bg-orange-600 text-white"
                  : "bg-gradient-to-l from-orange-500 to-rose-500 text-white hover:opacity-90"
              }`}
            >
              🪩 בקשת ריקוד
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
