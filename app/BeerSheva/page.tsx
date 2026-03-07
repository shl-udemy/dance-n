import Link from "next/link";

const UPCOMING_DATES = ["07.03", "21.03", "11.04", "02.05"];

const MAPS_URL =
  "https://maps.google.com/?q=רחוב+דוד+הראובני+27+באר+שבע";

export default function BeerShevaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Header */}
      <section className="pt-12 pb-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
            <span className="text-gray-800">רוקדים </span>
            <span className="bg-gradient-to-l from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              בבאר שבע
            </span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg mb-6">
            הרקדת שבת פתוחה לקהל – מעגלים וזוגות
          </p>
          <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 font-semibold px-5 py-2 rounded-full text-sm">
            🕐 פעם בחודש
          </span>
        </div>
      </section>

      {/* Info card */}
      <section className="px-4 pb-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-6 sm:p-8">

          {/* 2x2 grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Day */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-lg shrink-0">
                📅
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">יום</p>
                <p className="font-bold text-gray-800">שבת</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-lg shrink-0">
                📍
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">מיקום</p>
                <p className="font-bold text-gray-800 text-sm">אולם ספורט מקיף טוביהו</p>
                <p className="text-gray-500 text-xs mt-0.5">רחוב דוד הראובני 27 באר שבע</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-lg shrink-0">
                🕐
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">שעות</p>
                <p className="font-bold text-gray-800 text-sm">12:00–14:00 מעגלים</p>
                <p className="text-gray-500 text-xs mt-0.5">14:00–14:30 זוגות</p>
              </div>
            </div>

            {/* Dance type */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-lg shrink-0">
                👥
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">סוג הרקדה</p>
                <p className="font-bold text-gray-800 text-sm">מעגלים וזוגות</p>
                <p className="text-gray-500 text-xs mt-0.5">פתוחה לקהל</p>
              </div>
            </div>
          </div>

          {/* Upcoming dates */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-3 text-center">תאריכי הרקדות קרובות</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {UPCOMING_DATES.map((date) => (
                <span
                  key={date}
                  className="px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {date}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigate button */}
      <section className="px-4 pb-12 text-center">
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-l from-indigo-600 to-purple-500 text-white font-bold px-8 py-3 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg"
        >
          ✈️ הגעה למקום
        </a>
      </section>

      {/* Dance request CTA */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-indigo-50 text-center">
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
