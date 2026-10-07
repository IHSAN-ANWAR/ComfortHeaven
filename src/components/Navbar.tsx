import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Search, X, ShoppingBag, Heart } from 'lucide-react'
import { products, categories } from '../data/products'
import { EASE } from './MotionComponents'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/collection', label: 'Collection' },
  { to: '/collection/living', label: 'Living' },
  { to: '/collection/bedroom', label: 'Bedroom' },
  { to: '/collection/dining', label: 'Dining' },
  { to: '/about', label: 'About' },
  { to: '/journal', label: 'Journal' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState(false)
  const [q, setQ] = useState('')
  const loc = useLocation()
  const nav = useNavigate()
  const { totalItems, wishlist, openCart, openWishlist } = useCart()

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => { setMenu(false); setSearch(false); setQ('') }, [loc.pathname])

  useEffect(() => {
    document.body.style.overflow = menu || search ? 'hidden' : ''
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); setSearch(false) } }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [menu, search])

  const results = q.trim()
    ? products.filter((p) => `${p.name} ${p.type} ${p.category}`.toLowerCase().includes(q.toLowerCase()))
    : products.slice(0, 4)

  const overlayOpen = menu || search

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-[900ms] ${
          scrolled && !overlayOpen ? 'bg-ivory/80 backdrop-blur-xl py-4 border-b border-charcoal/5 shadow-xs' : 'bg-transparent py-6 md:py-8'
        } ${overlayOpen ? 'text-ivory' : 'text-charcoal'}`}
      >
        <nav aria-label="Primary" className="wrap flex items-center justify-between">
          <Link to="/" aria-label="Comfort Haven — home" className="relative z-10 font-display text-xl tracking-[0.32em] uppercase md:text-2xl">
            Comfort<span className="font-light italic tracking-[0.1em] opacity-70"> Haven</span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex xl:gap-12">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/collection'}
                  className={({ isActive }) =>
                    `meta u-link !pb-1 transition-opacity duration-500 ${isActive ? 'opacity-100 after:!scale-x-100' : 'opacity-70 hover:opacity-100'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-5 md:gap-7">
            {/* Search Button */}
            <button
              type="button" aria-label="Search" onClick={() => { setSearch((s) => !s); setMenu(false) }}
              className="meta flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
            >
              {search ? <X className="h-4 w-4" strokeWidth={1.2} /> : <Search className="h-4 w-4" strokeWidth={1.2} />}
              <span className="hidden sm:inline">{search ? 'Close' : 'Search'}</span>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={openWishlist}
              aria-label="Private Curations"
              className="relative meta flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
            >
              <Heart className="h-4 w-4" strokeWidth={1.2} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-charcoal text-[0.6rem] font-mono text-ivory">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart / Bag Button */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Comfort Haven Bag"
              className="relative meta flex items-center gap-2 opacity-80 transition-opacity hover:opacity-100"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.2} />
              <span className="hidden sm:inline">Bag</span>
              {totalItems > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-charcoal text-[0.6rem] font-mono text-ivory">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile / Full Menu toggle */}
            <button
              type="button" aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}
              onClick={() => { setMenu((m) => !m); setSearch(false) }}
              className="meta flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100"
            >
              <span className="relative block h-2.5 w-6">
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-700 ${menu ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-700 ${menu ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
              </span>
              <span className="hidden sm:inline">{menu ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {menu && (
          <motion.div
            key="menu" role="dialog" aria-label="Site menu"
            className="fixed inset-0 z-30 flex flex-col justify-center bg-ink text-ivory"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="wrap grid gap-12 md:grid-cols-[1.4fr_1fr] md:items-end">
              <ul className="space-y-2 md:space-y-3">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/collection', label: 'Collection' },
                  { to: '/about', label: 'About' },
                  { to: '/journal', label: 'Journal' },
                  { to: '/contact', label: 'Contact' }
                ].map((l, i) => (
                  <li key={l.to} className="overflow-hidden">
                    <motion.div initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: EASE }}>
                      <Link to={l.to} className="display block text-[clamp(2.8rem,7vw,6rem)] opacity-90 transition-all duration-700 hover:translate-x-4 hover:italic hover:opacity-100">
                        {l.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 1 }} className="space-y-8 pb-3">
                <p className="meta opacity-50">Rooms & Suites</p>
                <ul className="space-y-3">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <Link to={`/collection/${c.slug}`} className="display text-3xl opacity-70 transition-opacity hover:opacity-100">{c.label}</Link>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-ivory/10 space-y-1">
                  <p className="meta opacity-40">Milan Flagship · 14 Via della Spiga</p>
                  <p className="text-xs text-ivory/40">Appointments Tuesday through Saturday</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {search && (
          <motion.div
            key="search" role="dialog" aria-label="Search products"
            className="fixed inset-0 z-30 overflow-y-auto bg-ink pt-32 text-ivory"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="wrap mx-auto max-w-5xl pb-20">
              <form onSubmit={(e) => { e.preventDefault(); if (results[0]) nav(`/product/${results[0].id}`) }}>
                <label htmlFor="site-search" className="meta opacity-50">Search the collection</label>
                <input
                  id="site-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)}
                  placeholder="Sofa, bed, oak, travertine…" autoComplete="off"
                  className="display mt-4 w-full border-0 border-b border-ivory/20 bg-transparent pb-5 text-[clamp(2.4rem,6vw,5rem)] text-ivory placeholder:text-ivory/25 focus:border-ivory/60 focus:outline-none"
                />
              </form>
              <ul className="mt-12 grid gap-px sm:grid-cols-2">
                {results.length === 0 && <li className="meta opacity-50">No pieces found matching "{q}".</li>}
                {results.map((p) => (
                  <li key={p.id}>
                    <Link to={`/product/${p.id}`} className="group flex items-center gap-6 py-4">
                      <img src={p.image} alt="" className="h-20 w-28 object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100 bg-sand" />
                      <span>
                        <span className="display block text-3xl transition-transform duration-700 group-hover:translate-x-2">{p.name}</span>
                        <span className="meta opacity-50">{p.type} · {p.price}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
