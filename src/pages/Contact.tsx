import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Reveal, LineReveal } from '../components/MotionComponents'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Private Residence',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="bg-ivory pt-28 md:pt-40 pb-32">
      <div className="wrap">
        {/* Editorial Header */}
        <div className="max-w-4xl space-y-6 mb-20 md:mb-28">
          <span className="meta text-taupe">Private Inquiries & Appointments</span>
          <LineReveal
            lines={[
              <h1 key="1" className="display hero-title text-charcoal">
                Begin A
              </h1>,
              <h1 key="2" className="display hero-title italic font-light text-charcoal/90 -mt-2 md:-mt-6">
                Conversation.
              </h1>,
            ]}
          />
          <p className="body-copy text-brown">
            Whether inquiring about a specific edition, commissioning custom dimensions, or scheduling a private viewing at our Milan gallery.
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Showroom & Comfort Haven Information */}
          <div className="lg:col-span-5 space-y-12">
            <Reveal>
              <div className="space-y-3 pb-8 border-b border-charcoal/10">
                <span className="meta text-stone">Milan Flagship Gallery</span>
                <p className="font-display text-2xl text-charcoal">14 Via della Spiga</p>
                <p className="text-sm font-light text-brown">20121 Milano, Italy</p>
                <p className="meta text-taupe text-xs mt-2">Open Tuesday – Saturday, 10:00 – 19:00</p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-3 pb-8 border-b border-charcoal/10">
                <span className="meta text-stone">Direct Correspondence</span>
                <p className="font-display text-2xl text-charcoal">concierge@comforthaven.design</p>
                <p className="text-sm font-mono text-brown">+39 02 8901 4420</p>
                <p className="meta text-taupe text-xs mt-2">Private Client Advisors on standby</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-3">
                <span className="meta text-stone">Worldwide Logistics</span>
                <p className="body-copy text-brown text-sm">
                  White-glove climate-controlled delivery available globally to London, Paris, New York, Zurich, Dubai, and Tokyo.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Luxury Minimal Form */}
          <div className="lg:col-span-7 bg-ivory-light p-8 md:p-14 border border-charcoal/10">
            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-sand text-charcoal">
                  <Check className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="display text-3xl md:text-4xl text-charcoal">
                  Inquiry Received.
                </h3>
                <p className="body-copy text-brown mx-auto">
                  A personal client director will respond to your correspondence within 12 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="meta underline text-taupe hover:text-charcoal pt-4"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <span className="meta text-stone block mb-2">01 · Personal Information</span>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="field"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="field"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <span className="meta text-stone block mb-3">02 · Nature of Inquiry</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Private Residence', 'Architect / Trade', 'Gallery Visit', 'Bespoke Size', 'Contract Order', 'Press'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setFormData({ ...formData, projectType: type })}
                        className={`py-3 px-4 text-xs tracking-wider uppercase border transition-all text-center ${
                          formData.projectType === type
                            ? 'bg-charcoal text-ivory border-charcoal'
                            : 'bg-transparent text-charcoal/70 border-charcoal/15 hover:border-charcoal/40'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="meta text-stone block mb-2">03 · Spatial Details / Pieces of Interest</span>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your space, pieces of interest, or timeline…"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="field resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="meta text-stone text-xs hidden sm:inline">Strict Confidentiality Assured</span>
                  <button
                    type="submit"
                    data-cursor="SUBMIT"
                    className="btn-solid meta tracking-[0.2em]"
                  >
                    Transmit Inquiry
                    <ArrowUpRight className="arrow h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
