import db from "../../utils/db";
import { notFound } from "next/navigation";

export default async function UserPage({ params }) {
  const { id } = params;

  const result = await db.query(
    "SELECT id, username, bio FROM user_account WHERE id = $1",
    [id]
  );

  if (result.rows.length === 0) {
    notFound();
  }

  const user = result.rows[0];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{user.username}</h1>
      <p>{user.bio || "This user has no bio yet."}</p>
    </div>
  );
}