import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProductGallery from './ProductGallery'
import ProductInfo from './ProductInfo'
import ProductSpecAccordion from './ProductSpecAccordion'
import RelatedProducts from './RelatedProducts'
import { products } from '../../data/products'

function ProductDetail() {
  const { productId } = useParams()
  const product = products.find((p) => p.id === productId)

  // Scroll to top on page mount or product ID change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  if (!product) {
    return <Navigate to="/shop" replace />
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/20 font-sans">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb back navigation */}
        <div className="mb-8 text-left">
          <nav className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center space-x-2">
            <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-neutral-900 transition-colors">Shop</Link>
            <span>/</span>
            <Link
              to={`/collection/${product.category}`}
              className="hover:text-neutral-900 transition-colors"
            >
              {product.category.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-neutral-800 truncate max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* Core Layout: Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
          {/* Gallery - 7 cols on large screens */}
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>

          {/* Details - 5 cols on large screens */}
          <div className="lg:col-span-5 space-y-8">
            <ProductInfo product={product} />
            <ProductSpecAccordion product={product} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts currentProduct={product} productsList={products} />
      </main>

      <Footer />
    </div>
  )
}

export default ProductDetail
