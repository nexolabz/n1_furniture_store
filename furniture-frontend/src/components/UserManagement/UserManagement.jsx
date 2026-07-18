import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function UserManagement() {
  const { user, isLoggedIn, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // State for user listing
  const [usersList, setUsersList] = useState([])
  const [listLoading, setListLoading] = useState(true)

  // State for user creation form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: ''
  })
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  // Redirect unauthorized users
  useEffect(() => {
    if (!authLoading) {
      if (!isLoggedIn) {
        navigate('/login')
      } else if (user?.role !== 'SUPER_ADMIN' && user?.role !== 'STORE_OWNER') {
        navigate('/')
      }
    }
  }, [isLoggedIn, user, authLoading, navigate])

  // Set default role when user context is loaded
  useEffect(() => {
    if (user) {
      if (user.role === 'STORE_OWNER') {
        setFormData((prev) => ({ ...prev, role: 'STORE_STAFF' }))
      } else if (user.role === 'SUPER_ADMIN') {
        setFormData((prev) => ({ ...prev, role: 'STORE_OWNER' }))
      }
    }
  }, [user])

  // Fetch existing users list
  const fetchUsers = async () => {
    setListLoading(true)
    try {
      const token = localStorage.getItem('furni_token')
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000'}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error('Failed to fetch users list')
      }
      const data = await response.json()
      setUsersList(data)
    } catch (err) {
      console.error(err)
    } finally {
      setListLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn && (user?.role === 'SUPER_ADMIN' || user?.role === 'STORE_OWNER')) {
      fetchUsers()
    }
  }, [isLoggedIn, user])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setFormSuccess('')
    setSubmitLoading(true)

    const { fullName, email, password, role } = formData

    // Front-end validations
    if (!fullName || !email || !password || !role) {
      setFormError('Please fill in all fields.')
      setSubmitLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.')
      setSubmitLoading(false)
      return
    }

    // Password complexity validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
    if (!passwordRegex.test(password)) {
      setFormError(
        'Password must be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, numbers, and special characters.'
      )
      setSubmitLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('furni_token')
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000'}/api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fullName, email, password, role })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create user account')
      }

      setFormSuccess(data.message || 'User registered successfully!')
      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        password: '',
        role: user?.role === 'STORE_OWNER' ? 'STORE_STAFF' : 'STORE_OWNER'
      })
      // Refresh the users list
      fetchUsers()
    } catch (err) {
      setFormError(err.message || 'An error occurred while creating the account.')
    } finally {
      setSubmitLoading(false)
    }
  }

  if (authLoading || (!isLoggedIn || (user?.role !== 'SUPER_ADMIN' && user?.role !== 'STORE_OWNER'))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-neutral-900"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50/50">
      <Header />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title */}
        <div className="mb-10 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Administrative Portal</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-neutral-900 mt-2">
            User Management Dashboard
          </h1>
          <p className="text-sm text-neutral-500 mt-2 font-medium">
            Manage organization members, provision credentials, and delegate access privileges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Create User Form Section */}
          <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-md">
            <h2 className="text-lg font-serif font-bold text-neutral-900 mb-6 text-left border-b border-neutral-100 pb-3">
              Add New User
            </h2>

            {formError && (
              <div className="mb-6 p-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-xl text-left">
                {formError}
              </div>
            )}

            {formSuccess && (
              <div className="mb-6 p-4 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl text-left">
                {formSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full py-2.5 px-4 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. rahul@furnistore.com"
                  className="w-full py-2.5 px-4 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter complex password"
                  className="w-full py-2.5 px-4 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
                  required
                />
                <span className="text-[9px] text-neutral-400 mt-1 block leading-relaxed">
                  Must be at least 8 characters, containing uppercase, lowercase, numbers, and special characters.
                </span>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  Role Authorization
                </label>
                {user?.role === 'STORE_OWNER' ? (
                  <div className="relative">
                    <input
                      type="text"
                      value="Store Staff"
                      disabled
                      className="w-full py-2.5 px-4 text-sm text-neutral-500 bg-neutral-100 border border-neutral-200 rounded-xl cursor-not-allowed"
                    />
                    <input type="hidden" name="role" value="STORE_STAFF" />
                  </div>
                ) : (
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full py-2.5 px-4 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
                    required
                  >
                    <option value="STORE_OWNER">Store Owner</option>
                    <option value="STORE_STAFF">Store Staff</option>
                  </select>
                )}
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="w-full mt-2 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors duration-200 font-bold uppercase tracking-widest text-xs rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {submitLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  'Create User Account'
                )}
              </button>
            </form>
          </div>

          {/* Existing Users Table Section */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-md">
            <h2 className="text-lg font-serif font-bold text-neutral-900 mb-6 text-left border-b border-neutral-100 pb-3">
              Existing Accounts
            </h2>

            {listLoading ? (
              <div className="py-20 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
              </div>
            ) : usersList.length === 0 ? (
              <div className="py-20 text-center text-sm text-neutral-400">
                No users found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 pb-3 pl-2">Name</th>
                      <th className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 pb-3">Email Address</th>
                      <th className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 pb-3">Authorized Role</th>
                      <th className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 pb-3">Created On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((usr) => (
                      <tr key={usr.id} className="border-b border-neutral-50 hover:bg-neutral-50/50 transition-colors">
                        <td className="py-4 pl-2 text-sm font-semibold text-neutral-800">{usr.full_name}</td>
                        <td className="py-4 text-sm text-neutral-500 font-medium">{usr.email}</td>
                        <td className="py-4">
                          <span
                            className={`inline-block px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md ${
                              usr.role === 'SUPER_ADMIN'
                                ? 'bg-purple-50 text-purple-600 border border-purple-100'
                                : usr.role === 'STORE_OWNER'
                                ? 'bg-amber-50 text-amber-600 border border-amber-100'
                                : usr.role === 'STORE_STAFF'
                                ? 'bg-sky-50 text-sky-600 border border-sky-100'
                                : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                            }`}
                          >
                            {usr.role.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-4 text-xs text-neutral-400 font-medium">
                          {new Date(usr.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default UserManagement
