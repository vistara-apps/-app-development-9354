import React from 'react'
import { clsx } from 'clsx'

const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-surface rounded-lg border border-border shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div
      className={clsx('px-6 py-4 border-b border-border', className)}
      {...props}
    >
      {children}
    </div>
  )
}

const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={clsx('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3
      className={clsx('text-lg font-semibold text-textPrimary', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export { Card, CardHeader, CardContent, CardTitle }