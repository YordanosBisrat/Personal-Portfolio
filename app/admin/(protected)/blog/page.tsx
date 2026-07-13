import Link from "next/link";
import { Plus } from "lucide-react";
import { getAllPostsAdmin } from "@/features/blog/services";
import { deleteBlogPost } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Blog</h1>
        <Link href="/admin/blog/new" className="focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium" style={{ backgroundColor: "var(--color-accent)", color: "#151311" }}>
          <Plus className="h-4 w-4" /> New Post
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="glass-card flex items-center justify-between p-4">
            <div>
              <p className="font-medium">
                {post.title}
                <span className="ml-2 rounded-full border px-2 py-0.5 text-xs text-foreground-secondary" style={{ borderColor: "var(--color-border-glass)" }}>
                  {post.status}
                </span>
              </p>
              <p className="text-xs text-foreground-secondary">{post.category} · {post.readingTime} min read</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/blog/${post.id}/edit`} className="focus-ring text-sm text-foreground-secondary hover:text-foreground">Edit</Link>
              <form action={deleteBlogPost.bind(null, post.id, post.coverImagePath)}>
                <DeleteButton />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}