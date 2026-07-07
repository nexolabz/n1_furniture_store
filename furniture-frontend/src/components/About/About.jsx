import React from 'react'
import Header from '../Header/Header'
import AboutHero from './AboutHero'
import AboutStory from './AboutStory'
import Footer from '../Footer/Footer'

function About() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/20">
      <Header />
      <main className="flex-grow">
        <AboutHero />
        <AboutStory />
      </main>
      <Footer />
    </div>
  )
}

export default About
