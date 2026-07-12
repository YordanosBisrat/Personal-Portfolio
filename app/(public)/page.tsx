import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { GithubActivity } from "@/components/sections/GithubActivity";
import { getProfile, getSocialLinks } from "@/features/profile/services";
import { getSkills } from "@/features/skills/services";

export default async function HomePage() {
  const [profile, socialLinks, skills] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getSkills(),
  ]);

  return (
    <>
      <Hero profile={profile} socialLinks={socialLinks} />
      <Stats />
      <About profile={profile} />
      <Skills skills={skills} />
      <Timeline />
      <GithubActivity />
    </>
  );
}