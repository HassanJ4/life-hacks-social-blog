import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import getUser from "../../utils/getUser";
import db from "../../utils/db";

export default async function NewPost() {
  const user = await getUser();

  if (!user) {
    return <p>Please sign in first.</p>;
  }

  async function handleSubmit(formData) {
    "use server";

    const { title, content, category } = Object.fromEntries(formData);

    await db.query(
      `INSERT INTO posts (title, content, category, user_id)
       VALUES ($1, $2, $3, $4)`,
      [title, content, category, user.id]
    );

    revalidatePath("/posts");
    revalidatePath("/users/you");
    redirect("/posts");
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-xl mx-auto p-4">
      <div>
        <label className="block mb-1 font-medium">Title:</label>
        <input name="title" required className="w-full border p-2 rounded" />
      </div>

      <div>
        <label className="block mb-1 font-medium">Content:</label>
        <textarea
          name="content"
          required
          className="w-full border p-2 rounded h-32"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category:</label>
        <select name="category" required className="w-full border p-2 rounded">
          <option value="">Select a category</option>
          <option value="productivity">Productivity</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}