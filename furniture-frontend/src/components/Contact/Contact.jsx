import React from 'react'
import Header from '../Header/Header'
import ContactHero from './ContactHero'
import ContactForm from './ContactForm'
import Footer from '../Footer/Footer'

function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/20">
      <Header />
      <main className="flex-grow">
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

export default Contact
