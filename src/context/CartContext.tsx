import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { Product } from '../data/products'

export interface CartItem {
  id: string // product id + finish key
  productId: string
  product: Product
  finish: string
  quantity: number
}

export interface ToastMessage {
  id: string
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  subtotal: number
  isCartOpen: boolean
  isWishlistOpen: boolean
  wishlist: string[]
  toasts: ToastMessage[]
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openWishlist: () => void
  closeWishlist: () => void
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  addToCart: (product: Product, finish?: string, quantity?: number) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  showToast: (title: string, description?: string, actionLabel?: string, onAction?: () => void) => void
  dismissToast: (id: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'comfort_haven_cart_v1'
const WISHLIST_STORAGE_KEY = 'comfort_haven_wishlist_v1'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist))
    } catch {
      // ignore
    }
  }, [wishlist])

  const showToast = (title: string, description?: string, actionLabel?: string, onAction?: () => void) => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    setToasts((prev) => [...prev, { id, title, description, actionLabel, onAction }])
    setTimeout(() => {
      dismissToast(id)
    }, 4500)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const addToCart = (product: Product, finish = 'Default Comfort Haven Finish', quantity = 1) => {
    const cartItemId = `${product.id}-${finish}`

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId)
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { id: cartItemId, productId: product.id, product, finish, quantity }]
    })

    showToast(
      `${product.name} Added to Comfort Haven Bag`,
      `${finish} · Qty ${quantity}`,
      'View Bag',
      () => setIsCartOpen(true)
    )
  }

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId))
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from Private Curations')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Saved to Private Curations', 'Access anytime from your wishlist')
        return [...prev, productId]
      }
    })
  }

  const isInWishlist = (productId: string) => wishlist.includes(productId)

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  // Calculate numeric subtotal from prices like "$2,499"
  const subtotal = items.reduce((acc, item) => {
    const numeric = parseInt(item.product.price.replace(/[^0-9]/g, ''), 10) || 0
    return acc + numeric * item.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isCartOpen,
        isWishlistOpen,
        wishlist,
        toasts,
        openCart: () => {
          setIsCartOpen(true)
          setIsWishlistOpen(false)
        },
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => {
          setIsCartOpen((prev) => !prev)
          setIsWishlistOpen(false)
        },
        openWishlist: () => {
          setIsWishlistOpen(true)
          setIsCartOpen(false)
        },
        closeWishlist: () => setIsWishlistOpen(false),
        toggleWishlist,
        isInWishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
