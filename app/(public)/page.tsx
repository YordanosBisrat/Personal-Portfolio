import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { getProfile, getSocialLinks } from "@/features/profile/services";
import { getSkills } from "@/features/skills/services";
import { getTimeline } from "@/features/timeline/services";
import { getStatistics } from "@/features/statistics/services";

export default async function HomePage() {
  const [profile, socialLinks, skills, timeline, statistics] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getSkills(),
    getTimeline(),
    getStatistics(),
  ]);

  return (
    <>
      <Hero profile={profile} socialLinks={socialLinks} />
      <Stats statistics={statistics} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Timeline timeline={timeline} />
      <GithubActivity />
    </>
  );
}