import React from 'react'

function CollectionStory({ collection }) {
  return (
    <section className="bg-white py-16 border-b border-neutral-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Design Narrative */}
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
              The Design Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 leading-tight uppercase">
              {collection.storyTitle}
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
              {collection.storyText}
            </p>
            <div className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-xl">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                Eco-Conscious Promise
              </h4>
              <p className="text-[11px] text-amber-700/90 font-medium">
                For every timber piece purchased from this collection, we fund the planting of one native tree to replenish global forests.
              </p>
            </div>
          </div>

          {/* Right Column: Spec / Philosophy Cards */}
          <div className="space-y-5">
            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100/50 text-left flex items-start space-x-4">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-widest mb-1">Materials Used</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                  {collection.materials}
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100/50 text-left flex items-start space-x-4">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-widest mb-1">Quality Standards</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                  Each joint, screw, and surface undergoes 14 distinct inspectoral checklists to guarantee structural integrity for 10+ years.
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100/50 text-left flex items-start space-x-4">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-widest mb-1">Lifetime Support</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-medium">
                  We stand by our craftsmanship. Enjoy round-the-clock maintenance consultations, care oil topups, and parts warranties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionStory
