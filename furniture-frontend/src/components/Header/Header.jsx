import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/collections', label: 'Collections' },
    { path: '/arrivals', label: 'New Arrivals' },
    { path: '/sale', label: 'Sale' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]

  const activeLinkStyle = ({ isActive }) =>
    `text-xs font-semibold uppercase tracking-widest py-2 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-neutral-900 after:transition-all after:duration-300 ${
      isActive
        ? 'text-neutral-900 after:w-full'
        : 'text-neutral-500 hover:text-neutral-900 after:w-0 hover:after:w-full'
    }`

  const mobileActiveLinkStyle = ({ isActive }) =>
    `block py-3 text-sm font-semibold uppercase tracking-wider border-b border-neutral-100 transition-colors duration-200 ${
      isActive ? 'text-neutral-900 pl-2 border-l-2 border-l-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
    }`

  return (
    <header className="w-full bg-white border-b border-neutral-100 font-sans">
      {/* Promo Banner */}
      <div className="bg-neutral-900 text-white text-[10px] sm:text-xs py-2 px-4 text-center tracking-widest uppercase font-medium">
        ✨ Summer Sale: Up to 50% Off — Shop the Collection Now
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-2">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-wider text-neutral-900">
                FURNI<span className="text-amber-600">.</span>
              </span>
            </NavLink>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex space-x-8 xl:space-x-10">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={activeLinkStyle}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Input Bar (Conditional slider) */}
            <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? 'w-40 sm:w-60' : 'w-0 overflow-hidden'}`}>
              <input
                type="text"
                placeholder="Search furniture..."
                className="w-full py-1.5 pl-3 pr-8 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
              />
              <button className="absolute right-3 text-neutral-400 hover:text-neutral-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Search Icon Trigger */}
            <button
              onClick={toggleSearch}
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-50 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Profile */}
            <NavLink
              to="/profile"
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-50 transition-colors duration-200"
              aria-label="Profile"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </NavLink>

            {/* Cart with Badge */}
            <NavLink
              to="/cart"
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-50 transition-colors duration-200 relative"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute top-1 right-1 bg-amber-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center transform translate-x-1 -translate-y-1">
                2
              </span>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-full hover:bg-neutral-50 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white border-t border-neutral-100 ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={mobileActiveLinkStyle}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header