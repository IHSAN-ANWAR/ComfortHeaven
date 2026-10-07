import luna from '../assets/luna.jpg'
import noir from '../assets/noir.jpg'
import arc from '../assets/arc.jpg'
import forma from '../assets/forma.jpg'
import mona from '../assets/mona.jpg'
import aura from '../assets/aura.jpg'
import vela from '../assets/vela.jpg'
import orbit from '../assets/orbit.jpg'

export type RoomCategory = 'Living' | 'Bedroom' | 'Dining' | 'Objects'

export interface Product {
  id: string
  name: string
  type: string
  category: RoomCategory
  tagline: string
  price: string
  description: string
  story: string
  image: string
  /** Optional path to a .glb model. Leave undefined until a real 3D asset exists. */
  model?: string
  dimensions: { width: string; height: string; depth: string }
  materials: string[]
  craftsmanship: string
}

export const products: Product[] = [
  {
    id: 'luna-sofa', name: 'Luna', type: 'Sofa', category: 'Living',
    tagline: 'Sculptural comfort.',
    price: 'Rs 2,499',
    description: 'A single sweeping curve, wrapped in hand-tailored bouclé and set on a solid oak plinth. Designed for modern interiors that value stillness.',
    story: 'Luna began as a clay model, shaped by hand until the silhouette felt like a held breath. Every seam follows the curve of the body.',
    image: luna,
    dimensions: { width: '240 cm', height: '78 cm', depth: '98 cm' },
    materials: ['Bouclé wool blend', 'Solid European oak', 'High-density recycled foam'],
    craftsmanship: 'Frame joined without screws, upholstered by a single artisan over 22 hours.',
  },
  {
    id: 'noir-bed', name: 'Noir', type: 'Bed', category: 'Bedroom',
    tagline: 'Quiet luxury for the bedroom.',
    price: 'Rs 3,890',
    description: 'A low platform of smoked oak beneath a tall, softly padded headboard in charcoal linen. A room within a room.',
    story: 'Noir is the colour of the hour before sleep. The headboard rises to frame the dark, never to dominate it.',
    image: noir,
    dimensions: { width: '190 cm', height: '112 cm', depth: '220 cm' },
    materials: ['Charcoal Belgian linen', 'Smoked oak', 'Natural latex support'],
    craftsmanship: 'Hand-stitched piping, floating plinth finished in seven coats of oil.',
  },
  {
    id: 'arc-lounge-chair', name: 'Arc', type: 'Lounge Chair', category: 'Living',
    tagline: 'Form meets comfort.',
    price: 'Rs 1,780',
    description: 'A single leather shell cradled by a slender walnut frame. Generous in proportion, restrained in expression.',
    story: 'Arc is drawn from one gesture — a sweep of the hand that becomes a back, an arm, a place to stay.',
    image: arc,
    dimensions: { width: '82 cm', height: '74 cm', depth: '84 cm' },
    materials: ['Vegetable-tanned leather', 'American walnut', 'Feather-wrapped foam'],
    craftsmanship: 'Shell stitched by hand with waxed linen thread, frame turned and sanded in-house.',
  },
  {
    id: 'forma-coffee-table', name: 'Forma', type: 'Coffee Table', category: 'Living',
    tagline: 'A quiet monument.',
    price: 'Rs 2,150',
    description: 'A disc of honed travertine resting on a sculpted stone pedestal. Every piece carries its own geology.',
    story: 'Forma is quarried, not manufactured. Each table is cut from a single block, so no two share the same grain.',
    image: forma,
    dimensions: { width: '100 cm', height: '36 cm', depth: '100 cm' },
    materials: ['Italian travertine', 'Hand-carved pedestal', 'Felt-lined base'],
    craftsmanship: 'Carved by stone masters and honed by hand to a soft matte finish.',
  },
  {
    id: 'mona-dining-chair', name: 'Mona', type: 'Dining Chair', category: 'Dining',
    tagline: 'Poise at the table.',
    price: 'Rs 690',
    description: 'A sculpted back that holds you softly, upholstered in warm taupe woven linen over smoked oak.',
    story: 'Mona was designed for long dinners — a chair you forget about, so you can remember the evening.',
    image: mona,
    dimensions: { width: '54 cm', height: '80 cm', depth: '56 cm' },
    materials: ['Woven taupe linen', 'Smoked oak', 'Moulded foam'],
    craftsmanship: 'Steam-bent oak frame with concealed joinery.',
  },
  {
    id: 'aura-sectional', name: 'Aura', type: 'Sectional Sofa', category: 'Living',
    tagline: 'Space to gather.',
    price: 'Rs 5,600',
    description: 'A deep, modular sectional in soft wool. Reconfigure it around the way you live — from intimate evenings to long afternoons.',
    story: 'Aura is built from loose, feather-filled cushions on a low frame, meant to be lived in rather than looked at.',
    image: aura,
    dimensions: { width: '320 cm', height: '72 cm', depth: '180 cm' },
    materials: ['Brushed wool', 'Down & feather fill', 'Kiln-dried beech frame'],
    craftsmanship: 'Each module hand-finished and tested for 30,000 cycles.',
  },
  {
    id: 'vela-bedside-table', name: 'Vela', type: 'Bedside Table', category: 'Bedroom',
    tagline: 'A small, perfect thing.',
    price: 'Rs 840',
    description: 'A single rounded drawer in dark walnut with a turned brass pull. Intimate in scale, enduring in character.',
    story: 'Vela keeps the night close — a book, a glass, a lamp, held in a single drawer.',
    image: vela,
    dimensions: { width: '48 cm', height: '52 cm', depth: '40 cm' },
    materials: ['American walnut', 'Solid brass', 'Natural oil finish'],
    craftsmanship: 'Dovetailed drawer, glides on waxed hardwood runners.',
  },
  {
    id: 'orbit-dining-table', name: 'Orbit', type: 'Dining Table', category: 'Dining',
    tagline: 'Gravity, softened.',
    price: 'Rs 4,320',
    description: 'An oval oak top balanced on a single sculpted pedestal. A table that gathers rather than divides.',
    story: 'Orbit has no head and no foot — only a centre, and everyone around it.',
    image: orbit,
    dimensions: { width: '240 cm', height: '74 cm', depth: '110 cm' },
    materials: ['Solid light oak', 'Laminated oak pedestal', 'Hard-wax oil'],
    craftsmanship: 'Pedestal laminated and carved from 36 layers of oak.',
  },
]

export const getProduct = (id?: string) => products.find((p) => p.id === id)

export interface CategoryDef { slug: string; label: RoomCategory; items: string[]; intro: string }

export const categories: CategoryDef[] = [
  { slug: 'living', label: 'Living', items: ['Sofas', 'Sectionals', 'Lounge Chairs', 'Coffee Tables'], intro: 'Pieces to gather, linger and unwind around.' },
  { slug: 'bedroom', label: 'Bedroom', items: ['Beds', 'Bedside Tables', 'Dressers', 'Bedroom Chairs'], intro: 'Rooms for rest, softly composed.' },
  { slug: 'dining', label: 'Dining', items: ['Dining Tables', 'Dining Chairs', 'Cabinets'], intro: 'Tables that make evenings last.' },
  { slug: 'objects', label: 'Objects', items: ['Lamps', 'Side Tables', 'Decorative Pieces'], intro: 'Small gestures that finish a room.' },
]

export const num = (i: number) => String(i + 1).padStart(2, '0')
