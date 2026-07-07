import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { products } from '../../data/products'
import CardCategory from './CardCategory'

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'
  
  const [priceLimit, setPriceLimit] = useState(80000)
  const [sortBy, setSortBy] = useState('featured')
  const [addedToCart, setAddedToCart] = useState({}) // Stores product id -> temporary added state

  // Category list configuration
  const categoryFilters = [
    { key: 'all', label: 'All Products' },
    { key: 'living-room', label: 'Living Room' },
    { key: 'bedroom', label: 'Bedroom' },
    { key: 'dining-room', label: 'Dining Room' },
    { key: 'office', label: 'Office' },
    { key: 'outdoor', label: 'Outdoor' },
    { key: 'kids', label: 'Kids' }
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // 1. Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory)
    }

    // 2. Price Limit Filter
    result = result.filter(p => p.price <= priceLimit)

    // 3. Sorting logic
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [activeCategory, priceLimit, sortBy])

  // Category switch helper
  const handleCategoryChange = (categoryKey) => {
    if (categoryKey === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', categoryKey)
    }
    setSearchParams(searchParams)
  }

  // Add to cart click handler (micro-interaction)
  const handleAddToCart = (id) => {
    setAddedToCart(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [id]: false }))
    }, 1800)
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/50 font-sans">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumb / Title area */}
        <div className="mb-8">
          
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-neutral-900 tracking-tight uppercase">
            {activeCategory === 'all' ? 'All Furniture' : `${categoryFilters.find(c => c.key === activeCategory)?.label} Collection`}
          </h1>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs h-fit space-y-8">
            
            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-800 mb-4 border-b border-neutral-100 pb-2">
                Categories
              </h3>
              <ul className="space-y-3.5 text-sm">
                {categoryFilters.map((cat) => {
                  const isActive = activeCategory === cat.key
                  return (
                    <li key={cat.key}>
                      <button
                        onClick={() => handleCategoryChange(cat.key)}
                        className={`w-full text-left font-medium transition-all duration-200 py-1.5 px-3 rounded-lg flex items-center justify-between ${
                          isActive
                            ? 'text-amber-700 bg-amber-50/60 font-bold'
                            : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-neutral-100 pb-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-800">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-amber-600">
                  ₹{priceLimit.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="80000"
                step="5000"
                value={priceLimit}
                onChange={(e) => setPriceLimit(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-100 rounded-lg appearance-none cursor-pointer accent-amber-600 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-bold mt-2">
                <span>₹5,000</span>
                <span>₹80,000</span>
              </div>
            </div>

          </aside>

          {/* Main Products Grid */}
          <div className="flex-grow">
            
            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Showing {filteredProducts.length} Results
              </span>
              
              <div className="flex items-center space-x-3 self-end sm:self-auto">
                <label htmlFor="sortBy" className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Sort By:
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 focus:outline-none focus:border-neutral-400 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <CardCategory
                    key={product.id}
                    product={product}
                    isAdded={addedToCart[product.id]}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100 shadow-xs">
                <svg className="w-12 h-12 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-neutral-800 mb-1">No products found</h3>
                <p className="text-sm text-neutral-500">Try adjusting your filters or price slider to see more items.</p>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}

export default Shop