import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import { initSocket } from './socket/index.js'

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()
const httpServer = createServer(app)

// Initialize Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})

// Initialize socket handlers
initSocket(io)

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Make io accessible to routes
app.set('io', io)

// Routes
app.use('/api/auth', authRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' })
})

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📡 Socket.IO ready for connections`)
})

export { io }
