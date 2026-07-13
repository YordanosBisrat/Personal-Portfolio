import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllProjectsAdmin } from "@/features/projects/services";
import { deleteProject } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminProjectsPage() {
  const projects = await getAllProjectsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Projects</h1>
        <Link href="/admin/projects/new" className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
          <Plus className="h-4 w-4" /> New Project
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="glass-card flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-xs text-foreground-secondary">
                {project.category} · {project.status}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/projects/${project.id}/edit`} className="focus-ring text-sm text-foreground-secondary hover:text-foreground">
                Edit
              </Link>
              <form action={deleteProject.bind(null, project.id, project.slug)}>
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}