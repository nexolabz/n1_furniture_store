import React from 'react'

function ProfileSidebar({ activeTab, setActiveTab, onLogout }) {
  const tabs = [
    { id: 'account', label: 'Account Details', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'orders', label: 'Order History', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )}
  ]

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs h-fit flex flex-col justify-between space-y-8">
      
      {/* Tab Selectors */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 border-b border-neutral-100 pb-2 text-left">
          Settings
        </h3>
        <ul className="space-y-2 text-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left font-medium transition-all duration-200 py-2 px-3.5 rounded-lg flex items-center space-x-3 cursor-pointer ${
                    isActive
                      ? 'text-amber-700 bg-amber-50/60 font-bold'
                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <span className={isActive ? 'text-amber-700' : 'text-neutral-400'}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="border-t border-neutral-100 pt-4">
        <button
          onClick={onLogout}
          className="w-full py-2.5 px-3.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-250 flex items-center justify-center space-x-2 cursor-pointer border border-red-100/50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Log Out</span>
        </button>
      </div>

    </aside>
  )
}

export default ProfileSidebar
