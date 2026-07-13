"use client";

import { useActionState } from "react";
import type { AdminProject } from "@/features/projects/types";
import type { ActionState } from "@/features/projects/admin-schema";

interface ProjectFormProps {
  project?: AdminProject | null;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}

const inputClass = "focus-ring mt-1.5 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm";
const inputStyle = { borderColor: "var(--color-border-glass)" };

export function ProjectForm({ project, action }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(action, { error: null });

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <input id="title" name="title" defaultValue={project?.title} className={inputClass} style={inputStyle} />
          {state.error?.title && <p className="mt-1 text-xs text-red-400">{state.error.title[0]}</p>}
        </div>
        <div>
          <label htmlFor="slug" className="text-sm font-medium">Slug</label>
          <input id="slug" name="slug" defaultValue={project?.slug} className={inputClass} style={inputStyle} />
          {state.error?.slug && <p className="mt-1 text-xs text-red-400">{state.error.slug[0]}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="text-sm font-medium">Category</label>
          <select id="category" name="category" defaultValue={project?.category ?? "web"} className={inputClass} style={inputStyle}>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="systems">Systems</option>
            <option value="graphics">Graphics</option>
          </select>
        </div>
        <div>
          <label htmlFor="status" className="text-sm font-medium">Status</label>
          <select id="status" name="status" defaultValue={project?.status ?? "draft"} className={inputClass} style={inputStyle}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="text-sm font-medium">Summary</label>
        <textarea id="summary" name="summary" rows={2} defaultValue={project?.summary} className={inputClass} style={inputStyle} />
        {state.error?.summary && <p className="mt-1 text-xs text-red-400">{state.error.summary[0]}</p>}
      </div>

      <div>
        <label htmlFor="problem" className="text-sm font-medium">Problem</label>
        <textarea id="problem" name="problem" rows={3} defaultValue={project?.problem} className={inputClass} style={inputStyle} />
        {state.error?.problem && <p className="mt-1 text-xs text-red-400">{state.error.problem[0]}</p>}
      </div>

      <div>
        <label htmlFor="solution" className="text-sm font-medium">Solution</label>
        <textarea id="solution" name="solution" rows={3} defaultValue={project?.solution} className={inputClass} style={inputStyle} />
        {state.error?.solution && <p className="mt-1 text-xs text-red-400">{state.error.solution[0]}</p>}
      </div>

      <div>
        <label htmlFor="features" className="text-sm font-medium">Features (one per line)</label>
        <textarea id="features" name="features" rows={4} defaultValue={project?.features.join("\n")} className={inputClass} style={inputStyle} />
        {state.error?.features && <p className="mt-1 text-xs text-red-400">{state.error.features[0]}</p>}
      </div>

      <div>
        <label htmlFor="challenges" className="text-sm font-medium">Challenges</label>
        <textarea id="challenges" name="challenges" rows={3} defaultValue={project?.challenges} className={inputClass} style={inputStyle} />
        {state.error?.challenges && <p className="mt-1 text-xs text-red-400">{state.error.challenges[0]}</p>}
      </div>

      <div>
        <label htmlFor="lessons" className="text-sm font-medium">Lessons Learned</label>
        <textarea id="lessons" name="lessons" rows={3} defaultValue={project?.lessons} className={inputClass} style={inputStyle} />
        {state.error?.lessons && <p className="mt-1 text-xs text-red-400">{state.error.lessons[0]}</p>}
      </div>

      <div>
        <label htmlFor="techStack" className="text-sm font-medium">Tech Stack (one per line)</label>
        <textarea id="techStack" name="techStack" rows={3} defaultValue={project?.techStack.join("\n")} className={inputClass} style={inputStyle} />
        {state.error?.techStack && <p className="mt-1 text-xs text-red-400">{state.error.techStack[0]}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="githubUrl" className="text-sm font-medium">GitHub URL</label>
          <input id="githubUrl" name="githubUrl" defaultValue={project?.githubUrl ?? ""} className={inputClass} style={inputStyle} />
          {state.error?.githubUrl && <p className="mt-1 text-xs text-red-400">{state.error.githubUrl[0]}</p>}
        </div>
        <div>
          <label htmlFor="demoUrl" className="text-sm font-medium">Demo URL</label>
          <input id="demoUrl" name="demoUrl" defaultValue={project?.demoUrl ?? ""} className={inputClass} style={inputStyle} />
          {state.error?.demoUrl && <p className="mt-1 text-xs text-red-400">{state.error.demoUrl[0]}</p>}
        </div>
      </div>

      <div className="flex items-end gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isFeatured" defaultChecked={project?.isFeatured} />
          Featured
        </label>
        <div>
          <label htmlFor="sortOrder" className="text-sm font-medium">Sort Order</label>
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={project?.sortOrder ?? 0} className={inputClass} style={inputStyle} />
        </div>
      </div>

      {state.error?._form && <p className="text-sm text-red-400">{state.error._form[0]}</p>}

      <button type="submit" disabled={isPending} className="focus-ring rounded-full px-6 py-3 text-sm font-medium disabled:opacity-60" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
        {isPending ? "Saving..." : project ? "Save Changes" : "Create Project"}
      </button>
    </form>
  );
}