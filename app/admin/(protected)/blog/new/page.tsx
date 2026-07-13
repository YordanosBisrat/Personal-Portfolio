import { PostForm } from "@/components/admin/PostForm";
import { createBlogPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="font-display text-2xl">New Post</h1>
      <div className="mt-6">
        <PostForm action={createBlogPost} />
      </div>
    </div>
  );
}