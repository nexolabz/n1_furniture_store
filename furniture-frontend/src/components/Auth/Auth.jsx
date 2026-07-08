import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import heroImage from '../../assets/home_hero/hero_image1.png'

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          throw new Error('Please fill in all fields.')
        }
        await login(formData.email, formData.password)
        navigate('/')
      } else {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          throw new Error('Please fill in all fields.')
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
          throw new Error('Please enter a valid email address.')
        }

        // Password matching
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match.')
        }

        // Password complexity: min 8 characters, uppercase, lowercase, numbers, and special characters
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
        if (!passwordRegex.test(formData.password)) {
          throw new Error(
            'Password must be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, numbers, and special characters.'
          )
        }

        await signup(formData.name, formData.email, formData.password)
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.')
    } finally {
      setLoading(false)
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setError('')
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/30">
      <Header />

      <main className="flex-grow flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-xl border border-neutral-100 flex flex-col md:flex-row min-h-[600px]">
          
          {/* Visual Left Panel (Desktop only) */}
          <div className="hidden md:block md:w-1/2 relative bg-neutral-900">
            <img 
              src={heroImage} 
              alt="Luxury Living Room" 
              className="absolute inset-0 w-full h-full object-cover opacity-75"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent" />
            
            {/* Glassmorphic Brand Card */}
            <div className="absolute bottom-10 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white">
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest block mb-2">Premium Furniture</span>
              <h2 className="font-serif text-2xl font-bold mb-3 leading-snug">
                {isLogin ? "Welcome Back to Elegance" : "Join the World of Crafted Spaces"}
              </h2>
              <p className="text-xs text-neutral-200 leading-relaxed font-medium">
                {isLogin 
                  ? "Sign in to manage your orders, check your wishlist, and experience tailored recommendations for your home."
                  : "Create an account to save custom layouts, track checkout times, and receive exclusive offers on hand-built timber pieces."
                }
              </p>
            </div>
          </div>

          {/* Form Right Panel */}
          <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center text-left">
            <div className="w-full max-w-sm mx-auto">
              
              {/* Heading */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 font-medium leading-relaxed">
                  {isLogin 
                    ? 'Enter your credentials to access your account' 
                    : 'Get started by creating your account details'
                  }
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-600 rounded-r-lg flex items-center space-x-3 text-rose-800">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-xs font-semibold leading-normal">{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name Field (Sign Up only) */}
                {!isLogin && (
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full text-sm py-2.5 px-4 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-sm py-2.5 px-4 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all duration-200"
                    placeholder="your.email@address.com"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Password</label>
                    {isLogin && (
                      <a href="#" className="text-[10px] font-bold text-amber-600 hover:text-amber-700 tracking-wide uppercase transition-colors duration-200">
                        Forgot?
                      </a>
                    )}
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full text-sm py-2.5 px-4 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all duration-200"
                    placeholder="••••••••"
                  />
                </div>

                {/* Confirm Password Field (Sign Up only) */}
                {!isLogin && (
                  <div className="space-y-1">
                    <label htmlFor="confirmPassword" className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full text-sm py-2.5 px-4 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 text-white disabled:bg-neutral-400 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{isLogin ? 'Signing In...' : 'Registering...'}</span>
                    </>
                  ) : (
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  )}
                </button>
              </form>

              {/* Toggling Section */}
              <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
                <p className="text-xs text-neutral-500 font-medium">
                  {isLogin ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        onClick={toggleAuthMode}
                        className="text-amber-600 hover:text-amber-700 font-bold uppercase tracking-wide ml-1 focus:outline-none transition-colors duration-200 cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        onClick={toggleAuthMode}
                        className="text-amber-600 hover:text-amber-700 font-bold uppercase tracking-wide ml-1 focus:outline-none transition-colors duration-200 cursor-pointer"
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Auth
