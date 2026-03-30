import { NavLink, useNavigate } from 'react-router-dom'
import Icon, { ICONS } from '../Ui/Icon'
import { NAV_ITEMS } from '../Constants/navItems'

export default function Sidebar({ isMobile, mobileMenuOpen, setMobileMenuOpen }) {
  const navigate = useNavigate()

  const sidebarClasses = `
    sidebar 
    ${isMobile ? 'sidebar-mobile' : ''} 
    ${mobileMenuOpen ? 'sidebar-open' : ''}
  `

  return (
    <aside className={sidebarClasses}>
      <div className="sidebar-logo">
        <div className="logo-mark">
          {/* <img src="/logo.png" alt="logo" className="logo-img" /> */}
          <div>
            <div className="logo-text">LUVIT WEDS</div>
            <div className="logo-sub">Creating Timeless Memories</div>
          </div>
          {isMobile && (
            <button 
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <nav className="nav-section">
        <div className="nav-label">Main Menu</div>
        {NAV_ITEMS.map(n => (
          <NavLink 
            key={n.id} 
            to={n.path} 
            end={n.path === '/admin'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            onClick={() => isMobile && setMobileMenuOpen(false)}
          >
            <Icon d={ICONS[n.icon]} size={17} />
            {n.label}
            {n.badge && <span className="nav-badge">{n.badge}</span>}
          </NavLink>
        ))}

        <div className="nav-label" style={{ marginTop: '20px' }}>System</div>
        <NavLink 
          to="/admin/settings" 
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <Icon d={ICONS.settings} size={17} />
          Settings
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-card" onClick={() => navigate('/login')}>
          <div className="avatar">AK</div>
          <div>
            <div className="user-name">Admin Kumar</div>
            <div className="user-role">Super Admin</div>
          </div>
          <div style={{ marginLeft: 'auto', color: 'rgba(240,236,224,0.25)' }}>
            <Icon d={ICONS.logout} size={15} />
          </div>
        </div>
      </div>
    </aside>
  )
}