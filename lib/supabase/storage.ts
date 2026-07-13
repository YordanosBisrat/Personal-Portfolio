import type { SupabaseClient } from "@supabase/supabase-js";

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9.-]/g, "_");
}

export async function uploadToBucket(
  supabase: SupabaseClient,
  bucket: string,
  file: File,
  acceptedTypes: string[],
  maxSize: number
): Promise<{ path: string; url: string } | { error: string }> {
  if (!acceptedTypes.includes(file.type)) {
    return { error: `File must be one of: ${acceptedTypes.join(", ")}` };
  }
  if (file.size > maxSize) {
    return { error: `File must be under ${Math.round(maxSize / 1024 / 1024)}MB.` };
  }

  const path = `${crypto.randomUUID()}-${sanitizeFileName(file.name)}`;
  const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

export async function removeFromBucket(supabase: SupabaseClient, bucket: string, path: string) {
  await supabase.storage.from(bucket).remove([path]);
}