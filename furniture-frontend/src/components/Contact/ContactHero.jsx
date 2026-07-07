import React from 'react'

function ContactHero() {
  return (
    <section className="bg-neutral-50 border-b border-neutral-100 py-16 sm:py-20 text-center font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-amber-600 mb-2.5 block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-neutral-900 tracking-tight uppercase">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto mt-4 leading-relaxed font-medium">
          Have questions about materials, shipping, or custom orders? Reach out and we'll reply within 24 hours.
        </p>
        <div className="w-16 h-[3px] bg-amber-600 mx-auto mt-6 rounded-full" />
      </div>
    </section>
  )
}

export default ContactHero
