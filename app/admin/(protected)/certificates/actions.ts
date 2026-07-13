"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  certificateFormSchema,
  type ActionState,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
} from "@/features/certificates/admin-schema";

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}

async function uploadCertificateFile(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<{ path: string; url: string } | { error: string }> {
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return { error: "File must be a PDF, JPEG, PNG, or WebP." };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { error: "File must be under 5MB." };
  }

  const path = `${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
  const { error: uploadError } = await supabase.storage.from("certificates").upload(path, file);

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  const { data } = supabase.storage.from("certificates").getPublicUrl(path);
  return { path, url: data.publicUrl };
}

export async function createCertificate(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = certificateFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) {
    return { error: { file: ["A certificate file is required."] } };
  }

  const supabase = await createClient();
  const uploadResult = await uploadCertificateFile(supabase, file);
  if ("error" in uploadResult) {
    return { error: { file: [uploadResult.error] } };
  }

  const { error } = await supabase.from("certificates").insert({
    title: parsed.data.title,
    issuer: parsed.data.issuer,
    issue_date: parsed.data.issueDate,
    credential_url: parsed.data.credentialUrl || null,
    file_path: uploadResult.path,
    file_url: uploadResult.url,
    sort_order: parsed.data.sortOrder,
  });

  if (error) {
    // Insert failed after a successful upload — clean up the orphaned file
    // rather than leaving storage and the database out of sync.
    await supabase.storage.from("certificates").remove([uploadResult.path]);
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/admin/certificates");
  redirect("/admin/certificates");
}

export async function updateCertificate(id: string, _prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = certificateFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();
  const file = formData.get("file") as File | null;

  let filePath: string | undefined;
  let fileUrl: string | undefined;

  if (file && file.size > 0) {
    const uploadResult = await uploadCertificateFile(supabase, file);
    if ("error" in uploadResult) {
      return { error: { file: [uploadResult.error] } };
    }

    // Remove the old file only after the new one uploaded successfully —
    // never delete-then-upload, since a failed upload would otherwise leave
    // the certificate with no file at all.
    const existingPath = formData.get("existingFilePath") as string;
    if (existingPath) {
      await supabase.storage.from("certificates").remove([existingPath]);
    }

    filePath = uploadResult.path;
    fileUrl = uploadResult.url;
  }

  const { error } = await supabase
    .from("certificates")
    .update({
      title: parsed.data.title,
      issuer: parsed.data.issuer,
      issue_date: parsed.data.issueDate,
      credential_url: parsed.data.credentialUrl || null,
      sort_order: parsed.data.sortOrder,
      ...(filePath && fileUrl ? { file_path: filePath, file_url: fileUrl } : {}),
    })
    .eq("id", id);

  if (error) return { error: { _form: [error.message] } };

  revalidatePath("/admin/certificates");
  redirect("/admin/certificates");
}

export async function deleteCertificate(id: string, filePath: string) {
  const supabase = await createClient();

  await supabase.storage.from("certificates").remove([filePath]);
  const { error } = await supabase.from("certificates").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete certificate:", error.message);
    return;
  }

  revalidatePath("/admin/certificates");
}