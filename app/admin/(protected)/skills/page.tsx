import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllSkillsAdmin } from "@/features/skills/services";
import { deleteSkill } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminSkillsPage() {
  const skills = await getAllSkillsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Skills</h1>
        <Link href="/admin/skills/new" className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
          <Plus className="h-4 w-4" /> Add Skill
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="glass-card flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{skill.name}</p>
              <p className="text-xs text-foreground-secondary">{skill.category} · {skill.proficiency}%</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/skills/${skill.id}/edit`} className="focus-ring text-sm text-foreground-secondary hover:text-foreground">Edit</Link>
              <form action={deleteSkill.bind(null, skill.id)}>
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}