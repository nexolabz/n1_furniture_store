import CollectionCard from './CollectionCard'

// Import existing category images
import diningRoomImg from '../../assets/categories/dining_room.png'
import livingRoomImg from '../../assets/categories/living_room.png'
import bedroomImg from '../../assets/categories/bedroom.png'
import officeImg from '../../assets/categories/office.png'

function CollectionGrid() {
  const collections = [
    {
      tag: 'Dining & Living Space',
      title: 'The Oak & Earth Collection',
      description: 'Bring the warmth of nature indoors. This collection features dining tables, buffets, and sideboards built from premium, sustainably sourced solid European white oak with natural oil finishes.',
      image: diningRoomImg,
      link: '/collection/dining-room'
    },
    {
      tag: 'Lounge Sophistication',
      title: 'The Mid-Century Luxe Collection',
      description: 'Refined angles, modular comfort, and rich walnut veneers. Elevate your living room with sofas, accent chairs, and tables designed with timeless retro aesthetics.',
      image: livingRoomImg,
      link: '/collection/living-room'
    },
    {
      tag: 'Serene Bedroom Suite',
      title: 'The Serenity Suite Collection',
      description: 'Your personal sanctuary designed for calm, rest, and comfort. Low-profile platform bed frames, floating nightstands, and bevel-detailed dressers that maximize bedroom space.',
      image: bedroomImg,
      link: '/collection/bedroom'
    },
    {
      tag: 'Creative Workspace Flow',
      title: 'The Productive Workspace Collection',
      description: 'Engineered for optimal focus and ergonomic comfort. Height-adjustable study desks, high-back leather executive chairs, and modular bookcases to declutter your workflow.',
      image: officeImg,
      link: '/collection/office'
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 gap-10">
        {collections.map((item, idx) => (
          <CollectionCard
            key={idx}
            tag={item.tag}
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
          />
        ))}
      </div>
    </section>
  )
}

export default CollectionGrid
