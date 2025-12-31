/**
 * Utility function to merge class names conditionally
 * Similar to clsx/classnames but simpler
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ')
}
