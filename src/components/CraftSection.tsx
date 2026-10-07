import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, LineReveal, ProductImage } from './MotionComponents'
import craftImg from '../assets/craft.jpg'
import interiorImg from '../assets/interior.jpg'

export default function CraftSection() {
  return (
    <section className="relative py-28 md:py-44 bg-ivory overflow-hidden">
      <div className="wrap">
        {/* Full-width Interior Atmosphere Banner */}
        <div className="mb-24 md:mb-36">
          <div className="meta text-stone mb-4">Spatial Experience · Private Villa</div>
          <ProductImage
            src={interiorImg}
            alt="Minimalist Architectural Interior with Curated Furniture"
            aspect="aspect-[16/9] md:aspect-[21/9]"
            parallax={8}
            cursor="VIEW INTERIOR"
            className="shadow-2xl shadow-charcoal/10"
          />
        </div>

        {/* Craftsmanship Editorial Split */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Artisan workshop image */}
          <div className="lg:col-span-6">
            <ProductImage
              src={craftImg}
              alt="Artisan hand-stitching bouclé upholstery"
              aspect="aspect-[4/3] md:aspect-[5/4]"
              tilt={true}
              cursor="COMFORT HAVEN"
              className="shadow-xl shadow-charcoal/5"
            />
          </div>

          {/* Right: Craftsmanship details */}
          <div className="lg:col-span-6 space-y-8 lg:pl-8">
            <Reveal>
              <span className="meta text-stone">Craft & Materiality</span>
              <LineReveal
                lines={[
                  <h2 key="1" className="display text-4xl sm:text-5xl md:text-6xl text-charcoal mt-2">
                    Honoring the Hand.
                  </h2>,
                ]}
              />
            </Reveal>

            <Reveal delay={0.15}>
              <p className="display text-2xl text-taupe italic">
                “No industrial hurry. Only slow, deliberate human dedication.”
              </p>
              <p className="body-copy text-brown mt-4">
                In our workshop outside Milan, each silhouette is born from traditional joinery and unhurried hand tailoring. Solid European oak, sustainably harvested walnut, Italian travertine, and hand-spun bouclé wool are our singular vocabulary.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="pt-6 border-t border-charcoal/10 grid grid-cols-2 gap-8">
              <div>
                <span className="display text-3xl md:text-4xl text-charcoal block">22+</span>
                <span className="meta text-taupe mt-1 block">Hours per Upholstered Form</span>
              </div>
              <div>
                <span className="display text-3xl md:text-4xl text-charcoal block">100%</span>
                <span className="meta text-taupe mt-1 block">FSC Certified European Timber</span>
              </div>
            </Reveal>

            <Reveal delay={0.35} className="pt-4">
              <Link
                to="/about"
                data-cursor="OUR PHILOSOPHY"
                className="btn-solid meta tracking-[0.2em]"
              >
                Read Comfort Haven Story
                <ArrowUpRight className="arrow h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
