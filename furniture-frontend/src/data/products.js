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
    description: 'A deeply comfortable, modular fabric sofa designed to fit any contemporary living space.',
    isNew: true,
    features: ['Modular sections', 'High-resilience foam', 'Stain-resistant fabric', 'Solid wood base'],
    dimensions: 'W: 240cm x D: 100cm x H: 85cm'
  },
  {
    id: 'lr-2',
    name: 'MCM Walnut Lounge Chair',
    category: 'living-room',
    price: 18999,
    originalPrice: 24999,
    rating: 4.8,
    reviews: 95,
    image: sofaImg,
    description: 'Iconic mid-century modern profile with rich walnut veneer and premium leather cushions.',
    features: ['Molded walnut plywood frame', 'Top-grain leather', '360-degree swivel', 'Ergonomic tilt'],
    dimensions: 'W: 85cm x D: 85cm x H: 80cm'
  },
  {
    id: 'lr-3',
    name: 'Minimalist Oak Center Table',
    category: 'living-room',
    price: 12499,
    rating: 4.6,
    reviews: 78,
    image: sofaImg,
    description: 'Clean lines and solid oak timber construction featuring a spacious open storage shelf.',
    isNew: true,
    features: ['Solid white oak', 'Lower storage shelf', 'Durable lacquer finish', 'Beveled edges'],
    dimensions: 'W: 120cm x D: 60cm x H: 45cm'
  },

  // Bedroom
  {
    id: 'bd-1',
    name: 'Walnut Platform Bed Frame',
    category: 'bedroom',
    price: 45999,
    originalPrice: 54999,
    rating: 4.9,
    reviews: 110,
    image: bedImg,
    description: 'Premium quality solid walnut bed frame with integrated wooden headboard supports.',
    features: ['Solid American walnut', 'Sturdy wooden slats', 'Zero squeak design', 'Easy assembly'],
    dimensions: 'W: 160cm x L: 210cm x H: 100cm'
  },
  {
    id: 'bd-2',
    name: 'Floating Bedside Nightstand',
    category: 'bedroom',
    price: 6999,
    rating: 4.7,
    reviews: 84,
    image: bedImg,
    description: 'Wall-mounted walnut drawer nightstand offering a sleek footprint-free storage solution.',
    isNew: true,
    features: ['Wall-mounted', 'Soft-close drawer', 'Wire management grommet', 'Solid wood veneer'],
    dimensions: 'W: 45cm x D: 35cm x H: 20cm'
  },
  {
    id: 'bd-3',
    name: 'Nordic 6-Drawer Dresser',
    category: 'bedroom',
    price: 22499,
    originalPrice: 29999,
    rating: 4.5,
    reviews: 62,
    image: bedImg,
    description: 'Generous storage chest featuring clean bevel details and silent-glide runner mechanisms.',
    features: ['6 spacious drawers', 'Silent ball-bearing runners', 'Anti-tip hardware included', 'Solid wood legs'],
    dimensions: 'W: 140cm x D: 45cm x H: 80cm'
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
    description: 'Crafted from select European white oak to comfortably seat up to 6-8 people.',
    isNew: true,
    features: ['Select European oak', 'Seats 6-8 comfortably', 'Heavy-duty joinery', 'Sleek matte coat'],
    dimensions: 'W: 180cm x D: 90cm x H: 75cm'
  },
  {
    id: 'dr-2',
    name: 'Upholstered Dining Chair Set',
    category: 'dining-room',
    price: 14999,
    originalPrice: 18999,
    rating: 4.7,
    reviews: 93,
    image: diningImg,
    description: 'Set of two fabric-upholstered dining chairs featuring sleek tapered steel legs.',
    features: ['Set of 2 chairs', 'High-density foam padding', 'Powder-coated steel legs', 'Easy-clean fabric'],
    dimensions: 'W: 48cm x D: 52cm x H: 85cm'
  },
  {
    id: 'dr-3',
    name: 'Modern Wooden Sideboard Buffet',
    category: 'dining-room',
    price: 28499,
    rating: 4.6,
    reviews: 55,
    image: diningImg,
    description: 'Sophisticated dining storage buffet with adjustable shelves and cable routing exits.',
    isNew: true,
    features: ['Adjustable internal shelves', 'Soft-close doors', 'Wire routing cutouts', 'Solid wood frame'],
    dimensions: 'W: 160cm x D: 45cm x H: 75cm'
  },

  // Office
  {
    id: 'of-1',
    name: 'Minimalist Study Desk',
    category: 'office',
    price: 24999,
    originalPrice: 29999,
    rating: 4.8,
    reviews: 88,
    image: deskImg,
    description: 'Clean study desk with soft-close drawers and an elegant hidden cable management tray.',
    features: ['Hidden wire channel', 'Dual soft-close drawers', 'Solid oak top', 'Powder-coated legs'],
    dimensions: 'W: 130cm x D: 60cm x H: 75cm'
  },
  {
    id: 'of-2',
    name: 'Ergonomic Executive Chair',
    category: 'office',
    price: 16499,
    rating: 4.9,
    reviews: 154,
    image: deskImg,
    description: 'High-back mesh workspace chair providing specialized lumbar support and dynamic tilt control.',
    isNew: true,
    features: ['Adjustable lumbar support', 'Breathable mesh back', '3D armrests', 'Synchronous tilt mechanism'],
    dimensions: 'W: 68cm x D: 68cm x H: 115-125cm'
  },
  {
    id: 'of-3',
    name: 'Modular Wooden Bookcase',
    category: 'office',
    price: 15999,
    originalPrice: 19999,
    rating: 4.5,
    reviews: 41,
    image: deskImg,
    description: 'Asymmetrical wood-veneer shelves ideal for showcasing books, files, and art pieces.',
    features: ['Asymmetrical modern design', 'Sturdy wood veneer', 'Wall-mounting safety kit', 'Adjustable feet'],
    dimensions: 'W: 90cm x D: 30cm x H: 180cm'
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
    description: 'Weather-resistant handwoven wicker sofa set with comfortable high-density cushions.',
    isNew: true,
    features: ['All-weather resin wicker', 'Rust-resistant aluminum frame', 'Water-repellent cushions', 'Modular design'],
    dimensions: 'W: 220cm x D: 85cm x H: 70cm'
  },
  {
    id: 'od-2',
    name: 'Teak Garden Dining Table',
    category: 'outdoor',
    price: 32499,
    originalPrice: 38999,
    rating: 4.6,
    reviews: 50,
    image: patioImg,
    description: 'High-oil content teak dining table engineered to withstand outdoor weather elements.',
    features: ['Grade-A premium teak wood', 'Natural weather resistance', 'Umbrella hole with plug', 'Mortise & tenon joints'],
    dimensions: 'W: 160cm x D: 90cm x H: 75cm'
  },
  {
    id: 'od-3',
    name: 'Outdoor Sun Lounger Recliner',
    category: 'outdoor',
    price: 11999,
    rating: 4.8,
    reviews: 72,
    image: patioImg,
    description: 'Multi-position reclining teak sunbed complete with water-repellent cushioning.',
    isNew: true,
    features: ['Adjustable 5-position backrest', 'Solid teak wood frame', 'Quick-dry cushion included', 'Built-in wheels'],
    dimensions: 'W: 65cm x L: 200cm x H: 35cm'
  },

  // Kids
  {
    id: 'kd-1',
    name: 'Wooden Rocking Bear Toy',
    category: 'kids',
    price: 8499,
    originalPrice: 10999,
    rating: 4.9,
    reviews: 210,
    image: toyImg,
    description: 'A beautifully safe, organic finish solid timber rocking bear toy for nursery play.',
    features: ['100% organic wood', 'Non-toxic vegetable paint', 'Anti-tip runners', 'Sturdy hand grips'],
    dimensions: 'W: 30cm x L: 70cm x H: 50cm'
  },
  {
    id: 'kd-2',
    name: 'Montessori House Bed Frame',
    category: 'kids',
    price: 19999,
    rating: 4.8,
    reviews: 83,
    image: toyImg,
    description: 'Low-to-ground toddler bed frame mimicking a cozy house outline for independent kids.',
    isNew: true,
    features: ['Montessori design', 'Premium pine timber', 'Low-profile safety footprint', 'Easy custom decoration'],
    dimensions: 'W: 90cm x L: 190cm x H: 140cm'
  },
  {
    id: 'kd-3',
    name: 'Adjustable Kids Study Desk',
    category: 'kids',
    price: 9999,
    originalPrice: 12999,
    rating: 4.7,
    reviews: 49,
    image: toyImg,
    description: 'Ergonomic study desk that grows with your child, featuring tiltable writing boards.',
    features: ['Height-adjustable frame', 'Tiltable desktop (0-40°)', 'Built-in stationery drawer', 'Anti-pinch safety hinges'],
    dimensions: 'W: 80cm x D: 60cm x H: 52-76cm'
  }
]
