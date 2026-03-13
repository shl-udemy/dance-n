"use client";

import { useEffect, useState } from "react";

const PLACES: { label: string; id: string }[] = [
  { label: "רעננה", id: "Dance-R" },
  { label: "באר שבע", id: "Dance-B" },
  { label: "צלפון", id: "Dance-Z" },
];
const RATE_LIMIT_MS = 60_000;
const LS_NAME_KEY = "dance_request_name";
const LS_LAST_SUBMIT_KEY = "dance_request_last_submit";

export default function DanceRequestForm() {
  const [name, setName] = useState("");
  const [danceName, setDanceName] = useState("");
  const [performer, setPerformer] = useState("");
  const [danceType, setDanceType] = useState<"couples" | "circle" | "">("");
  const [place, setPlace] = useState<string>(PLACES[0].id);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem(LS_NAME_KEY);
    if (savedName) setName(savedName);
  }, []);

  function resetForm(keepName: string) {
    setDanceName("");
    setPerformer("");
    setDanceType("");
    setPlace(PLACES[0].id);
    setName(keepName);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!danceType) {
      setErrorMsg("נא לבחור סוג ריקוד / Please select dance type");
      return;
    }

    const lastSubmit = Number(localStorage.getItem(LS_LAST_SUBMIT_KEY) ?? 0);
    const elapsed = Date.now() - lastSubmit;
    if (elapsed < RATE_LIMIT_MS) {
      const seconds = Math.ceil((RATE_LIMIT_MS - elapsed) / 1000);
      setErrorMsg(`נא להמתין ${seconds} שניות לפני בקשה נוספת`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, danceName, performer, danceType, place }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "שגיאה בשליחה");
      }

      localStorage.setItem(LS_NAME_KEY, name);
      localStorage.setItem(LS_LAST_SUBMIT_KEY, String(Date.now()));
      setSuccessMsg("✓ הבקשה נשלחה!");
      resetForm(name);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "שגיאה בשליחה, נסה שוב");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 flex flex-col gap-5"
    >
      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          שמך <span className="text-gray-400 font-normal">/ Your Name</span>
          <span className="text-rose-500 mr-1">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="שם..."
        />
      </div>

      {/* Dance Name */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          שם הריקוד <span className="text-gray-400 font-normal">/ Dance Name</span>
          <span className="text-rose-500 mr-1">*</span>
        </label>
        <input
          type="text"
          required
          value={danceName}
          onChange={(e) => setDanceName(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="שם הריקוד..."
        />
      </div>

      {/* Performer */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          מבצע <span className="text-gray-400 font-normal">/ Performer</span>{" "}
          <span className="text-gray-400 font-normal text-xs">(אופציונלי)</span>
        </label>
        <input
          type="text"
          value={performer}
          onChange={(e) => setPerformer(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="שם המבצע..."
        />
      </div>

      {/* Dance Type */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-700">
          סוג ריקוד <span className="text-gray-400 font-normal">/ Dance Type</span>
          <span className="text-rose-500 mr-1">*</span>
        </span>
        <div className="flex flex-col gap-2">
          {(["couples", "circle"] as const).map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="danceType"
                value={type}
                checked={danceType === type}
                onChange={() => setDanceType(type)}
                className="accent-indigo-600"
              />
              <span className="text-sm text-gray-700">
                {type === "couples" ? "זוגות (Couples)" : "מעגל (Circle)"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Place */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          מקום <span className="text-gray-400 font-normal">/ Place</span>
          <span className="text-rose-500 mr-1">*</span>
        </label>
        <select
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white"
        >
          {PLACES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Error */}
      {errorMsg && (
        <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
          {errorMsg}
        </p>
      )}

      {/* Success */}
      {successMsg && (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 font-medium">
          {successMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-medium rounded-lg py-2.5 text-sm transition cursor-pointer disabled:cursor-not-allowed"
      >
        {isSubmitting ? "שולח..." : "שלח בקשה / Send Request"}
      </button>
    </form>
  );
}
