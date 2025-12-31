import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(({ className, type = 'text', ...props }, ref) => {
    return (
        <input
            type={type}
            ref={ref}
            className={cn(
                'w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3',
                'text-white placeholder-slate-400',
                'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
                'transition-all duration-300',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                className
            )}
            {...props}
        />
    )
})

Input.displayName = 'Input'

export default Input
