import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { getPostByIdAdmin } from "@/features/blog/services";
import { updateBlogPost } from "../../actions";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostByIdAdmin(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl">Edit Post</h1>
      <div className="mt-6">
        <PostForm post={post} action={updateBlogPost.bind(null, id)} />
      </div>
    </div>
  );
}