import React from 'react'
import CardCategory from '../Shop/CardCategory'

function CollectionProducts({ categoryId, productsList }) {
  const collectionProducts = productsList.filter(
    (product) => product.category === categoryId
  )

  return (
    <section className="bg-neutral-50/30 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-neutral-100 pb-6 mb-10 gap-4">
          <div className="text-left">
            <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 uppercase">
              Featured Items
            </h2>
            <p className="text-xs text-neutral-400 font-medium mt-1">
              Curated essentials from this exclusive release.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 bg-white border border-neutral-100 px-4 py-2 rounded-full self-start sm:self-auto shadow-2xs">
            {collectionProducts.length} Items Found
          </span>
        </div>

        {/* Grid */}
        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map((product) => (
              <CardCategory key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100 shadow-xs">
            <svg
              className="w-12 h-12 text-neutral-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="text-base font-bold text-neutral-800 mb-1">
              No products in this collection
            </h3>
            <p className="text-xs text-neutral-500">
              Check back soon for new additions to this release.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default CollectionProducts
