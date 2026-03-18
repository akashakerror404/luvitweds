import React from 'react'
import { motion } from 'framer-motion'

function About() {
  return (
    <div className="min-h-screen bg-[#f0e9e0] text-[#2d2d2d] pt-32 pb-20 selection:bg-[#8ba88e] selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* --- EDITORIAL HEADER --- */}
        <header className="mb-32">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] tracking-[0.5em] uppercase text-[#8ba88e] font-montserrat font-bold block mb-4"
          >
            The Collective
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-9xl font-playfair leading-tight italic"
          >
            Luvit <span className="not-italic">Weds</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-lg md:text-xl font-montserrat text-gray-500 max-w-xl italic leading-relaxed"
          >
            Capturing your love story through a lens of timeless elegance and cinematic truth.
          </motion.p>
          <div className="h-[1px] bg-black/10 w-full mt-16" />
        </header>

        {/* --- MAIN CONTENT: WHO WE ARE --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-playfair lowercase italic mb-8"
            >
              who we are
            </motion.h2>
          </div>
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8 font-montserrat text-sm md:text-base text-gray-600 leading-[2] tracking-wide"
            >
              <p>
                Based in the cultural heart of <span className="text-[#2d2d2d] font-semibold">Calicut, Kerala</span>, we are a collective of visual artists dedicated to the fine art of wedding documentation. Our philosophy is simple: we believe that every union is a masterpiece waiting to be framed.
              </p>
              <p>
                With our roots deeply embedded in the vibrant traditions of Kerala, we bring a unique, soulful perspective to every celebration. We don't just take photographs; we curate memories that breathe with the same life and emotion as the moment they were born.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- ASYMMETRIC SECTION: OUR JOURNEY --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40 items-center">
          <div className="lg:col-span-7 lg:order-2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-playfair lowercase italic mb-8 lg:text-right"
            >
              our journey
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-montserrat text-sm md:text-base text-gray-600 leading-[2] tracking-wide lg:text-right italic"
            >
              <p>
                From the serene backwaters of our home to breathtaking destinations across the globe, we have traveled where love leads. Our journey is defined by the trust of our couples and our relentless pursuit of visual perfection, blending traditional values with the edge of contemporary cinema.
              </p>
            </motion.div>
          </div>
          <div className="lg:col-span-5 lg:order-1">
             <div className="w-full aspect-[4/5] bg-black/5 overflow-hidden">
                {/* Add a meaningful brand image here */}
                <div className="w-full h-full flex items-center justify-center text-[10px] tracking-[0.5em] uppercase text-gray-400">
                  Visual Legacy
                </div>
             </div>
          </div>
        </section>

        {/* --- WHY CHOOSE US: MINIMALIST LIST --- */}
        <section className="py-24 border-t border-black/5 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
               <h2 className="text-3xl font-playfair italic">The Luvit Standard</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-12">
                {[
                  { title: "Global Perspective", desc: "Years of international experience documenting diverse love stories." },
                  { title: "Cultural Depth", desc: "A profound understanding of traditional rituals and modern nuances." },
                  { title: "Master Equipment", desc: "Utilizing state-of-the-art technology to ensure cinematic quality." },
                  { title: "Personal Devotion", desc: "We only take a limited number of weddings to ensure every couple receives our full heart." }
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group"
                  >
                    <span className="text-[10px] font-montserrat opacity-30">0{idx + 1}</span>
                    <div>
                      <h4 className="text-xl font-playfair mb-2 group-hover:text-[#8ba88e] transition-colors">{item.title}</h4>
                      <p className="text-sm text-gray-500 font-montserrat max-w-lg">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* --- FINAL COMMITMENT --- */}
        <footer className="text-center relative py-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-[#8ba88e] opacity-30" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-playfair italic mb-8 pt-12">Our Commitment</h2>
            <p className="font-montserrat text-gray-600 leading-relaxed italic">
              "We believe every wedding is a singular event, a piece of history that deserves to be preserved in its full glory. Whether under the Kerala sun or a distant skyline, your legacy is safe in our hands."
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  )
}

export default About