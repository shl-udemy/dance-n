"use client";

import { useState } from "react";
import Link from "next/link";

const VENUES = [
  { href: "/RamatGan", label: "רוקדים ברמת גן", gradient: "from-rose-500 to-orange-400" },
  { href: "/Tzora", label: "רוקדים בצורעה", gradient: "from-amber-500 to-yellow-400" },
  { href: "/Raanana", label: "רוקדים ברעננה", gradient: "from-teal-500 to-emerald-400" },
  { href: "/BeerSheva", label: "רוקדים בבאר שבע", gradient: "from-indigo-500 to-purple-400" },
];

export default function VenueCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + VENUES.length) % VENUES.length);
  const next = () => setIdx((i) => (i + 1) % VENUES.length);
  const { href, label, gradient } = VENUES[idx];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 sm:gap-4 w-full justify-center">
        <button
          onClick={next}
          aria-label="הקודם"
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-orange-500 hover:bg-orange-50 transition text-xl font-bold shrink-0"
        >
          ←
        </button>

        <Link href={href} className="w-full max-w-sm">
          <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 text-3xl">
                📍
              </div>
              <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-500 mb-2">
                {label}
              </h3>
              <p className="text-gray-500 group-hover:text-white/80 transition-colors duration-500">
                לחצו לפרטים נוספים
              </p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="inline-block px-6 py-2 bg-white/20 rounded-full text-white text-sm font-medium">
                  הצטרפו אלינו →
                </span>
              </div>
            </div>
          </div>
        </Link>

        <button
          onClick={prev}
          aria-label="הבא"
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-orange-500 hover:bg-orange-50 transition text-xl font-bold shrink-0"
        >
          →
        </button>
      </div>

      <div className="flex gap-2">
        {VENUES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === idx ? "bg-orange-500" : "bg-gray-300"
            }`}
            aria-label={`עבור לכרטיס ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
