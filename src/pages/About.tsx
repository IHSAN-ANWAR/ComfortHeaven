import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, LineReveal, ProductImage } from '../components/MotionComponents'
import craftImg from '../assets/craft.jpg'
import interiorImg from '../assets/interior.jpg'

export default function About() {
  return (
    <main className="bg-ivory pt-28 md:pt-40 pb-32">
      {/* Editorial Hero */}
      <section className="wrap mb-24 md:mb-36">
        <div className="max-w-4xl space-y-6">
          <span className="meta text-taupe">The Comfort Haven Story</span>
          <LineReveal
            lines={[
              <h1 key="1" className="display hero-title text-charcoal">
                Designed With
              </h1>,
              <h1 key="2" className="display hero-title italic font-light text-charcoal/90 -mt-2 md:-mt-6">
                Intention.
              </h1>,
            ]}
          />
          <p className="text-2xl font-display text-taupe leading-relaxed mt-6">
            We exist at the intersection of sculpture and domestic life. Creating objects that quiet the room and anchor the soul.
          </p>
        </div>
      </section>

      {/* Atmospheric Interior Monument */}
      <div className="wrap mb-28 md:mb-40">
        <ProductImage
          src={interiorImg}
          alt="Architectural space designed with Comfort Haven pieces"
          aspect="aspect-[16/9] md:aspect-[21/9]"
          cursor="MILAN SPACE"
          className="shadow-2xl shadow-charcoal/10"
        />
      </div>

      {/* Philosophy & Craftsmanship Section */}
      <section className="wrap py-16 border-t border-charcoal/10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-6">
            <span className="meta text-stone">01 · Philosophy</span>
            <h2 className="display text-4xl sm:text-5xl text-charcoal">
              Form as Sanctuary
            </h2>
            <p className="body-copy text-brown">
              In an era dominated by rapid turnover and temporary aesthetics, Comfort Haven produces enduring heirlooms. We build furniture that develops a patina of time rather than showing wear.
            </p>
            <p className="body-copy text-brown">
              Every profile is conceived in dialogue with architectural principles: scale, weight, tactile honesty, and negative space.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-12">
            <div className="p-8 md:p-12 bg-ivory-light border border-charcoal/10 space-y-4">
              <span className="meta text-taupe">Pillars of Execution</span>
              <div className="grid sm:grid-cols-2 gap-8 pt-6 border-t border-charcoal/10">
                <div>
                  <h3 className="display text-2xl text-charcoal">Material Authenticity</h3>
                  <p className="text-sm font-light text-brown mt-2 leading-relaxed">
                    No artificial veneers or simulated grains. Only raw unbleached wool, solid oak plinths, and natural travertine stone.
                  </p>
                </div>
                <div>
                  <h3 className="display text-2xl text-charcoal">Structural Integrity</h3>
                  <p className="text-sm font-light text-brown mt-2 leading-relaxed">
                    Centuries-old mortise-and-tenon joints engineered alongside computerized tolerance testing for lifelong durability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Workshop Split */}
      <section className="wrap py-24 border-t border-charcoal/10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <ProductImage
              src={craftImg}
              alt="Artisan sewing in the Milan workshop"
              aspect="aspect-[16/11]"
              cursor="WORKSHOP"
              className="shadow-xl shadow-charcoal/5"
            />
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <span className="meta text-stone">02 · The Workshops</span>
            <h2 className="display text-4xl sm:text-5xl text-charcoal">
              Hands of Master Guilds
            </h2>
            <p className="body-copy text-brown">
              Our partners are third-generation joineries in Lombardy and stone carvers in Tuscany. They work unhurried, holding every curve to millimetric precision.
            </p>
            <div className="pt-4 border-t border-charcoal/10">
              <span className="meta text-taupe block">Environmental Responsibility</span>
              <p className="body-copy text-brown text-sm mt-1">
                Zero formaldehyde emissions, FSC certified timber, and 100% recyclable shipping crates designed for lifetime relocations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="wrap py-28 text-center border-t border-charcoal/10">
        <div className="max-w-2xl mx-auto space-y-8">
          <span className="meta text-taupe">Continue The Journey</span>
          <h2 className="display text-4xl sm:text-5xl text-charcoal">
            Browse The Complete Series
          </h2>
          <div className="flex justify-center gap-6 pt-4">
            <Link to="/collection" className="btn-solid meta tracking-[0.2em]">
              Explore Collection
              <ArrowUpRight className="arrow h-4 w-4" />
            </Link>
            <Link to="/contact" className="u-link meta text-charcoal self-center">
              Visit The Gallery
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
