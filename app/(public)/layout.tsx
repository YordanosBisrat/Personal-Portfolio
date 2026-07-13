import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { BackToTop } from "@/components/effects/BackToTop";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { getProfile } from "@/features/profile/services";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();

  return (
    <div className="relative min-h-screen">
      <ScrollProgress />
      <CursorGlow />
      <CommandPalette resumeUrl={profile.resumeUrl} />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}