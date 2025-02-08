import pool from "../database/db";

// insert combinations into the 'combinations' table
export const insertCombination = async (result: string): Promise<void> => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query("INSERT INTO combinations (value) VALUES (?)", [result]);
        await connection.commit();
        console.log("Transaction committed successfully.");
    } catch (error) {
        await connection.rollback();
        console.error("Transaction failed, rolled back.", error);
        throw error;
    } finally {
        connection.release();
    }
}