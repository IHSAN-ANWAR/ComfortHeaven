import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/** Luxury cursor: small ring that expands into a label over [data-cursor] elements. Fine pointers only. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e: Event) => {
      const el = (e.target as HTMLElement).closest?.('[data-cursor]') as HTMLElement | null
      setLabel(el?.dataset.cursor ?? null)
    }
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  const big = !!label
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full mix-blend-normal"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: big ? 96 : 14, height: big ? 96 : 14,
        backgroundColor: big ? 'rgba(18,17,16,0.88)' : 'rgba(42,39,36,0)',
        borderColor: big ? 'rgba(236,230,220,0)' : 'rgba(42,39,36,0.9)',
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 rounded-full border" style={{ borderColor: big ? 'transparent' : 'rgba(128,120,110,0.9)' }} />
      <motion.span
        className="meta text-ivory"
        style={{ fontSize: '0.6rem' }}
        animate={{ opacity: big ? 1 : 0, scale: big ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}
