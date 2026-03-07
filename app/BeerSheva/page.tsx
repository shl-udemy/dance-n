import VenuePageLayout from "@/components/VenuePageLayout";

export default function BeerShevaPage() {
  return (
    <VenuePageLayout
      venueName="רוקדים בבאר שבע"
      gradientFrom="from-indigo-500"
      gradientTo="to-purple-400"
      scheduleItems={[
        { day: "יום שלישי", time: "19:00 – 21:00", location: "מקום לפרסום", note: "הרקדה קבועה פתוחה לכולם" },
        { day: "יום שישי", time: "10:00 – 12:00", location: "מקום לפרסום", note: "הרקדת בוקר שישי" },
      ]}
      about="הרקדות ריקודי עם בבאר שבע – קהילה חמה ותוססת בדרום. מתחילים ומתקדמים מוזמנים!"
    />
  );
}
