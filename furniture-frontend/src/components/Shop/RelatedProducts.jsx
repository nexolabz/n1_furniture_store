import React from 'react'
import CardCategory from './CardCategory'

function RelatedProducts({ currentProduct, productsList }) {
  const related = productsList
    .filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    )
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="border-t border-neutral-100 pt-16 mt-16 text-left font-sans">
      <div className="flex flex-col mb-8">
        <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 uppercase">
          You May Also Like
        </h2>
        <p className="text-xs text-neutral-400 font-medium mt-1">
          Explore matching pieces to complete the look.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {related.map((prod) => (
          <CardCategory key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
