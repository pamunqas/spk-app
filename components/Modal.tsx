'use client'
import { useEffect } from 'react'

interface ModalProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  actions: React.ReactNode
  onClose: () => void
}

export default function Modal({ title, subtitle, children, actions, onClose }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal-title">{title}</div>
        {subtitle && <div className="modal-sub">{subtitle}</div>}
        <div className="modal-body">{children}</div>
        <div className="modal-actions">{actions}</div>
      </div>
    </div>
  )
}
