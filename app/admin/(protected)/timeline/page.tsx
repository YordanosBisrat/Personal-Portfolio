import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllTimelineAdmin } from "@/features/timeline/services";
import { deleteTimelineItem } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminTimelinePage() {
  const items = await getAllTimelineAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Timeline</h1>
        <Link href="/admin/timeline/new" className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
          <Plus className="h-4 w-4" /> Add Entry
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="glass-card flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-foreground-secondary">{item.date}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/timeline/${item.id}/edit`} className="focus-ring text-sm text-foreground-secondary hover:text-foreground">Edit</Link>
              <form action={deleteTimelineItem.bind(null, item.id)}>
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}