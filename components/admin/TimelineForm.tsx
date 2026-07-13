"use client";

import { useActionState } from "react";
import type { AdminTimelineItem } from "@/features/timeline/services";
import type { ActionState } from "@/features/timeline/admin-schema";

const inputClass = "focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm";
const inputStyle = { borderColor: "var(--color-border-glass)" };

export function TimelineForm({ item, action }: { item?: AdminTimelineItem | null; action: (prevState: ActionState, formData: FormData) => Promise<ActionState> }) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, { error: null });

  return (
    <form action={formAction} className="max-w-md space-y-5">
      <div>
        <label htmlFor="label" className="text-sm font-medium">Label</label>
        <input id="label" name="label" defaultValue={item?.label} className={inputClass} style={inputStyle} />
        {state.error?.label && <p className="mt-1 text-xs text-red-400">{state.error.label[0]}</p>}
      </div>

      <div>
        <label htmlFor="date" className="text-sm font-medium">Date</label>
        <input id="date" name="date" defaultValue={item?.date} placeholder="2026" className={inputClass} style={inputStyle} />
        {state.error?.date && <p className="mt-1 text-xs text-red-400">{state.error.date[0]}</p>}
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
        <textarea id="description" name="description" rows={2} defaultValue={item?.description ?? ""} className={inputClass} style={inputStyle} />
      </div>

      <div>
        <label htmlFor="sortOrder" className="text-sm font-medium">Sort Order</label>
        <input id="sortOrder" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} className={inputClass} style={inputStyle} />
      </div>

      {state.error?._form && <p className="text-sm text-red-400">{state.error._form[0]}</p>}

      <button type="submit" disabled={isPending} className="focus-ring rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isPending ? "Saving..." : item ? "Save Changes" : "Add Entry"}
      </button>
    </form>
  );
}