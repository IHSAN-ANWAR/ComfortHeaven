import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Maximize2, Sun, Moon, Sparkles, Layers } from 'lucide-react'
import type { Product } from '../data/products'
import interiorImg from '../assets/interior.jpg'

interface RoomModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export default function RoomModal({ product, isOpen, onClose }: { product: Product; isOpen: boolean; onClose: () => void }) {
  const [ambientLight, setAmbientLight] = useState<'day' | 'evening' | 'gallery'>('day')
  const [scale, setScale] = useState(1)
  const [roomStyle, setRoomStyle] = useState<'milan' | 'brutalist' | 'warm'>('milan')

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-5xl bg-ink text-ivory border border-ivory/20 shadow-2xl overflow-hidden flex flex-col z-10 max-h-[92vh]"
        >
          {/* Top Bar */}
          <div className="p-4 sm:p-6 border-b border-ivory/10 flex items-center justify-between">
            <div>
              <span className="meta text-ivory/50">Spatial Scale Simulator</span>
              <h3 className="display text-2xl text-ivory mt-0.5">
                {product.name} {product.type} in Space
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <span className="meta text-ivory/60 hidden sm:inline">
                {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-ivory/60 hover:text-ivory transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Interactive Visual Canvas */}
          <div className="relative flex-1 min-h-[350px] sm:min-h-[480px] bg-charcoal/90 overflow-hidden flex items-center justify-center">
            {/* Background Architecture */}
            <img
              src={interiorImg}
              alt="Architectural space room background"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                ambientLight === 'evening'
                  ? 'brightness-50 saturate-75 contrast-125'
                  : ambientLight === 'gallery'
                  ? 'brightness-75 contrast-150'
                  : 'brightness-90'
              }`}
            />

            {/* Ambient Lighting Overlay */}
            <div
              className={`absolute inset-0 pointer-events-none transition-colors duration-1000 ${
                ambientLight === 'evening'
                  ? 'bg-amber-950/25 mix-blend-color-burn'
                  : ambientLight === 'gallery'
                  ? 'bg-gradient-to-t from-black/80 via-transparent to-black/40'
                  : 'bg-transparent'
              }`}
            />

            {/* Furniture Simulation Display */}
            <motion.div
              drag
              dragConstraints={{ left: -150, right: 150, top: -80, bottom: 80 }}
              style={{ scale }}
              className="relative z-10 cursor-grab active:cursor-grabbing max-w-sm sm:max-w-md p-4 filter drop-shadow-2xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-contain rounded-sm border border-ivory/20 shadow-2xl pointer-events-none"
              />
              <div className="mt-2 text-center">
                <span className="meta bg-ink/75 backdrop-blur-md px-3 py-1 border border-ivory/20 text-ivory inline-block">
                  Drag to reposition · {product.name} ({scale.toFixed(1)}x)
                </span>
              </div>
            </motion.div>
          </div>

          {/* Controls Bar */}
          <div className="p-4 sm:p-6 bg-ink/95 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4">
            {/* Lighting Modes */}
            <div className="flex items-center gap-3">
              <span className="meta text-ivory/50">Lighting:</span>
              <button
                type="button"
                onClick={() => setAmbientLight('day')}
                className={`meta px-3 py-1.5 border transition-colors ${
                  ambientLight === 'day' ? 'border-ivory bg-ivory text-ink font-medium' : 'border-ivory/20 text-ivory/70 hover:border-ivory/50'
                }`}
              >
                Natural Day
              </button>
              <button
                type="button"
                onClick={() => setAmbientLight('evening')}
                className={`meta px-3 py-1.5 border transition-colors ${
                  ambientLight === 'evening' ? 'border-ivory bg-ivory text-ink font-medium' : 'border-ivory/20 text-ivory/70 hover:border-ivory/50'
                }`}
              >
                Dusk Amber
              </button>
              <button
                type="button"
                onClick={() => setAmbientLight('gallery')}
                className={`meta px-3 py-1.5 border transition-colors ${
                  ambientLight === 'gallery' ? 'border-ivory bg-ivory text-ink font-medium' : 'border-ivory/20 text-ivory/70 hover:border-ivory/50'
                }`}
              >
                Direct Spotlight
              </button>
            </div>

            {/* Scale Slider */}
            <div className="flex items-center gap-3">
              <span className="meta text-ivory/50">Proportion:</span>
              <input
                type="range"
                min="0.7"
                max="1.3"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-24 sm:w-32 accent-sand cursor-pointer"
              />
              <button
                type="button"
                onClick={() => setScale(1)}
                className="meta text-xs text-ivory/50 hover:text-ivory underline"
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
