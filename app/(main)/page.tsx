import VenueCarousel from "@/components/VenueCarousel";
import SpecialCarousel from "@/components/SpecialCarousel";

const FEATURES = [
  { icon: "🎵", title: "מוזיקה מקורית", desc: "שירים ישראליים ובינלאומיים" },
  { icon: "👥", title: "קהילה חמה", desc: "רוקדים יחד בשמחה" },
  { icon: "❤️", title: "לכל הרמות", desc: "מתחילים ומתקדמים" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">

      {/* Hero */}
      <section className="pt-12 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block mb-6">
              <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center text-6xl sm:text-8xl shadow-lg">
                🪩
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-l from-orange-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                נילי אלגזר
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 mb-2">
              מדריכת ריקודי עם | מעל 20 שנות ניסיון
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-6 max-w-3xl mx-auto">
              ריקודי עם לבוגרים – באווירה מקצועית, חמה ומלאת אנרגיה
            </p>
            <div className="inline-block bg-gradient-to-l from-orange-500 to-rose-500 rounded-full px-5 py-2 sm:px-8 sm:py-3 mt-4">
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-white">✨ במעגל עם נילי ✨</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">קצת עליי</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              אני נילי אלגזר, מדריכת ריקודי עם, ניסיון של מעל 20 שנה.<br />
              מרקידה בוגרים בהרקדות קבועות ופתוחות ברחבי הארץ, בשיתוף עיריות ומסגרות שונות.<br />
              הדגש שלי הוא מקצועיות, אווירה חמה ויצירת קהילה דרך תנועה ומוזיקה.
            </p>
          </div>
        </div>
      </section>

      {/* Venues carousel */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">בואו לרקוד איתנו!</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            הרקדות קבועות ופתוחות – חלקן בהרשמה מראש וחלקן פתוחות לקהל הרחב
          </p>
          <VenueCarousel />
        </div>
      </section>

      {/* Special activities */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">פעילויות מיוחדות</h2>
          <SpecialCarousel />
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 text-center">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center shadow-lg text-3xl">
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-l from-orange-500 to-rose-500 rounded-3xl shadow-xl p-6 sm:p-10">
            <p className="text-base sm:text-xl md:text-2xl text-white font-medium leading-relaxed">
              הריקוד בשבילי הוא שמחה, חיבור ואנרגיה שממשיכה איתכם גם אחרי שהמוזיקה נגמרת.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© 2026 נילי אלגזר - במעגל עם נילי</p>
      </footer>
    </div>
  );
}
