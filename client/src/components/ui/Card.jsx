import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Card = forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})

Card.displayName = 'Card'

const CardHeader = forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('px-6 py-4 border-b border-slate-700/50', className)}
            {...props}
        >
            {children}
        </div>
    )
})

CardHeader.displayName = 'CardHeader'

const CardContent = forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div ref={ref} className={cn('px-6 py-4', className)} {...props}>
            {children}
        </div>
    )
})

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn('px-6 py-4 border-t border-slate-700/50', className)}
            {...props}
        >
            {children}
        </div>
    )
})

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }
