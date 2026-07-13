import React, { useState } from 'react'

function ProductSpecAccordion({ product }) {
  const [openSection, setOpenSection] = useState('specs')

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  const sections = [
    {
      id: 'specs',
      label: 'Specifications',
      content: (
        <div className="space-y-3.5 text-xs text-neutral-600 font-medium">
          <div className="flex justify-between border-b border-neutral-100 pb-1.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider">Dimensions</span>
            <span className="text-neutral-900">{product.dimensions || 'N/A'}</span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 pb-1.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider">Primary Material</span>
            <span className="text-neutral-900">
              {product.category === 'living-room' || product.category === 'bedroom'
                ? 'Solid Walnut timber'
                : product.category === 'dining-room' || product.category === 'office'
                ? 'Solid White Oak'
                : 'All-weather engineered materials'}
            </span>
          </div>
          <div className="flex justify-between border-b border-neutral-100 pb-1.5">
            <span className="text-neutral-400 font-bold uppercase tracking-wider">Country of Origin</span>
            <span className="text-neutral-900">India</span>
          </div>
          <div>
            <span className="text-neutral-400 font-bold uppercase tracking-wider block mb-1">Key Features</span>
            <ul className="list-disc pl-4 space-y-1">
              {(product.features || []).map((feat, i) => (
                <li key={i} className="text-neutral-700">{feat}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: (
        <div className="text-xs text-neutral-600 space-y-2.5 font-medium leading-relaxed">
          <p>
            🚛 <strong className="text-neutral-800">Dispatch Time:</strong> Orders are dispatched from our warehouse in Bengaluru within 2-3 business days. Delivery typically takes 4-7 business days across metropolitan areas.
          </p>
          <p>
            📦 <strong className="text-neutral-800">Premium Shipping:</strong> Free shipping is automatically applied at checkout for orders above ₹10,000. All furniture shipments include wooden crating for protection.
          </p>
          <p>
            🔄 <strong className="text-neutral-800">Easy Returns:</strong> We offer a 7-day return policy for items in original packaging. Please contact our support team to request a return label.
          </p>
        </div>
      )
    },
    {
      id: 'care',
      label: 'Care Instructions',
      content: (
        <div className="text-xs text-neutral-600 space-y-2 font-medium leading-relaxed">
          <p>🍂 Wipe clean with a soft dry cloth. Avoid chemical cleaning sprays or harsh abrasives.</p>
          <p>☀️ Protect from direct sunlight and wet environments to prevent wood grain fading or timber warping.</p>
          <p>🧴 For oiled wood finishes, reapply premium wood conditioning oil every 6 months to preserve the rich surface luster.</p>
        </div>
      )
    }
  ]

  return (
    <div className="border border-neutral-200/70 rounded-2xl overflow-hidden bg-white divide-y divide-neutral-150 font-sans text-left">
      {sections.map((section) => {
        const isOpen = openSection === section.id
        return (
          <div key={section.id} className="w-full">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-5 py-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-neutral-800 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              <span>{section.label}</span>
              <span className={`text-base font-black transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-600' : 'text-neutral-400'}`}>
                ▾
              </span>
            </button>
            <div
              className={`transition-all duration-350 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-80 border-t border-neutral-100 p-5 bg-neutral-50/20' : 'max-h-0'
              }`}
            >
              {section.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductSpecAccordion
