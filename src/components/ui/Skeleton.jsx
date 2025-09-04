import React from 'react'
import { clsx } from 'clsx'

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={clsx(
        'animate-pulse rounded bg-border/70',
        className
      )}
      {...props}
      aria-hidden="true"
    />
  )
}

export const SkeletonText = ({ lines = 1, className, ...props }) => {
  return (
    <div className="space-y-2" {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx(
            'h-4 w-full',
            i === lines - 1 && lines > 1 ? 'w-4/5' : 'w-full',
            className
          )}
        />
      ))}
    </div>
  )
}

export const SkeletonCard = ({ className, ...props }) => {
  return (
    <div
      className={clsx(
        'rounded-lg border border-border bg-surface p-4',
        className
      )}
      {...props}
    >
      <Skeleton className="h-8 w-3/4 mb-4" />
      <SkeletonText lines={3} className="mb-4" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export default Skeleton

