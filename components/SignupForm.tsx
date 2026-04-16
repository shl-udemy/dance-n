"use client";

import { useState, useEffect } from "react";

interface SignupFormProps {
  events: string[];
  ctaText?: string;
}

export default function SignupForm({ events, ctaText = "אני רוצה להירשם" }: SignupFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    events.length === 1 ? [events[0]] : []
  );
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("signup_name");
    if (saved) setName(saved);
  }, []);

  const toggleEvent = (evt: string) => {
    setSelectedEvents((prev) =>
      prev.includes(evt) ? prev.filter((e) => e !== evt) : [...prev, evt]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lastSubmit = localStorage.getItem("signup_last_submit");
    if (lastSubmit && Date.now() - Number(lastSubmit) < 2 * 60 * 1000) {
      setErrorMsg("שלחת לאחרונה — המתן דקה ונסה שוב");
      setStatus("error");
      return;
    }

    if (events.length > 1 && selectedEvents.length === 0) {
      setErrorMsg("יש לבחור לפחות אירוע אחד");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, selectedEvents, remarks }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "שגיאה בשליחה");
      }

      localStorage.setItem("signup_name", name);
      localStorage.setItem("signup_last_submit", String(Date.now()));
      setStatus("success");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">ההרשמה התקבלה!</h3>
        <p className="text-gray-500">נשמח לראות אותך בקרוב 💃</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-right text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          שם מלא <span className="text-orange-500">*</span>
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="השם שלך..."
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          טלפון <span className="text-orange-500">*</span>
        </label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="050-0000000"
          className={inputClass}
          dir="ltr"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
          אימייל
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          className={inputClass}
          dir="ltr"
        />
      </div>

      {/* Events */}
      {events.length === 1 ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-right">אירוע</label>
          <div className={`${inputClass} text-gray-600 bg-gray-50 cursor-default`}>
            {events[0]}
          </div>
        </div>
      ) : events.length > 1 ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
            בחר אירועים <span className="text-orange-500">*</span>
          </label>
          <div className="space-y-2">
            {events.map((evt) => (
              <label
                key={evt}
                className="flex items-center gap-3 justify-end cursor-pointer group"
              >
                <span className="text-gray-700 group-hover:text-orange-600 transition">{evt}</span>
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(evt)}
                  onChange={() => toggleEvent(evt)}
                  className="w-5 h-5 rounded accent-orange-500 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
      ) : null}

      {/* Remarks */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-right">הערות</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="כל מה שתרצי להוסיף..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500 text-right">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 rounded-xl bg-gradient-to-l from-orange-500 to-rose-500 text-white font-bold text-lg hover:opacity-90 transition disabled:opacity-60"
      >
        {status === "loading" ? "שולח..." : ctaText}
      </button>
    </form>
  );
}
