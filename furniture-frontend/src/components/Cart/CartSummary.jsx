import { useState } from 'react'

function CartSummary({ subtotal, onCheckout }) {
  const [promo, setPromo] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0) // percentage
  const [promoMsg, setPromoMsg] = useState({ text: '', type: '' })

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promo.trim().toUpperCase() === 'SAVE10') {
      setAppliedDiscount(10)
      setPromoMsg({ text: '10% Discount applied successfully!', type: 'success' })
    } else {
      setPromoMsg({ text: 'Invalid promo code.', type: 'error' })
      setAppliedDiscount(0)
    }
  }

  // Cost calculations
  const discountAmt = Math.round(subtotal * (appliedDiscount / 100))
  const netSubtotal = subtotal - discountAmt
  const gstAmt = Math.round(netSubtotal * 0.18)
  const finalTotal = netSubtotal + gstAmt

  return (
    <div className="w-full lg:col-span-1 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs h-fit space-y-6 text-left">
      
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-800 mb-4 border-b border-neutral-100 pb-2">
          Order Summary
        </h3>
      </div>

      {/* Pricing lists */}
      <div className="space-y-3.5 text-sm font-medium">
        <div className="flex justify-between text-neutral-500">
          <span>Subtotal</span>
          <span className="text-neutral-800 font-bold">₹{subtotal.toLocaleString()}</span>
        </div>

        {appliedDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Promo Discount (10%)</span>
            <span>- ₹{discountAmt.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between text-neutral-500">
          <span>Shipping</span>
          <span className="text-green-600 font-bold">Free</span>
        </div>

        <div className="flex justify-between text-neutral-500">
          <span>Taxes (18% GST)</span>
          <span className="text-neutral-800 font-bold">₹{gstAmt.toLocaleString()}</span>
        </div>

        <div className="border-t border-neutral-100 mt-4 pt-4 flex justify-between text-base font-black text-neutral-900">
          <span>Total</span>
          <span>₹{finalTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <form onSubmit={handleApplyPromo} className="space-y-2 border-t border-neutral-100 pt-5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">Promo Code</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            className="flex-grow text-xs py-2 px-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
            placeholder="Try: SAVE10"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Apply
          </button>
        </div>
        {promoMsg.text && (
          <span className={`text-[10px] font-bold block mt-1.5 ${
            promoMsg.type === 'success' ? 'text-green-600' : 'text-red-500'
          }`}>
            {promoMsg.text}
          </span>
        )}
      </form>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={subtotal === 0}
        className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer mt-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Secure Checkout</span>
      </button>

    </div>
  )
}

export default CartSummary
