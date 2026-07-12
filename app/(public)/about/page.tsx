import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { getProfile } from "@/features/profile/services";

export default async function AboutPage() {
  const profile = await getProfile();

  return (
    <div className="pt-8">
      <About profile={profile} />
      <Timeline />
    </div>
  );
}