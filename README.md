# Task Manager

A full-stack Task Manager built with React, Express, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

### Frontend
- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod

### Backend
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Socket.IO

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_manager_express"
JWT_SECRET=your_secret_key
PORT=5000
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# Default Admin

```
Email:
superadmin@example.com

Password:
password123
```

---

# Build

Backend

```bash
npm run build
```

Frontend

```bash
npm run build
```

## Features

- JWT Authentication
- Role-Based Access Control (Admin/User)
- Task CRUD Operations
- Multi-User Task Assignment
- Activity Logging
- Admin & User Dashboards
- Persistent Login
- Socket.IO Integration
- Responsive UI
