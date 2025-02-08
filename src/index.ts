import express from "express";
import path from "path";
import dotenv from "dotenv";
import router from "./routes";
import pool from "./database/db";

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use("/", router);
  
const server = app.listen(port, (): void => {
    console.log(`Server listening on port ${port}`);
});

// graceful shutdown
process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received.");
    try {
        await pool.end();
        console.log("All connections in the pool have ended.");
    } catch (error) {
        console.error("Error closing the pool:", error);
    } finally {
        server.close(() => {
            console.log("HTTP server closed.");
            process.exit(0);
        });
    }
});
  
process.on("SIGINT", async () => {
    console.log("\nSIGINT signal received.");
    try {
        await pool.end();
        console.log("All connections in the pool have ended.");
    } catch (error) {
        console.error("Error closing the pool:", error);
    } finally {
        server.close(() => {
            console.log("HTTP server closed.");
            process.exit(0);
        });
    }
});