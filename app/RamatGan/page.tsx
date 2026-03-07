import VenuePageLayout from "@/components/VenuePageLayout";

export default function RamatGanPage() {
  return (
    <VenuePageLayout
      venueName="רוקדים ברמת גן"
      gradientFrom="from-rose-500"
      gradientTo="to-orange-400"
      scheduleItems={[
        { day: "יום ראשון", time: "20:00 – 22:00", location: "מקום לפרסום", note: "הרקדה קבועה פתוחה לכולם" },
        { day: "יום שלישי", time: "19:30 – 21:30", location: "מקום לפרסום", note: "הרקדה בהרשמה מראש" },
      ]}
      about="הרקדות ריקודי עם קבועות ברמת גן – באווירה חמה ומזמינה לכל הרמות. מתחילים ומתקדמים מוזמנים להצטרף!"
    />
  );
}
