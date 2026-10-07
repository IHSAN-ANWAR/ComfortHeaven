import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { ProductImage, Reveal } from './MotionComponents'
import { products } from '../data/products'

export default function FeaturedProduct() {
  const sofa = products[0] // Luna Sofa

  return (
    <section className="relative py-28 md:py-44 bg-ivory overflow-hidden">
      <div className="wrap">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Large Product Visual (60-70% visual weight) */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <Link to={`/product/${sofa.id}`}>
              <ProductImage
                src={sofa.image}
                alt={sofa.name}
                aspect="aspect-[4/3] md:aspect-[16/11]"
                cursor="VIEW PIECE"
                className="shadow-xl shadow-charcoal/5"
              />
            </Link>
          </div>

          {/* RIGHT: Editorial Content */}
          <div className="lg:col-span-4 order-1 lg:order-2 space-y-8 lg:pl-6">
            <Reveal>
              <div className="meta text-stone tracking-[0.28em] mb-2">Featured Silhouette</div>
              <h2 className="display text-4xl sm:text-5xl md:text-6xl text-charcoal tracking-tight">
                {sofa.name} <span className="italic font-light">{sofa.type}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="display text-2xl text-taupe italic">
                {sofa.tagline}
              </p>
              <p className="body-copy text-brown mt-4">
                {sofa.description}
              </p>
            </Reveal>

            <Reveal delay={0.3} className="space-y-6 pt-4 border-t border-charcoal/10">
              <div className="flex items-baseline gap-4">
                <span className="meta text-taupe">Valuation</span>
                <span className="text-2xl font-light text-charcoal">{sofa.price}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to={`/product/${sofa.id}`}
                  data-cursor="DISCOVER"
                  className="btn-solid meta tracking-[0.2em] w-fit"
                >
                  Explore Luna
                  <ArrowUpRight className="arrow h-4 w-4" />
                </Link>

                <Link
                  to="/collection/living"
                  className="u-link meta text-charcoal w-fit sm:self-center"
                >
                  View Living Series
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
