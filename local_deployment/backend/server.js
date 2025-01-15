import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "cafe"
};

app.get("/menu", async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.query("SELECT * FROM menu");
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

app.post("/order", async (req, res) => {
    try {
        const { customer_name, item_id, quantity } = req.body;
        const total_price = quantity * 2.5; // Dummy price calculation

        const connection = await mysql.createConnection(dbConfig);
        const query = "INSERT INTO orders (customer_name, item_id, quantity, total_price) VALUES (?, ?, ?, ?)";
        await connection.execute(query, [customer_name, item_id, quantity, total_price]);
        await connection.end();

        res.json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
