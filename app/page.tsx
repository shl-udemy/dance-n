import DanceRequestForm from "@/components/DanceRequestForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <div className="text-4xl mb-3">🪩</div>
        <h1 className="text-2xl font-bold text-gray-900">בקשת ריקוד</h1>
        <p className="text-sm text-gray-500 mt-1">Dance Request</p>
      </div>
      <DanceRequestForm />
    </main>
  );
}
