import db from "../utils/db";
import { revalidatePath } from "next/cache";

export default function EditBio({ userId, currentBio }) {
  async function handleEdit(formData) {
    "use server";

    const bio = formData.get("bio");

    await db.query(
      `UPDATE user_account SET bio = $1 WHERE id = $2`,
      [bio, userId]
    );

    revalidatePath("/users/you");
  }

  return (
    <form action={handleEdit} className="space-y-2">
      <textarea
        name="bio"
        defaultValue={currentBio || ""}
        className="w-full border p-2 rounded"
      />
      <button className="px-3 py-1 bg-blue-600 text-white rounded">
        Save Bio
      </button>
    </form>
  );
}