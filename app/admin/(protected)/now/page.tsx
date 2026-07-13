import { NowPageForm } from "@/components/admin/NowPageForm";
import { getNowPage } from "@/features/now/services";
import { saveNowPage } from "./actions";

export default async function AdminNowPage() {
  const content = await getNowPage();
  const saveNowPageWithId = saveNowPage.bind(null, content.id);

  return (
    <div>
      <h1 className="font-display text-2xl">Now Page</h1>
      <p className="mt-1 text-sm text-foreground-secondary">Last updated: {new Date(content.updatedAt).toLocaleDateString()}</p>
      <div className="mt-6">
        <NowPageForm content={content} action={saveNowPageWithId} />
      </div>
    </div>
  );
}