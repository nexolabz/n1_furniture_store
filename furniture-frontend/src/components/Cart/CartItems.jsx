import React from 'react'
import { Link } from 'react-router-dom'

function CartItems({ items, onUpdateQty, onRemoveItem }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100 shadow-xs w-full lg:col-span-3">
        <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h3 className="text-lg font-bold text-neutral-800 mb-1">Your Cart is Empty</h3>
        <p className="text-sm text-neutral-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 bg-neutral-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full lg:col-span-3 space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col sm:flex-row items-center justify-between bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs gap-4 text-left"
        >
          {/* Left section: Image & details */}
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="w-20 h-20 bg-neutral-50 border border-neutral-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
              <img
                src={item.image}
                alt={item.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600">
                {item.category.replace('-', ' ')}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-neutral-850 line-clamp-1 mt-0.5">
                {item.name}
              </h3>
              <span className="text-xs text-neutral-400 font-bold block mt-1">
                ₹{item.price.toLocaleString()} each
              </span>
            </div>
          </div>

          {/* Right section: Quantity controls & pricing */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6 sm:space-x-8 border-t sm:border-t-0 pt-4 sm:pt-0 border-neutral-50">
            {/* Quantity */}
            <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50/50">
              <button
                onClick={() => onUpdateQty(item.id, -1)}
                className="px-3 py-1.5 text-neutral-500 hover:text-neutral-900 transition-colors duration-200 font-bold cursor-pointer"
              >
                -
              </button>
              <span className="px-3 text-xs font-bold text-neutral-800 w-8 text-center">
                {item.qty}
              </span>
              <button
                onClick={() => onUpdateQty(item.id, 1)}
                className="px-3 py-1.5 text-neutral-500 hover:text-neutral-900 transition-colors duration-200 font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <span className="text-base font-black text-neutral-900 block">
                ₹{(item.price * item.qty).toLocaleString()}
              </span>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemoveItem(item.id)}
              className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>

          </div>

        </div>
      ))}
    </div>
  )
}

export default CartItems
