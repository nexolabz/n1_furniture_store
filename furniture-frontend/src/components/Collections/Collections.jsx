
import Header from '../Header/Header'
import CollectionHero from './CollectionHero'
import CollectionGrid from './CollectionGrid'
import Footer from '../Footer/Footer'

function Collections() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/50">
      <Header />
      <main className="flex-grow">
        <CollectionHero />
        <CollectionGrid />
      </main>
      <Footer />
    </div>
  )
}

export default Collections
