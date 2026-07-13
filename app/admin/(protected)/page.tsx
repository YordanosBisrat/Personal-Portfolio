import Link from "next/link";
import { FolderGit2, Sparkles, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [projectsResult, skillsResult, unreadResult] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }).eq("is_read", false),
  ]);

  const cards = [
    { label: "Projects", value: projectsResult.count ?? 0, href: "/admin/projects", icon: FolderGit2 },
    { label: "Skills", value: skillsResult.count ?? 0, href: "/admin/skills", icon: Sparkles },
    { label: "Unread Messages", value: unreadResult.count ?? 0, href: "/admin/messages", icon: Mail },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="focus-ring glass-card block p-6 transition-transform hover:-translate-y-1">
            <card.icon className="h-5 w-5" style={{ color: "var(--color-accent)" }} />
            <p className="mt-3 font-display text-3xl">{card.value}</p>
            <p className="text-sm text-foreground-secondary">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}