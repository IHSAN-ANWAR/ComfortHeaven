# Comfort Haven

A luxury furniture showcase site built with React, TypeScript, and Tailwind CSS. Features an editorial-style storefront with product browsing, a cart/wishlist system, and a checkout flow.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 6** — build tool and dev server
- **Tailwind CSS 4** — styling
- **React Router 6** — client-side routing
- **Motion** (Framer Motion) — animations
- **Lucide React** — icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/          Product and brand imagery
├── components/       Reusable UI components (Navbar, Footer, CartDrawer, CheckoutModal, etc.)
├── context/          React context providers (cart & wishlist state)
├── data/             Static product catalog (products.ts)
├── pages/            Route-level pages (Home, Collection, Product, About, Journal, Contact)
├── App.tsx           Root component and route definitions
├── main.tsx          Application entry point
└── index.css         Global styles and typography scale
```

## Pages

- **Home** — landing page with hero, featured product, and craft story sections
- **Collection** — full product catalog with room-based filtering
- **Product** — individual product detail page with cart/reserve actions
- **About** — brand story
- **Journal** — editorial articles on craftsmanship
- **Contact** — contact details and inquiry form

## Features

### Navigation Bar
**File:** `src/components/Navbar.tsx`
Fixed header that turns opaque with a blur effect after scrolling. Includes a logo link, main nav links (Collection, Living, Bedroom, Dining, About, Journal), a search button, a wishlist button (with item-count badge), a bag/cart button (with item-count badge), and a full-screen menu overlay with animated link reveals. The search button opens a full-screen overlay with a live-filtered product search (`src/data/products.ts`) that matches by name, type, or category.

### Footer
**File:** `src/components/Footer.tsx`
Site footer with a newsletter signup form, secondary navigation links, a large decorative brand wordmark, and copyright/legal text.

### Hero Section
**File:** `src/components/Hero.tsx`
Full-width introductory banner shown at the top of the Home page.

### Brand Statement Section
**File:** `src/components/BrandStatement.tsx`
Editorial text block on the Home page communicating the brand's positioning/story.

### Craft & Materials Section
**File:** `src/components/CraftSection.tsx`
Section describing the brand's craftsmanship process and materials, paired with a workshop image.

### Featured Product Section
**File:** `src/components/FeaturedProduct.tsx`
Spotlight section highlighting a single product on the Home page.

### Product Grid / Showcase
**File:** `src/components/ProductShowcase.tsx`
Grid layout used to display multiple products (used on Home and Collection pages).

### Room View Modal (3D-style room simulator)
**File:** `src/components/RoomModal.tsx`
Interactive modal that places a product photo into a room background image. Supports:
- Three lighting modes: Natural Day, Dusk Amber, Direct Spotlight (changes brightness/overlay of the room image)
- A proportion/scale slider (0.7x–1.3x) to resize the product within the room
- Drag-to-reposition on the product image
- A reset button to restore default scale

### Custom Cursor
**File:** `src/components/Cursor.tsx`
Replaces the default mouse cursor with a small ring on devices with a fine pointer (mouse/trackpad). When hovering an element with a `data-cursor` attribute, the ring expands into a dark circle showing a text label (e.g. "ATELIER"-style hints used elsewhere in the app). Automatically disabled on touch devices.

### Motion/Animation Helpers
**File:** `src/components/MotionComponents.tsx`
Shared animation primitives (easing curves, scroll-reveal wrappers, line-reveal text animation) reused across pages and components.

### Cart & Wishlist Drawer
**File:** `src/components/CartDrawer.tsx`
Slide-out side panel with two views:
- **Bag (cart) view** — lists added items with image, name, selected finish, price, and a quantity stepper (+/-), lets you remove an item, shows a subtotal, and has an "Acquire Commission" button that opens the checkout modal. Shows an empty-state message with a link to the Collection page when there are no items.
- **Wishlist view** — lists saved/favorited products with a "Move to Bag" action (adds to cart) and a "Remove" action. Shows an empty-state message when empty.

### Checkout Modal
**File:** `src/components/CheckoutModal.tsx`
Three-step checkout flow:
1. **Details** — form for name, email, phone, address, city, postal code, country (dropdown), and optional delivery notes.
2. **Payment** — choice between Card or Wire Transfer, with corresponding input fields, an itemized order summary, and total.
3. **Confirmed** — success screen with a generated order reference number, a confirmation message, and a "Print Commission Receipt" button (uses the browser's print dialog).

Submitting the order clears the cart via `CartContext`.

### Toast Notifications
**File:** `src/components/Toast.tsx`
Small pop-up notifications (bottom-right corner) shown for actions like adding to cart or wishlist. Each toast can include a title, description, and an optional action button (e.g. "View Bag"), and auto-dismisses after a few seconds or can be closed manually.

### Cart & Wishlist State Management
**File:** `src/context/CartContext.tsx`
React Context provider wrapping the whole app (`src/App.tsx`) that holds:
- `items` — cart items (product, selected finish, quantity)
- `wishlist` — list of saved product IDs
- `totalItems` / `subtotal` — computed cart totals
- Open/close state for the cart drawer, wishlist drawer, and toasts
- Actions: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `toggleWishlist`, `isInWishlist`, `showToast`, `dismissToast`

Cart and wishlist data persist across page reloads via `localStorage` (keys: `comfort_haven_cart_v1`, `comfort_haven_wishlist_v1`).

### Product Catalog Data
**File:** `src/data/products.ts`
Static array of product objects — each with id, name, type, category (Living/Bedroom/Dining/Objects), tagline, price, description, backstory, image, dimensions, materials, and craftsmanship notes. Used throughout the Home, Collection, Product, and search features.

### Global Styles & Typography
**File:** `src/index.css`
Tailwind CSS entry point with custom theme colors (ivory, sand, stone, taupe, brown, charcoal, ink), the two brand fonts (Cormorant Garamond for display text, Jost for body text), and reusable utility classes (`.display`, `.meta`, `.hero-title`, `.body-copy`, `.btn-solid`, `.field`, etc.) that control site-wide font sizes and spacing.

### App Shell & Routing
**File:** `src/App.tsx`
Root component that sets up `react-router-dom` routes, wraps the app in `CartProvider`, renders the Navbar/Footer/Cursor/CartDrawer/Toast globally, and adds page-transition animations (fade + slight vertical slide) between route changes. Also scrolls to top on every navigation.

## Pages

| Page | Route | File | Description |
|---|---|---|---|
| Home | `/` | `src/pages/Home.tsx` | Landing page combining Hero, Featured Product, Craft Section, Brand Statement, and a consultation call-to-action. |
| Collection | `/collection`, `/collection/:category` | `src/pages/Collection.tsx` | Full product catalog with room-based filtering (Living, Bedroom, Dining, Objects). |
| Product Detail | `/product/:id` | `src/pages/Product.tsx` | Single product page with images, description, dimensions, materials, "Reserve in Comfort Haven Bag" action, and the Room View simulator. |
| About | `/about` | `src/pages/About.tsx` | Brand story and craftsmanship philosophy. |
| Journal | `/journal` | `src/pages/Journal.tsx` | Editorial articles about craftsmanship and materials. |
| Contact | `/contact` | `src/pages/Contact.tsx` | Contact details and inquiry form. |
