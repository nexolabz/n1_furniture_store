import React, { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SaleHero from './SaleHero'
import SaleGrid from './SaleGrid'
import { products } from '../../data/products'

function Sale() {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/20 font-sans">
      <Header />
      <main className="flex-grow">
        <SaleHero />
        <SaleGrid productsList={products} />
      </main>
      <Footer />
    </div>
  )
}

export default Sale
