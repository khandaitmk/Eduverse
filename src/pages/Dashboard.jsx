import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import Loader from '../components/common/Loader'
import SideBar from '../components/core/Dashboard/SideBar'

function Dashboard() {
  const { loading: authLoading } = useSelector(state => state.auth)
  const { loading: profileLoading } = useSelector(state => state.profile)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close sidebar on route change (mobile UX fix)
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  if (profileLoading || authLoading) {
    return <Loader />
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-richblack-800">

      {/* Mobile Top Bar */}
      <div className="fixed top-[3.5rem] left-0 right-0 z-40 flex items-center bg-richblack-800 border-b border-richblack-700 p-4 lg:hidden">
        <button
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="text-richblack-100"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed overflow-visible  top-[3.5rem] left-0 z-40 h-[calc(100vh-3.5rem)]
          w-[260px] bg-richblack-800
          transform transition-transform duration-300
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:static lg:translate-x-0 lg:h-auto
        `}
      >
        <SideBar setMobileMenuOpen={setMobileMenuOpen} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-richblack-900 pt-[3.5rem] lg:pt-0">
        <Outlet />
      </main>

    </div>
  )
}

export default Dashboard
