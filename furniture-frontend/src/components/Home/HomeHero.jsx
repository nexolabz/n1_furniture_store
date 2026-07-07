import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import hero1 from "../../assets/home_hero/hero_image1.png"
import hero2 from "../../assets/home_hero/hero_image2.png"
import hero3 from "../../assets/home_hero/hero_image3.png"
import hero4 from "../../assets/home_hero/hero_image4.png"
import hero5 from "../../assets/home_hero/hero_image5.png"

function HomeHero() {
  const slides = [
    {
      image: hero1,
      tag: "Timeless Design. Unmatched Comfort.",
      title: "Transform Your Home with Style",
      desc: "Discover premium furniture collections crafted for modern living, designed to bring elegance and functionality to every corner of your home."
    },
    {
      image: hero2,
      tag: "Minimalist Aesthetics.",
      title: "Elegant Living Space Designs",
      desc: "Redefine your living room with our modular sofas, premium accent chairs, and beautifully crafted center tables."
    },
    {
      image: hero3,
      tag: "Cozy Bedroom Retreat.",
      title: "Serene & Comfortable Bedrooms",
      desc: "Create your ultimate sanctuary with solid wood beds, orthopedic mattresses, and minimalist nightstands."
    },
    {
      image: hero4,
      tag: "Efficient Workspaces.",
      title: "Modern Home Office Furniture",
      desc: "Boost your focus and productivity with ergonomic executive chairs, height-adjustable desks, and clean storage systems."
    },
    {
      image: hero5,
      tag: "Outdoor Luxury.",
      title: "Premium Patio & Garden Sets",
      desc: "Bring your outdoor lounge to life with weather-resistant dining tables, sofas, and elegant shade umbrellas."
    }
  ]

  return (
    <div className="w-full relative bg-neutral-900 home-hero-slider">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full">
            {/* Slide Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center z-10">
              <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 md:px-20 lg:px-28 flex flex-col items-start text-white">
                <span className="text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-amber-500 mb-3 sm:mb-4 drop-shadow">
                  {slide.tag}
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.1] max-w-xl sm:max-w-3xl mb-4 sm:mb-6 drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base font-sans font-medium text-neutral-200/95 max-w-lg mb-6 sm:mb-8 md:mb-10 leading-relaxed drop-shadow-sm">
                  {slide.desc}
                </p>
                <div className="flex flex-row items-center space-x-4">
                  <button className="px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-neutral-900 font-sans font-bold text-xs sm:text-sm tracking-widest uppercase rounded-md hover:bg-neutral-100 transition-colors duration-200 flex items-center space-x-2 shadow-md cursor-pointer">
                    <span>Shop Now</span>
                    <span className="text-sm">➔</span>
                  </button>
                  <button className="px-6 py-3 sm:px-8 sm:py-3.5 border border-white/60 hover:border-white text-white font-sans font-bold text-xs sm:text-sm tracking-widest uppercase rounded-md hover:bg-white/10 transition-colors duration-200 backdrop-blur-xs cursor-pointer">
                    Explore Collections
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeHero