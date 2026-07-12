import Link from "next/link";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { Code2, Mail } from "lucide-react";
import { navItems } from "@/lib/nav-items";

const footerLinks = [
  { label: "GitHub", href: "https://github.com/YordanosBisrat", Icon: SiGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/yordanos-bisrat-911788334", Icon: LinkedInIcon },
  { label: "LeetCode", href: "https://leetcode.com/YordanosB/", Icon: Code2 },
  { label: "Email", href: "mailto:bisratyordanos777@gmail.com", Icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--color-border-glass)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold">
            Yordanos<span style={{ color: "var(--color-accent)" }}>.</span>
          </p>
          <p className="mt-3 text-sm text-foreground-secondary">
            Software Engineering student building full-stack products end to end.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium">Navigate</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="focus-ring text-sm text-foreground-secondary hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Connect</p>
          <ul className="mt-3 space-y-2">
            {footerLinks.map(({ label, href, Icon }) => (
              <li key={href}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="focus-ring flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground">
                  <Icon size={14} color="currentColor" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium">Based in</p>
          <p className="mt-3 text-sm text-foreground-secondary">Addis Ababa, Ethiopia</p>
        </div>
      </div>

      <div className="border-t px-6 py-6 text-center text-xs text-foreground-secondary" style={{ borderColor: "var(--color-border-glass)" }}>
        (c) {new Date().getFullYear()} Yordanos Bisrat. Built with Next.js, Supabase, and Tailwind CSS.
      </div>
    </footer>
  );
}
