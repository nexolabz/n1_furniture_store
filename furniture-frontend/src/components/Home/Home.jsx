import React from 'react'
import Header from '../Header/Header'
import HomeHero from './HomeHero'
import HomeFeatures from './HomeFeatures'
import HomeShopCategories from './HomeShopCategories'
import Footer from '../Footer/Footer'

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <HomeHero />
        <HomeFeatures />
        <HomeShopCategories />
      </main>
      <Footer />
    </div>
  )
}

export default Home