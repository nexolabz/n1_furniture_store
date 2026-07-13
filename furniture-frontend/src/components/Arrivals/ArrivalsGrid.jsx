import React from 'react'
import CardCategory from '../Shop/CardCategory'

function ArrivalsGrid({ productsList }) {
  const newArrivals = productsList.filter((product) => product.isNew)

  return (
    <section className="bg-neutral-50/20 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Count Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-6 mb-10 text-left gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 uppercase">
              Fresh Releases
            </h2>
            <p className="text-xs text-neutral-400 font-medium mt-1">
              Explore the latest design drops of this season.
            </p>
          </div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 bg-white border border-neutral-100/80 px-4 py-2 rounded-full shadow-2xs w-fit self-start sm:self-auto">
            {newArrivals.length} Products
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <CardCategory key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ArrivalsGrid
