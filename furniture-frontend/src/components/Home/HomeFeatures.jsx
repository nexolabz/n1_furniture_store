import React from 'react'

function HomeFeatures() {
  const features = [
    {
      title: 'Free Delivery',
      desc: 'On all orders above ₹9999',
      icon: (
        <svg className="w-7 h-7 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="7" cy="17" r="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17" cy="17" r="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M13 16h2.586a1 1 0 00.707-.293l2.414-2.414a1 1 0 00.293-.707V11a1 1 0 00-1-1H13v6z" />
        </svg>
      )
    },
    {
      title: '5 Year Warranty',
      desc: 'On furniture & accessories',
      icon: (
        <svg className="w-7 h-7 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Easy Returns',
      desc: 'Hassle-free returns',
      icon: (
        <svg className="w-7 h-7 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9h6V3" />
        </svg>
      )
    },
    {
      title: 'Secure Payment',
      desc: '100% secure payment',
      icon: (
        <svg className="w-7 h-7 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: '24/7 Support',
      desc: 'Dedicated support',
      icon: (
        <svg className="w-7 h-7 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 18v-6a9 9 0 0118 0v6M3 18a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3m18 5a2 2 0 002-2v-3a2 2 0 00-2-2h-3a2 2 0 00-2 2v3a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <section className="bg-neutral-50/80 border-y border-neutral-100 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 lg:gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3.5 pl-2 sm:pl-0">
              <div className="flex-shrink-0 p-2 bg-white rounded-full shadow-sm border border-neutral-100/60">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 tracking-wide font-sans">{item.title}</h4>
                <p className="text-xs text-neutral-500 mt-0.5 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeFeatures
