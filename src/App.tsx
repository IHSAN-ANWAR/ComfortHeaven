import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import Cursor from './components/Cursor' // disabled: custom cursor was causing site slowdown
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetail from './pages/Product'
import About from './pages/About'
import Contact from './pages/Contact'
import Journal from './pages/Journal'

// Smooth scroll to top on every navigation
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Page transition container
function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:category" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        {/* Luxury custom cursor on fine pointers — disabled: was causing site slowdown */}
        {/* <Cursor /> */}
        {/* Editorial Navigation */}
        <Navbar />
        {/* Slide-out Comfort Haven Bag & Wishlist Drawer */}
        <CartDrawer />
        {/* Luxury Toast Notification System */}
        <Toast />
        {/* Routed Pages with transitions */}
        <AnimatedRoutes />
        {/* Luxury Minimal Footer */}
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}
