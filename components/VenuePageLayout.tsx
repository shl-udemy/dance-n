import Link from "next/link";

interface ScheduleItem {
  day: string;
  time: string;
  location: string;
  note?: string;
}

interface VenuePageLayoutProps {
  venueName: string;
  gradientFrom: string;
  gradientTo: string;
  scheduleItems: ScheduleItem[];
  about: string;
}

export default function VenuePageLayout({
  venueName,
  gradientFrom,
  gradientTo,
  scheduleItems,
  about,
}: VenuePageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">

      {/* Hero */}
      <section className={`py-20 px-4 bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="text-6xl mb-6">📍</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{venueName}</h1>
          <p className="text-xl opacity-90">הרקדות קבועות ופתוחות</p>
        </div>
      </section>

      {/* Weekly schedule */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">לוח הרקדות שבועי</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {scheduleItems.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 flex gap-4 items-start">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center text-white text-xl shrink-0`}>
                  🗓
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{item.day}</p>
                  <p className="text-orange-600 font-medium">{item.time}</p>
                  <p className="text-gray-600 text-sm mt-1">{item.location}</p>
                  {item.note && (
                    <p className="text-gray-400 text-xs mt-1">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About this venue */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">על ההרקדה</h2>
            <p className="text-lg text-gray-600 leading-relaxed">{about}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <p className="text-gray-600 mb-6 text-lg">רוצים לבקש ריקוד מסוים?</p>
        <Link
          href="/request"
          className="inline-block bg-gradient-to-l from-orange-500 to-rose-500 text-white font-bold px-10 py-4 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg"
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
