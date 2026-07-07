
import { Link } from 'react-router-dom'

import livingRoomImg from '../../assets/categories/living_room.png'
import bedroomImg from '../../assets/categories/bedroom.png'
import diningRoomImg from '../../assets/categories/dining_room.png'
import officeImg from '../../assets/categories/office.png'
import outdoorImg from '../../assets/categories/outdoor.png'
import kidsImg from '../../assets/categories/kids.png'

function HomeShopCategories() {
  const categories = [
    {
      name: 'Living Room',
      image: livingRoomImg,
      path: '/shop?category=living-room',
      icon: (
        <svg className="w-10 h-10 text-white stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v-2a3 3 0 00-3-3H7a3 3 0 00-3 3v2m16 0H4m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2m-10 0H4m4 0v-2a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      )
    },
    {
      name: 'Bedroom',
      image: bedroomImg,
      path: '/shop?category=bedroom',
      icon: (
        <svg className="w-10 h-10 text-white stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v13m18-13v13M3 11h18M6 7h3v4H6V7zm9 0h3v4h-3V7z" />
        </svg>
      )
    },
    {
      name: 'Dining Room',
      image: diningRoomImg,
      path: '/shop?category=dining-room',
      icon: (
        <svg className="w-10 h-10 text-white stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 18v-3a2 2 0 012-2h12a2 2 0 012 2v3M4 11h16M8 11V6a2 2 0 012-2h4a2 2 0 012 2v5" />
        </svg>
      )
    },
    {
      name: 'Office',
      image: officeImg,
      path: '/shop?category=office',
      icon: (
        <svg className="w-10 h-10 text-white stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16h18M5 16V8a2 2 0 012-2h10a2 2 0 012 2v8M12 6v10m-3 4h6" />
        </svg>
      )
    },
    {
      name: 'Outdoor',
      image: outdoorImg,
      path: '/shop?category=outdoor',
      icon: (
        <svg className="w-10 h-10 text-white stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3a9 9 0 019 9H3a9 9 0 019-9zm-7 9h14M7 16h10" />
        </svg>
      )
    },
    {
      name: 'Kids',
      image: kidsImg,
      path: '/shop?category=kids',
      icon: (
        <svg className="w-10 h-10 text-white stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="9" r="4" />
          <circle cx="7.5" cy="5.5" r="1.5" />
          <circle cx="16.5" cy="5.5" r="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17a5 5 0 0010 0v-4H7v4z" />
          <circle cx="9" cy="18" r="1" />
          <circle cx="15" cy="18" r="1" />
        </svg>
      )
    }
  ]

  return (
    <section className="py-16 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header section */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
            Shop by Category
          </h2>
        </div>
        <Link
          to="/shop"
          className="text-xs sm:text-sm font-bold text-neutral-800 hover:text-amber-700 flex items-center space-x-1.5 transition-colors duration-200 group"
        >
          <span>View All Categories</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-200">➔</span>
        </Link>
      </div>

      {/* Grid of category cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((category, idx) => (
          <Link
            key={idx}
            to={category.path}
            className="group relative h-80 w-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-350 bg-neutral-100 flex flex-col items-center justify-center text-center px-4"
          >
            {/* Background image with zoom */}
            <img
              src={category.image}
              alt={category.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300" />

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-3 transform group-hover:-translate-y-1 transition-transform duration-300 text-white/90 group-hover:text-white drop-shadow-md">
                {category.icon}
              </div>
              <h3 className="text-white text-base font-semibold tracking-wider uppercase font-sans drop-shadow-sm">
                {category.name}
              </h3>
            </div>

            {/* Bottom active line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HomeShopCategories