import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { BackToTop } from "@/components/effects/BackToTop";
import { CursorGlow } from "@/components/effects/CursorGlow";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <CursorGlow />
      <CommandPalette />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}