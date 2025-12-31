# 🏓 Ping

A modern real-time communication platform built with React, Express, MongoDB, and Socket.IO.

![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?logo=mongodb)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-black?logo=socket.io)

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for utility-first styling
- **Material UI** for component library
- **Anime.js** for smooth animations
- **Three.js** for 3D graphics
- **Socket.IO Client** for real-time communication

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Socket.IO** for WebSocket connections
- **bcryptjs** for password hashing

## 📁 Project Structure

```
Ping/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── socket/         # Socket.IO client
│   │   └── ...
│   └── ...
│
├── server/                 # Express Backend
│   ├── config/             # Database config
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── socket/             # Socket.IO server
│   └── ...
│
└── README.md
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd Ping
   ```

2. **Setup the Server**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   npm install
   ```

3. **Setup the Client**
   ```bash
   cd ../client
   cp .env.example .env
   npm install
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the Development Servers**

   In one terminal (server):
   ```bash
   cd server
   npm run dev
   ```

   In another terminal (client):
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Environment Variables

### Server (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/ping |
| `JWT_SECRET` | JWT signing secret | - |
| `CLIENT_URL` | Client URL for CORS | http://localhost:3000 |

### Client (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000 |
| `VITE_SOCKET_URL` | Socket.IO server URL | http://localhost:5000 |

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Health
- `GET /api/health` - Server health check

## 🔌 Socket.IO Events

### Client → Server
- `message:private` - Send private message
- `typing:start` - Start typing indicator
- `typing:stop` - Stop typing indicator

### Server → Client
- `user:online` - User came online
- `user:offline` - User went offline
- `message:receive` - Receive message
- `typing:indicator` - Typing indicator

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

Built with ❤️ using modern web technologies
