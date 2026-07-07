import React from 'react'
import livingRoomImg from '../../assets/categories/living_room.png'

function AboutStory() {
  const pillars = [
    {
      title: 'Thoughtful Design',
      desc: 'Our design philosophy centers on form meeting function. We compose minimalist profiles, clean lines, and balanced textures that elevate space without cluttering.'
    },
    {
      title: 'Premium Materials',
      desc: 'We select the finest grade timbers, high-resilience upholstery fabrics, and solid steel fittings. Every product is engineered to last for generations of home life.'
    },
    {
      title: 'Eco Sourcing',
      desc: 'Sustainably managed forests supply our oaks and walnuts. We work with certified timber plants and use organic wax finishes to protect the health of your home and planet.'
    }
  ]

  return (
    <section className="py-16 sm:py-20 bg-white font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Narrative grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6 text-left">
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
            How We Redefine Modern Living
          </h2>
          <p className="text-sm text-neutral-500 leading-relaxed font-medium">
            At FurniStore, we believe a home is a sanctuary. We began over a decade ago with a simple focus: to create thoughtfully constructed furniture items that stand out in quality yet blend seamlessly into modern interiors.
          </p>
          <p className="text-sm text-neutral-500 leading-relaxed font-medium">
            We work directly with craft plants and design studios to skip the luxury markup. The result is a curated catalog of high-end wood platform beds, modular living room sectionals, and study desks brought directly to you.
          </p>
        </div>
        <div className="h-96 rounded-2xl overflow-hidden shadow-sm border border-neutral-100 bg-neutral-50 relative">
          <img
            src={livingRoomImg}
            alt="Beautiful curated living room space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/10" />
        </div>
      </div>

      {/* Core values */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center mb-10">
          Our Foundation Pillars
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => (
            <div key={idx} className="bg-neutral-50/50 p-8 rounded-2xl border border-neutral-100/50 text-left space-y-3.5">
              <span className="text-2xl font-bold text-amber-600 font-serif">0{idx + 1}</span>
              <h4 className="text-base font-bold text-neutral-850 tracking-wide">{item.title}</h4>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutStory
