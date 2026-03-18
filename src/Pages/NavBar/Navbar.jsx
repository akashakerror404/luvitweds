import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate();
  const location = useLocation()
  const isHomePage = location.pathname === '/';

  const menuItems = ['Home', 'Gallery', 'Packages', 'About', 'Our Team']

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#f0e9e0]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center">
          
          {/* Company Logo */}
          <div 
            className="cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <h1 className={`text-2xl md:text-3xl font-playfair transition-colors duration-300 ${
              scrolled || !isHomePage ? 'text-[#2d2d2d]' : 'text-white'
            }`}>
              LUVIT <span className="opacity-70">WEDS</span>
            </h1>
            <AnimatePresence>
              {isHomePage && !scrolled && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[9px] tracking-[0.3em] uppercase text-white/70 font-montserrat mt-1"
                >
                  Creating Timeless Memories
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Minimalist Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-3 outline-none"
          >
            <span className={`hidden md:block text-[10px] tracking-[0.3em] uppercase font-montserrat transition-colors ${
              scrolled || !isHomePage ? 'text-[#2d2d2d]' : 'text-white'
            }`}>
              Menu
            </span>
            <div className="space-y-1.5">
              <span className={`block w-6 h-[1px] transition-colors ${scrolled || !isHomePage ? 'bg-[#2d2d2d]' : 'bg-white'}`}></span>
              <span className={`block w-4 h-[1px] transition-colors ${scrolled || !isHomePage ? 'bg-[#2d2d2d]' : 'bg-white'}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#f0e9e0] z-[60] flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 md:top-12 md:right-12 p-2 group"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <span className="absolute block w-8 h-[1px] bg-[#2d2d2d] rotate-45 group-hover:rotate-[135deg] transition-transform duration-500"></span>
                <span className="absolute block w-8 h-[1px] bg-[#2d2d2d] -rotate-45 group-hover:rotate-[225deg] transition-transform duration-500"></span>
              </div>
            </button>

            {/* Menu Links */}
            <div className="text-center">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] tracking-[0.5em] uppercase text-gray-400 mb-12"
              >
                Navigation
              </motion.p>
              
              <div className="space-y-6 md:space-y-8">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-4xl md:text-6xl font-playfair text-[#2d2d2d] hover:text-[#8ba88e] transition-colors relative group inline-block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                      <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#8ba88e] group-hover:w-full transition-all duration-500"></span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer Info in Menu */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-20 pt-10 border-t border-black/5"
              >
                <p className="text-[10px] tracking-widest uppercase text-gray-500 font-montserrat">
                  Based in Kerala — Available Worldwide
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar