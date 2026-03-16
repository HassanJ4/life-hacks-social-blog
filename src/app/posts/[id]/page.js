import AddComment from "../../components/AddComment";
import Comments from "../../components/Comments";
import db from "../../utils/db";
import { notFound } from "next/navigation";

export default async function OnePost({ params }) {
  const { id } = await params;

  const result = await db.query(
    `SELECT * FROM posts WHERE id = $1`,
    [id]
  );

  const post = result.rows[0];

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">

      <div className="border rounded p-6 bg-white shadow-sm">
        <h2 className="text-3xl font-bold mb-3">{post.title}</h2>

        <p className="text-gray-700 mb-4">
          {post.content}
        </p>

        <p className="text-sm text-gray-500">
          {new Date(post.created_at).toLocaleString()}
        </p>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <h3 className="text-xl font-semibold mb-3">Add a Comment</h3>
        <AddComment id={id} />
      </div>

      <div className="border rounded p-4 bg-white shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <Comments id={id} />
      </div>

    </div>
  );
}
