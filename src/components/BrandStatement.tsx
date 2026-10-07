import { LineReveal, Reveal } from './MotionComponents'

export default function BrandStatement() {
  return (
    <section className="relative py-32 md:py-48 bg-ivory-light border-y border-charcoal/5 overflow-hidden">
      <div className="wrap max-w-6xl mx-auto">
        <div className="meta text-taupe mb-8 tracking-[0.3em]">
          Brand Philosophy · 01
        </div>

        <div className="my-6">
          <LineReveal
            lines={[
              <span key="1" className="display statement block text-charcoal">
                “We believe furniture should not
              </span>,
              <span key="2" className="display statement block italic text-charcoal/80">
                simply fill a room.
              </span>,
              <span key="3" className="display statement block font-normal text-charcoal">
                It should define it.”
              </span>,
            ]}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-16 md:mt-24 pt-12 border-t border-charcoal/10 items-end">
          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl font-display text-charcoal/90 leading-relaxed">
              Every curve is considered. Every joint is an architectural conversation between natural raw timber, soft bouclé, and quiet stone.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="md:text-right">
            <span className="meta text-stone block">Comfort Haven Studio · Milan</span>
            <span className="meta text-charcoal block mt-1">Master Joinery & Upholstery</span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
