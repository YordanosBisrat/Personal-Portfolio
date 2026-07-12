import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { GithubActivity } from "@/components/sections/GithubActivity";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Timeline />
      <GithubActivity />
    </>
  );
}