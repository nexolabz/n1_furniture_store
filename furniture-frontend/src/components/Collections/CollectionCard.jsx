import { Link } from 'react-router-dom'

function CollectionCard({ tag, title, description, image, link }) {
  return (
    <Link
      to={link}
      className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-xs hover:shadow-lg transition-all duration-350 w-full cursor-pointer"
    >
      {/* Image container */}
      <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:h-80 overflow-hidden relative bg-neutral-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors duration-300" />
      </div>

      {/* Content container */}
      <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-between text-left">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 block mb-2.5">
            {tag}
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-950 group-hover:text-amber-700 transition-colors duration-200 leading-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-4 leading-relaxed font-medium">
            {description}
          </p>
        </div>

        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-900 flex items-center space-x-1.5 mt-8 border-b border-neutral-900/10 pb-1 w-fit group-hover:border-amber-600 transition-colors duration-200">
          <span className="group-hover:text-amber-600 transition-colors duration-200">View Collection</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-200 group-hover:text-amber-600">➔</span>
        </div>
      </div>
    </Link>
  )
}

export default CollectionCard
