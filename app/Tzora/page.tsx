import VenuePageLayout from "@/components/VenuePageLayout";

export default function TzoraPage() {
  return (
    <VenuePageLayout
      venueName="רוקדים בצורעה"
      gradientFrom="from-amber-500"
      gradientTo="to-yellow-400"
      scheduleItems={[
        { day: "יום שני", time: "20:00 – 22:00", location: "מקום לפרסום", note: "הרקדה קבועה פתוחה לכולם" },
        { day: "יום חמישי", time: "19:00 – 21:00", location: "מקום לפרסום", note: "הרקדה בהרשמה מראש" },
      ]}
      about="הרקדות ריקודי עם בצורעה – מפגש שבועי מרגש עם קהילה חמה ואנרגיה טובה. כולם מוזמנים!"
    />
  );
}
