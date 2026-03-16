import { currentUser } from "@clerk/nextjs/server";
import db from "./db";

export default async function getUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  let result = await db.query(
    `SELECT * FROM user_account WHERE clerk_id = $1`,
    [clerkUser.id]
  );

  if (result.rows.length === 0) {
    await db.query(
      `INSERT INTO user_account (clerk_id, username, bio)
       VALUES ($1, $2, $3)`,
      [clerkUser.id, clerkUser.username || "New User", ""]
    );

    result = await db.query(
      `SELECT * FROM user_account WHERE clerk_id = $1`,
      [clerkUser.id]
    );
  }

  return result.rows[0];
}