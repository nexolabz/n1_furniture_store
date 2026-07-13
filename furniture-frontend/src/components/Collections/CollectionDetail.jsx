import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import CollectionDetailHero from './CollectionDetailHero'
import CollectionStory from './CollectionStory'
import CollectionProducts from './CollectionProducts'
import { products } from '../../data/products'

// Import category images
import diningRoomImg from '../../assets/categories/dining_room.png'
import livingRoomImg from '../../assets/categories/living_room.png'
import bedroomImg from '../../assets/categories/bedroom.png'
import officeImg from '../../assets/categories/office.png'
import outdoorImg from '../../assets/categories/outdoor.png'
import kidsImg from '../../assets/categories/kids.png'

const collectionsData = {
  'dining-room': {
    categoryLabel: 'Dining Room',
    tag: 'Dining & Living Space',
    title: 'The Oak & Earth Collection',
    description: 'Bring the warmth of nature indoors. This collection features dining tables, buffets, and sideboards built from premium, sustainably sourced solid European white oak with natural oil finishes.',
    image: diningRoomImg,
    storyTitle: 'Crafted from Earth, Built for Life',
    storyText: 'Every piece in the Oak & Earth collection is built using traditional joinery and select grade timber. Designed to show the organic variation of the wood grain, this collection is protected with a natural VOC-free oil finish that deepens in character over the years.',
    materials: 'Sustainably sourced European White Oak, Natural Linseed Oil, Hand-rubbed Finishes'
  },
  'living-room': {
    categoryLabel: 'Living Room',
    tag: 'Lounge Sophistication',
    title: 'The Mid-Century Luxe Collection',
    description: 'Refined angles, modular comfort, and rich walnut veneers. Elevate your living room with sofas, accent chairs, and tables designed with timeless retro aesthetics.',
    image: livingRoomImg,
    storyTitle: 'The Geometry of Leisure',
    storyText: 'Drawing inspiration from architectural designs of the 1950s, the Mid-Century Luxe collection balances tapered legs, organic curves, and deep modular cushions. We use hand-selected walnut veneers and premium fabrics that stand up to modern life while exuding a sophisticated, timeless retro appeal.',
    materials: 'American Walnut veneers, High-resilience foams, Premium Upholstery Fabrics'
  },
  'bedroom': {
    categoryLabel: 'Bedroom',
    tag: 'Serene Bedroom Suite',
    title: 'The Serenity Suite Collection',
    description: 'Your personal sanctuary designed for calm, rest, and comfort. Low-profile platform bed frames, floating nightstands, and bevel-detailed dressers that maximize bedroom space.',
    image: bedroomImg,
    storyTitle: 'A Sanctuary for Restorative Sleep',
    storyText: 'The Serenity Suite collection is built on the philosophy that a bedroom should be free from visual noise. Through hidden joint construction, floating profiles, and handle-less drawers, each item contributes to a calm, minimalist environment that relaxes the mind and body.',
    materials: 'Solid Walnut and Ash woods, Silent Soft-close Drawer Slides, Beveled Joinery'
  },
  'office': {
    categoryLabel: 'Office',
    tag: 'Creative Workspace Flow',
    title: 'The Productive Workspace Collection',
    description: 'Engineered for optimal focus and ergonomic comfort. Height-adjustable study desks, high-back leather executive chairs, and modular bookcases to declutter your workflow.',
    image: officeImg,
    storyTitle: 'Function Meets Creative Flow',
    storyText: 'A beautiful workspace invites deeper concentration. The Productive Workspace collection combines cable management solutions, durable solid wood desktop surfaces, and ergonomic contours. Create a clutter-free study that adapts to your screen layout and fuels focus.',
    materials: 'Solid Oak, Powder-coated Steel Frames, Ergonomic Mesh & Top-grain Leathers'
  },
  'outdoor': {
    categoryLabel: 'Outdoor',
    tag: 'Open-Air Relaxation',
    title: 'The Solstice Patio Collection',
    description: 'Weather-resistant handwoven wicker, grade-A teak, and high-density outdoor cushions designed to make the open air feel as luxurious as your living room.',
    image: outdoorImg,
    storyTitle: 'Seamless Indoor-Outdoor Living',
    storyText: 'Engineered to withstand the elements without sacrificing comfort, the Solstice collection blends Grade-A plantation teak with synthetic all-weather wicker. The result is a highly durable, low-maintenance set of outdoor lounges and dining tables that age gracefully under the sun.',
    materials: 'Grade-A Plantation Teak, Weatherproof Resin Wicker, Sunproof fabrics'
  },
  'kids': {
    categoryLabel: 'Kids',
    tag: 'Playful Learning Spaces',
    title: 'The Montessori Playroom Collection',
    description: 'Safe, low-profile structures, organic finishes, and modular items designed to foster independence, curiosity, and creativity in your child\'s nursery or playroom.',
    image: kidsImg,
    storyTitle: 'Designed for Little Explorer Hands',
    storyText: 'Fostering autonomy is at the heart of our Montessori collection. Built with curved edges, non-toxic organic oil finishes, and toddler-height accessibility, these house bed frames, rocking toys, and adjustable desks grow with your child while keeping their playroom safe and inviting.',
    materials: 'Solid Pine, Baltic Birch plywoods, Non-toxic water-based coatings'
  }
}

function CollectionDetail() {
  const { categoryId } = useParams()
  const collection = collectionsData[categoryId]

  // Redirect to collections index if category doesn't exist
  if (!collection) {
    return <Navigate to="/collections" replace />
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/20 font-sans">
      <Header />
      <main className="flex-grow">
        <CollectionDetailHero collection={collection} />
        <CollectionStory collection={collection} />
        <CollectionProducts categoryId={categoryId} productsList={products} />
      </main>
      <Footer />
    </div>
  )
}

export default CollectionDetail
