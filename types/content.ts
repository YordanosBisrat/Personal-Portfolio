export interface SocialLink {
  platform: "github" | "linkedin" | "leetcode";
  url: string;
  label: string;
}

export interface Profile {
  fullName: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  resumeUrl: string;
  yearsLearning: number;
}

export type SkillCategory =
  | "frontend" | "backend" | "languages" | "mobile" | "database" | "ai" | "tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
}

export interface Statistic {
  label: string;
  value: number;
  suffix?: string;
}

export type ProjectCategory = "web" | "mobile" | "systems" | "graphics";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  lessons: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
}

export interface TimelineItem {
  id: string;
  label: string;
  date: string;
  description?: string;
}