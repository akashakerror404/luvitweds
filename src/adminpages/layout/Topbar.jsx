import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Icon, { ICONS } from '../Ui/Icon'
import { NAV_ITEMS } from '../Constants/navItems'

export default function Topbar({ isMobile, setMobileMenuOpen, mobileMenuOpen }) {
  const [time, setTime] = useState(new Date())
  const [notifs, setNotifs] = useState(3)
  const [showSearch, setShowSearch] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for theme preference
    const savedTheme = localStorage.getItem('adminTheme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    // Default to dark mode
    return true
  })
  const { pathname } = useLocation()

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Apply theme to admin layout
  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark')
      localStorage.setItem('adminTheme', 'dark')
    } else {
      root.setAttribute('data-theme', 'light')
      localStorage.setItem('adminTheme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const current = NAV_ITEMS.find(n => n.path === pathname) || { label: 'Settings' }

  return (
    <header className={`topbar ${!isDarkMode ? 'topbar-light' : ''}`}>
      <div className="topbar-left">
        {isMobile && (
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        )}
        <div>
          <div className={`topbar-title ${!isDarkMode ? 'text-dark' : ''}`}>{current.label}</div>
          <div className="topbar-breadcrumb">AutoAdmin &nbsp;/&nbsp; {current.label}</div>
        </div>
      </div>
      <div className="topbar-right">
        {!isMobile && (
          <>
            <div className="time-badge">
              <Icon d={ICONS.clock} size={12} />
              &nbsp;{time.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' })}
            </div>
            <div className="search-box">
              <Icon d={ICONS.search} size={14} />
              <input placeholder="Search..." />
            </div>
          </>
        )}
        
        {/* Theme Toggle Button */}
        <button className="icon-btn theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        
        {isMobile && (
          <button 
            className="icon-btn"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Icon d={ICONS.search} size={17} />
          </button>
        )}
        
        <button className="icon-btn" onClick={() => setNotifs(0)}>
          <Icon d={ICONS.bell} size={17} />
          {notifs > 0 && <span className="notif-dot" />}
        </button>
        
        <div className="avatar" style={{ cursor:'pointer', fontSize:'12px' }}>AK</div>
      </div>
      
      {/* Mobile search dropdown */}
      {isMobile && showSearch && (
        <div className="mobile-search-dropdown">
          <div className="search-box mobile-search-box">
            <Icon d={ICONS.search} size={14} />
            <input 
              placeholder="Search..." 
              autoFocus
              onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            />
          </div>
        </div>
      )}
    </header>
  )
}