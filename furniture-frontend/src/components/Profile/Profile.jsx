import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../Header/Header'
import ProfileSidebar from './ProfileSidebar'
import ProfileDetails from './ProfileDetails'
import Footer from '../Footer/Footer'

function Profile() {
  const [activeTab, setActiveTab] = useState('account')
  const [loggedOut, setLoggedOut] = useState(false)
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn && !loggedOut) {
      navigate('/login')
    }
  }, [isLoggedIn, navigate, loggedOut])

  const handleLogout = () => {
    logout()
    setLoggedOut(true)
    setTimeout(() => {
      // Simulate redirection to home page
      window.location.href = '/'
    }, 1800)
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/20 relative">
      
      {/* Logged Out Overlay Mock */}
      {loggedOut && (
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm z-50 flex items-center justify-center text-white">
          <div className="bg-white text-neutral-900 px-8 py-10 rounded-2xl border border-neutral-100 text-center max-w-sm mx-4 space-y-4 shadow-xl animate-fade-in">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold font-serif">Logged Out Successfully</h3>
            <p className="text-sm text-neutral-500 leading-relaxed font-medium">
              We hope to see you back soon. Redirecting to home page...
            </p>
          </div>
        </div>
      )}

      <Header />
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <ProfileSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onLogout={handleLogout} 
          />
          
          <ProfileDetails 
            activeTab={activeTab} 
          />

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Profile
