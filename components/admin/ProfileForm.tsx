"use client";

import { useActionState } from "react";
import type { AdminProfile } from "@/features/profile/services";
import type { ActionState } from "@/features/profile/admin-schema";
import { updateProfile } from "@/app/admin/(protected)/profile/actions";

const inputClass = "focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm";
const inputStyle = { borderColor: "var(--color-border-glass)" };

export function ProfileForm({ profile }: { profile: AdminProfile }) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(updateProfile, { error: null });

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      <input type="hidden" name="profileId" value={profile.id} />
      <input type="hidden" name="existingAvatarPath" value={profile.avatarPath ?? ""} />
      <input type="hidden" name="existingResumePath" value={profile.resumePath ?? ""} />

      <div>
        <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
        <input id="fullName" name="fullName" defaultValue={profile.fullName} className={inputClass} style={inputStyle} />
        {state.error?.fullName && <p className="mt-1 text-xs text-red-400">{state.error.fullName[0]}</p>}
      </div>

      <div>
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <input id="title" name="title" defaultValue={profile.title} className={inputClass} style={inputStyle} />
        {state.error?.title && <p className="mt-1 text-xs text-red-400">{state.error.title[0]}</p>}
      </div>

      <div>
        <label htmlFor="bio" className="text-sm font-medium">Bio</label>
        <textarea id="bio" name="bio" rows={4} defaultValue={profile.bio} className={inputClass} style={inputStyle} />
        {state.error?.bio && <p className="mt-1 text-xs text-red-400">{state.error.bio[0]}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className="text-sm font-medium">Location</label>
          <input id="location" name="location" defaultValue={profile.location} className={inputClass} style={inputStyle} />
          {state.error?.location && <p className="mt-1 text-xs text-red-400">{state.error.location[0]}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" defaultValue={profile.email} className={inputClass} style={inputStyle} />
          {state.error?.email && <p className="mt-1 text-xs text-red-400">{state.error.email[0]}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="yearsLearning" className="text-sm font-medium">Years Learning</label>
        <input id="yearsLearning" name="yearsLearning" type="number" defaultValue={profile.yearsLearning} className={inputClass} style={inputStyle} />
      </div>

      <div>
        <label htmlFor="avatar" className="text-sm font-medium">Profile Photo (optional replace)</label>
        <input id="avatar" name="avatar" type="file" accept="image/jpeg,image/png,image/webp" className={inputClass} style={inputStyle} />
        {state.error?.avatar && <p className="mt-1 text-xs text-red-400">{state.error.avatar[0]}</p>}
        {profile.avatarUrl && (
          <a href={profile.avatarUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs underline" style={{ color: "var(--color-accent)" }}>
            View current photo
          </a>
        )}
      </div>

      <div>
        <label htmlFor="resume" className="text-sm font-medium">Resume (optional replace)</label>
        <input id="resume" name="resume" type="file" accept="application/pdf" className={inputClass} style={inputStyle} />
        {state.error?.resume && <p className="mt-1 text-xs text-red-400">{state.error.resume[0]}</p>}
        {profile.resumeUrl && (
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs underline" style={{ color: "var(--color-accent)" }}>
            View current resume
          </a>
        )}
      </div>

      {state.error?._form && <p className="text-sm text-red-400">{state.error._form[0]}</p>}

      <button type="submit" disabled={isPending} className="focus-ring rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}