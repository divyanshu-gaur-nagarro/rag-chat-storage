# 🧠 RAG Chat Storage Microservice

This is a Node.js-based microservice that handles the creation, management, and retrieval of chat sessions and messages — ideal for use in Retrieval-Augmented Generation (RAG) applications.

---

## 📁 Source Code

📦 GitHub: [https://github.com/divyanshu-gaur-nagarro/rag-chat-storage](https://github.com/divyanshu-gaur-nagarro/rag-chat-storage)

---

## 📄 Environment Variables

All environment variables are documented in `.env.example`.

Create a `.env` file by copying:

```bash
cp .env.example .env
```

Example `.env`:

```
PORT=
DATABASE_URL=
API_KEY=
```

---

## ⚙️ Setup & Run Instructions

### 🐳 Run Locally Using Docker

```bash
docker-compose up --build
```

This will:

* Spin up PostgreSQL on port 5432
* Start the backend API on port 3000
* Automatically apply Prisma migrations

---

### 🛠️ Manual Local Setup (Without Docker)

1. Install dependencies:

```bash
npm install
```

2. Start PostgreSQL locally and ensure `DATABASE_URL` in `.env` is correct.

3. Apply Prisma migrations:

```bash
npx prisma migrate dev --name init
```

4. Start the app in dev mode:

```bash
npm run dev
```

---

## 📬 API Overview

All routes are prefixed with `/api` and secured using an API key header:

```
x-api-key: your-api-key
```

### 💾 Sessions Endpoints

| Method | Endpoint                     | Description          |
| ------ | ---------------------------- | -------------------- |
| POST   | `/api/sessions`              | Create a new session |
| PATCH  | `/api/sessions/:id/rename`   | Rename a session     |
| PATCH  | `/api/sessions/:id/favorite` | Toggle favorite      |
| DELETE | `/api/sessions/:id`          | Delete a session     |

### 💬 Messages Endpoints

| Method | Endpoint                            | Description            |
| ------ | ----------------------------------- | ---------------------- |
| POST   | `/api/sessions/:id/messages`        | Add message to session |
| GET    | `/api/sessions/:id/messages?page=1` | Get session messages   |

### ✅ Health Check

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| GET    | `/health` | Check DB connection |

---

## 📁 API Documentation (Swagger)

Swagger UI is available at:

**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

Features:

* Detailed route descriptions
* Example request/response bodies
* API key input for testing

---

## 🧪 Run Tests

Unit tests are written using **Jest**:

```bash
npm test
```

---

## 🔐 Security & Middleware

*  API Key Authentication – via `x-api-key` header
*  Rate Limiting – max 100 requests per 15 min per IP
*  Helmet – secure HTTP headers
*  Centralized Logging – using **Winston**
*  Global Error Handling – with **request ID traceability**

---

## 📦 Folder Structure

```
src/
├── controllers/
├── routes/
├── services/
├── middlewares/
├── utils/
└── app.ts
prisma/
├── schema.prisma
Dockerfile
docker-compose.yml
.env.example
README.md
```

---

## 👨‍💼 Author

**Divyanshu Gaur**
Senior Staff Engineer at Nagarro

---

## 📋 License

This project is licensed under the **MIT License**.
