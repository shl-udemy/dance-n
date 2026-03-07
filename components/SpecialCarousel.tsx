"use client";

import { useState } from "react";

const SPECIAL = [
  {
    title: "שישי נשי",
    desc: "מפגשי ריקוד וחיבור נשי, יחד עם המדריכה אתי מעודה",
    icon: "✨",
    gradient: "from-pink-400 to-rose-400",
    badge: true,
  },
  {
    title: "הרקדות שבת",
    desc: "הרקדות פתוחות במסגרת עיריות שונות",
    icon: "📅",
    gradient: "from-purple-400 to-indigo-400",
    badge: false,
  },
  {
    title: "נופשי ריקודי עם",
    desc: "חוויות ריקוד ברחבי הארץ עם מרקידים נוספים",
    icon: "🌴",
    gradient: "from-teal-400 to-cyan-400",
    badge: false,
  },
];

export default function SpecialCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + SPECIAL.length) % SPECIAL.length);
  const next = () => setIdx((i) => (i + 1) % SPECIAL.length);
  const { title, desc, icon, gradient, badge } = SPECIAL[idx];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={next}
          aria-label="הקודם"
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-orange-500 hover:bg-orange-50 transition text-xl font-bold shrink-0"
        >
          ←
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 w-80 hover:scale-105">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg text-4xl`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{desc}</p>
          {badge && (
            <div className="mt-4">
              <span className="inline-block bg-gradient-to-l from-orange-500 to-rose-500 text-white text-sm px-4 py-2 rounded-full">
                יש אירוע קרוב! לחץ לפרטים
              </span>
            </div>
          )}
        </div>

        <button
          onClick={prev}
          aria-label="הבא"
          className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-orange-500 hover:bg-orange-50 transition text-xl font-bold shrink-0"
        >
          →
        </button>
      </div>

      <div className="flex gap-2">
        {SPECIAL.map((_, i) => (
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
