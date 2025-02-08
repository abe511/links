import mysql from "mysql2/promise";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

// db connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// create a connection pool
const pool = mysql.createPool(dbConfig);

export default pool;