import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

function CardCategory({ product, isAdded, onAddToCart }) {
  const { addToCart, cartItems } = useCart()
  
  const isItemAdded = cartItems.some(item => item.id === product.id)
  const isProductInCart = isAdded !== undefined ? isAdded : isItemAdded
  const handleAdd = onAddToCart ? () => onAddToCart(product.id) : () => addToCart(product)

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group w-full relative">
      {/* Link wrapper for the product image and meta-info */}
      <Link to={`/product/${product.id}`} className="block flex-grow text-left">
        {/* Image container */}
        <div className="relative w-full aspect-square bg-neutral-50/50 flex items-center justify-center p-6 border-b border-neutral-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[85%] max-w-[85%] object-contain transform group-hover:scale-106 transition-transform duration-500 ease-out"
          />
          {/* Rating tag */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1 shadow-sm border border-neutral-100/50">
            <span className="text-amber-500">★</span>
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Detail section */}
        <div className="p-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block mb-1">
            {product.category.replace('-', ' ')}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-neutral-800 group-hover:text-amber-700 transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>
      </Link>

      {/* Price and Cart button - separate block to prevent event nesting issues */}
      <div className="px-5 pb-5 pt-4 border-t border-neutral-50 flex items-center justify-between mt-auto">
        <div className="flex flex-col text-left">
          <span className="text-base sm:text-lg font-black text-neutral-900 leading-none">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] sm:text-xs text-neutral-400 font-bold line-through mt-1">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleAdd()
          }}
          className={`px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer shadow-xs ${
            isProductInCart
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-neutral-900 hover:bg-neutral-800 text-white'
          }`}
        >
          {isProductInCart ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
              <span>Added ✓</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default CardCategory
