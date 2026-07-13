import React from 'react'
import { Link } from 'react-router-dom'

function CollectionDetailHero({ collection }) {
  return (
    <section className="relative w-full py-20 sm:py-28 md:py-36 bg-neutral-900 flex items-center justify-center overflow-hidden font-sans">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover opacity-60 scale-105 animate-fade-in"
        />
        {/* Dark overlay with linear gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-neutral-950/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-6">
        {/* Breadcrumb */}
        <nav className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-300 flex justify-center items-center space-x-2">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-amber-500 transition-colors">Collections</Link>
          <span>/</span>
          <span className="text-amber-500">{collection.categoryLabel}</span>
        </nav>

        {/* Title */}
        <div className="space-y-2">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-500 block">
            {collection.tag}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight uppercase leading-tight drop-shadow-md">
            {collection.title}
          </h1>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-neutral-200 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
          {collection.description}
        </p>
      </div>

      {/* Bottom decorative bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-600" />
    </section>
  )
}

export default CollectionDetailHero
