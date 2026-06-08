import { redirect } from "next/navigation";
import { getPageContent } from "@/lib/sheets-content";
import SignupForm from "@/components/SignupForm";

export const dynamic = "force-dynamic";

export default async function JoinPage() {
  redirect("/");
  const content = await getPageContent();

  const headline = content.headline || "הצטרפו אלינו לריקוד!";
  const subtitle = content.subtitle || "";
  const eventDate = content.event_date || "";
  const eventTime = content.event_time || "";
  const eventLocation = content.event_location || "";
  const ctaText = content.cta_text || "אני רוצה להירשם";
  const note = content.note || "";

  const events: string[] = content.events
    ? content.events.split(",").map((e) => e.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
      {/* Hero */}
      <section className="pt-12 pb-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="w-24 h-24 sm:w-36 sm:h-36 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center text-5xl sm:text-7xl shadow-lg">
              🪩
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-l from-orange-600 via-rose-500 to-amber-500 bg-clip-text text-transparent">
              {headline}
            </span>
          </h1>

          {subtitle && (
            <p className="text-lg sm:text-xl text-gray-600 mb-6 whitespace-pre-line">{subtitle}</p>
          )}

          {/* Event details */}
          {(eventDate || eventTime || eventLocation) && (
            <div className="inline-flex flex-col gap-2 bg-white/70 backdrop-blur rounded-2xl px-6 py-4 shadow-sm border border-orange-100 mb-4 text-right">
              {eventDate && (
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-gray-700 font-medium">{eventDate}</span>
                  <span className="text-orange-500">📅</span>
                </div>
              )}
              {eventTime && (
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-gray-700 font-medium">{eventTime}</span>
                  <span className="text-orange-500">🕗</span>
                </div>
              )}
              {eventLocation && (
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-gray-700 font-medium">{eventLocation}</span>
                  <span className="text-orange-500">📍</span>
                </div>
              )}
            </div>
          )}

          {note && (
            <p className="text-sm text-gray-500 mt-2">{note}</p>
          )}
        </div>
      </section>

      {/* Signup form */}
      <section className="px-4 pb-20">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-100 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">טופס הרשמה</h2>
          <SignupForm events={events} ctaText={ctaText} />
        </div>
      </section>
    </div>
  );
}
