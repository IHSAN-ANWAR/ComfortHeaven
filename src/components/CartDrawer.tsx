import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Plus, Minus, Trash2, ArrowUpRight, ShoppingBag, Heart, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import CheckoutModal from './CheckoutModal'

export default function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    isWishlistOpen,
    closeWishlist,
    wishlist,
    toggleWishlist,
    addToCart,
  } = useCart()

  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const activeDrawer = isCartOpen ? 'cart' : isWishlistOpen ? 'wishlist' : null

  const handleClose = () => {
    closeCart()
    closeWishlist()
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <>
      <AnimatePresence>
        {activeDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-screen max-w-md bg-ivory text-charcoal border-l border-charcoal/15 shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-charcoal/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {activeDrawer === 'cart' ? (
                      <ShoppingBag className="h-5 w-5 text-charcoal" />
                    ) : (
                      <Heart className="h-5 w-5 text-charcoal" />
                    )}
                    <h2 className="display text-2xl text-charcoal">
                      {activeDrawer === 'cart' ? (
                        <>Comfort Haven Bag <span className="text-base text-taupe font-mono">({totalItems})</span></>
                      ) : (
                        <>Private Curations <span className="text-base text-taupe font-mono">({wishlist.length})</span></>
                      )}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-2 text-stone hover:text-charcoal transition-colors"
                    aria-label="Close panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                  {activeDrawer === 'cart' ? (
                    items.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                        <ShoppingBag className="h-12 w-12 text-stone/40 stroke-1" />
                        <p className="display text-2xl text-taupe">Your Comfort Haven Bag is currently empty</p>
                        <p className="text-sm text-brown max-w-xs">
                          Explore our signature catalog and reserve sculptural pieces for your residence.
                        </p>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="btn-solid meta mt-4"
                        >
                          <Link to="/collection" className="text-ivory">Explore Pieces</Link>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 pb-6 border-b border-charcoal/10 items-start"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-24 w-24 object-cover bg-sand shrink-0 shadow-sm"
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-start">
                                <Link
                                  to={`/product/${item.product.id}`}
                                  onClick={handleClose}
                                  className="display text-xl text-charcoal hover:underline"
                                >
                                  {item.product.name}
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-stone hover:text-charcoal transition-colors p-1"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <p className="meta text-taupe text-[0.65rem]">{item.finish}</p>
                              <p className="font-light text-charcoal">{item.product.price}</p>

                              {/* Quantity Stepper */}
                              <div className="flex items-center gap-3 pt-2">
                                <div className="inline-flex items-center border border-charcoal/20">
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1.5 hover:bg-sand/40 text-charcoal transition-colors"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="font-mono text-xs px-3">{item.quantity}</span>
                                  <button
                                    type="button"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1.5 hover:bg-sand/40 text-charcoal transition-colors"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    /* Wishlist View */
                    wishlistProducts.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                        <Heart className="h-12 w-12 text-stone/40 stroke-1" />
                        <p className="display text-2xl text-taupe">No pieces saved yet</p>
                        <p className="text-sm text-brown max-w-xs">
                          Click the heart icon on any piece across our collection to curate your wishlist.
                        </p>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="btn-solid meta mt-4"
                        >
                          <Link to="/collection" className="text-ivory">Browse Collection</Link>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {wishlistProducts.map((p) => (
                          <div
                            key={p.id}
                            className="flex gap-4 pb-6 border-b border-charcoal/10 items-center"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-20 w-24 object-cover bg-sand shrink-0"
                            />
                            <div className="flex-1 space-y-1">
                              <Link
                                to={`/product/${p.id}`}
                                onClick={handleClose}
                                className="display text-lg text-charcoal hover:underline block"
                              >
                                {p.name}
                              </Link>
                              <p className="meta text-stone text-[0.65rem]">{p.type} · {p.price}</p>
                              <div className="flex items-center gap-3 pt-1">
                                <button
                                  type="button"
                                  onClick={() => addToCart(p)}
                                  className="meta text-[0.65rem] text-charcoal underline"
                                >
                                  Move to Bag
                                </button>
                                <button
                                  type="button"
                                  onClick={() => toggleWishlist(p.id)}
                                  className="meta text-[0.65rem] text-stone hover:text-charcoal"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>

                {/* Footer / Acquisition Action */}
                {activeDrawer === 'cart' && items.length > 0 && (
                  <div className="p-6 md:p-8 bg-ivory-light border-t border-charcoal/10 space-y-4">
                    <div className="flex items-center gap-2 text-stone text-xs">
                      <ShieldCheck className="h-4 w-4 text-brown shrink-0" />
                      <span>Complimentary White-Glove Installation Included</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-2 border-t border-charcoal/10">
                      <div>
                        <span className="meta text-taupe block">Subtotal</span>
                        <span className="text-xs text-stone">Taxes calculated at settlement</span>
                      </div>
                      <span className="text-2xl font-light text-charcoal">
                        ${subtotal.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleClose()
                        setCheckoutOpen(true)
                      }}
                      className="btn-solid meta tracking-[0.2em] w-full justify-center"
                    >
                      Acquire Commission
                      <ArrowUpRight className="arrow h-4 w-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}
