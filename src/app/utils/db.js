import { Pool } from "pg";

const db = new Pool({
    connectionString: process.env.DB_CONN,
});

export default db;