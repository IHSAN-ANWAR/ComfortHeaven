import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Hero from '../components/Hero'
import BrandStatement from '../components/BrandStatement'
import FeaturedProduct from '../components/FeaturedProduct'
import ProductShowcase from '../components/ProductShowcase'
import CraftSection from '../components/CraftSection'
import { Reveal, LineReveal } from '../components/MotionComponents'

export default function Home() {
  return (
    <main>
      {/* 01: Full Screen Cinematic Hero */}
      <Hero />

      {/* 02: Brand Statement Line-by-Line */}
      <BrandStatement />

      {/* 03: Featured Product Split Architectural View */}
      <FeaturedProduct />

      {/* 08: Signature Experience One-by-One Showcase */}
      <ProductShowcase />

      {/* Craftsmanship & Interior Atmosphere */}
      <CraftSection />

      {/* Private Consultation & Comfort Haven Visit Invitation */}
      <section className="py-28 md:py-40 bg-sand/30 border-t border-charcoal/10">
        <div className="wrap max-w-4xl mx-auto text-center space-y-8">
          <Reveal>
            <span className="meta text-taupe">Private Viewing · Milan Showroom</span>
            <LineReveal
              lines={[
                <h2 key="1" className="display section-title text-charcoal mt-2">
                  Experience The Forms In Person.
                </h2>,
              ]}
            />
          </Reveal>

          <Reveal delay={0.2}>
            <p className="body-copy text-brown mx-auto">
              Our flagship gallery on Via della Spiga hosts private appointments with interior consultants and material curators.
            </p>
          </Reveal>

          <Reveal delay={0.35} className="pt-4 flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/contact"
              data-cursor="RESERVE"
              className="btn-solid meta tracking-[0.2em]"
            >
              Request Private Appointment
              <ArrowUpRight className="arrow h-4 w-4" />
            </Link>
            <Link
              to="/collection"
              className="u-link meta text-charcoal"
            >
              Browse Complete Catalog
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
