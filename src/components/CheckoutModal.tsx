import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Check, ShieldCheck, Truck, Sparkles, CreditCard, Building2, Download } from 'lucide-react'
import { useCart } from '../context/CartContext'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details')
  const [orderRef, setOrderRef] = useState('')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '•••',
  })

  if (!isOpen) return null

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStep('payment')
  }

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault()
    const generatedRef = `MA-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderRef(generatedRef)
    setStep('confirmed')
    clearCart()
  }

  const handleClose = () => {
    setStep('details')
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-ivory text-charcoal border border-charcoal/15 shadow-2xl p-6 sm:p-10 my-8 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-6 right-6 text-charcoal/60 hover:text-charcoal transition-colors p-2"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {step === 'details' && (
            <div>
              <div className="mb-8">
                <span className="meta text-taupe">Comfort Haven Acquisition Process · Step 01</span>
                <h2 className="display text-3xl sm:text-4xl text-charcoal mt-1">
                  Private Client & Logistics Details
                </h2>
                <p className="text-sm text-brown mt-2">
                  Please provide your delivery destination. Every piece is handled with white-glove inside installation.
                </p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="meta text-stone block mb-2">First Name *</label>
                    <input
                      required
                      type="text"
                      className="field"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="meta text-stone block mb-2">Last Name *</label>
                    <input
                      required
                      type="text"
                      className="field"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="meta text-stone block mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      className="field"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="meta text-stone block mb-2">Telephone *</label>
                    <input
                      required
                      type="tel"
                      className="field"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="meta text-stone block mb-2">Street Address & Residence *</label>
                  <input
                    required
                    type="text"
                    className="field"
                    placeholder="House No. 12, Street 4, Block B"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="grid sm:grid-cols-1 gap-6">
                  <div>
                    <label className="meta text-stone block mb-2">City *</label>
                    <input
                      required
                      type="text"
                      className="field"
                      placeholder="Rawalpindi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                {/* Subtotal notice */}
                <div className="p-4 bg-sand/30 border border-charcoal/10 flex items-center justify-between mt-6">
                  <div>
                    <span className="meta text-stone">Total Acquisition</span>
                    <p className="text-xl font-light text-charcoal">
                      Rs {subtotal.toLocaleString()}
                    </p>
                  </div>
                  <span className="meta text-stone">White-Glove Delivery Included</span>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-charcoal/10">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="meta text-stone hover:text-charcoal px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-solid meta tracking-[0.2em]"
                  >
                    Continue to Settlement →
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'payment' && (
            <div>
              <div className="mb-8">
                <span className="meta text-taupe">Comfort Haven Acquisition Process · Step 02</span>
                <h2 className="display text-3xl sm:text-4xl text-charcoal mt-1">
                  Settlement & Verification
                </h2>
                <p className="text-sm text-brown mt-2">
                  Acquiring {items.length} bespoke {items.length === 1 ? 'piece' : 'pieces'} with full authenticity documentation.
                </p>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-6">


                {/* Items Summary in Modal */}
                <div className="border-t border-charcoal/10 pt-4 space-y-3">
                  <p className="meta text-stone">Pieces in this Commission:</p>
                  <div className="max-h-36 overflow-y-auto space-y-2 pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="font-display text-charcoal">
                          {item.product.name} ({item.finish}) × {item.quantity}
                        </span>
                        <span className="font-mono text-stone">{item.product.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-charcoal/10">
                    <span className="font-display text-lg text-charcoal">Total Amount</span>
                    <span className="text-2xl font-light text-charcoal">Rs {subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-stone">
                  <ShieldCheck className="h-4 w-4 text-brown shrink-0" />
                  <span>Complimentary certificate of artisan authenticity & 10-year structural warranty included.</span>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-charcoal/10">
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="meta text-stone hover:text-charcoal"
                  >
                    ← Edit Address
                  </button>
                  <button
                    type="submit"
                    className="btn-solid meta tracking-[0.2em]"
                  >
                    Confirm Commission Acquisition
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-6">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-sand/60 text-charcoal mx-auto">
                <Check className="h-10 w-10" strokeWidth={1.5} />
              </div>

              <div>
                <span className="meta text-taupe">Order Confirmed</span>
                <h2 className="display text-4xl sm:text-5xl text-charcoal mt-1">
                  Order Placed.
                </h2>
                <p className="meta text-stone mt-3 tracking-widest">
                  Reference: <span className="text-charcoal font-bold">{orderRef}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto text-brown text-sm leading-relaxed space-y-3 p-6 bg-sand/20 border border-charcoal/10">
                <p>
                  Thank you, <strong>{formData.firstName || 'Customer'}</strong>. Your order has been received and is being processed.
                </p>
                <p className="text-xs text-stone">
                  A confirmation email has been sent to <strong>{formData.email}</strong>. Our team will get in touch with you within 24 hours regarding your delivery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="meta flex items-center gap-2 text-stone hover:text-charcoal py-3 px-6 border border-charcoal/15 hover:border-charcoal transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Print Commission Receipt
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-solid meta tracking-[0.2em]"
                >
                  Return to Comfort Haven
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
