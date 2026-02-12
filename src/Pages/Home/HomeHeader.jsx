import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup'
import hero1 from '../../assets/HERO_IMAGES/hero1.jpg';
import hero2 from '../../assets/HERO_IMAGES/hero2.jpg';
import hero3 from '../../assets/HERO_IMAGES/hero3.jpg';
import hero4 from '../../assets/HERO_IMAGES/hero4.jpg';
import hero5 from '../../assets/HERO_IMAGES/hero5.jpg';
import hero6 from '../../assets/HERO_IMAGES/hero6.jpg';
import hero7 from '../../assets/HERO_IMAGES/hero7.jpg';

import wed01 from '../../assets/WEDDING_IMAGES/wed01.jpg';
import wed02 from '../../assets/WEDDING_IMAGES/wed02.jpg';
import wed03 from '../../assets/WEDDING_IMAGES/wed03.jpg';
import wed04 from '../../assets/WEDDING_IMAGES/wed04.jpg';
import wed05 from '../../assets/WEDDING_IMAGES/wed05.jpg';
import wed06 from '../../assets/WEDDING_IMAGES/wed06.jpg';


import TESTIMONIALS01 from '../../assets/TESTIMONIALS/TESTIMONIALS-01.jpg';
import TESTIMONIALS02 from '../../assets/TESTIMONIALS/TESTIMONIALS-02.jpg';
import TESTIMONIALS03 from '../../assets/TESTIMONIALS/TESTIMONIALS-03.jpg';
import TESTIMONIALS04 from '../../assets/TESTIMONIALS/TESTIMONIALS-04.jpg';
import Test from '../Test/Test';



const HERO_IMAGES = [hero1, hero2, hero3, hero4, hero5, hero6, hero7,]
const WEDDING_IMAGES = [wed01, wed02, wed03, wed04, wed05, wed06];
const TESTIMONIALS = [
  {
    name: 'Sudeesh & Rincy',
    image: TESTIMONIALS01,
    text: '"Our engagement was nothing short of perfect. From breathtaking décor to the magical atmosphere, every detail was flawlessly executed. Luvit Weds didn’t just plan our day — they created a masterpiece.',
    type: 'Engagement',
    date: 'June 2024'
  },

  {
    name: 'Rahul & Smaya',
    image: TESTIMONIALS02,
    text: '"Our traditional wedding was a dream come true. Luvit Weds beautifully blended rituals with elegance, creating a celebration that truly honored our roots. Every moment felt special and meaningful."',
    type: 'Traditional Wedding',
    date: 'May 2024'
  }
  ,
  {
    name: 'Pranav & Kavya',
    image: TESTIMONIALS03,
    text: '"Our engagement shoot was a dream come true. Every frame, every backdrop, every vibe felt personal and magical. Luvit Weds captured our love story like a true piece of art."',
    type: 'Engagement',
    date: 'April 2024'
  },
  {
    name: 'Deepak & Rash Patil',
    image: TESTIMONIALS04,
    text: '"Our post-wedding shoot in Manali was absolutely magical. The snow-capped mountains, pristine valleys, and the team\'s expertise in capturing those perfect moments made our experience unforgettable. Every photo tells our love story against the stunning Himalayan backdrop."',
    type: 'Post Wedding Shoot',
    date: 'March 2025'
  }
]


