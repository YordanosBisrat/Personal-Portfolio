import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectByIdAdmin } from "@/features/projects/services";
import { updateProject } from "../../actions";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectByIdAdmin(id);
  if (!project) notFound();

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl">Edit Project</h1>
      <div className="mt-6">
        <ProjectForm project={project} action={updateProjectWithId} />
      </div>
    </div>
  );
}