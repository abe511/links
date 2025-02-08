import pool from "../database/db";
import { RowDataPacket } from "mysql2";

// fetch first N rows from 'items' table, limited by numbers in user input for 'items'
export const fetchItems = async (limit: number): Promise<string[]> => {
  try {
    const [dbRows] = await pool.query<RowDataPacket[]>("SELECT * FROM items LIMIT ?", [limit]);
    return dbRows.map((row: RowDataPacket) => row.type);
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};