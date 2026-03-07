import Link from "next/link";

const VENUES = [
  { href: "/RamatGan", label: "רוקדים ברמת גן", gradient: "from-rose-500 to-orange-400" },
  { href: "/Tzora", label: "רוקדים בצורעה", gradient: "from-amber-500 to-yellow-400" },
  { href: "/Raanana", label: "רוקדים ברעננה", gradient: "from-teal-500 to-emerald-400" },
  { href: "/BeerSheva", label: "רוקדים בבאר שבע", gradient: "from-indigo-500 to-purple-400" },
];

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
              <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center text-8xl shadow-lg">
                🪩
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-l from-orange-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
                נילי אלגזר
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-700 mb-2">
              מדריכת ריקודי עם | מעל 20 שנות ניסיון
            </p>
            <p className="text-lg md:text-xl text-gray-500 mb-6 max-w-3xl mx-auto">
              ריקודי עם לבוגרים – באווירה מקצועית, חמה ומלאת אנרגיה
            </p>
            <div className="inline-block bg-gradient-to-l from-orange-500 to-rose-500 rounded-full px-8 py-3 mt-4">
              <p className="text-xl md:text-2xl font-medium text-white">✨ במעגל עם נילי ✨</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">קצת עליי</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
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
          <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-6 min-w-max px-4">
              {VENUES.map(({ href, label, gradient }) => (
                <Link key={href} href={href} className="w-80 flex-shrink-0">
                  <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Special activities */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">פעילויות מיוחדות</h2>
          <div className="overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
            <div className="flex gap-8 min-w-max px-4">
              {SPECIAL.map(({ title, desc, icon, gradient, badge }) => (
                <div
                  key={title}
                  className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 w-80 flex-shrink-0 hover:scale-105"
                >
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
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
          <div className="bg-gradient-to-l from-orange-500 to-rose-500 rounded-3xl shadow-xl p-10">
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
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
