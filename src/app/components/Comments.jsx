import db from "../utils/db";

export default async function Comments({ id }) {
  const result = await db.query(
    `SELECT comments.*, user_account.username
     FROM comments
     JOIN posts ON comments.post_id = posts.id
     JOIN user_account ON comments.user_id = user_account.id
     WHERE comments.post_id = $1
     ORDER BY comments.created_at ASC`,
    [id]
  );

  const comments = result.rows;

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded p-3 bg-gray-50">
          <p className="text-gray-800">{comment.content}</p>
          <p className="text-sm text-gray-500 mt-1">
            By {comment.username} •{" "}
            {new Date(comment.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>
      ))}
    </div>
  );
}