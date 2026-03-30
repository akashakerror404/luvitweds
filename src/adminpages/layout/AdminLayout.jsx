import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import LoadingBar from '../Ui/LoadingBar'
import '../admin.css'

export default function AdminLayout() {
    const loading = false
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [location])

    return (
        <>
            <LoadingBar loading={loading} />
            <div className="dash-root">
                {/* Mobile overlay */}
                {mobileMenuOpen && (
                    <div 
                        className="mobile-overlay" 
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
                
                <Sidebar 
                    isMobile={isMobile} 
                    mobileMenuOpen={mobileMenuOpen}
                    setMobileMenuOpen={setMobileMenuOpen}
                />
                
                <div className="main-area">
                    <Topbar 
                        isMobile={isMobile} 
                        setMobileMenuOpen={setMobileMenuOpen}
                        mobileMenuOpen={mobileMenuOpen}
                    />
                    <main className="content-area">
                        <div key={location.pathname} className="content-inner">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}