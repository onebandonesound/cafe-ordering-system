import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'cafe-db.cd8ymo2awd5h.us-east-1.rds.amazonaws.com', // Replace with your RDS endpoint
    user: 'admin',   // Replace with your RDS username
    password: 'Thegoodlife_1', // Replace with your RDS password
    database: 'cafe'         // Replace with your database name
};

export const handler = async (event) => {
    const connection = await mysql.createConnection(dbConfig);

    if (event.httpMethod === 'GET' && event.path === '/menu') {
        try {
            const [rows] = await connection.query('SELECT * FROM menu');
            await connection.end();
            return {
                statusCode: 200,
                body: JSON.stringify(rows)
            };
        } catch (error) {
            console.error('Error querying database:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Database query failed' })
            };
        }
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Not Found' })
    };
};

export const handler = async (event) => {
    const connection = await mysql.createConnection(dbConfig);
    const body = JSON.parse(event.body);

    if (event.httpMethod === 'POST' && event.path === '/order') {
        const { customer_name, item_id, quantity } = body;
        const total_price = quantity * 2.50; // Fetch actual price from DB in production

        const query = 'INSERT INTO orders (customer_name, item_id, quantity, total_price) VALUES (?, ?, ?, ?)';
        await connection.execute(query, [customer_name, item_id, quantity, total_price]);

        await connection.end();
        return { statusCode: 200, body: JSON.stringify({ message: 'Order placed successfully!' }) };
    }
};
curl -X GET "https://xyz123.execute-api.us-east-1.amazonaws.com/prod/menu"
