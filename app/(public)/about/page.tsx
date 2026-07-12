import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { getProfile } from "@/features/profile/services";
import { getTimeline } from "@/features/timeline/services";

export default async function AboutPage() {
  const [profile, timeline] = await Promise.all([getProfile(), getTimeline()]);

  return (
    <div className="pt-8">
      <About profile={profile} />
      <Timeline timeline={timeline} />
    </div>
  );
}