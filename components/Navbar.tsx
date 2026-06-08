"use client";

import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = (href: string) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      pathname === href
        ? "bg-orange-100 text-orange-700"
        : "text-gray-700 hover:bg-orange-100 hover:text-orange-700"
    }`;

  const ctaClass =
    pathname === "/request"
      ? "px-4 py-2 rounded-full text-sm font-medium bg-orange-600 text-white"
      : "px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-l from-orange-500 to-rose-500 text-white hover:opacity-90 transition-all duration-300";

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-orange-600 shrink-0">
            במעגל עם נילי
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex flex-wrap gap-1 items-center">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
            <Link href="/request" className={ctaClass}>
              🪩 בקשת ריקוד
            </Link>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
            className="sm:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-orange-50 transition"
          >
            {isOpen ? (
              <span className="text-xl text-gray-700 leading-none">✕</span>
            ) : (
              <>
                <span className="block w-5 h-0.5 bg-gray-700 rounded" />
                <span className="block w-5 h-0.5 bg-gray-700 rounded" />
                <span className="block w-5 h-0.5 bg-gray-700 rounded" />
              </>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-lg border-t border-orange-100 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={linkClass(href)}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/request" className={ctaClass} onClick={() => setIsOpen(false)}>
            🪩 בקשת ריקוד
          </Link>
        </div>
      )}
    </header>
  );
}
