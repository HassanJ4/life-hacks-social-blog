import { revalidatePath } from "next/cache";
import db from "../utils/db";

export default async function AddComment({ id }) {

  async function handleComment(formData) {
    "use server";

    const { content } = Object.fromEntries(formData);

    await db.query(
      `INSERT INTO comments (content, post_id) VALUES ($1, $2)`,
      [content, id]
    );

    revalidatePath(`/posts/${id}`);
  }

  return (
    <>
      <form action={handleComment}>
        <label htmlFor="content">Enter a comment</label>
        <textarea name="content" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}