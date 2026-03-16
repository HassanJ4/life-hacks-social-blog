import getUser from "../../utils/getUser";
import db from "../../utils/db";
import Link from "next/link";
import EditBio from "../../components/EditBio";

export default async function UserPage() {
  const user = await getUser();

  if (!user) {
    return <p>Please sign in first.</p>;
  }

  const postsResult = await db.query(
    `SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC`,
    [user.id]
  );

  const posts = postsResult.rows;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{user.username}</h1>
      <p>{user.bio || "Your bio is empty"}</p>

      <EditBio userId={user.id} currentBio={user.bio} />

      <h2 className="text-2xl font-semibold">Your Posts</h2>

      {posts.length === 0 ? (
        <p>You havent posted anything yet.</p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="border rounded p-4 bg-white shadow-sm">
              <Link
                href={`/posts/${post.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {post.title}
              </Link>
              <p className="text-gray-700 mt-1">{post.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}