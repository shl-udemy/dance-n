import Link from "next/link";

const MAPS_URL = "https://maps.google.com/?q=רחוב+הנחמד+15+רעננה";

const MONTHLY_DATES = ["14.03", "28.03", "23.05", "20.06"];

export default function RaananaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">

      {/* Back link */}
      <div className="px-4 pt-4">
        <Link href="/" className="inline-flex items-center gap-1 text-teal-600 text-sm hover:underline">
          → חזרה לדף הבית
        </Link>
      </div>

      {/* Header */}
      <section className="pt-6 pb-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-700 font-semibold px-4 py-1.5 rounded-full text-sm mb-4">
            📍 רעננה
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
            <span className="text-gray-800">רוקדים </span>
            <span className="bg-gradient-to-l from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              ברעננה
            </span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            הרקדה שבועית מעגלים וזוגות באווירה מקצועית
          </p>
        </div>
      </section>

      {/* Weekly dance section */}
      <section className="px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">הרקדה שבועית</h2>
          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Day */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">
                  📅
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">יום</p>
                  <p className="font-bold text-gray-800">רביעי</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">מיקום</p>
                  <p className="font-bold text-gray-800 text-sm">קאנטרי רעננה</p>
                  <p className="text-gray-500 text-xs mt-0.5">רחוב הנחמד 15 רעננה</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">
                  🕐
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">שעות</p>
                  <p className="text-gray-800 text-xs font-medium">19:00–19:45 מעגלים צעד ראשון</p>
                  <p className="text-gray-800 text-xs">19:45–21:00 מעגלים</p>
                  <p className="text-gray-800 text-xs">21:00–21:45 זוגות</p>
                  <p className="text-gray-800 text-xs">21:45–22:15 מעגלים</p>
                  <p className="text-gray-800 text-xs">22:15–23:00 זוגות</p>
                </div>
              </div>

              {/* Dance type */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">
                  👥
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">סוג הרקדה</p>
                  <p className="font-bold text-gray-800 text-sm">מעגלים וזוגות</p>
                </div>
              </div>
            </div>

            {/* Entry fee */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-gradient-to-l from-teal-500 to-emerald-400 text-white font-bold px-6 py-2.5 rounded-full text-base shadow">
                🎟 ₪40 כניסה
              </span>
              <p className="text-gray-400 text-xs mt-2">מנויים חינם</p>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Saturday section */}
      <section className="px-4 pb-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">הרקדת שבת חודשית</h2>
          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="flex justify-end mb-4">
              <span className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 font-semibold px-4 py-1.5 rounded-full text-sm">
                🕐 פעם בחודש
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Day */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">
                  📅
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">יום</p>
                  <p className="font-bold text-gray-800">שבת</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">מיקום</p>
                  <p className="font-bold text-gray-800 text-sm">קאנטרי רעננה</p>
                  <p className="text-gray-500 text-xs mt-0.5">רחוב הנחמד 15 רעננה</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">
                  🕐
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">שעות</p>
                  <p className="text-gray-800 text-sm font-medium">11:00–13:00 מעגלים</p>
                  <p className="text-gray-500 text-xs mt-0.5">13:00–14:00 זוגות</p>
                </div>
              </div>

              {/* Dance type */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-lg shrink-0">
                  👥
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">סוג הרקדה</p>
                  <p className="font-bold text-gray-800 text-sm">מעגלים וזוגות</p>
                </div>
              </div>
            </div>

            {/* Upcoming dates */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-3 text-center">תאריכי הרקדות קרובות</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {MONTHLY_DATES.map((date) => (
                  <span
                    key={date}
                    className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium"
                  >
                    {date}
                  </span>
                ))}
              </div>
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
          className="inline-flex items-center gap-2 bg-gradient-to-l from-teal-500 to-emerald-400 text-white font-bold px-8 py-3 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg"
        >
          ✈️ הגעה למקום
        </a>
      </section>

      {/* Dance request CTA */}
      <section className="py-12 px-4 bg-gradient-to-b from-white to-teal-50 text-center">
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
