import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { ProductImage, LineReveal, Reveal, EASE } from './MotionComponents'

import auraImg from '../assets/aura.jpg'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const sofaY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const sofaScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden bg-ivory"
    >
      {/* Background ambient subtle blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] bg-sand/35 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Top Meta */}
      <div className="wrap flex items-center justify-between text-taupe">
        <span className="meta">Collection № 07 · Milan Edition</span>
        <span className="meta hidden md:inline-block">Curated Modern Architectural Living</span>
      </div>

      {/* Center Cinematic Area */}
      <div className="wrap relative my-auto py-8 md:py-12 flex flex-col items-center text-center">
        {/* Massive Typography Behind & Above Product */}
        <div className="w-full">
          <LineReveal
            lines={[
              <span key="1" className="display hero-title block text-charcoal tracking-tighter">
                FURNITURE,
              </span>,
              <span key="2" className="display hero-title block italic font-light text-charcoal/90 -mt-2 md:-mt-6">
                Reimagined.
              </span>,
            ]}
          />
        </div>

        {/* Large Cinematic Hero Product */}
        <motion.div
          style={{ y: sofaY, scale: sofaScale, opacity }}
          className="relative w-full max-w-5xl mx-auto -mt-6 md:-mt-14 z-10"
        >
          <div className="relative group">
            <ProductImage
              src={auraImg}
              alt="Luna Curved Bouclé Sofa"
              aspect="aspect-[16/10] md:aspect-[16/9]"
              priority
              cursor="DISCOVER"
              className="shadow-2xl shadow-charcoal/10"
            />
            {/* Minimal floating product pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.2, ease: EASE }}
              className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-ivory/90 backdrop-blur-md px-6 py-4 border border-charcoal/10 flex items-center gap-6"
            >
              <div className="text-left">
                <p className="meta text-stone">Hero Selection</p>
                <p className="display text-2xl text-charcoal">Luna Sofa</p>
              </div>
              <div className="h-6 w-px bg-charcoal/15" />
              <span className="meta text-charcoal font-medium">Rs 2,499</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row / Actions */}
      <div className="wrap flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pt-8 border-t border-charcoal/10">
        <Reveal delay={0.4} className="max-w-md">
          <p className="body-copy text-brown">
            Sculptural forms engineered with architectural proportion and organic quietude. Designed for spaces that deserve timeless silence.
          </p>
        </Reveal>

        <Reveal delay={0.6} className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
          <Link
            to="/collection"
            data-cursor="EXPLORE"
            className="btn-solid meta tracking-[0.2em]"
          >
            Explore Collection
            <ArrowUpRight className="arrow h-4 w-4" />
          </Link>

          <Link
            to="/about"
            data-cursor="OUR STORY"
            className="u-link meta hidden sm:inline-flex text-charcoal"
          >
            Discover Story
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
