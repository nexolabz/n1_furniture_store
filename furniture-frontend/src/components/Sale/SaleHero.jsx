import React from 'react'
import { Link } from 'react-router-dom'

function SaleHero() {
  return (
    <section className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white py-20 overflow-hidden font-sans">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-950/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left space-y-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        
        {/* Left Side Info */}
        <div className="space-y-6 max-w-2xl">
          {/* Breadcrumb */}
          <nav className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center space-x-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-red-500">Summer Sale</span>
          </nav>

          {/* Headline */}
          <div className="space-y-3.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 bg-red-950/40 border border-red-900/50 px-3 py-1 rounded-md w-fit block">
              Limited Time Clearance
            </span>
            <h1 className="text-3xl sm:text-6xl font-serif font-black tracking-tight uppercase leading-none">
              Season Clearance. <br />
              <span className="text-amber-500">Up to 40% Off.</span>
            </h1>
          </div>

          {/* Paragraph */}
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-medium">
            Elevate your home layout with heirloom-quality solid wood products, now at reduced pricing. Quantities are highly limited and sold on a first-come, first-serve basis.
          </p>
        </div>

        {/* Right Side Promo Card */}
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xs max-w-sm w-full space-y-4 self-center md:self-auto shadow-2xl">
          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500 block">
            Unlock Additional Discounts
          </span>
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Use Coupon Code:</h3>
            <div className="flex items-center justify-between bg-neutral-900/80 border border-neutral-800 rounded-xl p-3.5">
              <span className="font-mono text-sm font-bold tracking-widest text-white">FURNI10</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">Copy</span>
            </div>
          </div>
          <p className="text-[11px] text-neutral-400 font-medium leading-relaxed">
            Get an extra 10% off on checkouts above ₹50,000. Free crating and shipping applied automatically.
          </p>
        </div>

      </div>

      {/* Underline styling */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600" />
    </section>
  )
}

export default SaleHero
