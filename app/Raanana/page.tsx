import VenuePageLayout from "@/components/VenuePageLayout";

export default function RaananaPage() {
  return (
    <VenuePageLayout
      venueName="רוקדים ברעננה"
      gradientFrom="from-teal-500"
      gradientTo="to-emerald-400"
      scheduleItems={[
        { day: "יום ראשון", time: "19:30 – 21:30", location: "מקום לפרסום", note: "הרקדה קבועה פתוחה לכולם" },
        { day: "יום רביעי", time: "20:00 – 22:00", location: "מקום לפרסום", note: "הרקדה בהרשמה מראש" },
      ]}
      about="הרקדות ריקודי עם ברעננה – מפגש שבועי עם מוזיקה ישראלית ובינלאומית מגוונת. בואו לרקוד!"
    />
  );
}
