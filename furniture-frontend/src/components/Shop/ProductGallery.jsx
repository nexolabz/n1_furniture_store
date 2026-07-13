import React, { useState } from 'react'

function ProductGallery({ product }) {
  const [activeImg, setActiveImg] = useState(product.image)

  // Sub-images can be simulated by adding the main image and some stylized crops or the same image
  const imagesList = [
    product.image,
    product.image,
    product.image
  ]

  return (
    <div className="flex flex-col space-y-4 font-sans">
      {/* Main Image Container */}
      <div className="relative w-full aspect-square bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden group flex items-center justify-center p-8">
        <img
          src={activeImg}
          alt={product.name}
          className="max-h-[90%] max-w-[90%] object-contain transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {/* Decorative Badge */}
        <span className="absolute bottom-4 left-4 text-[9px] font-bold uppercase tracking-widest text-neutral-400 bg-white px-2.5 py-1 rounded-full border border-neutral-100 shadow-2xs">
          Studio View
        </span>
      </div>

      {/* Thumbnails */}
      <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none">
        {imagesList.map((img, idx) => {
          const isSelected = activeImg === img && idx === 0 // just simple selection highlighting
          return (
            <button
              key={idx}
              onClick={() => setActiveImg(img)}
              className={`w-16 h-16 sm:w-20 sm:h-20 bg-neutral-50 rounded-xl border overflow-hidden p-2 transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center justify-center ${
                isSelected
                  ? 'border-amber-600 ring-2 ring-amber-600/10'
                  : 'border-neutral-200/60 hover:border-neutral-400'
              }`}
            >
              <img
                src={img}
                alt={`${product.name} angle ${idx + 1}`}
                className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProductGallery
