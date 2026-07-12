import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== "bisratyordanos777@gmail.com") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "var(--color-border-glass)" }}>
        <p className="font-display text-lg">Admin</p>
        <form action="/admin/logout" method="post">
          <button type="submit" className="focus-ring text-sm text-foreground-secondary hover:text-foreground">
            Sign out
          </button>
        </form>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}