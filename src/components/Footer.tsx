import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { Reveal } from './MotionComponents'
import { useCart } from '../context/CartContext'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { showToast } = useCart()

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    showToast('Subscribed to Comfort Haven Gazette', 'Private edition previews dispatched seasonally')
  }

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      {/* Newsletter Bar */}
      <div className="wrap border-b border-ivory/10 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <span className="meta text-ivory/40">Private Gazette</span>
            <p className="display text-3xl md:text-4xl">Invitations to new editions & private viewings.</p>
          </div>
          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="flex items-center gap-3 text-ivory/80">
                <div className="h-8 w-8 rounded-full bg-ivory/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-ivory" />
                </div>
                <p className="font-display text-lg">Your address is registered for seasonal dispatches.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-4">
                <input
                  type="email"
                  required
                  placeholder="concierge@residence.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-ivory/30 pb-3 text-ivory placeholder:text-ivory/30 focus:border-ivory focus:outline-none font-sans text-sm"
                />
                <button
                  type="submit"
                  className="btn-solid !bg-ivory !text-ink meta tracking-[0.2em] shrink-0"
                >
                  Subscribe
                  <ArrowUpRight className="arrow h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="wrap grid gap-16 pb-12 pt-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:pt-24">
        <Reveal>
          <p className="display text-3xl md:text-4xl">Furniture for<br /><em>modern living.</em></p>
          <p className="mt-6 max-w-xs text-sm leading-7 text-ivory/50">
            Conceived in Milan. Handcrafted in small workshops across Northern Italy and Europe.
          </p>
          <div className="mt-6 pt-6 border-t border-ivory/10 flex items-center gap-6 text-ivory/40 meta text-[0.65rem]">
            <span>AD 100</span>
            <span>·</span>
            <span>Wallpaper* Design</span>
            <span>·</span>
            <span>Elle Decor</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="meta mb-6 text-ivory/40">Explore</p>
          <ul className="space-y-3">
            {[
              ['Collection', '/collection'],
              ['About Comfort Haven', '/about'],
              ['Journal & Essays', '/journal'],
              ['Private Inquiry', '/contact']
            ].map(([l, t]) => (
              <li key={l}>
                <Link to={t} className="u-link meta !pb-1 text-ivory/80 hover:text-ivory">{l}</Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="meta mb-6 text-ivory/40">Rooms</p>
          <ul className="space-y-3">
            {['Living', 'Bedroom', 'Dining', 'Objects'].map((l) => (
              <li key={l}>
                <Link to={`/collection/${l.toLowerCase()}`} className="u-link meta !pb-1 text-ivory/80 hover:text-ivory">{l}</Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="meta mb-6 text-ivory/40">Milan Flagship</p>
          <p className="text-sm text-ivory/70 leading-6">
            14 Via della Spiga<br />
            20121 Milano, Italy<br />
            <span className="font-mono text-xs text-ivory/40 mt-2 block">+39 02 8901 4420</span>
          </p>
          <ul className="space-y-2 mt-6">
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="u-link meta !pb-1 text-ivory/60 hover:text-ivory">Instagram</a></li>
            <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="u-link meta !pb-1 text-ivory/60 hover:text-ivory">Pinterest</a></li>
          </ul>
        </Reveal>
      </div>

      <div aria-hidden className="display wrap select-none whitespace-nowrap overflow-hidden text-center text-[clamp(1.6rem,8.5vw,16rem)] uppercase leading-[0.8] tracking-[0.04em] text-ivory/[0.07]">
        Comfort Haven
      </div>

      <div className="wrap flex flex-col justify-between gap-3 border-t border-ivory/10 py-8 text-ivory/40 sm:flex-row">
        <p className="meta">© 2026 Comfort Haven Milano · All Rights Reserved</p>
        <p className="meta">Privacy Policy · Terms of Commission · White-Glove Logistics</p>
      </div>
    </footer>
  )
}
