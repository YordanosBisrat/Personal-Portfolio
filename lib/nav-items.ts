import type { LucideIcon } from "lucide-react";
import { Home, User, FolderGit2, Newspaper, Radio, Mail } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "Now", href: "/now", icon: Radio },
  { label: "Contact", href: "/contact", icon: Mail },
];

export const externalLinks = [
  { label: "GitHub", href: "https://github.com/YordanosBisrat" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yordanos-bisrat-911788334" },
  { label: "LeetCode", href: "https://leetcode.com/YordanosB/" },
];