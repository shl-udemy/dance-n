"use client";

import { useState } from "react";

const LOCATIONS = ["קריית אונו", "פתח תקווה"];
const TIMES = ["יום א׳", "יום ו׳"];

export default function WorkshopSignupForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggle = (value: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lastSubmit = localStorage.getItem("workshop_last_submit");
    if (lastSubmit && Date.now() - Number(lastSubmit) < 2 * 60 * 1000) {
      setErrorMsg("שלחת לאחרונה — המתן דקה ונסה שוב");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/workshop-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, locations, times }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "שגיאה בשליחה");
      }

      localStorage.setItem("workshop_last_submit", String(Date.now()));
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
        <h3 className="text-2xl font-bold text-white mb-2">ההרשמה התקבלה!</h3>
        <p className="text-white/80">נחזור אליך בקרוב 💃</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/30 bg-white/20 backdrop-blur px-4 py-3 text-right text-white placeholder-white/60 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30 transition";

  const checkboxGroupClass = "flex gap-3 justify-center flex-wrap";

  const checkboxLabel = (label: string, checked: boolean, onChange: () => void) => (
    <label
      key={label}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition font-medium text-sm ${
        checked
          ? "bg-white text-[#5A3E2B] border-white"
          : "bg-white/10 text-white border-white/30 hover:bg-white/20"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
      {checked && <span>✓</span>}
      {label}
    </label>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="שם"
          className={inputClass}
        />
      </div>
      <div>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="טלפון"
          className={inputClass}
          dir="ltr"
        />
      </div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="מייל"
          className={inputClass}
          dir="ltr"
        />
      </div>

      {/* Location */}
      <div>
        <p className="text-white/80 text-sm mb-2 text-right">מיקום מועדף</p>
        <div className={checkboxGroupClass}>
          {LOCATIONS.map((loc) =>
            checkboxLabel(loc, locations.includes(loc), () => toggle(loc, locations, setLocations))
          )}
        </div>
      </div>

      {/* Time */}
      <div>
        <p className="text-white/80 text-sm mb-2 text-right">יום מועדף</p>
        <div className={checkboxGroupClass}>
          {TIMES.map((t) =>
            checkboxLabel(t, times.includes(t), () => toggle(t, times, setTimes))
          )}
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-white/80 text-right">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-xl bg-[#D9A441] text-[#5A3E2B] font-bold text-xl hover:opacity-90 transition disabled:opacity-60 shadow-lg"
      >
        {status === "loading" ? "שולח..." : "בטח, גם אני רוצה! 🕺"}
      </button>
    </form>
  );
}
