import Link from "next/link";
import { revalidatePath } from "next/cache";
import db from "../utils/db";

export async function handleDelete(formData) {
  "use server";

  const id = formData.get("id");

  // Delete the post from the database
  await db.query("DELETE FROM posts WHERE id = $1", [id]);

  // Mark the /posts page as needing revalidation
  revalidatePath("/posts");
}

export default async function PostsPage({ searchParams }) {
  const { category } = searchParams || {};

  let query = `SELECT * FROM posts`;
  const values = [];

  if (category) {
    query += ` WHERE category = $1`;
    values.push(category);
  }

  query += ` ORDER BY created_at DESC`;

  const result = await db.query(query, values);
  const posts = result.rows;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      {category && (
        <p className="mb-4 text-gray-600">
          Showing posts in category: <span className="font-semibold">{category}</span>
        </p>
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-gray-600">No posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border rounded p-4 bg-white shadow-sm">
              <Link href={`/posts/${post.id}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-700 mt-2">{post.content}</p>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.created_at).toLocaleString()}
              </p>

              <form action={handleDelete} className="mt-4">
                <input type="hidden" name="id" value={post.id} />
                <button
                  type="submit"
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </div>
  );
}