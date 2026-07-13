export interface AdminProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  lessons: string;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  isFeatured: boolean;
  status: "draft" | "published";
  sortOrder: number;
}