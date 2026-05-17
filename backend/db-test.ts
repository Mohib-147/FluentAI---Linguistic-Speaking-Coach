import mysql from "mysql2/promise";
import "dotenv/config"; // OR:
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  });

  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    console.log("DB Test OK:", rows);
  } catch (err) {
    console.error("DB CONNECTION FAILED:", err);
  } finally {
    await pool.end();
  }
}

main();