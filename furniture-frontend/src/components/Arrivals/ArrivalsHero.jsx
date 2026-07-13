import React from 'react'
import { Link } from 'react-router-dom'

function ArrivalsHero() {
  return (
    <section className="relative bg-neutral-950 text-white py-20 overflow-hidden font-sans">
      {/* Abstract Design Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-neutral-800/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left space-y-6">
        {/* Breadcrumb */}
        <nav className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center space-x-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-amber-500">New Arrivals</span>
        </nav>

        {/* Heading */}
        <div className="space-y-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-950/40 border border-amber-900/50 px-3.5 py-1.5 rounded-full w-fit block">
            Exclusive Summer Launch 2026
          </span>
          <h1 className="text-3xl sm:text-6xl font-serif font-black tracking-tight uppercase max-w-2xl leading-none">
            The New Standard of Living.
          </h1>
        </div>

        {/* Paragraph */}
        <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed font-medium">
          Introducing our latest lineup of modular seating, geometric tables, and ergonomic workspaces. Meticulously designed for contemporary architectural spaces, utilizing select-grade solid timbers.
        </p>

        {/* Decorative Grid Indicator */}
        <div className="border-t border-neutral-800/80 pt-6 flex flex-wrap gap-8 sm:gap-12 text-[9px] font-bold uppercase tracking-widest text-neutral-500 w-fit">
          <div>
            <span className="block text-white text-base font-serif font-black">100%</span>
            <span>Organic Timbers</span>
          </div>
          <div>
            <span className="block text-white text-base font-serif font-black">14+</span>
            <span>Handcraft Checks</span>
          </div>
        </div>
      </div>

      {/* Underline Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-600" />
    </section>
  )
}

export default ArrivalsHero
