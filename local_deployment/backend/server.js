import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { query } from './database/db.js'; // Centralized database queries

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());
app.use(cors());

// GET /menu - Fetch all menu items
app.get("/menu", async (req, res) => {
    try {
        // Query the database
        const rows = await query("SELECT * FROM menu");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching menu:", error.message);
        res.status(500).json({ error: "Database error" });
    }
});

// POST /order - Place a new order
app.post("/order", async (req, res) => {
    try {
        const { customer_name, item_id, quantity } = req.body;

        if (!customer_name || !item_id || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Dummy price calculation
        const total_price = quantity * 2.5;

        // Insert the new order into the database
        const sql = "INSERT INTO orders (customer_name, item_id, quantity, total_price) VALUES (?, ?, ?, ?)";
        await query(sql, [customer_name, item_id, quantity, total_price]);

        res.json({ message: "Order placed successfully!" });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ error: "Database error" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));