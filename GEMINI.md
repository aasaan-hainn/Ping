# Ping - Project Context

## 1. Project Overview
**Ping** is a modern, real-time communication platform built using the MERN stack (MongoDB, Express, React, Node.js) with extensive real-time capabilities via Socket.IO.

*   **Type:** Full-stack Web Application
*   **Architecture:** Monorepo-style (Client/Server split)
*   **Primary Goal:** Enable real-time messaging, user presence tracking, and secure authentication.

## 2. Tech Stack

### Frontend (`/client`)
*   **Framework:** React 18
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS, Material UI (MUI)
*   **Animation:** Anime.js, Framer Motion, React Spring
*   **Real-time:** Socket.IO Client
*   **Routing:** React Router DOM

### Backend (`/server`)
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB (via Mongoose ODM)
*   **Real-time:** Socket.IO Server
*   **Authentication:** JWT (JSON Web Tokens) with `bcryptjs`

## 3. Directory Structure

```
Ping/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── context/        # AuthContext & SocketContext (State Management)
│   │   ├── components/     # UI Components (MagicUI, Material UI wrappers)
│   │   ├── pages/          # Application Routes (Dashboard, Login, etc.)
│   │   ├── services/       # API integration (Axios)
│   │   └── socket/         # Socket event definitions
│   ├── .env.example        # Client environment template
│   └── vite.config.js      # Vite configuration
│
├── server/                 # Backend API & Socket Server
│   ├── config/             # DB Connection (db.js)
│   ├── controllers/        # Request logic
│   ├── models/             # Mongoose Schemas (User.js)
│   ├── routes/             # REST API Routes
│   ├── socket/             # Socket.IO Event Handlers
│   ├── .env.example        # Server environment template
│   └── server.js           # Entry point (Express + Socket.IO binding)
```

## 4. Setup & Development

### Prerequisites
*   Node.js (v18+)
*   MongoDB (Local service or Atlas cluster)

### Installation
You must install dependencies for **both** the client and server.

```bash
# 1. Setup Server
cd server
npm install
cp .env.example .env
# Edit .env to add your MONGODB_URI and JWT_SECRET

# 2. Setup Client
cd ../client
npm install
cp .env.example .env
# Edit .env to ensure VITE_API_URL matches server port
```

### Running the Project
Open two terminal instances:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
# Runs on localhost:5000 (default) via Nodemon
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Runs on localhost:3000 (default) via Vite
```

## 5. Key Features & Conventions

### Authentication
*   **Method:** JWT-based.
*   **Flow:** User logs in → Server issues token → Client stores token → Client sends token in HTTP headers (`Authorization: Bearer ...`) and Socket handshake (`auth: { token }`).

### Real-time Communication
*   **Library:** Socket.IO
*   **Setup:**
    *   Server initializes `io` instance in `server.js` and passes it to routes via `app.set('io', io)`.
    *   Client manages socket connection in `SocketContext.jsx`. Connection is only established *after* authentication.
*   **Events:**
    *   `message:private`: Client → Server (Sending a message)
    *   `typing:start` / `typing:stop`: Client → Server (Typing status)
    *   `user:online` / `user:offline`: Server → Client (Presence updates)

### Database
*   **ODM:** Mongoose
*   **Connection:** Managed in `server/config/db.js`.
*   **Models:** Located in `server/models/`.

### Styling
*   **Theme:** Dark mode by default (configured in `client/src/main.jsx` via MUI ThemeProvider).
*   **Utility:** Tailwind CSS is used for layout and custom component styling.
*   **Components:** Hybrid approach using MUI components and custom Tailwind-styled elements.
