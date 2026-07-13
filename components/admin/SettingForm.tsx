"use client";

import { useActionState } from "react";
import type { Setting } from "@/features/settings/services";
import type { ActionState } from "@/features/settings/admin-schema";

const inputClass = "focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm";
const inputStyle = { borderColor: "var(--color-border-glass)" };

export function SettingForm({
  setting,
  action,
}: {
  setting?: Setting | null;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, { error: null });

  return (
    <form action={formAction} className="max-w-md space-y-5">
      <div>
        <label htmlFor="key" className="text-sm font-medium">Key</label>
        <input
          id="key"
          name="key"
          defaultValue={setting?.key}
          readOnly={!!setting}
          className={`${inputClass} ${setting ? "opacity-60" : ""}`}
          style={inputStyle}
        />
        {state.error?.key && <p className="mt-1 text-xs text-red-400">{state.error.key[0]}</p>}
      </div>

      <div>
        <label htmlFor="value" className="text-sm font-medium">Value</label>
        <input id="value" name="value" defaultValue={setting?.value} className={inputClass} style={inputStyle} />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium">Description (optional)</label>
        <textarea id="description" name="description" rows={2} defaultValue={setting?.description ?? ""} className={inputClass} style={inputStyle} />
      </div>

      {state.error?._form && <p className="text-sm text-red-400">{state.error._form[0]}</p>}

      <button type="submit" disabled={isPending} className="focus-ring rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isPending ? "Saving..." : setting ? "Save Changes" : "Add Setting"}
      </button>
    </form>
  );
}