import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Avatar, IconButton } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ChatIcon from '@mui/icons-material/Chat'
import SettingsIcon from '@mui/icons-material/Settings'
import { useAuth } from '../context/AuthContext'
import { useSocket } from '../context/SocketContext'

const Dashboard = () => {
    const navigate = useNavigate()
    const { user, logout, loading, isAuthenticated } = useAuth()
    const { isConnected } = useSocket()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login')
        }
    }, [loading, isAuthenticated, navigate])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 glass-card border-r border-slate-700/50 p-6 flex flex-col">
                {/* Logo */}
                <h1 className="text-2xl font-bold gradient-text mb-8">Ping</h1>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    <Button
                        fullWidth
                        startIcon={<ChatIcon />}
                        className="justify-start text-left py-3 text-slate-300 hover:bg-slate-700/50"
                    >
                        Messages
                    </Button>
                    <Button
                        fullWidth
                        startIcon={<SettingsIcon />}
                        className="justify-start text-left py-3 text-slate-300 hover:bg-slate-700/50"
                    >
                        Settings
                    </Button>
                </nav>

                {/* User section */}
                <div className="pt-6 border-t border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <Avatar className="bg-gradient-to-br from-primary-500 to-secondary-500">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate">{user?.username}</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                                {isConnected ? 'Online' : 'Offline'}
                            </p>
                        </div>
                        <IconButton onClick={handleLogout} className="text-slate-400 hover:text-white">
                            <LogoutIcon />
                        </IconButton>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">
                <div className="max-w-4xl">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        Welcome back, <span className="gradient-text">{user?.username}</span>!
                    </h2>
                    <p className="text-slate-400 mb-8">
                        Here's what's happening with your account today.
                    </p>

                    {/* Stats cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="glass-card p-6">
                            <p className="text-slate-400 text-sm mb-2">Messages</p>
                            <p className="text-3xl font-bold text-white">0</p>
                        </div>
                        <div className="glass-card p-6">
                            <p className="text-slate-400 text-sm mb-2">Contacts</p>
                            <p className="text-3xl font-bold text-white">0</p>
                        </div>
                        <div className="glass-card p-6">
                            <p className="text-slate-400 text-sm mb-2">Channels</p>
                            <p className="text-3xl font-bold text-white">0</p>
                        </div>
                    </div>

                    {/* Placeholder content */}
                    <div className="mt-8 glass-card p-8 text-center">
                        <ChatIcon className="text-6xl text-slate-600 mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No messages yet</h3>
                        <p className="text-slate-400 mb-6">
                            Start a conversation with someone to see your messages here.
                        </p>
                        <Button variant="contained" className="btn-primary">
                            Start Chatting
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard
