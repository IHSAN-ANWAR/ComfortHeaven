import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'
import { Reveal, LineReveal, ProductImage } from '../components/MotionComponents'
import craftImg from '../assets/craft.jpg'
import interiorImg from '../assets/interior.jpg'
import formaImg from '../assets/forma.jpg'
import lunaImg from '../assets/luna.jpg'

interface Article {
  id: string
  title: string
  subtitle: string
  category: string
  date: string
  readTime: string
  image: string
  excerpt: string
  paragraphs: string[]
}

const articles: Article[] = [
  {
    id: 'architecture-of-stillness',
    title: 'The Architecture of Stillness',
    subtitle: 'Why contemporary living demands heavier, grounded domestic forms.',
    category: 'Spatial Philosophy',
    date: 'October 2026',
    readTime: '6 min read',
    image: interiorImg,
    excerpt: 'In an era of visual overstimulation, furniture cannot merely provide utility. It must provide gravitational weight—a quiet anchor against the digital rush.',
    paragraphs: [
      'We often consider interior space as an emptiness to be organized. But in classical Milanese and Kyoto traditions, emptiness (or ma) is the very medium of living. The objects we choose to populate this void must speak with restraint.',
      'When designing our Luna sofa and Forma table, our chief question was not "what can we add?" but "how much can we subtract before the soul of the silhouette dissipates?" The answer lies in architectural proportion.',
      'A piece of furniture should settle into the floorboards as though it were quarried from the room itself. When light rakes across textured Belgian linen or honed travertine, it does not distract; it deepens the room’s silence.',
    ],
  },
  {
    id: 'travertine-geology',
    title: 'Geology in the Living Room',
    subtitle: 'Extracting and hand-honing porous Italian travertine in Tivoli.',
    category: 'Materiality',
    date: 'September 2026',
    readTime: '4 min read',
    image: formaImg,
    excerpt: 'Travertine is not manufactured; it is deposited over millenia by geothermal mineral springs. Each tabletop carries its own fossilized history.',
    paragraphs: [
      'Our stone masters journey to the Roman quarries outside Tivoli to hand-select blocks that show gentle sediment veining without structural fissures. No filler resins are permitted; the open pores remain as proof of origin.',
      'The carving of the pedestal requires three full days of lathe work followed by multi-stage diamond water-honing. The result is a matte, silky tactile finish that invites touch.',
      'Unlike polished marble which glares under ceiling downlights, natural honed travertine drinks in the light and returns it as a soft, warm aura.',
    ],
  },
  {
    id: 'anatomy-of-22-hours',
    title: 'The Anatomy of 22 Hours',
    subtitle: 'The unhurried craft of single-artisan bouclé tailoring in Lombardy.',
    category: 'Comfort Haven Craft',
    date: 'August 2026',
    readTime: '5 min read',
    image: craftImg,
    excerpt: 'Why mass production cannot replicate the tension of a hand-pulled curve. Inside our workshop 40 kilometers north of Milan.',
    paragraphs: [
      'Industrial upholstery uses pneumatic staples and pre-cut foam templates that take twenty minutes per chair. In our workshop, each internal beech framework is hand-lashed with jute webbing and eight-way hand-tied springs.',
      'The dense bouclé wool must be stretched over continuous convex geometry without puckering or pattern distortion. This requires intuition developed over decades.',
      'A single master craftsman takes personal ownership of each piece from the raw timber armature to the final blind-stitched hem.',
    ],
  },
  {
    id: 'sculpting-the-curve',
    title: 'Sculpting the Continuous Gesture',
    subtitle: 'From clay maquette to architectural living room centerpiece.',
    category: 'Design Notes',
    date: 'July 2026',
    readTime: '5 min read',
    image: lunaImg,
    excerpt: 'How one continuous line became the silhouette of the Luna collection. An exploration into ergonomic sculpture.',
    paragraphs: [
      'A chair or sofa is an intimate piece of architecture: it is the only building you wear against your spine. To balance dramatic silhouette with effortless ergonomic support requires endless iterations in plaster and wood.',
      'By lifting the curved profile on a recessed oak plinth, the form appears to hover slightly above the floorboards, creating an illusion of lightness despite its substantial physical presence.',
    ],
  },
]

export default function Journal() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  return (
    <main className="bg-ivory pt-28 md:pt-40 pb-32">
      <div className="wrap">
        {selectedArticle ? (
          /* Article Full View */
          <article className="max-w-4xl mx-auto space-y-12">
            <button
              onClick={() => setSelectedArticle(null)}
              className="meta flex items-center gap-2 text-stone hover:text-charcoal transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Comfort Haven Journal</span>
            </button>

            <div className="space-y-4">
              <span className="meta text-taupe">{selectedArticle.category} · {selectedArticle.date} · {selectedArticle.readTime}</span>
              <h1 className="display text-4xl sm:text-6xl text-charcoal leading-tight">
                {selectedArticle.title}
              </h1>
              <p className="display text-2xl text-taupe italic">
                {selectedArticle.subtitle}
              </p>
            </div>

            <div className="my-10">
              <ProductImage
                src={selectedArticle.image}
                alt={selectedArticle.title}
                aspect="aspect-[16/10]"
                className="shadow-2xl shadow-charcoal/10"
              />
            </div>

            <div className="space-y-6 pt-4 text-brown leading-relaxed text-lg font-light max-w-2xl">
              <p className="font-display text-2xl text-charcoal leading-relaxed font-normal italic border-l-2 border-charcoal/20 pl-6 py-2 my-8">
                “{selectedArticle.excerpt}”
              </p>
              {selectedArticle.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-16 border-t border-charcoal/10 flex justify-between items-center">
              <button
                onClick={() => setSelectedArticle(null)}
                className="meta text-taupe hover:text-charcoal underline"
              >
                ← Return to Journal Overview
              </button>
              <Link to="/collection" className="btn-solid meta">
                Explore The Collection
              </Link>
            </div>
          </article>
        ) : (
          /* Journal Index */
          <>
            <div className="max-w-4xl space-y-6 mb-20 md:mb-28">
              <span className="meta text-taupe">Publications & Essays</span>
              <LineReveal
                lines={[
                  <h1 key="1" className="display hero-title text-charcoal">
                    Comfort Haven
                  </h1>,
                  <h1 key="2" className="display hero-title italic font-light text-charcoal/90 -mt-2 md:-mt-6">
                    Journal.
                  </h1>,
                ]}
              />
              <p className="body-copy text-brown">
                Reflections on modern spatial philosophy, historic stone quarrying, slow joinery, and the intentional home.
              </p>
            </div>

            {/* Articles Grid */}
            <div className="space-y-24 md:space-y-36">
              {articles.map((art, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <article
                    key={art.id}
                    className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center border-b border-charcoal/10 pb-20"
                  >
                    <div
                      className={`lg:col-span-7 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(art)}
                        className="w-full text-left cursor-pointer"
                        data-cursor="READ ESSAY"
                      >
                        <ProductImage
                          src={art.image}
                          alt={art.title}
                          aspect="aspect-[16/10]"
                          className="shadow-xl shadow-charcoal/5"
                        />
                      </button>
                    </div>

                    <div
                      className={`lg:col-span-5 space-y-6 ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <Reveal>
                        <span className="meta text-stone">{art.category} · {art.readTime}</span>
                        <h2 className="display text-3xl sm:text-4xl text-charcoal mt-2">
                          {art.title}
                        </h2>
                      </Reveal>

                      <Reveal delay={0.15}>
                        <p className="display text-xl text-taupe italic">
                          {art.subtitle}
                        </p>
                        <p className="body-copy text-brown mt-4">
                          {art.excerpt}
                        </p>
                      </Reveal>

                      <Reveal delay={0.3} className="pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedArticle(art)}
                          className="u-link meta text-charcoal"
                        >
                          Read Full Essay
                          <ArrowUpRight className="arrow h-4 w-4" />
                        </button>
                      </Reveal>
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
