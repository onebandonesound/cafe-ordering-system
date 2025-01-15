import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'cafe-db.cd8ymo2awd5h.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Thegoodlife_1',
    database: 'cafe'
};

export const handler = async (event) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        // Handle CORS Preflight Requests
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                },
                body: JSON.stringify({ message: "CORS preflight success" })
            };
        }

        // Handle GET request for fetching menu items
        if (event.httpMethod === 'GET' && event.path === '/menu') {
            const [rows] = await connection.execute('SELECT id, name, price FROM menu LIMIT 10');
            await connection.end();

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                },
                body: JSON.stringify(rows)
            };
        }

        // Handle POST request for placing an order
        if (event.httpMethod === 'POST' && event.path === '/order') {
            const body = JSON.parse(event.body);
            const { customer_name, item_id, quantity } = body;
            const total_price = quantity * 2.50; // Fetch actual price from DB in production

            const query = 'INSERT INTO orders (customer_name, item_id, quantity, total_price) VALUES (?, ?, ?, ?)';
            await connection.execute(query, [customer_name, item_id, quantity, total_price]);

            await connection.end();
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                },
                body: JSON.stringify({ message: 'Order placed successfully!' })
            };
        }

        // Return 404 for unsupported routes
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ message: "Not Found" })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
