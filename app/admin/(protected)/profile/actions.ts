"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { uploadToBucket, removeFromBucket } from "@/lib/supabase/storage";
import {
  profileFormSchema,
  type ActionState,
  MAX_AVATAR_SIZE,
  ACCEPTED_AVATAR_TYPES,
  MAX_RESUME_SIZE,
  ACCEPTED_RESUME_TYPES,
} from "@/features/profile/admin-schema";
import type { Database } from "@/types/database.types";

type ProfileUpdate = Database["public"]["Tables"]["profile"]["Update"];

export async function updateProfile(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = profileFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors as Record<string, string[]> };
  }

  const supabase = await createClient();

  const updates: ProfileUpdate = {
    full_name: parsed.data.fullName,
    title: parsed.data.title,
    bio: parsed.data.bio,
    location: parsed.data.location,
    email: parsed.data.email,
    years_learning: parsed.data.yearsLearning,
    updated_at: new Date().toISOString(),
  };

  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile.size > 0) {
    const result = await uploadToBucket(supabase, "profile-images", avatarFile, ACCEPTED_AVATAR_TYPES, MAX_AVATAR_SIZE);
    if ("error" in result) {
      return { error: { avatar: [result.error] } };
    }
    const existingPath = formData.get("existingAvatarPath") as string;
    if (existingPath) await removeFromBucket(supabase, "profile-images", existingPath);
    updates.avatar_path = result.path;
    updates.avatar_url = result.url;
  }

  const resumeFile = formData.get("resume") as File | null;
  if (resumeFile && resumeFile.size > 0) {
    const result = await uploadToBucket(supabase, "resume", resumeFile, ACCEPTED_RESUME_TYPES, MAX_RESUME_SIZE);
    if ("error" in result) {
      return { error: { resume: [result.error] } };
    }
    const existingPath = formData.get("existingResumePath") as string;
    if (existingPath) await removeFromBucket(supabase, "resume", existingPath);
    updates.resume_path = result.path;
    updates.resume_url = result.url;
  }

  const id = formData.get("profileId") as string;
  const { error } = await supabase.from("profile").update(updates).eq("id", id);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/profile");
  redirect("/admin/profile");
}