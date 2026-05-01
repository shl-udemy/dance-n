import Navbar from "@/components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-16 sm:pt-20">
      <Navbar />
      {children}
    </div>
  );
}
