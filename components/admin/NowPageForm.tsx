"use client";

import { useActionState } from "react";
import type { NowPageContent } from "@/features/now/services";
import type { ActionState } from "@/features/now/admin-schema";

const inputClass = "focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm";
const inputStyle = { borderColor: "var(--color-border-glass)" };

export function NowPageForm({
  content,
  action,
}: {
  content: NowPageContent;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, { error: null });

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="currentlyLearning" className="text-sm font-medium">Currently Learning</label>
        <textarea id="currentlyLearning" name="currentlyLearning" rows={2} defaultValue={content.currentlyLearning} className={inputClass} style={inputStyle} />
        {state.error?.currentlyLearning && <p className="mt-1 text-xs text-red-400">{state.error.currentlyLearning[0]}</p>}
      </div>

      <div>
        <label htmlFor="currentlyBuilding" className="text-sm font-medium">Currently Building</label>
        <textarea id="currentlyBuilding" name="currentlyBuilding" rows={2} defaultValue={content.currentlyBuilding} className={inputClass} style={inputStyle} />
        {state.error?.currentlyBuilding && <p className="mt-1 text-xs text-red-400">{state.error.currentlyBuilding[0]}</p>}
      </div>

      <div>
        <label htmlFor="currentlyReading" className="text-sm font-medium">Currently Reading</label>
        <textarea id="currentlyReading" name="currentlyReading" rows={2} defaultValue={content.currentlyReading} className={inputClass} style={inputStyle} />
        {state.error?.currentlyReading && <p className="mt-1 text-xs text-red-400">{state.error.currentlyReading[0]}</p>}
      </div>

      <div>
        <label htmlFor="currentGoals" className="text-sm font-medium">Current Goals (one per line)</label>
        <textarea id="currentGoals" name="currentGoals" rows={4} defaultValue={content.currentGoals.join("\n")} className={inputClass} style={inputStyle} />
        {state.error?.currentGoals && <p className="mt-1 text-xs text-red-400">{state.error.currentGoals[0]}</p>}
      </div>

      {state.error?._form && <p className="text-sm text-red-400">{state.error._form[0]}</p>}

      <button type="submit" disabled={isPending} className="focus-ring rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}