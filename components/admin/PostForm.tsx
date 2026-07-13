"use client";

import { useActionState, useState } from "react";
import type { BlogPost } from "@/features/blog/services";
import type { ActionState } from "@/features/blog/admin-schema";
import { slugify } from "@/lib/blog-utils";

const inputClass = "focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm";
const inputStyle = { borderColor: "var(--color-border-glass)" };

export function PostForm({
  post,
  action,
}: {
  post?: BlogPost | null;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, { error: null });
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!post);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {post && <input type="hidden" name="wasPublished" value={String(post.status === "published")} />}
      {post?.coverImagePath && <input type="hidden" name="existingCoverPath" value={post.coverImagePath} />}

      <div>
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <input
          id="title"
          name="title"
          defaultValue={post?.title}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
          style={inputStyle}
        />
        {state.error?.title && <p className="mt-1 text-xs text-red-400">{state.error.title[0]}</p>}
      </div>

      <div>
        <label htmlFor="slug" className="text-sm font-medium">Slug</label>
        <input
          id="slug"
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          className={inputClass}
          style={inputStyle}
        />
        {state.error?.slug && <p className="mt-1 text-xs text-red-400">{state.error.slug[0]}</p>}
      </div>

      <div>
        <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
        <textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt} className={inputClass} style={inputStyle} />
        {state.error?.excerpt && <p className="mt-1 text-xs text-red-400">{state.error.excerpt[0]}</p>}
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-medium">Content (Markdown)</label>
        <textarea id="content" name="content" rows={16} defaultValue={post?.content} className={`${inputClass} font-mono`} style={inputStyle} />
        {state.error?.content && <p className="mt-1 text-xs text-red-400">{state.error.content[0]}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="text-sm font-medium">Category</label>
          <input id="category" name="category" defaultValue={post?.category ?? "general"} className={inputClass} style={inputStyle} />
          {state.error?.category && <p className="mt-1 text-xs text-red-400">{state.error.category[0]}</p>}
        </div>
        <div>
          <label htmlFor="tags" className="text-sm font-medium">Tags (comma-separated)</label>
          <input id="tags" name="tags" defaultValue={post?.tags.join(", ")} className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="coverImage" className="text-sm font-medium">
          {post ? "Replace Cover Image (optional)" : "Cover Image (optional)"}
        </label>
        <input id="coverImage" name="coverImage" type="file" accept="image/jpeg,image/png,image/webp" className={inputClass} style={inputStyle} />
        {state.error?.coverImage && <p className="mt-1 text-xs text-red-400">{state.error.coverImage[0]}</p>}
        {post?.coverImageUrl && (
          <a href={post.coverImageUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs underline" style={{ color: "var(--color-accent)" }}>
            View current cover
          </a>
        )}
      </div>

      <div>
        <label htmlFor="status" className="text-sm font-medium">Status</label>
        <select id="status" name="status" defaultValue={post?.status ?? "draft"} className={inputClass} style={inputStyle}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {state.error?._form && <p className="text-sm text-red-400">{state.error._form[0]}</p>}

      <button type="submit" disabled={isPending} className="focus-ring rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isPending ? "Saving..." : post ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}