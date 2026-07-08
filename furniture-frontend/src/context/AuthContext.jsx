import { createContext, useContext, useState, useEffect } from 'react'

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('furni_user')
    const loggedInStatus = localStorage.getItem('furni_isLoggedIn') === 'true'
    if (storedUser && loggedInStatus) {
      setUser(JSON.parse(storedUser))
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Login failed')
      }

      // Handle typical backend response formats (e.g. user details and token)
      const userData = data.user || { 
        email, 
        name: data.name || email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) 
      }
      const token = data.token

      setUser(userData)
      setIsLoggedIn(true)
      localStorage.setItem('furni_user', JSON.stringify(userData))
      localStorage.setItem('furni_isLoggedIn', 'true')
      if (token) {
        localStorage.setItem('furni_token', token)
      }
      return true
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const signup = async (name, email, password) => {
    try {
      const response = await fetch(`${BACKEND_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, full_name: name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registration failed')
      }

      const userData = data.user || { name, email }
      const token = data.token

      setUser(userData)
      setIsLoggedIn(true)
      localStorage.setItem('furni_user', JSON.stringify(userData))
      localStorage.setItem('furni_isLoggedIn', 'true')
      if (token) {
        localStorage.setItem('furni_token', token)
      }
      return true
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('furni_user')
    localStorage.removeItem('furni_isLoggedIn')
    localStorage.removeItem('furni_token')
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
