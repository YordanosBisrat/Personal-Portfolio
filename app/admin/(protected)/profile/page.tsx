import { ProfileForm } from "@/components/admin/ProfileForm";
import { getProfileAdmin } from "@/features/profile/services";

export default async function AdminProfilePage() {
  const profile = await getProfileAdmin();

  return (
    <div>
      <h1 className="font-display text-2xl">Profile</h1>
      <div className="mt-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}