import { notFound } from "next/navigation";
import { SkillForm } from "@/components/admin/SkillForm";
import { getSkillByIdAdmin } from "@/features/skills/services";
import { updateSkill } from "../../actions";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = await getSkillByIdAdmin(id);
  if (!skill) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl">Edit Skill</h1>
      <div className="mt-6">
        <SkillForm skill={skill} action={updateSkill.bind(null, id)} />
      </div>
    </div>
  );
}