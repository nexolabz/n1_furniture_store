import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 font-sans border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Logo & Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-serif font-black tracking-wider text-white">
                FURNI<span className="text-amber-500">.</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              Discover premium furniture collections crafted for modern living. We combine timeless designs with unmatched comfort to elevate your home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.885.056 1 .046 1.64.21 2.08.381a4.72 4.72 0 011.666 1.082 4.72 4.72 0 011.082 1.666c.171.44.335 1.08.38 2.08.048 1.1.056 1.455.056 3.885v.084c0 2.43-.008 2.784-.056 3.885-.046 1-.21 1.64-.381 2.08a4.72 4.72 0 01-1.082 1.666 4.72 4.72 0 01-1.666 1.082c-.44.171-1.08.335-2.08.38-1.1.048-1.455.056-3.885.056H12v-2.08c-2.43-.008-2.784-.056-3.885-.056-1-.046-1.64-.21-2.08-.381a4.72 4.72 0 01-1.666-1.082 4.72 4.72 0 01-1.082-1.666c-.171-.44-.335-1.08-.38-2.08C2.008 15.084 2 14.73 2 12.315V12c0-2.43.008-2.784.056-3.885.046-1 .21-1.64.381-2.08a4.72 4.72 0 011.082-1.666 4.72 4.72 0 011.666-1.082c.44-.171 1.08-.335 2.08-.38 1.1-.048 1.455-.008 3.885-.056h.084zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.83-8.83a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop?category=living-room" className="hover:text-white transition-colors duration-200">Living Room</Link></li>
              <li><Link to="/shop?category=bedroom" className="hover:text-white transition-colors duration-200">Bedroom</Link></li>
              <li><Link to="/shop?category=dining-room" className="hover:text-white transition-colors duration-200">Dining Room</Link></li>
              <li><Link to="/shop?category=office" className="hover:text-white transition-colors duration-200">Office</Link></li>
              <li><Link to="/shop?category=outdoor" className="hover:text-white transition-colors duration-200">Outdoor</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors duration-200">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Product Warranty</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-neutral-900 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500">
          <p>© 2026 FURNI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-neutral-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-neutral-400 transition-colors duration-200">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
