import Link from "next/link";
import { getPublishedPosts } from "@/features/blog/services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software engineering, projects, and lessons learned.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest text-foreground-secondary">Blog</p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">Writing</h1>

      {posts.length === 0 && <p className="mt-8 text-foreground-secondary">No posts yet — check back soon.</p>}

      <div className="mt-10 space-y-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="focus-ring glass-card block p-6 transition-transform hover:-translate-y-1">
            <p className="text-xs uppercase tracking-widest text-foreground-secondary">{post.category} · {post.readingTime} min read</p>
            <h2 className="mt-2 font-display text-xl">{post.title}</h2>
            <p className="mt-2 text-sm text-foreground-secondary">{post.excerpt}</p>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border px-2.5 py-1 text-xs text-foreground-secondary" style={{ borderColor: "var(--color-border-glass)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}