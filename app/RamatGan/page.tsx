import Link from "next/link";

const MAPS_URL = "https://maps.google.com/?q=רחוב+הרצל+42+רמת+גן";

export default function RamatGanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">

      {/* Back link */}
      <div className="px-4 pt-4">
        <Link href="/" className="inline-flex items-center gap-1 text-rose-500 text-sm hover:underline">
          → חזרה לדף הבית
        </Link>
      </div>

      {/* Header */}
      <section className="pt-6 pb-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            📍 רמת גן
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
            <span className="text-gray-800">רוקדים </span>
            <span className="bg-gradient-to-l from-rose-500 to-orange-400 bg-clip-text text-transparent">
              ברמת גן
            </span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            הרקדה פתוחה לכולם ללא עלות בחסות עיריית רמת גן
          </p>
        </div>
      </section>

      {/* Info card */}
      <section className="px-4 pb-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Day */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg shrink-0">
                📅
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">יום</p>
                <p className="font-bold text-gray-800">שלישי</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg shrink-0">
                📍
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">מיקום</p>
                <p className="font-bold text-gray-800 text-sm">בית הארחת עיריית רמת גן</p>
                <p className="text-gray-500 text-xs mt-0.5">רחוב הרצל 42 רמת גן</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg shrink-0">
                🕐
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">שעות</p>
                <p className="font-bold text-gray-800">18:30–20:30</p>
              </div>
            </div>

            {/* Dance type */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg shrink-0">
                👥
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">סוג הרקדה</p>
                <p className="font-bold text-gray-800 text-sm">הרקדת מעגלים</p>
                <p className="text-gray-500 text-xs mt-0.5">פתוחה לכולם</p>
              </div>
            </div>
          </div>

          {/* Free entry */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 bg-gradient-to-l from-rose-500 to-orange-400 text-white font-bold px-8 py-3 rounded-full text-lg shadow">
              ♡ ללא עלות
            </span>
            <p className="text-gray-400 text-xs mt-2">בחסות עיריית רמת גן</p>
          </div>
        </div>
      </section>

      {/* Navigate button */}
      <section className="px-4 pb-12 text-center">
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-l from-rose-500 to-orange-400 text-white font-bold px-8 py-3 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg"
        >
          ✈️ הגעה למקום
        </a>
      </section>

      {/* Dance request CTA */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-rose-50 text-center">
        <p className="text-gray-600 mb-6 text-lg">רוצים לבקש ריקוד מסוים?</p>
        <Link
          href="/request"
          className="inline-block bg-gradient-to-l from-orange-500 to-rose-500 text-white font-bold px-6 py-3 sm:px-10 sm:py-4 rounded-full text-base sm:text-lg hover:opacity-90 transition-opacity shadow-lg"
        >
          🪩 שלחו בקשת ריקוד
        </Link>
      </section>

      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© 2026 נילי אלגזר - במעגל עם נילי</p>
      </footer>
    </div>
  );
}
