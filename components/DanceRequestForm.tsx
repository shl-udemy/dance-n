"use client";

import { useEffect, useState } from "react";
import { DANCE_SLOTS } from "@/lib/config";

const RATE_LIMIT_MS = 60_000;
const LS_NAME_KEY = "dance_request_name";
const LS_LAST_SUBMIT_KEY = "dance_request_last_submit";

type DanceRow = { name: string; type: "couples" | "circle" | "" };

export default function DanceRequestForm() {
  const [name, setName] = useState("");
  const [dances, setDances] = useState<DanceRow[]>([{ name: "", type: "" }]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem(LS_NAME_KEY);
    if (savedName) setName(savedName);
  }, []);

  function resetForm(keepName: string) {
    setDances([{ name: "", type: "" }]);
    setName(keepName);
  }

  function updateDanceName(index: number, value: string) {
    setDances((prev) => prev.map((row, i) => (i === index ? { ...row, name: value } : row)));
  }

  function updateDanceType(index: number, type: "couples" | "circle") {
    setDances((prev) =>
      prev.map((row, i) =>
        i === index ? { ...row, type: row.type === type ? "" : type } : row
      )
    );
  }

  function addRow() {
    setDances((prev) => (prev.length >= DANCE_SLOTS ? prev : [...prev, { name: "", type: "" }]));
  }

  function removeRow(index: number) {
    if (index === 0) return;
    setDances((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

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
        body: JSON.stringify({ name, dances }),
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
          שמך <span className="text-gray-400 font-normal">/ Your Name</span>{" "}
          <span className="text-gray-400 font-normal text-xs">(אופציונלי)</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="שם..."
        />
      </div>

      {/* Dances */}
      {dances.map((row, i) => (
        <div key={i} className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            שם הריקוד {i + 1}{" "}
            <span className="text-gray-400 font-normal">/ Dance Name {i + 1}</span>
            {i === 0 ? (
              <span className="text-rose-500 mr-1">*</span>
            ) : (
              <span className="text-gray-400 font-normal text-xs">{" "}(אופציונלי)</span>
            )}
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              required={i === 0}
              value={row.name}
              onChange={(e) => updateDanceName(i, e.target.value)}
              className="flex-1 min-w-[120px] border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              placeholder="שם הריקוד..."
            />
            <button
              type="button"
              onClick={() => updateDanceType(i, "couples")}
              className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                row.type === "couples"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              זוגות
            </button>
            <button
              type="button"
              onClick={() => updateDanceType(i, "circle")}
              className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                row.type === "circle"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              מעגל
            </button>
            {i > 0 && (
              <button
                type="button"
                aria-label={`הסר ריקוד ${i + 1}`}
                onClick={() => removeRow(i)}
                className="text-gray-400 hover:text-rose-500 text-lg leading-none px-1 cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add Dance */}
      <button
        type="button"
        onClick={addRow}
        disabled={dances.length >= DANCE_SLOTS}
        className="self-start border border-indigo-300 text-indigo-600 hover:bg-indigo-50 disabled:border-gray-200 disabled:text-gray-300 disabled:cursor-not-allowed rounded-lg px-3 py-1.5 text-sm font-medium transition cursor-pointer"
      >
        + הוסף ריקוד <span className="text-gray-400 font-normal">/ Add Dance</span>
      </button>

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
