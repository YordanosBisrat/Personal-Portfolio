import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getPublishedSlugs, getPostBySlug } from "@/features/blog/services";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link href="/blog" className="focus-ring inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <p className="mt-8 text-xs uppercase tracking-widest text-foreground-secondary">
        {post.category} · {post.readingTime} min read
        {post.publishedAt && ` · ${new Date(post.publishedAt).toLocaleDateString()}`}
      </p>
      <h1 className="mt-2 font-display text-3xl md:text-4xl">{post.title}</h1>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border px-2.5 py-1 text-xs text-foreground-secondary" style={{ borderColor: "var(--color-border-glass)" }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-invert mt-10 max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}