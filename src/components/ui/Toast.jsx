import React, { useEffect } from 'react'
import { clsx } from 'clsx'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const Toast = ({ message, type = 'info', duration = 5000, onClose }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />
  }

  const styles = {
    base: 'flex items-center p-4 rounded-md shadow-card max-w-md animate-slide-up',
    success: 'bg-green-50 text-green-800 border border-green-200',
    error: 'bg-red-50 text-red-800 border border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200'
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={clsx(styles.base, styles[type])}
    >
      <div className="flex-shrink-0 mr-3">
        {icons[type]}
      </div>
      <div className="flex-1 mr-2">
        {message}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 ml-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  )
}

export default Toast

