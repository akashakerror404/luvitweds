import React from 'react'
import { motion } from 'framer-motion'

// PDF IMPORTS
import WEDDING_BROCHURE from '../../assets/PACKAGES/WEDDING/DIAMOND.pdf'
import ENGAGEMENT_BROCHURE from '../../assets/PACKAGES/ENGAGEMENT/DIAMOND.pdf'

function Packages() {
  return (
    <div className="min-h-screen bg-[#f0e9e0] text-[#2d2d2d] pt-32 pb-20 selection:bg-[#8ba88e] selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* --- PAGE HEADER --- */}
        <header className="mb-32">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#8ba88e] font-montserrat font-bold block mb-4"
          >
            Investment
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-playfair leading-tight italic"
          >
            Collections <br />
            <span className="not-italic">&</span> Pricing
          </motion.h1>
          <div className="h-[1px] bg-black/10 w-full mt-16" />
        </header>

        {/* --- WEDDING SECTION --- */}
        <section className="mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-playfair lowercase italic mb-8"
              >
                wedding collections
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-montserrat text-sm md:text-base text-gray-500 leading-relaxed max-w-xl italic mb-12"
              >
                Our wedding collections are meticulously crafted to preserve the grandeur of your union. From our Platinum Heritage to the Timeless Gold essence, explore our complete tier structures in the collective guide.
              </motion.p>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <motion.a 
                href={WEDDING_BROCHURE}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-between gap-12 text-[10px] tracking-[0.5em] uppercase border border-black/20 px-10 py-8 transition-all duration-500 hover:bg-[#2d2d2d] hover:text-white"
              >
                <span className="relative z-10">Download Wedding Catalog</span>
                <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>
            </div>
          </div>
          <div className="h-[1px] bg-black/5 w-full mt-24" />
        </section>

        {/* --- ENGAGEMENT SECTION --- */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-playfair lowercase italic mb-8"
              >
                engagement films
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-montserrat text-sm md:text-base text-gray-500 leading-relaxed max-w-xl italic mb-12"
              >
                A cinematic approach to your pre-wedding narrative. We focus on the chemistry, the landscape, and the unspoken promises. View our comprehensive engagement film guide.
              </motion.p>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <motion.a 
                href={ENGAGEMENT_BROCHURE}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-between gap-12 text-[10px] tracking-[0.5em] uppercase border border-black/20 px-10 py-8 transition-all duration-500 hover:bg-[#2d2d2d] hover:text-white"
              >
                <span className="relative z-10">Download Engagement Collective</span>
                <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.a>
            </div>
          </div>
        </section>

        {/* --- FOOTER CTA --- */}
        <footer className="mt-60 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-[#8ba88e] opacity-30 -translate-y-full" />
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-playfair italic mb-12"
          >
            Ready to craft your story?
          </motion.h2>
          <button className="text-[10px] tracking-[0.7em] uppercase border border-black px-16 py-6 hover:bg-black hover:text-white transition-all duration-700">
            Request a Custom Quote
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Packages;