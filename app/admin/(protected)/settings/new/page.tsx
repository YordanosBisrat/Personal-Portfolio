import { SettingForm } from "@/components/admin/SettingForm";
import { createSetting } from "../actions";

export default function NewSettingPage() {
  return (
    <div>
      <h1 className="font-display text-2xl">Add Setting</h1>
      <div className="mt-6">
        <SettingForm action={createSetting} />
      </div>
    </div>
  );
}