function HomeHeader() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === HERO_IMAGES.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Enhanced Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative h-screen"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0">
      <AnimatePresence mode='wait'>
        <motion.img
          key={currentImageIndex}
          src={HERO_IMAGES[currentImageIndex]}
          alt="Wedding Celebration"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-[#328E6E]/10 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />
    </div>

    {/* Content Layer */}
    <div className="relative h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Tagline with decorative elements */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-12 h-0.5 bg-[#E1EEBC]" />
            <span className="text-[#E1EEBC] font-montserrat tracking-widest text-sm">YOUR DREAM WEDDING STARTS HERE</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight"
          >
            Crafting Your <span className="text-[#E1EEBC]">Perfect</span> Love Story
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            className="text-lg sm:text-xl text-gray-100 mb-10 font-montserrat leading-relaxed max-w-lg"
          >
            From intimate ceremonies to grand celebrations, we specialize in creating bespoke wedding experiences that reflect your unique love story.
          </motion.p>

          {/* Stats Section */}
   <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="flex flex-wrap md:justify-start justify-center gap-4 mb-12"
>
  {/* Years Experience */}
  <div className="flex items-baseline gap-1.5 px-4 py-2.5">
    <span className="text-3xl font-medium text-[#E1EEBC] font-playfair">
      <CountUp end={12} duration={1.8} suffix="+" />
    </span>
    <span className="text-white/90 font-montserrat text-sm tracking-tight">Years</span>
  </div>

  {/* Happy Couples */}
  <div className="flex items-baseline gap-1.5 px-4 py-2.5">
    <span className="text-3xl font-medium text-[#E1EEBC] font-playfair">
      <CountUp end={450} duration={1.8} suffix="+" />
    </span>
    <span className="text-white/90 font-montserrat text-sm tracking-tight">Couples</span>
  </div>

  {/* Awards */}
  <div className="flex items-baseline gap-1.5 px-4 py-2.5">
    <span className="text-3xl font-medium text-[#E1EEBC] font-playfair">
      <CountUp end={27} duration={1.8} />
    </span>
    <span className="text-white/90 font-montserrat text-sm tracking-tight">Awards</span>
  </div>

  {/* Satisfaction */}
  <div className="flex items-baseline gap-1.5 px-4 py-2.5">
    <span className="text-3xl font-medium text-[#E1EEBC] font-playfair">
      <CountUp end={100} duration={1.8} suffix="%" />
    </span>
    <span className="text-white/90 font-montserrat text-sm tracking-tight">Satisfaction</span>
  </div>
</motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#67AE6E',
                boxShadow: '0 10px 25px rgba(50, 142, 110, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#328E6E] text-white text-lg rounded-full font-montserrat transition-all duration-300 shadow-lg flex items-center gap-2"
              onClick={() => navigate('/packages')}
            >
              Start Planning
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: '#E1EEBC',
                color: '#328E6E',
                borderColor: '#E1EEBC'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/gallery')}
              className="px-8 py-4 border-2 border-white text-white text-lg rounded-full font-montserrat transition-all duration-300 shadow-lg hover:bg-[#E1EEBC] hover:text-[#328E6E]"
            >
              Explore Our Work
            </motion.button>
          </motion.div>
            </div>
          </div>
        </div>


        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <p className="text-[#E1EEBC] mb-2 font-montserrat">Scroll to Explore</p>
          <div className="w-6 h-10 border-2 border-[#E1EEBC] rounded-full flex justify-center mx-auto">
            <div className="w-1 h-3 bg-[#E1EEBC] rounded-full mt-2" />
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Wedding Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair text-[#328E6E] mb-4">Magical Moments</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
              Every wedding tells a unique story. Browse through our gallery of enchanting celebrations that showcase our dedication to creating perfect moments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {WEDDING_IMAGES.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] group"
              >
                <img
                  src={image}
                  alt={`Wedding Gallery ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-montserrat text-lg">Discover the story behind this magical day</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* <Test/> */}

      {/* Enhanced Couple Stories Section */}
      <section className="py-20 bg-[#F8FAF0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair text-[#328E6E] mb-4">Love Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
              Real couples, real emotions, real memories. Discover how we helped these couples bring their dream weddings to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}'s Wedding`}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100 group-hover:opacity-40 transition-opacity duration-300" />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-2xl font-playfair text-[#328E6E]">{testimonial.name}</h3>
                    <div className="ml-auto flex gap-2">
                      <span className="text-yellow-400">★★★★★</span>
                    </div>
                  </div>
                  <p className="text-gray-600 font-montserrat leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="mt-6 flex items-center text-sm text-gray-500">
                    <span className="mr-4">{testimonial.type}</span>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair text-[#328E6E] mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
              From full-service planning to day-of coordination, we offer a range of services to suit your needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Full Planning",
                description: "Comprehensive wedding planning from start to finish, including vendor coordination, design, and timeline management.",
                icon: "🎨"
              },
              {
                title: "Partial Planning",
                description: "Perfect for couples who've started planning but need professional guidance to bring their vision to life.",
                icon: "✨"
              },
              {
                title: "Day-of Coordination",
                description: "Ensuring your wedding day runs smoothly while you focus on celebrating with loved ones.",
                icon: "📋"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#F8FAF0] p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-playfair text-[#328E6E] mb-4">{service.title}</h3>
                <p className="text-gray-600 font-montserrat">{service.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-2 bg-[#328E6E] text-white rounded-full font-montserrat text-sm"
                >
                  Learn More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Contact Section */}
      <section className="py-20 bg-[#328E6E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-playfair mb-4">Start Your Journey</h2>
            <p className="max-w-2xl mx-auto font-montserrat">
              Ready to begin planning your dream wedding? Get in touch with us today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-montserrat mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#328E6E]" />
                </div>
                <div>
                  <label className="block text-gray-700 font-montserrat mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#328E6E]" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-montserrat mb-2">Message</label>
                <textarea className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#328E6E] h-32"></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-[#328E6E] text-white rounded-full font-montserrat text-lg hover:bg-[#67AE6E] transition-colors duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomeHeader