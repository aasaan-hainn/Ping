import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Button = forwardRef(({
    className,
    variant = 'default',
    size = 'default',
    children,
    ...props
}, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        default: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 focus:ring-primary-500',
        secondary: 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 focus:ring-slate-500',
        outline: 'border border-slate-600 bg-transparent hover:bg-slate-800 text-slate-300 focus:ring-slate-500',
        ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 focus:ring-slate-500',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    }

    const sizes = {
        sm: 'text-sm px-3 py-1.5',
        default: 'text-sm px-4 py-2',
        lg: 'text-base px-6 py-3',
        xl: 'text-lg px-8 py-4',
    }

    return (
        <button
            ref={ref}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = 'Button'

export default Button
