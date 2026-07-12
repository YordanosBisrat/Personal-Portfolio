"use client";

import Link from "next/link";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Code2, ArrowRight, Download, Mail } from "lucide-react";
import { useTypewriter } from "@/hooks/use-typewriter";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { GradientBlobs } from "@/components/effects/GradientBlobs";
import type { Profile, SocialLink } from "@/types/content";

const roles = [
  "Software Engineering Student",
  "Frontend Developer",
  "Full-Stack Developer",
  "Software Engineer",
];

interface HeroProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export function Hero({ profile, socialLinks }: HeroProps) {
  const typedRole = useTypewriter({ words: roles });

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
      <GradientBlobs />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-4 text-sm text-foreground-secondary">Based in {profile.location}</p>

          <h1 className="font-display text-4xl leading-tight md:text-6xl">{profile.fullName}</h1>

          <p className="mt-4 h-8 text-lg md:text-xl" style={{ color: "var(--color-accent)" }}>
            {typedRole}
            <span className="animate-pulse">|</span>
          </p>

          <p className="mt-6 max-w-xl text-foreground-secondary">{profile.bio}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <MagneticButton>
              <Link href="/projects" className="focus-ring inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="focus-ring glass-card inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
                Download Resume <Download className="h-4 w-4" />
              </a>
            </MagneticButton>

            <MagneticButton>
              <Link href="/contact" className="focus-ring inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium" style={{ borderColor: "var(--color-border-glass)" }}>
                Contact Me <Mail className="h-4 w-4" />
              </Link>
            </MagneticButton>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {socialLinks.map((link) => {
              const Icon = link.platform === "github" ? SiGithub : link.platform === "linkedin" ? LinkedInIcon : Code2;
              return (
                <a key={link.platform} href={link.url} target="_blank" rel="noreferrer" aria-label={link.label} className="focus-ring text-foreground-secondary transition-colors hover:text-foreground">
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="glass-card relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-full">
          <span className="font-display text-6xl" style={{ color: "var(--color-accent)" }}>
            YB
          </span>
        </div>
      </div>
    </section>
  );
}
