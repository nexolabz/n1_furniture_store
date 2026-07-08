import { useState } from 'react'

function ContactForm() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_API_URL

    if (!scriptUrl) {
      // Mock submission for local testing/development
      console.warn('VITE_GOOGLE_SHEETS_API_URL is not set in environment variables. Falling back to mock submission.')
      setTimeout(() => {
        setStatus('success')
        setFormState({ name: '', email: '', message: '' })
        setTimeout(() => {
          setStatus('idle')
        }, 3000)
      }, 1000)
      return
    }

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Prevents CORS redirection failures in the browser
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formState),
      })

      // With 'no-cors', the response is opaque (cannot be read), 
      // but if the promise resolved (didn't throw a network error), 
      // the submission succeeded.
      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
      setTimeout(() => {
        setStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
      setErrorMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className="py-16 sm:py-20 bg-white font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* Left Column - Contact details */}
        <div className="w-full lg:w-5/12 space-y-10 text-left">
          
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
              Visit Our Showroom
            </h2>
            <p className="text-sm text-neutral-500 leading-relaxed font-medium">
              Come feel the timber grains and experience cushion comfort firsthand at our flagship location.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-neutral-50 border border-neutral-100 rounded-lg text-neutral-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 tracking-wide">Showroom Address</h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium leading-relaxed">
                  1042 Timber Boulevard, Design District,<br />Solapur, MH 413006, India
                </p>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-neutral-50 border border-neutral-100 rounded-lg text-neutral-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 tracking-wide">Contact Details</h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium leading-relaxed">
                  Support: hello@furnistore.com<br />
                  Phone: +91 80 4200 9999
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-neutral-50 border border-neutral-100 rounded-lg text-neutral-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-800 tracking-wide">Business Hours</h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium leading-relaxed">
                  Mon - Sat: 10:00 AM - 8:00 PM<br />
                  Sunday: 11:00 AM - 6:00 PM
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column - Contact Form */}
        <div className="w-full lg:w-7/12 bg-neutral-50/50 border border-neutral-100/80 p-8 sm:p-10 rounded-2xl text-left shadow-xs">
          <h3 className="text-lg font-bold text-neutral-900 mb-6">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">Name</label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full text-sm py-2.5 px-4 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all duration-200"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full text-sm py-2.5 px-4 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all duration-200"
                placeholder="your.email@address.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">Message</label>
              <textarea
                id="message"
                rows="5"
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full text-sm py-2.5 px-4 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all duration-200 resize-none"
                placeholder="Tell us what you are looking for..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 ${
                status === 'success'
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : status === 'error'
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : status === 'submitting'
                  ? 'bg-neutral-400 text-neutral-200 cursor-not-allowed'
                  : 'bg-neutral-900 hover:bg-neutral-850 text-white'
              }`}
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Message Sent Successfully!</span>
                </>
              ) : status === 'error' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Failed to Send. Try Again?</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>

            {status === 'error' && errorMessage && (
              <p className="text-xs text-rose-600 mt-2 font-medium">
                {errorMessage}
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  )
}

export default ContactForm
