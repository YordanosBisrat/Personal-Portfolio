"use client";

import { useActionState } from "react";
import type { AdminSkill } from "@/features/skills/services";
import type { ActionState } from "@/features/skills/admin-schema";

const inputClass = "focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm";
const inputStyle = { borderColor: "var(--color-border-glass)" };

export function SkillForm({ skill, action }: { skill?: AdminSkill | null; action: (prevState: ActionState, formData: FormData) => Promise<ActionState> }) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, { error: null });

  return (
    <form action={formAction} className="max-w-md space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <input id="name" name="name" defaultValue={skill?.name} className={inputClass} style={inputStyle} />
        {state.error?.name && <p className="mt-1 text-xs text-red-400">{state.error.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <select id="category" name="category" defaultValue={skill?.category ?? "frontend"} className={inputClass} style={inputStyle}>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="languages">Languages</option>
          <option value="mobile">Mobile</option>
          <option value="database">Database</option>
          <option value="ai">AI / Data</option>
          <option value="tools">Tools</option>
        </select>
      </div>

      <div>
        <label htmlFor="proficiency" className="text-sm font-medium">Proficiency (0–100)</label>
        <input id="proficiency" name="proficiency" type="number" min={0} max={100} defaultValue={skill?.proficiency ?? 50} className={inputClass} style={inputStyle} />
        {state.error?.proficiency && <p className="mt-1 text-xs text-red-400">{state.error.proficiency[0]}</p>}
      </div>

      <div>
        <label htmlFor="sortOrder" className="text-sm font-medium">Sort Order</label>
        <input id="sortOrder" name="sortOrder" type="number" defaultValue={skill?.sortOrder ?? 0} className={inputClass} style={inputStyle} />
      </div>

      {state.error?._form && <p className="text-sm text-red-400">{state.error._form[0]}</p>}

      <button type="submit" disabled={isPending} className="focus-ring rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isPending ? "Saving..." : skill ? "Save Changes" : "Add Skill"}
      </button>
    </form>
  );
}