import { TimelineForm } from "@/components/admin/TimelineForm";
import { createTimelineItem } from "../actions";

export default function NewTimelineItemPage() {
  return (
    <div>
      <h1 className="font-display text-2xl">Add Timeline Entry</h1>
      <div className="mt-6">
        <TimelineForm action={createTimelineItem} />
      </div>
    </div>
  );
}