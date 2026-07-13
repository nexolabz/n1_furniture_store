import React from 'react'
import CardCategory from '../Shop/CardCategory'

function SaleGrid({ productsList }) {
  const saleProducts = productsList.filter(
    (product) => product.originalPrice && product.originalPrice > product.price
  )

  return (
    <section className="bg-neutral-50/20 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Count Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-6 mb-10 text-left gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 uppercase">
              Clearance Items
            </h2>
            <p className="text-xs text-neutral-400 font-medium mt-1">
              Solid wood furniture, now within reach.
            </p>
          </div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 bg-white border border-neutral-100/80 px-4 py-2 rounded-full shadow-2xs font-bold w-fit self-start sm:self-auto">
            {saleProducts.length} Items Listed
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {saleProducts.map((product) => (
            <CardCategory key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SaleGrid
