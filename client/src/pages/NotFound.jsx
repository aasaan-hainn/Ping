import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            {/* Background effects */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl -z-10"></div>

            <div className="text-center">
                <h1 className="text-9xl font-extrabold gradient-text mb-4">404</h1>
                <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
                <p className="text-slate-400 mb-8 max-w-md">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/">
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<HomeIcon />}
                        className="btn-primary"
                    >
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound
