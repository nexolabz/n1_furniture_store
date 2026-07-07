import sofaImg from '../assets/products/sofa.png'
import bedImg from '../assets/products/bed.png'
import diningImg from '../assets/products/dining.png'
import deskImg from '../assets/products/desk.png'
import patioImg from '../assets/products/patio.png'
import toyImg from '../assets/products/toy.png'

export const products = [
  // Living Room
  {
    id: 'lr-1',
    name: 'Scandinavian Modular Sofa',
    category: 'living-room',
    price: 54999,
    rating: 4.9,
    reviews: 142,
    image: sofaImg,
    description: 'A deeply comfortable, modular fabric sofa designed to fit any contemporary living space.'
  },
  {
    id: 'lr-2',
    name: 'MCM Walnut Lounge Chair',
    category: 'living-room',
    price: 18999,
    rating: 4.8,
    reviews: 95,
    image: sofaImg,
    description: 'Iconic mid-century modern profile with rich walnut veneer and premium leather cushions.'
  },
  {
    id: 'lr-3',
    name: 'Minimalist Oak Center Table',
    category: 'living-room',
    price: 12499,
    rating: 4.6,
    reviews: 78,
    image: sofaImg,
    description: 'Clean lines and solid oak timber construction featuring a spacious open storage shelf.'
  },

  // Bedroom
  {
    id: 'bd-1',
    name: 'Walnut Platform Bed Frame',
    category: 'bedroom',
    price: 45999,
    rating: 4.9,
    reviews: 110,
    image: bedImg,
    description: 'Premium quality solid walnut bed frame with integrated wooden headboard supports.'
  },
  {
    id: 'bd-2',
    name: 'Floating Bedside Nightstand',
    category: 'bedroom',
    price: 6999,
    rating: 4.7,
    reviews: 84,
    image: bedImg,
    description: 'Wall-mounted walnut drawer nightstand offering a sleek footprint-free storage solution.'
  },
  {
    id: 'bd-3',
    name: 'Nordic 6-Drawer Dresser',
    category: 'bedroom',
    price: 22499,
    rating: 4.5,
    reviews: 62,
    image: bedImg,
    description: 'Generous storage chest featuring clean bevel details and silent-glide runner mechanisms.'
  },

  // Dining Room
  {
    id: 'dr-1',
    name: 'Solid Oak Dining Table',
    category: 'dining-room',
    price: 38999,
    rating: 4.8,
    reviews: 120,
    image: diningImg,
    description: 'Crafted from select European white oak to comfortably seat up to 6-8 people.'
  },
  {
    id: 'dr-2',
    name: 'Upholstered Dining Chair Set',
    category: 'dining-room',
    price: 14999,
    rating: 4.7,
    reviews: 93,
    image: diningImg,
    description: 'Set of two fabric-upholstered dining chairs featuring sleek tapered steel legs.'
  },
  {
    id: 'dr-3',
    name: 'Modern Wooden Sideboard Buffet',
    category: 'dining-room',
    price: 28499,
    rating: 4.6,
    reviews: 55,
    image: diningImg,
    description: 'Sophisticated dining storage buffet with adjustable shelves and cable routing exits.'
  },

  // Office
  {
    id: 'of-1',
    name: 'Minimalist Study Desk',
    category: 'office',
    price: 24999,
    rating: 4.8,
    reviews: 88,
    image: deskImg,
    description: 'Clean study desk with soft-close drawers and an elegant hidden cable management tray.'
  },
  {
    id: 'of-2',
    name: 'Ergonomic Executive Chair',
    category: 'office',
    price: 16499,
    rating: 4.9,
    reviews: 154,
    image: deskImg,
    description: 'High-back mesh workspace chair providing specialized lumbar support and dynamic tilt control.'
  },
  {
    id: 'of-3',
    name: 'Modular Wooden Bookcase',
    category: 'office',
    price: 15999,
    rating: 4.5,
    reviews: 41,
    image: deskImg,
    description: 'Asymmetrical wood-veneer shelves ideal for showcasing books, files, and art pieces.'
  },

  // Outdoor
  {
    id: 'od-1',
    name: 'Patio Wicker Lounge Sofa',
    category: 'outdoor',
    price: 74999,
    rating: 4.7,
    reviews: 67,
    image: patioImg,
    description: 'Weather-resistant handwoven wicker sofa set with comfortable high-density cushions.'
  },
  {
    id: 'od-2',
    name: 'Teak Garden Dining Table',
    category: 'outdoor',
    price: 32499,
    rating: 4.6,
    reviews: 50,
    image: patioImg,
    description: 'High-oil content teak dining table engineered to withstand outdoor weather elements.'
  },
  {
    id: 'od-3',
    name: 'Outdoor Sun Lounger Recliner',
    category: 'outdoor',
    price: 11999,
    rating: 4.8,
    reviews: 72,
    image: patioImg,
    description: 'Multi-position reclining teak sunbed complete with water-repellent cushioning.'
  },

  // Kids
  {
    id: 'kd-1',
    name: 'Wooden Rocking Bear Toy',
    category: 'kids',
    price: 8499,
    rating: 4.9,
    reviews: 210,
    image: toyImg,
    description: 'A beautifully safe, organic finish solid timber rocking bear toy for nursery play.'
  },
  {
    id: 'kd-2',
    name: 'Montessori House Bed Frame',
    category: 'kids',
    price: 19999,
    rating: 4.8,
    reviews: 83,
    image: toyImg,
    description: 'Low-to-ground toddler bed frame mimicking a cozy house outline for independent kids.'
  },
  {
    id: 'kd-3',
    name: 'Adjustable Kids Study Desk',
    category: 'kids',
    price: 9999,
    rating: 4.7,
    reviews: 49,
    image: toyImg,
    description: 'Ergonomic study desk that grows with your child, featuring tiltable writing boards.'
  }
]
