import { notFound } from "next/navigation";
import { TimelineForm } from "@/components/admin/TimelineForm";
import { getTimelineItemByIdAdmin } from "@/features/timeline/services";
import { updateTimelineItem } from "../../actions";

export default async function EditTimelineItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getTimelineItemByIdAdmin(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl">Edit Timeline Entry</h1>
      <div className="mt-6">
        <TimelineForm item={item} action={updateTimelineItem.bind(null, id)} />
      </div>
    </div>
  );
}