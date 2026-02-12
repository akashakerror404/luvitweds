import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation as SwiperNavigation, Pagination as SwiperPagination, Autoplay as SwiperAutoplay, EffectCreative as SwiperEffectCreative } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import only the initial images needed for the hero section
import sectionOne1 from '../../assets/GALLERY/SECTION_ONE/sectionone (1).jpg';
import sectionOne2 from '../../assets/GALLERY/SECTION_ONE/sectionone (2).jpg';
import sectionOne3 from '../../assets/GALLERY/SECTION_ONE/sectionone (3).jpg';
import sectionOne4 from '../../assets/GALLERY/SECTION_ONE/sectionone (4).jpg';
import sectionOne6 from '../../assets/GALLERY/SECTION_ONE/sectionone (6).jpg';
import sectionOne7 from '../../assets/GALLERY/SECTION_ONE/sectionone (7).jpg';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initial hero images
  const galleryImagessectionone = [
    sectionOne1,
    sectionOne2,
    sectionOne3,
    sectionOne4,
    sectionOne6,
    sectionOne7
  ];

  // Image data with captions - now we'll dynamically import these
  const imageData = [
    { id: 1, caption: "A moment captured forever." },
    { id: 2, caption: "A walk to remember." },
    { id: 3, caption: "The beauty of togetherness." },
    { id: 4, caption: "In the arms of love." },
    { id: 5, caption: "A love that feels like magic." },
    { id: 6, caption: "Forever and always." },
    { id: 7, caption: "A moment of pure joy." },
    { id: 8, caption: "Forever united in love." },
    { id: 9, caption: "The start of forever." },
    { id: 10, caption: "A love that never fades." },
    { id: 11, caption: "Love in every glance." },
    { id: 12, caption: "A love like no other." },
    { id: 13, caption: "Cherished forever." },
    { id: 14, caption: "Unspoken promises in a glance." },
    { id: 15, caption: "Two souls, one heart." },
    { id: 16, caption: "The spark of love." },
    { id: 17, caption: "Sealed with a kiss." },
    { id: 18, caption: "Moments that matter." },
    { id: 19, caption: "The magic of us." },
    { id: 20, caption: "Hand in hand, always." },
    { id: 21, caption: "Eyes that speak love." },
    { id: 22, caption: "A shared heartbeat." },
    { id: 23, caption: "Together is a beautiful place." },
    { id: 24, caption: "Our love, our story." },
    { id: 25, caption: "Walking into forever." },
    { id: 26, caption: "Moments frozen in time." },
    { id: 27, caption: "A journey of love." },
    { id: 28, caption: "You complete me." },
    { id: 29, caption: "Love is in the air." },
    { id: 30, caption: "Endless smiles." },
    { id: 31, caption: "You & Me." },
    { id: 32, caption: "Dancing under the stars." },
    { id: 33, caption: "Our forever begins here." },
    { id: 34, caption: "This is us." },
    { id: 35, caption: "True love's gaze." },
    { id: 36, caption: "Captured happiness." },
    { id: 37, caption: "Just us." },
    { id: 38, caption: "Our timeless moment." },
    { id: 39, caption: "Written in the stars." },
    { id: 40, caption: "In your arms, always." },
    { id: 41, caption: "Every moment matters." },
    { id: 42, caption: "The best day of our lives." },
    { id: 43, caption: "Forever begins today." },
    { id: 44, caption: "Side by side, heart to heart." },
    { id: 45, caption: "Love captured perfectly." },
    { id: 46, caption: "Together is better." },
    { id: 47, caption: "Happiness in a frame." },
    { id: 48, caption: "Every step with you." },
    { id: 49, caption: "The light of our love." },
    { id: 50, caption: "Promises made." },
    { id: 51, caption: "Smiles that tell a story." },
    { id: 52, caption: "Pure connection." },
    { id: 53, caption: "Our moment of joy." },
    { id: 54, caption: "Hearts in harmony." },
    { id: 55, caption: "Simply meant to be." },
    { id: 56, caption: "Bound by love." },
    { id: 57, caption: "United in happiness." },
    { id: 58, caption: "Every glance, a promise." },
    { id: 59, caption: "Smiles that shine bright." },
    { id: 60, caption: "Whispers of forever." },
    { id: 61, caption: "Soulmate vibes." },
    { id: 62, caption: "Our kind of love." },
    { id: 63, caption: "Every heartbeat for you." },
    { id: 64, caption: "Sweet embrace." },
    { id: 65, caption: "Hearts aligned." },
    { id: 66, caption: "Magic in the moment." },
    { id: 67, caption: "Just love." },
    { id: 68, caption: "Boundless bliss." },
    { id: 69, caption: "Captured love." },
    { id: 70, caption: "Infinite memories." },
    { id: 71, caption: "Together always." },
    { id: 72, caption: "Endless happiness." },
    { id: 73, caption: "All that I need is you." },
    { id: 74, caption: "You light up my world." },
    { id: 75, caption: "Dreams fulfilled." },
    { id: 76, caption: "Moments worth cherishing." },
    { id: 77, caption: "Together, unstoppable." },
    { id: 78, caption: "The power of love." },
    { id: 79, caption: "Serenity in your smile." },
    { id: 80, caption: "Our happy place." },
    { id: 81, caption: "Faith, trust, and love." },
    { id: 82, caption: "Love is our language." },
    { id: 83, caption: "My forever person." },
    { id: 84, caption: "Endlessly in love." },
    { id: 85, caption: "Together, always." },
    { id: 86, caption: "More than words." },
    { id: 87, caption: "Sweet serenity." },
    { id: 88, caption: "Our chapter of love." },
    { id: 89, caption: "Every glance a spark." },
    { id: 90, caption: "Only us." },
    { id: 91, caption: "My constant, my love." },
    { id: 92, caption: "Hold me forever." },
    { id: 93, caption: "Ever after begins here." },
    { id: 94, caption: "Graceful love." },
    { id: 95, caption: "In every lifetime." },
    { id: 96, caption: "Your smile, my joy." },
    { id: 97, caption: "Forever yours." },
    { id: 98, caption: "A vow of love." },
    { id: 99, caption: "Hearts forever intertwined." },
    { id: 100, caption: "A love that never lets go." },
    { id: 101, caption: "A connection like no other." },
    { id: 102, caption: "A bond forged in love." },
    { id: 103, caption: "Together, always and forever." },
    { id: 104, caption: "A love that grows stronger with time." },
    { id: 105, caption: "A bond that never fades." },
    { id: 106, caption: "Together through every storm." },
    { id: 107, caption: "The beginning of forever." },
    { id: 108, caption: "Love that stands the test of time." },
    { id: 109, caption: "Forever united in heart." },
    { id: 110, caption: "A perfect love story in the making." },
    { id: 111, caption: "Together, always and forever." },
  ];

  // Function to dynamically import images - wrapped in useCallback
  const loadImages = useCallback(async (start, end) => {
    setIsLoading(true);
    try {
      const newImages = await Promise.all(
        imageData.slice(start, end).map(async (item) => {
          const image = await import(`../../assets/GALLERY/SECTION_TWO/sectiontwo (${item.id}).jpg`);
          return {
            ...item,
            image: image.default
          };
        })
      );
      setLoadedImages(prev => [...prev, ...newImages]);
    } catch (error) {
      console.error("Error loading images:", error);
    } finally {
      setIsLoading(false);
    }
  }, [imageData]); // Added imageData as dependency

  // Load initial set of images
  useEffect(() => {
    loadImages(0, visibleCount);
  }, [loadImages, visibleCount]); // Added missing dependencies

  // Load more images when visibleCount increases
  useEffect(() => {
    if (visibleCount > 20) {
      loadImages(loadedImages.length, visibleCount);
    }
  }, [visibleCount, loadImages, loadedImages.length]); // Added missing dependencies

  const loadMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + 20, imageData.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8FAF0]">
      {/* Header Section */}
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-playfair text-[#328E6E] mb-6">
            Wedding Gallery
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-montserrat leading-relaxed">
            Step into a world of enchanting moments and timeless celebrations. Our gallery showcases the magic of love stories we've had the privilege to capture and create.
          </p>
        </div>
      </div>

      {/* Hero Section with Slider */}
      <section className="h-[90vh] md:h-[100vh] relative overflow-hidden">
  {/* Background Overlay */}
  <div className="absolute inset-0 bg-black/20 z-0" />
  
  {/* Floating Petals Decoration */}
  <div className="absolute inset-0 overflow-hidden z-0">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={`petal-${i}`}
        initial={{ opacity: 0, y: -20, x: Math.random() * 100 }}
        animate={{
          opacity: [0, 0.6, 0],
          y: [0, window.innerHeight],
          x: Math.random() * 100 - 50,
          rotate: Math.random() * 360
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear"
        }}
        className="absolute text-white/30"
        style={{
          fontSize: `${10 + Math.random() * 20}px`,
          left: `${Math.random() * 100}%`,
          top: `-10%`
        }}
      >
        ❦
      </motion.div>
    ))}
  </div>

  {/* Desktop Swiper */}
  <div className="hidden md:block h-full w-full">
    <Swiper
      modules={[SwiperNavigation, SwiperPagination, SwiperAutoplay, SwiperEffectCreative]}
      effect="creative"
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
          opacity: 0
        },
        next: {
          translate: ["100%", 0, 0],
          opacity: 0
        }
      }}
      centeredSlides={true}
      slidesPerView={1.2}
      loop={true}
      speed={1200}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ 
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} bg-white !w-3 !h-3 !mx-1.5 !opacity-50"></span>`;
        }
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      className="h-full"
    >
      {galleryImagessectionone.slice(0, 7).map((image, index) => (
        <SwiperSlide key={`desktop-${index}`}>
          <motion.div 
            className="h-full w-full relative overflow-hidden rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={image}
              alt={`Featured Wedding ${index + 1}`}
              className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="font-montserrat text-sm tracking-widest"
              >
                WEDDING STORY {index + 1}
              </motion.p>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="font-playfair text-3xl mt-2"
              >
                {["Eternal Love", "Timeless Elegance", "Romantic Bliss", "Dream Wedding", "Golden Moment", "Fairytale Day"][index]}
              </motion.h3>
            </div>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
    
    {/* Custom Navigation Arrows */}
    <div className="swiper-button-next !text-white !right-12 after:!text-2xl" />
    <div className="swiper-button-prev !text-white !left-12 after:!text-2xl" />
  </div>

  {/* Mobile Swiper */}
  <div className="md:hidden h-full w-full">
    <Swiper
      modules={[SwiperPagination, SwiperAutoplay]}
      slidesPerView={1}
      loop={true}
      speed={1000}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ 
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} bg-white !w-2 !h-2 !mx-1 !opacity-50"></span>`;
        }
      }}
      className="h-full"
    >
      {galleryImagessectionone.slice(0, 7).map((image, index) => (
        <SwiperSlide key={`mobile-${index}`}>
          <div className="h-full w-full relative overflow-hidden">
            <img 
              src={image}
              alt={`Featured Wedding ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="font-montserrat text-xs tracking-widest">
                WEDDING STORY {index + 1}
              </p>
              <h3 className="font-playfair text-xl mt-1">
                {["Eternal Love", "Timeless", "Romantic", "Dream Day"][index]}
              </h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  
  {/* Main Title */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 pointer-events-none"
  >
    <div className="text-center text-white max-w-4xl mx-auto">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="mb-6 md:mb-10"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold mb-4 text-shadow-lg">
          Our <span className="text-gold-400">Masterpieces</span>
        </h1>
        <div className="w-24 h-1 bg-white/80 mx-auto" />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm sm:text-base md:text-lg lg:text-xl font-montserrat font-light tracking-wider leading-relaxed text-shadow"
      >
        Where every frame whispers a love story, every glance holds eternity, and every moment becomes art
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-8 md:mt-12"
      >
        <button className="pointer-events-auto px-8 py-3 bg-transparent border border-white/50 text-white font-montserrat text-sm tracking-widest hover:bg-white/10 transition-all duration-300 hover:border-white/80">
          VIEW GALLERY
        </button>
      </motion.div>
    </div>
  </motion.div>
</section>

      {/* Gallery Grid */}
      <section className="py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {loadedImages.slice(0, visibleCount).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
                onClick={() => setSelectedImage(item.image)}
              >
                <img 
                  src={item.image} 
                  alt={`Wedding Story ${item.id}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-playfair text-2xl mb-2">
                      {item.caption}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full aspect-[4/5] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                className="w-full h-full object-cover"
                alt="Selected artwork"
              />
              <button 
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl hover:bg-white/20 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {visibleCount < imageData.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <button 
            onClick={loadMoreImages}
            disabled={isLoading}
            className="px-16 py-6 bg-[#328E6E] text-white text-2xl rounded-full font-montserrat hover:bg-[#67AE6E] transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Explore More Stories'}
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default Gallery