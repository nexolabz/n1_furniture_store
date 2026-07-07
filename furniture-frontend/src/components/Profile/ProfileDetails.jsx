import { useState } from 'react'

function ProfileDetails({ activeTab }) {
  const [profile, setProfile] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+91 98765 43210'
  })
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  // Mock orders
  const orders = [
    {
      id: 'ORD-5832',
      date: 'June 28, 2026',
      items: 'Scandinavian Modular Sofa (x1)',
      price: 54999,
      status: 'In Transit'
    },
    {
      id: 'ORD-4190',
      date: 'May 15, 2026',
      items: 'Minimalist Study Desk (x1), Ergonomic Executive Chair (x1)',
      price: 41498,
      status: 'Delivered'
    }
  ]

  return (
    <div className="flex-grow bg-white border border-neutral-100 p-6 sm:p-8 rounded-2xl shadow-xs text-left">
      
      {/* Account Details Tab */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 font-sans">Account Information</h2>
            <p className="text-xs text-neutral-400 mt-1">Update your personal account credentials and details.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">First Name</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="w-full text-sm py-2.5 px-4 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">Last Name</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="w-full text-sm py-2.5 px-4 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full text-sm py-2.5 px-4 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-2">Phone Number</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full text-sm py-2.5 px-4 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400 focus:bg-white transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              className={`w-full sm:w-fit px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 ${
                isSaved
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-neutral-900 hover:bg-neutral-850 text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Changes Saved!</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Order History Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 font-sans">Order History</h2>
            <p className="text-xs text-neutral-400 mt-1">Review status and details of your previous orders.</p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-neutral-100 rounded-xl p-5 flex flex-col sm:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-neutral-800">{order.id}</span>
                    <span className="text-[10px] text-neutral-400">•</span>
                    <span className="text-xs text-neutral-500 font-medium">{order.date}</span>
                  </div>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed max-w-md">
                    {order.items}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-50">
                  <span className="text-base font-black text-neutral-900">
                    ₹{order.price.toLocaleString()}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                    order.status === 'Delivered'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default ProfileDetails
