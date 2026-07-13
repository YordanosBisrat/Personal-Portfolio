import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllSettingsAdmin } from "@/features/settings/services";
import { deleteSetting } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminSettingsPage() {
  const settings = await getAllSettingsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Settings</h1>
        <Link href="/admin/settings/new" className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
          <Plus className="h-4 w-4" /> Add Setting
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {settings.map((setting) => (
          <div key={setting.key} className="glass-card flex items-center justify-between p-4">
            <div>
              <p className="font-mono text-sm font-medium">{setting.key}</p>
              <p className="text-xs text-foreground-secondary">
                {setting.value || <em>empty</em>}
                {setting.description && ` · ${setting.description}`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/settings/${encodeURIComponent(setting.key)}/edit`} className="focus-ring text-sm text-foreground-secondary hover:text-foreground">Edit</Link>
              <form action={deleteSetting.bind(null, setting.key)}>
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}