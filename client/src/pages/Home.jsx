import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import anime from 'animejs'
import { Button } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import ChatIcon from '@mui/icons-material/Chat'
import GroupsIcon from '@mui/icons-material/Groups'
import SpeedIcon from '@mui/icons-material/Speed'

const Home = () => {
    const heroRef = useRef(null)
    const featuresRef = useRef(null)

    useEffect(() => {
        // Hero animation
        anime({
            targets: heroRef.current?.querySelectorAll('.animate-item'),
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(150),
            easing: 'easeOutQuart',
            duration: 1000,
        })

        // Features animation on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        anime({
                            targets: entry.target.querySelectorAll('.feature-card'),
                            translateY: [30, 0],
                            opacity: [0, 1],
                            delay: anime.stagger(100),
                            easing: 'easeOutQuart',
                            duration: 800,
                        })
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.2 }
        )

        if (featuresRef.current) {
            observer.observe(featuresRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const features = [
        {
            icon: <ChatIcon className="text-4xl" />,
            title: 'Real-time Chat',
            description: 'Instant messaging with Socket.IO for seamless communication.',
        },
        {
            icon: <GroupsIcon className="text-4xl" />,
            title: 'Team Collaboration',
            description: 'Create teams, channels, and collaborate in real-time.',
        },
        {
            icon: <SpeedIcon className="text-4xl" />,
            title: 'Lightning Fast',
            description: 'Built with performance in mind using modern technologies.',
        },
    ]

    return (
        <div className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold gradient-text">
                        Ping
                    </Link>
                    <div className="flex gap-4">
                        <Link to="/login">
                            <Button variant="text" color="inherit" className="text-slate-300 hover:text-white">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="contained" color="primary" className="btn-primary">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section ref={heroRef} className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="animate-item text-5xl md:text-7xl font-extrabold mb-6">
                        <span className="gradient-text">Connect</span>{' '}
                        <span className="text-white">Instantly</span>
                    </h1>
                    <p className="animate-item text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-10">
                        Experience real-time communication with a modern, beautiful interface.
                        Built for teams who demand speed and reliability.
                    </p>
                    <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register">
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<RocketLaunchIcon />}
                                className="btn-primary text-lg px-8 py-3"
                            >
                                Start Free
                            </Button>
                        </Link>
                        <Button
                            variant="outlined"
                            size="large"
                            className="btn-secondary text-lg px-8 py-3"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -z-10"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl -z-10"></div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                        Why Choose <span className="gradient-text">Ping</span>?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="feature-card glass-card p-8 text-center hover:border-primary-500/50 transition-all duration-300 opacity-0"
                            >
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-slate-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-slate-800">
                <div className="max-w-7xl mx-auto text-center text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Ping. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home
