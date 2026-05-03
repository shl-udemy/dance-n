import Image from "next/image";
import WorkshopSignupForm from "@/components/WorkshopSignupForm";

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#C96A2B] to-[#E58E26] pt-10 pb-14 px-4 text-center">
        <div className="max-w-sm mx-auto mb-6">
          <Image
            src="/nili-logo-1.jpg"
            alt="ניל׳י ריקודי עם"
            width={180}
            height={180}
            className="mx-auto rounded-full shadow-xl border-4 border-white/40"
          />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow mb-3">
          ריקודי עם מתחילים כאן
        </h1>
        <p className="text-white/90 text-lg font-medium">גם אם אף פעם לא רקדתם</p>
      </section>

      {/* Emotional hook */}
      <section className="py-12 px-6 text-center bg-white">
        <p className="text-2xl font-bold text-[#5A3E2B] mb-4">
          קל להתחיל, כיף להתמיד
        </p>
        <p className="text-lg text-gray-600 leading-relaxed font-bold">
          לימוד בקצב נוח, אווירה נעימה והמון הנאה.
        </p>
      </section>

      {/* Dancers placeholder */}
      <section className="py-12 px-6 bg-[#F8F1E7] text-center">
        <div className="text-7xl mb-4">💃🕺</div>
        <p className="text-xl font-bold text-[#5A3E2B]">אז ככה...</p>
      </section>

      {/* No barriers */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-md mx-auto space-y-4">
          {[
            "לא צריך להיות רקדנים",
            "לא צריך נסיון",
            "צריך רצון והתמדה",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 bg-[#F8F1E7] rounded-2xl px-5 py-4 border border-[#5A3E2B]/20"
            >
              <span className="text-2xl">✅</span>
              <span className="text-lg font-semibold text-[#5A3E2B]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop details */}
      <section className="py-12 px-6 bg-gradient-to-br from-[#C96A2B] to-[#E58E26] text-center text-white">
        <div className="max-w-md mx-auto">
          <p className="text-2xl font-extrabold mb-6">ב-3 מפגשים של שעתיים:</p>
          <div className="space-y-3 text-lg leading-relaxed text-center mb-6">
            <p>💃 נלמד את צעדי הבסיס</p>
            <p>🎵 נכיר 15–20 ריקודי מתחילים</p>
            <p>😄 נתרגל יחד בקצב נעים</p>
          </div>
          <p className="text-xl font-semibold">תצברו ביטחון ותצטרפו למעגל בכיף ובחיוך 🎶</p>
        </div>
      </section>

      {/* Personal guidance */}
      <section className="py-12 px-6 bg-white text-center">
        <div className="max-w-md mx-auto bg-[#F8F1E7] rounded-3xl px-6 py-8 border border-[#5A3E2B]/20">
          <div className="text-4xl mb-4">🤝</div>
          <p className="text-lg font-semibold text-[#5A3E2B] leading-relaxed">
            אני אדריך אותך אישית
            <br />
            בצורה סבלנית, ברורה ואיכותית
            <br /><br />
            נחזור ונתרגל יחד
            <br />
            עד שהצעדים ירגישו טבעיים ופשוטים 🫶
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 px-6 bg-[#F8F1E7] text-center">
        <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-lg border border-[#5A3E2B]/20 px-6 py-8">
          <div className="text-4xl mb-5">🏷️</div>
          <div className="space-y-2 text-[#5A3E2B] text-base mb-6">
            <p>📅 3 מפגשים · 6 שעות ממוקדות</p>
            <p>👥 קבוצה קטנה – עד 10 משתתפים בלבד</p>
            <p>⭐ ליווי אישי, תרגול מעשי</p>
          </div>
          <div className="border-t border-[#5A3E2B]/10 pt-5">
            <p className="text-4xl font-extrabold text-[#D9A441]">480 ₪</p>
            <p className="text-gray-500 text-sm mt-1">סכום חד פעמי</p>
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section className="py-14 px-6 bg-gradient-to-b from-[#C96A2B] to-[#E58E26] text-center">
        <div className="max-w-md mx-auto">
          <p className="text-2xl font-extrabold text-white mb-2">
            מלאי כאן את הפרטים
          </p>
          <p className="text-white/80 mb-8 text-lg">
            כדי להצטרף ולרקוד את החיים!
          </p>
          <WorkshopSignupForm />
        </div>
      </section>

    </div>
  );
}
