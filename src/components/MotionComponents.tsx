import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValue,
} from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

export const EASE = [0.22, 1, 0.36, 1] as const

/** Fade + rise reveal, triggered once on entering the viewport. */
export function Reveal({
  children, delay = 0, y = 36, className = '', as = 'div', duration = 1.3,
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'p' | 'span' | 'h2' | 'h1' | 'h3'; duration?: number }) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}

/** Line-by-line masked text reveal. Pass an array of lines. */
export function LineReveal({
  lines, className = '', delay = 0, stagger = 0.14, once = true,
}: { lines: ReactNode[]; className?: string; delay?: number; stagger?: number; once?: boolean }) {
  return (
    <span className={`block ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            initial={{ y: '115%', rotate: 2 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once, amount: 0.01 }}
            transition={{ duration: 1.5, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Luxury text link with animated underline and arrow. */
export function ArrowLink({
  to, children, className = '', onClick, cursor,
}: { to?: string; children: ReactNode; className?: string; onClick?: () => void; cursor?: string }) {
  const content = (<>
    <span className="meta">{children}</span>
    <ArrowUpRight className="arrow h-4 w-4" strokeWidth={1.2} aria-hidden />
  </>)
  if (to) return <Link to={to} className={`u-link ${className}`} data-cursor={cursor}>{content}</Link>
  return <button type="button" onClick={onClick} className={`u-link ${className}`}>{content}</button>
}

/**
 * The signature product visual: cinematic 2.5D presentation.
 * - Entrance: fade, scale .9→1, rise, rotateY -8°→0 (slow spring-like ease)
 * - Scroll: inner image parallax + gentle settle scale
 * - Hover: pointer-driven perspective tilt
 * - Loading: skeleton until decoded
 */
export function ProductImage({
  src, alt, className = '', aspect = 'aspect-[4/3]', priority = false, tilt = true, cursor, parallax = 12,
}: {
  src: string; alt: string; className?: string; aspect?: string; priority?: boolean; tilt?: boolean; cursor?: string; parallax?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.1, 1.14])

  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(my, { stiffness: 60, damping: 18 })
  const ry = useSpring(mx, { stiffness: 60, damping: 18 })

  const onMove = (e: MouseEvent) => {
    if (!tilt || reduce) return
    const r = ref.current!.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 5)
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 4)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <div className={`relative [perspective:1600px] ${className}`}>
      <motion.div
        ref={ref}
        data-cursor={cursor}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        initial={{ opacity: 0, scale: 0.9, y: 80, rotateY: -8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
        viewport={{ once: true, amount: 0.01 }}
        transition={{ duration: 1.8, ease: EASE }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative w-full overflow-hidden bg-sand ${aspect}`}
      >
        <motion.div className="absolute inset-0" style={{ rotateX: rx, rotateY: ry }}>
          {!loaded && <div className="skeleton absolute inset-0" aria-hidden />}
          <motion.img
            src={src} alt={alt}
            loading={priority ? 'eager' : 'lazy'} decoding="async"
            {...{ fetchpriority: priority ? 'high' : 'auto' }}
            onLoad={() => setLoaded(true)}
            style={reduce ? undefined : { y, scale }}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </motion.div>
        {/* soft vignette for depth */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(42,39,36,0.12)]" />
      </motion.div>
    </div>
  )
}
