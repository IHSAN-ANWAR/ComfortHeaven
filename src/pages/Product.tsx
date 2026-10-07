import { useState, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowLeft, ArrowUpRight, RotateCw, ZoomIn, Check, Sparkles, Heart, Share2, Eye, ShieldCheck, Truck, Layers } from 'lucide-react'
import { getProduct, products } from '../data/products'
import { ProductImage, Reveal, LineReveal, EASE } from '../components/MotionComponents'
import { useCart } from '../context/CartContext'
import RoomModal from '../components/RoomModal'
import craftImg from '../assets/craft.jpg'

// Finishes map according to furniture category
const finishOptions: Record<string, { name: string; color: string; desc: string }[]> = {
  Living: [
    { name: 'Ivory Bouclé', color: '#eae5dc', desc: 'Hand-woven virgin wool & cotton' },
    { name: 'Charcoal Bouclé', color: '#32302e', desc: 'Dense twisted deep pigment wool' },
    { name: 'Cognac Saddle Leather', color: '#884d28', desc: 'Full grain vegetable-tanned leather' },
    { name: 'Honed Travertine', color: '#d8cbbe', desc: 'Natural Italian porous stone' },
  ],
  Bedroom: [
    { name: 'Charcoal Belgian Linen', color: '#383633', desc: 'Stonewashed breathable pure linen' },
    { name: 'Ecru Natural Linen', color: '#e4dacf', desc: 'Unbleached soft organic flax' },
    { name: 'Smoked European Oak', color: '#443c33', desc: 'Fumed matte natural grain' },
    { name: 'Dark American Walnut', color: '#4d3929', desc: 'Deep oil-rubbed hardwood' },
  ],
  Dining: [
    { name: 'Natural Light Oak', color: '#d4c2a5', desc: 'Slow-grown European white oak' },
    { name: 'Smoked Oak', color: '#443c33', desc: 'Seven coats of hard-wax oil' },
    { name: 'Woven Taupe Linen', color: '#9d9487', desc: 'Durable stain-resistant weave' },
    { name: 'American Walnut', color: '#4d3929', desc: 'Carved solid pedestal construction' },
  ],
  Objects: [
    { name: 'Brushed Solid Brass', color: '#c4a661', desc: 'Unlacquered living patina' },
    { name: 'Smoked Walnut', color: '#4d3929', desc: 'Hand-turned sculptural wood' },
    { name: 'Italian Travertine', color: '#d8cbbe', desc: 'Single-block quarry extraction' },
  ],
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { addToCart, isInWishlist, toggleWishlist, showToast, openCart } = useCart()

  const [zoom, setZoom] = useState(false)
  const [selectedFinish, setSelectedFinish] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [roomModalOpen, setRoomModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Interactive 3D Orbit Dragging state
  const dragX = useMotionValue(0)
  const dragY = useMotionValue(0)
  const rotY = useSpring(dragX, { stiffness: 120, damping: 20 })
  const rotX = useSpring(dragY, { stiffness: 120, damping: 20 })
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)

  if (!product) {
    return (
      <main className="min-h-screen pt-40 pb-20 text-center bg-ivory wrap">
        <p className="display text-4xl text-charcoal">Product Not Found</p>
        <Link to="/collection" className="btn-solid meta mt-8 inline-flex">Return to Collection</Link>
      </main>
    )
  }

  const finishes = finishOptions[product.category] || finishOptions.Living
  const currentFinish = selectedFinish || finishes[0].name

  // Related products
  const related = products.filter((p) => p.id !== product.id).slice(0, 2)

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    startX.current = e.clientX - dragX.get()
    startY.current = e.clientY - dragY.get()
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const dx = (e.clientX - startX.current) * 0.35
    const dy = -(e.clientY - startY.current) * 0.25
    dragX.set(Math.max(-28, Math.min(28, dx)))
    dragY.set(Math.max(-15, Math.min(15, dy)))
  }

  const onPointerUp = () => {
    isDragging.current = false
  }

  const reset3D = () => {
    dragX.set(0)
    dragY.set(0)
  }

  const handleAcquire = () => {
    addToCart(product, currentFinish, quantity)
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      showToast('Link Copied to Clipboard', 'Share this architectural piece')
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const isFavorite = isInWishlist(product.id)

  return (
    <main className="bg-ivory pt-28 md:pt-36 pb-32">
      {/* Navigation & Controls Bar */}
      <div className="wrap mb-10 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="meta flex items-center gap-2 text-taupe hover:text-charcoal transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Pieces</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`meta flex items-center gap-2 px-3 py-1.5 border transition-colors ${
              isFavorite
                ? 'border-charcoal bg-charcoal text-ivory'
                : 'border-charcoal/20 text-stone hover:border-charcoal hover:text-charcoal'
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`h-3.5 w-3.5 ${isFavorite ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Curated' : 'Save Piece'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="meta flex items-center gap-2 px-3 py-1.5 border border-charcoal/20 text-stone hover:border-charcoal hover:text-charcoal transition-colors"
            aria-label="Share Piece"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* 1. IMMERSIVE HERO: CINEMATIC VISUAL */}
      <section className="wrap mb-20 md:mb-32">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <span className="meta text-taupe block mb-3">
            {product.category} · {product.type}
          </span>
          <LineReveal
            lines={[
              <h1 key="1" className="display hero-title text-charcoal">
                {product.name}
              </h1>,
            ]}
          />
          <p className="display text-2xl md:text-3xl italic text-taupe mt-4">
            {product.tagline}
          </p>
        </div>

        {/* 3D / 2.5D Product Canvas */}
        <div className="relative max-w-6xl mx-auto [perspective:1800px]">
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative cursor-grab active:cursor-grabbing select-none"
            data-cursor="DRAG 3D"
          >
            <motion.div
              style={{
                rotateY: rotY,
                rotateX: rotX,
                scale: zoom ? 1.25 : 1,
                transformStyle: 'preserve-3d',
              }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative rounded-none overflow-hidden bg-sand shadow-2xl shadow-charcoal/15 aspect-[16/10] md:aspect-[16/9]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 pointer-events-none"
              />

              {/* Dynamic lighting sheen over 3D surface */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-gradient-to-tr from-charcoal/20 via-transparent to-ivory/60"
              />
            </motion.div>
          </div>

          {/* Interactive controls bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-charcoal/10">
            <div className="flex items-center gap-6">
              <span className="meta flex items-center gap-2 text-stone">
                <RotateCw className="h-3.5 w-3.5" />
                Drag image to orbit 3D view
              </span>
              <button
                type="button"
                onClick={reset3D}
                className="meta text-taupe hover:text-charcoal underline"
              >
                Reset Angle
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setRoomModalOpen(true)}
                className="meta flex items-center gap-2 px-3 py-1.5 border border-charcoal/30 bg-sand/30 hover:bg-sand/60 text-charcoal transition-colors"
              >
                <Eye className="h-3.5 w-3.5" />
                View in Spatial Room
              </button>

              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                className="meta flex items-center gap-2 text-charcoal hover:opacity-75"
              >
                <ZoomIn className="h-3.5 w-3.5" />
                {zoom ? 'Normal View' : 'Inspect Detail'}
              </button>
            </div>
          </div>
        </div>

        {/* Bespoke Finishes & Acquisition Bar */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-ivory-light border border-charcoal/10 space-y-8">
          {/* Finish & Material Swatch Selector */}
          <div>
            <div className="flex justify-between items-baseline mb-4">
              <span className="meta text-taupe">Material & Finish Execution:</span>
              <span className="font-display text-lg text-charcoal">{currentFinish}</span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {finishes.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setSelectedFinish(f.name)}
                  className={`p-3 text-left border transition-all ${
                    currentFinish === f.name
                      ? 'border-charcoal bg-sand/40 shadow-sm'
                      : 'border-charcoal/15 bg-transparent hover:border-charcoal/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span
                      className="h-4 w-4 rounded-full border border-charcoal/30 shrink-0"
                      style={{ backgroundColor: f.color }}
                    />
                    <span className="font-display text-sm text-charcoal leading-none">
                      {f.name}
                    </span>
                  </div>
                  <p className="text-[0.7rem] text-stone leading-tight line-clamp-1">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing & Acquisition Action */}
          <div className="pt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="meta text-taupe">Acquisition Valuation</span>
              <p className="text-3xl font-light text-charcoal">{product.price}</p>
              <p className="meta text-stone text-xs mt-1">Includes white-glove inside delivery & installation</p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Quantity Stepper */}
              <div className="inline-flex items-center border border-charcoal/20 bg-ivory">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-charcoal hover:bg-sand/40"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-mono text-sm px-2">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-charcoal hover:bg-sand/40"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAcquire}
                data-cursor="ORDER"
                className="btn-solid meta tracking-[0.2em] flex-1 sm:flex-initial justify-center"
              >
                <Sparkles className="h-4 w-4" />
                Reserve in Comfort Haven Bag
              </button>

              <Link
                to="/contact"
                className="u-link meta text-charcoal hidden sm:inline-flex"
              >
                Consult Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL STORY & CRAFTSMANSHIP SECTION */}
      <section className="wrap py-20 border-t border-charcoal/10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="meta text-stone">Provenance & Form</span>
            <h2 className="display text-4xl sm:text-5xl text-charcoal">
              Conceived in Milan. Realized by Hand.
            </h2>
            <p className="body-copy text-brown">
              {product.story}
            </p>
            <div className="pt-4">
              <p className="meta text-taupe">Artisan Execution</p>
              <p className="font-display text-xl text-charcoal mt-1">
                {product.craftsmanship}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ProductImage
              src={craftImg}
              alt="Artisan craftsmanship at Comfort Haven"
              aspect="aspect-[16/10]"
              cursor="COMFORT HAVEN"
              className="shadow-xl shadow-charcoal/5"
            />
          </div>
        </div>
      </section>

      {/* 3. MATERIALITY & SPECIFICATION GRID */}
      <section className="wrap py-20 border-t border-charcoal/10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Dimensions */}
          <div className="space-y-4">
            <span className="meta text-taupe">Dimensions</span>
            <h3 className="display text-3xl text-charcoal">Proportions</h3>
            <div className="space-y-3 pt-4 border-t border-charcoal/10">
              <div className="flex justify-between py-1">
                <span className="meta text-taupe">Width</span>
                <span className="font-mono text-sm text-charcoal">{product.dimensions.width}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-charcoal/5">
                <span className="meta text-taupe">Height</span>
                <span className="font-mono text-sm text-charcoal">{product.dimensions.height}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-charcoal/5">
                <span className="meta text-taupe">Depth</span>
                <span className="font-mono text-sm text-charcoal">{product.dimensions.depth}</span>
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="space-y-4">
            <span className="meta text-taupe">Composition</span>
            <h3 className="display text-3xl text-charcoal">Selected Materials</h3>
            <ul className="space-y-3 pt-4 border-t border-charcoal/10">
              {product.materials.map((m, i) => (
                <li key={i} className="flex items-center gap-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone" />
                  <span className="text-sm font-light text-charcoal">{m}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* White Glove Care */}
          <div className="space-y-4">
            <span className="meta text-taupe">Endurance</span>
            <h3 className="display text-3xl text-charcoal">Care & Longevity</h3>
            <p className="body-copy text-brown pt-4 border-t border-charcoal/10 text-sm">
              Treated with natural breathable oils and stain-resistant finishes. Complimentary annual condition inspection provided for all private collection owners.
            </p>
          </div>
        </div>
      </section>

      {/* 4. COMPLEMENTARY PIECES */}
      <section className="wrap py-24 border-t border-charcoal/10">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="meta text-taupe">Harmonious Pairings</span>
            <h2 className="display text-4xl text-charcoal mt-2">Pieces from the Same Spatial Suite</h2>
          </div>
          <Link to="/collection" className="u-link meta text-charcoal hidden sm:inline-flex">
            All Works
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {related.map((item) => (
            <div key={item.id} className="space-y-6">
              <Link to={`/product/${item.id}`} data-cursor="VIEW PIECE">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  aspect="aspect-[16/11]"
                  className="shadow-xl shadow-charcoal/5"
                />
              </Link>
              <div className="flex justify-between items-baseline pt-2">
                <div>
                  <h3 className="display text-3xl text-charcoal">{item.name}</h3>
                  <span className="meta text-stone">{item.type}</span>
                </div>
                <span className="text-xl font-light text-charcoal">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spatial Room Modal */}
      <RoomModal
        product={product}
        isOpen={roomModalOpen}
        onClose={() => setRoomModalOpen(false)}
      />
    </main>
  )
}
