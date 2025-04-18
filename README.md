# ☕ Cafe Ordering System

A full-stack ordering application where customers can browse a digital menu and place orders. The **frontend** is deployed using GitHub Pages, while the **backend API** is serverless and hosted on **AWS Lambda** via **API Gateway**.

---

## 🔧 Features

- 🧾 View menu items (`GET /menu`)
- 🛒 Place an order (`POST /order`)
- ✅ Input validation and error handling
- 🌐 Cross-Origin Resource Sharing (CORS) enabled
- ☁️ Serverless backend deployment

---

## 🧱 Tech Stack

| Layer       | Technology                     |
|-------------|---------------------------------|
| Frontend    | HTML, CSS, JavaScript           |
| Backend     | Node.js (AWS Lambda)            |
| API Gateway | AWS API Gateway                 |
| Database    | MySQL (e.g., AWS RDS)           |
| Hosting     | GitHub Pages (frontend)         |

---

## 📁 Folder Structure

cafe-ordering-system/
├── frontend/ # Frontend assets │ ├── index.html │ ├── styles.css │ └── script.js 
├── backend/ # Backend API (for AWS Lambda) │ └── index.js 
├── database/ # SQL schema (optional) ├── .env # DB credentials (for local testing) └── README.md

---

## 🔌 API Endpoints

### `GET /menu`
Returns a list of menu items.

### `POST /order`
Places a new order with `customer_name`, `item_id`, and `quantity`.

---

## 🚀 Frontend Deployment (GitHub Pages)

### 1. Push Your Code to GitHub
Ensure your repository is on GitHub and the frontend is in the `/frontend` folder.

### 2. Enable GitHub Pages
- Go to your **GitHub Repository** → **Settings** → **Pages**
- **Source**: `main`
- **Directory**: `/frontend`
- Click **Save**

### 3. Access Your Site
GitHub will provide a public URL like:

https://your-username.github.io/cafe-ordering-system/


---

## ☁️ Backend Deployment (AWS Lambda)

### 1. Package Your Lambda Function
In the `/backend` folder, zip your `index.js` (and `node_modules` if needed):

```bash
zip -r backend.zip index.js node_modules
. Deploy to Lambda
Go to AWS Console → Lambda

Create a new function (choose "Author from scratch")

Set runtime to Node.js 18.x

Upload your backend.zip file

Set the handler to index.handler

3. Set Environment Variables
In the Lambda function configuration, set:

DB_HOST = your-db-host
DB_USER = your-db-username
DB_PASSWORD = your-db-password
DB_NAME = cafe

4. Create an API Gateway
Go to API Gateway → Create a REST API

Create resources and methods for /menu and /order

Connect them to your Lambda function

Enable CORS for each method

5. Deploy the API
Create a new stage (e.g., prod)

Note the Invoke URL, e.g.:
https://your-api-id.execute-api.us-east-1.amazonaws.com/prod

Connect Frontend to Backend
In frontend/script.js, update the base URL to point to your deployed API:

const apiBaseUrl = 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod';
