import { notFound } from "next/navigation";
import { SettingForm } from "@/components/admin/SettingForm";
import { getSettingByKeyAdmin } from "@/features/settings/services";
import { updateSetting } from "../../actions";

export default async function EditSettingPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const decodedKey = decodeURIComponent(key);
  const setting = await getSettingByKeyAdmin(decodedKey);
  if (!setting) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl">Edit Setting</h1>
      <div className="mt-6">
        <SettingForm setting={setting} action={updateSetting.bind(null, decodedKey)} />
      </div>
    </div>
  );
}