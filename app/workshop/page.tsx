import Image from "next/image";
import WorkshopSignupForm from "@/components/WorkshopSignupForm";

export default function WorkshopPage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-600 via-blue-500 to-sky-400 pt-10 pb-14 px-4 text-center">
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
          בואו להתחיל לרקוד
        </h1>
        <p className="text-white/90 text-lg font-medium">סדנת ריקודי עם למתחילים</p>
      </section>

      {/* Emotional hook */}
      <section className="py-12 px-6 text-center bg-white">
        <p className="text-2xl font-bold text-gray-800 mb-4">
          זה הזמן להתחיל לרקוד ריקודי עם
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          תמיד חלמת לרקוד ריקודי עם וחששת לנסות?
          <br />
          <span className="font-semibold text-blue-500">זה הזמן....</span>
        </p>
      </section>

      {/* Dancers placeholder */}
      <section className="py-12 px-6 bg-gradient-to-br from-blue-50 to-sky-50 text-center">
        <div className="text-7xl mb-4">💃🕺</div>
        <p className="text-xl font-bold text-gray-700">אז ככה...</p>
      </section>

      {/* No barriers */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-md mx-auto space-y-4">
          {[
            "לא צריך נסיון",
            "לא צריך להיות רקדנים",
            "צריך רצון והתמדה",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 bg-blue-50 rounded-2xl px-5 py-4 border border-blue-100"
            >
              <span className="text-2xl">✅</span>
              <span className="text-lg font-semibold text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop details */}
      <section className="py-12 px-6 bg-gradient-to-br from-blue-600 to-sky-500 text-center text-white">
        <div className="max-w-md mx-auto">
          <div className="text-4xl mb-5">🎶</div>
          <div className="space-y-3 text-lg leading-relaxed">
            <p className="text-2xl font-extrabold">3 מפגשים של שעתיים</p>
            <p>שבהם נלמד צעדי בסיס</p>
            <p className="font-semibold">ריקודי עם למתחילים</p>
            <p>שתוכלו לתרגל את הצעדים ולצבור בטחון על הרחבה</p>
          </div>
        </div>
      </section>

      {/* Personal guidance */}
      <section className="py-12 px-6 bg-white text-center">
        <div className="max-w-md mx-auto bg-blue-50 rounded-3xl px-6 py-8 border border-blue-100">
          <div className="text-4xl mb-4">🤝</div>
          <p className="text-lg font-semibold text-gray-800 leading-relaxed">
            אני אדריך אותך אישית
            <br />
            בצורה סבלנית, ברורה ואיכותית
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 px-6 bg-gradient-to-br from-blue-50 to-sky-50 text-center">
        <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-lg border border-blue-200 px-6 py-8">
          <div className="text-4xl mb-4">🏷️</div>
          <p className="text-4xl font-extrabold text-blue-600 mb-1">480 ₪</p>
          <p className="text-gray-500 text-sm mb-5">תשלום חד פעמי</p>
          <div className="space-y-2 text-gray-700 text-base">
            <p>📅 3 מפגשים · 6 שעות סה״כ</p>
            <p>👥 עד 10 משתתפים בלבד</p>
            <p>🎓 ידע בסיסי ובטחון להכנס למעגל הרוקדים</p>
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section className="py-14 px-6 bg-gradient-to-b from-blue-600 to-sky-500 text-center">
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
