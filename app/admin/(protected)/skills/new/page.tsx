import { SkillForm } from "@/components/admin/SkillForm";
import { createSkill } from "../actions";

export default function NewSkillPage() {
  return (
    <div>
      <h1 className="font-display text-2xl">Add Skill</h1>
      <div className="mt-6">
        <SkillForm action={createSkill} />
      </div>
    </div>
  );
}