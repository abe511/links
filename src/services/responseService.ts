import pool from "../database/db";

// insert a response into the 'responses' table
export const insertResponse = async (response: string): Promise<void> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.query("INSERT INTO responses (value) VALUES (?)", [response]);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error('Error inserting response:', error);
    throw error;
  } finally {
    connection.release();
  }
};
