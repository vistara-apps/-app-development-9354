import React, { forwardRef } from 'react'
import { clsx } from 'clsx'

const Card = forwardRef(({ 
  children, 
  className, 
  interactive = false,
  hoverable = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        'bg-surface rounded-lg border border-border shadow-card dark:shadow-card-dark transition-all duration-200',
        hoverable && 'hover:shadow-lg hover:-translate-y-1',
        interactive && 'cursor-pointer hover:border-primary/50 active:scale-[0.99]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('px-6 py-4 border-b border-border', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

const CardContent = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div 
      ref={ref}
      className={clsx('px-6 py-4', className)} 
      {...props}
    >
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'

const CardTitle = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={clsx('text-lg font-semibold text-textPrimary', className)}
      {...props}
    >
      {children}
    </h3>
  )
})

CardTitle.displayName = 'CardTitle'

const CardFooter = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('px-6 py-4 border-t border-border', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardTitle, CardFooter }
