'use client'
import { useEffect, useRef } from 'react'

interface ToastProps {
  message: string
  type?: 'green' | 'blue' | 'red'
  onClose: () => void
}

export default function Toast({ message, type = 'green', onClose }: ToastProps) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    timer.current = setTimeout(onClose, 3200)
    return () => clearTimeout(timer.current!)
  }, [message, onClose])

  return (
    <div className="toast show">
      <div className={`toast-dot ${type}`} />
      <span>{message}</span>
    </div>
  )
}
