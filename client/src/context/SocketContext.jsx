import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from './AuthContext'

const SocketContext = createContext(null)

export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider')
    }
    return context
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const { token, isAuthenticated } = useAuth()

    useEffect(() => {
        if (isAuthenticated && token) {
            // Initialize socket connection
            const socketInstance = io(import.meta.env.VITE_SOCKET_URL || '', {
                auth: {
                    token,
                },
                transports: ['websocket', 'polling'],
            })

            socketInstance.on('connect', () => {
                console.log('Socket connected:', socketInstance.id)
                setIsConnected(true)
            })

            socketInstance.on('disconnect', () => {
                console.log('Socket disconnected')
                setIsConnected(false)
            })

            socketInstance.on('connect_error', (error) => {
                console.error('Socket connection error:', error)
                setIsConnected(false)
            })

            setSocket(socketInstance)

            // Cleanup on unmount
            return () => {
                socketInstance.disconnect()
            }
        } else {
            // Disconnect socket if not authenticated
            if (socket) {
                socket.disconnect()
                setSocket(null)
                setIsConnected(false)
            }
        }
    }, [isAuthenticated, token])

    const value = {
        socket,
        isConnected,
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext
