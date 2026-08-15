import DanceRequestForm from "@/components/DanceRequestForm";

export default function RequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <div className="text-4xl sm:text-5xl mb-4">🪩</div>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-l from-orange-600 via-rose-500 to-amber-500 bg-clip-text text-transparent mb-2">
          בקשת ריקוד
        </h1>
        <p className="text-lg sm:text-xl font-semibold text-rose-500 mb-1">מרתון באר שבע עם נילי אלגזר</p>
        <p className="text-gray-500">בקשות לריקודים מתקבלות באהבה 💃🕺</p>
      </div>
      <DanceRequestForm />
    </div>
  );
}
