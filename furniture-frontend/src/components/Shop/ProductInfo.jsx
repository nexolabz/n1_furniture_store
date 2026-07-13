import React, { useState } from 'react'
import { useCart } from '../../context/CartContext'

function ProductInfo({ product }) {
  const { addToCart, cartItems } = useCart()
  const [qty, setQty] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleQtyChange = (delta) => {
    setQty((prev) => Math.max(1, prev + delta))
  }

  const handleAdd = () => {
    addToCart(product, qty)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 1800)
  }

  // Calculate discount percentage if original price is present
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Category & Badge */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
          {product.category.replace('-', ' ')}
        </span>
        {product.isNew && (
          <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-0.5 rounded-full">
            New Arrival
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-serif font-black text-neutral-900 leading-tight uppercase">
        {product.name}
      </h1>

      {/* Ratings */}
      <div className="flex items-center space-x-3.5 border-b border-neutral-100 pb-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i < Math.floor(product.rating) ? 'text-amber-500' : 'text-neutral-200'
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-xs font-bold text-neutral-700 pl-1.5">{product.rating}</span>
        </div>
        <span className="text-neutral-200">|</span>
        <button className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 hover:underline transition-colors">
          {product.reviews} Customer Reviews
        </button>
      </div>

      {/* Pricing */}
      <div className="flex items-center space-x-4">
        <span className="text-2xl sm:text-3xl font-black text-neutral-900">
          ₹{product.price.toLocaleString()}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-base sm:text-lg font-bold text-neutral-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-150 px-2 py-0.5 rounded-md">
              Save {discountPercent}%
            </span>
          </>
        )}
      </div>

      {/* Stock status */}
      <div className="flex items-center space-x-2 bg-neutral-50 px-3.5 py-2.5 border border-neutral-100/50 rounded-xl w-fit">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
          In stock, ready to dispatch
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-neutral-600 leading-relaxed font-medium">
        {product.description}
      </p>

      {/* Action Area */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-100">
        {/* Quantity selector */}
        <div className="flex items-center justify-between border border-neutral-200 rounded-xl px-4 py-2 bg-white w-full sm:w-36 h-12">
          <button
            onClick={() => handleQtyChange(-1)}
            disabled={qty <= 1}
            className="text-neutral-500 hover:text-neutral-900 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-lg px-2 cursor-pointer"
          >
            -
          </button>
          <span className="text-sm font-bold text-neutral-950">{qty}</span>
          <button
            onClick={() => handleQtyChange(1)}
            className="text-neutral-500 hover:text-neutral-900 font-bold text-lg px-2 cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Add To Cart Button */}
        <button
          onClick={handleAdd}
          className={`flex-grow h-12 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm ${
            isAdded
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-neutral-900 hover:bg-neutral-800 text-white'
          }`}
        >
          {isAdded ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8" d="M5 13l4 4L19 7" />
              </svg>
              <span>Added to Cart ✓</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500 border-t border-neutral-100">
        <div className="flex items-center space-x-2.5">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span>Free Premium Delivery</span>
        </div>
        <div className="flex items-center space-x-2.5">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>10-Year Warranty</span>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
