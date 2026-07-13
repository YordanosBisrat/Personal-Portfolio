"use client";

import { useActionState } from "react";
import type { AdminCertificate } from "@/features/certificates/services";
import type { ActionState } from "@/features/certificates/admin-schema";

const inputClass = "focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm";
const inputStyle = { borderColor: "var(--color-border-glass)" };

export function CertificateForm({
  certificate,
  action,
}: {
  certificate?: AdminCertificate | null;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, { error: null });

  return (
    <form action={formAction} className="max-w-md space-y-5">
      <div>
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <input id="title" name="title" defaultValue={certificate?.title} className={inputClass} style={inputStyle} />
        {state.error?.title && <p className="mt-1 text-xs text-red-400">{state.error.title[0]}</p>}
      </div>

      <div>
        <label htmlFor="issuer" className="text-sm font-medium">Issuer</label>
        <input id="issuer" name="issuer" defaultValue={certificate?.issuer} className={inputClass} style={inputStyle} />
        {state.error?.issuer && <p className="mt-1 text-xs text-red-400">{state.error.issuer[0]}</p>}
      </div>

      <div>
        <label htmlFor="issueDate" className="text-sm font-medium">Issue Date</label>
        <input id="issueDate" name="issueDate" type="date" defaultValue={certificate?.issueDate} className={inputClass} style={inputStyle} />
        {state.error?.issueDate && <p className="mt-1 text-xs text-red-400">{state.error.issueDate[0]}</p>}
      </div>

      <div>
        <label htmlFor="credentialUrl" className="text-sm font-medium">Credential URL (optional)</label>
        <input id="credentialUrl" name="credentialUrl" defaultValue={certificate?.credentialUrl ?? ""} className={inputClass} style={inputStyle} />
        {state.error?.credentialUrl && <p className="mt-1 text-xs text-red-400">{state.error.credentialUrl[0]}</p>}
      </div>

      <div>
        <label htmlFor="file" className="text-sm font-medium">
          {certificate ? "Replace File (optional)" : "Certificate File"}
        </label>
        <input id="file" name="file" type="file" accept=".pdf,image/jpeg,image/png,image/webp" className={inputClass} style={inputStyle} />
        {state.error?.file && <p className="mt-1 text-xs text-red-400">{state.error.file[0]}</p>}
        {certificate && (
          <>
            <input type="hidden" name="existingFilePath" value={certificate.filePath} />
            <a href={certificate.fileUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs underline" style={{ color: "var(--color-accent)" }}>
              View current file
            </a>
          </>
        )}
      </div>

      <div>
        <label htmlFor="sortOrder" className="text-sm font-medium">Sort Order</label>
        <input id="sortOrder" name="sortOrder" type="number" defaultValue={certificate?.sortOrder ?? 0} className={inputClass} style={inputStyle} />
      </div>

      {state.error?._form && <p className="text-sm text-red-400">{state.error._form[0]}</p>}

      <button type="submit" disabled={isPending} className="focus-ring rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isPending ? "Saving..." : certificate ? "Save Changes" : "Add Certificate"}
      </button>
    </form>
  );
}