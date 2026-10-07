import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ProductImage, Reveal, LineReveal } from './MotionComponents'
import { products, num } from '../data/products'

export default function ProductShowcase() {
  // Signature products to showcase one by one
  const showcaseItems = products.slice(1, 5) // Noir Bed, Arc Chair, Forma Table, Mona Chair

  return (
    <section className="relative py-24 md:py-40 bg-ivory-light">
      <div className="wrap">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-36 pb-8 border-b border-charcoal/10 gap-6">
          <div>
            <span className="meta text-stone">Curated Editions</span>
            <LineReveal
              lines={[
                <h2 key="1" className="display section-title text-charcoal mt-2">
                  Signature Catalog
                </h2>,
              ]}
            />
          </div>
          <p className="body-copy text-taupe md:text-right">
            Every piece presented individually. Undivided attention for timeless forms.
          </p>
        </div>

        {/* The One-by-One Showcase */}
        <div className="space-y-36 md:space-y-48">
          {showcaseItems.map((product, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div
                key={product.id}
                className="relative grid lg:grid-cols-12 gap-10 lg:gap-20 items-center"
              >
                {/* Index Watermark */}
                <span
                  aria-hidden
                  className="absolute -top-16 lg:-top-24 left-0 font-display text-[6rem] lg:text-[10rem] font-light text-stone/20 select-none pointer-events-none -z-0"
                >
                  {num(idx + 1)}
                </span>

                {/* Big Visual: takes 7 or 8 columns */}
                <div
                  className={`lg:col-span-8 relative z-10 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Link to={`/product/${product.id}`} data-cursor="EXPLORE">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      aspect="aspect-[4/3] md:aspect-[16/11]"
                      className="shadow-2xl shadow-charcoal/10"
                    />
                  </Link>
                </div>

                {/* Editorial text & details: takes 4 columns */}
                <div
                  className={`lg:col-span-4 relative z-10 space-y-8 ${
                    isEven ? 'lg:order-2 lg:pl-6' : 'lg:order-1 lg:pr-6'
                  }`}
                >
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="meta text-taupe font-mono">{num(idx + 1)}</span>
                      <span className="h-px w-8 bg-charcoal/20" />
                      <span className="meta text-stone">{product.category} · {product.type}</span>
                    </div>

                    <h3 className="display text-4xl sm:text-5xl md:text-6xl text-charcoal mt-4">
                      {product.name}
                    </h3>
                  </Reveal>

                  <Reveal delay={0.15}>
                    <p className="text-xl font-display italic text-charcoal/80">
                      {product.tagline}
                    </p>
                    <p className="body-copy text-brown mt-4">
                      {product.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.25} className="pt-6 border-t border-charcoal/10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="meta text-taupe">Acquisition</span>
                      <span className="text-2xl font-light text-charcoal">{product.price}</span>
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      data-cursor="INSPECT"
                      className="btn-solid meta tracking-[0.2em] w-full justify-between"
                    >
                      <span>Explore {product.name}</span>
                      <ArrowUpRight className="arrow h-4 w-4" />
                    </Link>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
