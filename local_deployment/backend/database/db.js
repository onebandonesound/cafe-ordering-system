import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' }); // Load environment variables

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cafe',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

console.log("Database Config:", dbConfig); // Debug log

const pool = mysql.createPool(dbConfig);

export const query = async (sql, params) => {
    try {
        const [results] = await pool.execute(sql, params);
        return results;
    } catch (error) {
        console.error('Database query error:', error.message);
        throw error;
    }
};

export default pool;
