# 🧹 Chore Tracker – Developer Setup Guide

This guide will help you set up the development environment for the Chore Tracker app using Node.js, Express, PostgreSQL, Sequelize, and EJS.

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/download/)
- Git

---

## 🚀 Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/chore-tracker.git
cd chore-tracker
```

> (Replace with your actual repo URL)

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Paste this into `.env` and adjust as needed:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=chore_tracker
DB_USER=chore_user
DB_PASS=your_password
DB_DIALECT=postgres
```

---

### 4. Set Up PostgreSQL Locally

1. Create a new PostgreSQL database:
    ```sql
    CREATE DATABASE chore_tracker;
    CREATE USER chore_user WITH PASSWORD 'your_password';
    GRANT ALL PRIVILEGES ON DATABASE chore_tracker TO chore_user;
    ```

2. Optional: allow connections in `pg_hba.conf` and set `listen_addresses = '*'` in `postgresql.conf`.

---

### 5. Run Migrations

```bash
npx sequelize-cli db:migrate
```

---

### 6. Seed Initial Data

```bash
npx sequelize-cli db:seed --seed 20250501-demo-seed-data.js
```

---

### 7. Start the App

```bash
npm run dev
```

The app will be available at:
```
http://localhost:3000
```

---

## 🧠 Project Structure Overview

```
routes/
  api.js               # Mounts all API endpoints
  api/
    users.js
    chores.js
    rewards.js
    chorelogs.js

controllers/
  usersController.js
  choresController.js
  rewardsController.js
  chorelogsController.js

models/
  # Sequelize models

views/
  # EJS templates

public/
  # Static files

seeders/
  20250501-demo-seed-data.js

config/
  config.js            # DB connection config using .env
```

---

## 🧪 Testing the API

Open your browser or use Postman:

- `GET /api/users/3/chores`
- `POST /api/chores/1/complete` (with JSON body `{ "userId": 3 }`)
- `GET /api/rewards`
- `POST /api/redeem/3/1`

---

## 📦 Future Enhancements

- Microsoft Authentication
- Drag-and-drop UI
- Points & reward redemption
- Admin dashboard

---

Made with ❤️ by Todd for his kids.
