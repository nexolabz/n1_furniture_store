import React from 'react'

function AboutHero() {
  return (
    <section className="bg-neutral-50 border-b border-neutral-100 py-16 sm:py-20 text-center font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-600 mb-2.5 block">
          Our Heritage
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-neutral-900 tracking-tight uppercase">
          About FurniStore
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto mt-4 leading-relaxed font-medium">
          Crafting comfort, premium durability, and timeless modern aesthetic spaces for your home since 2012.
        </p>
        <div className="w-16 h-[3px] bg-amber-600 mx-auto mt-6 rounded-full" />
      </div>
    </section>
  )
}

export default AboutHero
