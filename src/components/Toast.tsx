import { AnimatePresence, motion } from 'motion/react'
import { X, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Toast() {
  const { toasts, dismissToast } = useCart()

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto bg-ink text-ivory border border-ivory/15 p-4 shadow-2xl backdrop-blur-md flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ivory/20 text-ivory">
                <Check className="h-2.5 w-2.5" />
              </span>
              <div className="space-y-1">
                <p className="font-display text-sm tracking-wide text-ivory font-medium">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="text-xs text-ivory/60 font-light">
                    {toast.description}
                  </p>
                )}
                {toast.actionLabel && toast.onAction && (
                  <button
                    type="button"
                    onClick={() => {
                      toast.onAction?.()
                      dismissToast(toast.id)
                    }}
                    className="meta text-[0.65rem] text-ivory underline hover:text-white pt-1 block"
                  >
                    {toast.actionLabel} →
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-ivory/40 hover:text-ivory transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
