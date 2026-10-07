import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowUpRight, Heart, LayoutGrid, Rows3, Sparkles } from 'lucide-react'
import { products, categories, num } from '../data/products'
import { ProductImage, Reveal, LineReveal } from '../components/MotionComponents'
import { useCart } from '../context/CartContext'

export default function Collection() {
  const { category } = useParams<{ category?: string }>()
  const { addToCart, isInWishlist, toggleWishlist } = useCart()

  // Layout View mode: 'editorial' (large alternating) vs 'grid' (gallery)
  const [viewMode, setViewMode] = useState<'editorial' | 'grid'>('editorial')

  const activeCategory = category ? category.toLowerCase() : 'all'

  // Filter products by category
  const filteredProducts = useMemo(() => {
    return activeCategory === 'all'
      ? products
      : products.filter((p) => p.category.toLowerCase() === activeCategory)
  }, [activeCategory])

  const activeDef = categories.find((c) => c.slug === activeCategory)

  return (
    <main className="pt-28 md:pt-40 pb-32 bg-ivory">
      {/* Editorial Header */}
      <div className="wrap mb-16 md:mb-20">
        <div className="max-w-4xl space-y-6">
          <span className="meta text-taupe">Catalog Editions · 2026</span>
          <LineReveal
            lines={[
              <h1 key="1" className="display hero-title text-charcoal">
                The Collection.
              </h1>,
            ]}
          />
          <p className="body-copy text-brown">
            {activeDef ? activeDef.intro : 'Sculptural furniture curated across living, sleeping, and dining spaces. Each form individually realized.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-6 md:gap-12 mt-12 pt-8 border-t border-charcoal/10">
          <Link
            to="/collection"
            className={`meta u-link !pb-1 transition-opacity ${
              activeCategory === 'all' ? 'opacity-100 after:!scale-x-100 font-medium' : 'opacity-50 hover:opacity-100'
            }`}
          >
            All Pieces ({products.length})
          </Link>

          {categories.map((c) => {
            const count = products.filter((p) => p.category.toLowerCase() === c.slug).length
            return (
              <Link
                key={c.slug}
                to={`/collection/${c.slug}`}
                className={`meta u-link !pb-1 transition-opacity ${
                  activeCategory === c.slug ? 'opacity-100 after:!scale-x-100 font-medium' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {c.label} ({count})
              </Link>
            )
          })}
        </div>

        {/* Toolbar: View Switcher */}
        <div className="flex flex-wrap items-center justify-end gap-4 mt-8 pt-6 border-t border-charcoal/5">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-3">
            <span className="meta text-stone text-[0.65rem] hidden sm:inline">View:</span>
            <button
              type="button"
              onClick={() => setViewMode('editorial')}
              className={`p-1.5 border transition-colors ${
                viewMode === 'editorial' ? 'border-charcoal bg-sand/40 text-charcoal' : 'border-charcoal/15 text-stone hover:text-charcoal'
              }`}
              title="Editorial Magazine View"
              aria-label="Editorial Magazine View"
            >
              <Rows3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 border transition-colors ${
                viewMode === 'grid' ? 'border-charcoal bg-sand/40 text-charcoal' : 'border-charcoal/15 text-stone hover:text-charcoal'
              }`}
              title="Architectural Gallery Grid"
              aria-label="Architectural Gallery Grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className="wrap">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="display text-3xl text-taupe">No pieces found in this category.</p>
            <Link to="/collection" className="btn-solid meta mt-8 inline-flex">
              View All Pieces
            </Link>
          </div>
        ) : viewMode === 'editorial' ? (
          /* EDITORIAL ALTERNATING SPREAD */
          <div className="space-y-36 md:space-y-48">
            {filteredProducts.map((product, idx) => {
              const isReversed = idx % 2 !== 0
              const isFav = isInWishlist(product.id)

              return (
                <article
                  key={product.id}
                  id={product.id}
                  className="relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                >
                  {/* Index Watermark */}
                  <span
                    aria-hidden
                    className="absolute -top-14 lg:-top-20 left-0 font-display text-[7rem] lg:text-[10rem] font-light text-stone/15 select-none pointer-events-none"
                  >
                    {num(idx + 1)}
                  </span>

                  {/* Hero Product Visual */}
                  <div
                    className={`lg:col-span-8 relative z-10 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <Link to={`/product/${product.id}`} data-cursor="VIEW PIECE">
                      <ProductImage
                        src={product.image}
                        alt={product.name}
                        aspect="aspect-[4/3] md:aspect-[16/11]"
                        className="shadow-2xl shadow-charcoal/10"
                      />
                    </Link>
                  </div>

                  {/* Editorial Text & Actions */}
                  <div
                    className={`lg:col-span-4 relative z-10 space-y-6 ${
                      isReversed ? 'lg:order-1 lg:pr-8' : 'lg:order-2 lg:pl-8'
                    }`}
                  >
                    <Reveal>
                      <div className="flex items-center justify-between">
                        <span className="meta text-taupe">
                          {product.category} · {product.type}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone hover:text-charcoal p-1 transition-colors"
                          aria-label="Toggle wishlist"
                        >
                          <Heart className={`h-4 w-4 ${isFav ? 'fill-charcoal text-charcoal' : ''}`} />
                        </button>
                      </div>

                      <h2 className="display text-4xl sm:text-5xl md:text-6xl text-charcoal mt-2">
                        {product.name}
                      </h2>
                    </Reveal>

                    <Reveal delay={0.15}>
                      <p className="display text-xl text-taupe italic">
                        {product.tagline}
                      </p>
                      <p className="body-copy text-brown mt-4">
                        {product.description}
                      </p>
                    </Reveal>

                    <Reveal delay={0.25} className="pt-6 border-t border-charcoal/10 space-y-4">
                      <div className="flex justify-between items-baseline">
                        <span className="meta text-taupe">Valuation</span>
                        <span className="text-2xl font-light text-charcoal">{product.price}</span>
                      </div>

                      <div className="flex gap-4">
                        <Link
                          to={`/product/${product.id}`}
                          data-cursor="INSPECT"
                          className="btn-solid meta tracking-[0.2em] flex-1 justify-between"
                        >
                          <span>Explore Piece</span>
                          <ArrowUpRight className="arrow h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="meta px-4 py-3 border border-charcoal/30 hover:border-charcoal bg-sand/30 hover:bg-sand/60 text-charcoal transition-colors"
                          title="Quick Reserve in Bag"
                        >
                          <Sparkles className="h-4 w-4" />
                        </button>
                      </div>
                    </Reveal>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          /* GALLERY ARCHITECTURAL GRID */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredProducts.map((product) => {
              const isFav = isInWishlist(product.id)

              return (
                <article
                  key={product.id}
                  className="group relative bg-ivory-light border border-charcoal/10 p-5 flex flex-col justify-between transition-shadow hover:shadow-xl"
                >
                  <div className="relative overflow-hidden mb-5">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 bg-ivory/80 backdrop-blur-sm rounded-full text-charcoal shadow-sm hover:scale-110 transition-transform"
                      aria-label="Save to wishlist"
                    >
                      <Heart className={`h-4 w-4 ${isFav ? 'fill-charcoal' : ''}`} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="meta text-stone text-[0.65rem]">{product.category} · {product.type}</span>
                      <span className="text-lg font-light text-charcoal">{product.price}</span>
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <h3 className="display text-2xl text-charcoal hover:underline">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-brown line-clamp-2 font-light">
                      {product.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-charcoal/10 flex items-center justify-between gap-3">
                    <Link
                      to={`/product/${product.id}`}
                      className="meta text-charcoal hover:underline"
                    >
                      Details →
                    </Link>
                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className="meta px-3 py-1.5 border border-charcoal/30 bg-sand/30 hover:bg-charcoal hover:text-ivory transition-colors text-charcoal"
                    >
                      Reserve Piece
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
