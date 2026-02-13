import React from "react";
import { useParams } from "react-router-dom";
import { allWeddings } from "./ClinetDetails";
import Lottie from "lottie-react";
import invitation from '../../assets/Invitation/invitation.jpg'
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import song from '../../assets/Invitation/song.mp3'

// Import Lottie animations (you'll need to add these files to your project)
import heartAnimation from "./animations/weddingfloral.json";
import confettiAnimation from "./animations/weddingfloral.json";
import ringsAnimation from "./animations/Hearth";

function WeddingPage() {
    const { slug } = useParams();
    const data = allWeddings[slug];

    const [timeLeft, setTimeLeft] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    
    const [showConfetti, setShowConfetti] = React.useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
    const [showMusicPrompt, setShowMusicPrompt] = React.useState(true);
    const audioRef = React.useRef(null);

    React.useEffect(() => {
        if (!data?.wedding) return;

        const startTime = data.wedding.time.split(" - ")[0];
        const weddingDateStr = `${data.wedding.month} ${data.wedding.date}, ${data.wedding.year} ${startTime}`;
        const weddingDateTime = new Date(weddingDateStr);

        const updateCountdown = () => {
            const now = new Date();
            const difference = weddingDateTime - now;

            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
                return false;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({ days, hours, minutes, seconds });
            return true;
        };

        updateCountdown();
        const interval = setInterval(() => {
            const shouldContinue = updateCountdown();
            if (!shouldContinue) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [data]);

    // Auto-play music when component mounts
    React.useEffect(() => {
        // Create audio element
        audioRef.current = new Audio(song);
        audioRef.current.loop = true;
        
        // Attempt to autoplay (may be blocked by browsers)
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Autoplay started successfully
                    setIsMusicPlaying(true);
                    setShowMusicPrompt(false);
                })
                .catch(error => {
                    // Autoplay was prevented
                    console.log("Autoplay prevented:", error);
                    setIsMusicPlaying(false);
                    setShowMusicPrompt(true);
                });
        }

        // Cleanup function to pause music when component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []); // Empty dependency array means this runs once when component mounts

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isMusicPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsMusicPlaying(!isMusicPlaying);
            setShowMusicPrompt(false);
        }
    };

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Helmet>
                    <title>Wedding Not Found - Luvit Weds</title>
                    <meta name="description" content="The requested wedding invitation could not be found." />
                </Helmet>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xl font-light text-gray-600"
                >
                    Wedding not found
                </motion.h2>
            </div>
        );
    }

    const mobileImage = data?.couple?.images?.mobile;
    const desktopImage = data?.couple?.images?.desktop;
    const shareImage = desktopImage || mobileImage || invitation;

    const hasReception = data?.reception?.date && data?.reception?.date !== "";
    const weddingMapUrl = data?.wedding?.mapLocation || null;
    const receptionMapUrl = hasReception ? data?.reception?.mapLocation : null;

    // Dynamic meta data for social sharing
    const pageUrl = `https://luvitweds.vercel.app/luvit-wedding/${data.slug}`;
    const pageTitle = `${data.couple.bride} & ${data.couple.groom} - Wedding Invitation | Luvit Weds`;
    const pageDescription = `Join us in celebrating the wedding of ${data.couple.bride} and ${data.couple.groom} on ${data.wedding.date} ${data.wedding.month} ${data.wedding.year} at ${data.wedding.venue}. ${hasReception ? `Reception to follow at ${data.reception.venue}.` : ''}`;
    const pageImage = shareImage;

    return (
        <main className="min-h-screen bg-white overflow-hidden">
            
            {/* Music Player Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                onClick={toggleMusic}
                className="fixed bottom-6 right-6 z-50 bg-white rounded-full shadow-lg p-3 md:p-4 hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isMusicPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-[#328E6E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-[#328E6E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                )}
            </motion.button>

            {/* Music Prompt for browsers that block autoplay */}
            {showMusicPrompt && !isMusicPlaying && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-20 right-6 z-50 bg-white rounded-lg shadow-xl p-4 max-w-xs"
                >
                    <p className="text-sm text-gray-700 mb-3">
                        🎵 Would you like to play the wedding music?
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={toggleMusic}
                            className="flex-1 bg-[#328E6E] text-white text-sm py-2 px-3 rounded-lg hover:bg-[#266d56] transition"
                        >
                            Play Music
                        </button>
                        <button
                            onClick={() => setShowMusicPrompt(false)}
                            className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-lg hover:bg-gray-200 transition"
                        >
                            No, thanks
                        </button>
                    </div>
                </motion.div>
            )}

            {/* Helmet Meta Tags for SEO and Social Sharing */}
            <Helmet>
                {/* Primary Meta Tags */}
                <title>{pageTitle}</title>
                <meta name="title" content={pageTitle} />
                <meta name="description" content={pageDescription} />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:site_name" content="Luvit Weds" />
                
                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={pageUrl} />
                <meta property="twitter:title" content={pageTitle} />
                <meta property="twitter:description" content={pageDescription} />
                <meta property="twitter:image" content={pageImage} />
                
                {/* Additional Meta Tags */}
                <meta name="keywords" content={`wedding, invitation, ${data.couple.bride}, ${data.couple.groom}, marriage, reception, Luvit Weds`} />
                <meta name="author" content="Luvit Weds" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={pageUrl} />
                
                {/* Wedding Specific Meta */}
                <meta property="wedding:date" content={`${data.wedding.year}-${data.wedding.month}-${data.wedding.date}`} />
                <meta property="wedding:venue" content={data.wedding.venue} />
                {hasReception && (
                    <meta property="wedding:reception" content={data.reception.venue} />
                )}
            </Helmet>

            {/* Confetti Animation */}
            {showConfetti && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 pointer-events-none z-50"
                >
                    <Lottie 
                        animationData={confettiAnimation} 
                        loop={false}
                        className="w-full h-full"
                    />
                </motion.div>
            )}

            {/* Rest of your component remains exactly the same */}
            {/* HERO SECTION */}
            <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                
                {/* Rings Animation Overlay with Framer Motion */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                    animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute top-4 right-4 md:top-10 md:right-10 z-20 w-16 h-16 md:w-32 md:h-32"
                >
                    <Lottie 
                        animationData={ringsAnimation} 
                        loop={true}
                        className="w-full h-full"
                    />
                </motion.div>

                {/* Responsive Image with Parallax Effect */}
                <motion.picture
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {desktopImage && (
                        <source media="(min-width: 768px)" srcSet={desktopImage} />
                    )}
                    <img
                        src={mobileImage || invitation}
                        alt={`${data.couple.bride} & ${data.couple.groom}`}
                        className="w-full h-full object-cover"
                    />
                </motion.picture>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/30"></div>

                {/* Hero Text with Framer Motion */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        
                        {/* Bride Name - Top with word animation */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-2 md:mb-4"
                        >
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide drop-shadow-lg">
                                {data.couple.bride.split(' ').map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: 0.4 + (i * 0.1),
                                            ease: "easeOut"
                                        }}
                                        className="inline-block mx-1"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>
                        </motion.div>
                        
                        {/* & Symbol - Middle with special animation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: 0.9,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                            }}
                            className="my-1 md:my-2"
                        >
                            <span className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-[#FFD700] drop-shadow-lg relative">
                                &
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1.5 }}
                                    transition={{ duration: 0.4, delay: 1.1 }}
                                    className="absolute inset-0 text-[#FFD700] blur-md"
                                    style={{ zIndex: -1 }}
                                >
                                    &
                                </motion.span>
                            </span>
                        </motion.div>
                        
                        {/* Groom Name - Bottom with word animation */}
                        <motion.div 
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="mt-2 md:mt-4"
                        >
                            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide drop-shadow-lg">
                                {data.couple.groom.split(' ').map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: 1.3 + (i * 0.1),
                                            ease: "easeOut"
                                        }}
                                        className="inline-block mx-1"
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>
                        </motion.div>
                        
                        {/* Animated decorative line with shine effect */}
                        <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "6rem", opacity: 1 }}
                            transition={{ duration: 1, delay: 1.7 }}
                            className="relative w-12 md:w-16 h-0.5 bg-white/80 mx-auto mt-4 md:mt-6 overflow-hidden"
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "200%" }}
                                transition={{ 
                                    duration: 1.5, 
                                    delay: 2.2,
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                                className="absolute inset-0 bg-white w-1/2 blur-sm"
                            />
                        </motion.div>
                        
                        {/* Date reveal with elegant entrance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.9 }}
                        >
                            <p className="text-sm md:text-base uppercase tracking-[0.3em] mt-4 md:mt-6 text-white/90 font-light">
                                {data.wedding.date} {data.wedding.month} {data.wedding.year}
                            </p>
                            
                            {/* Decorative dots */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 2.1 }}
                                className="flex justify-center gap-2 mt-2"
                            >
                                <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                                <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                                <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 text-center">

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="animate-fade-in-up animation-delay-200"
                >
                    <p className="text-xs uppercase tracking-[0.3em] text-[#328E6E] mb-4 md:mb-6 font-medium">
                        You are invited to celebrate
                    </p>

                    <motion.h2 
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-800 mb-6 md:mb-8"
                    >
                        Our Wedding
                    </motion.h2>
                </motion.div>

                {/* WEDDING DETAILS */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-2 md:space-y-4 text-gray-700"
                >
                    <p className="text-base md:text-lg font-medium text-[#328E6E]">
                        Wedding Ceremony
                    </p>
                    <p className="text-base md:text-lg">
                        {data.wedding.day}, {data.wedding.date}{" "}
                        {data.wedding.month} {data.wedding.year}
                    </p>
                    <p className="text-base md:text-lg">{data.wedding.time}</p>
                    <motion.p 
                        whileHover={{ scale: 1.05, color: "#328E6E" }}
                        className="text-base md:text-lg font-medium cursor-default"
                    >
                        {data.wedding.venue}
                    </motion.p>
                    {data.wedding.note && (
                        <p className="text-sm md:text-base text-gray-500 italic mt-2">
                            {data.wedding.note}
                        </p>
                    )}
                </motion.div>

                {/* RECEPTION DETAILS - Only show if available */}
                {hasReception && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-200"
                    >
                        <div className="space-y-2 md:space-y-4 text-gray-700">
                            <p className="text-base md:text-lg font-medium text-[#328E6E]">
                                Reception
                            </p>
                            <p className="text-base md:text-lg">
                                {data.reception.day}, {data.reception.date}{" "}
                                {data.reception.month} {data.reception.year}
                            </p>
                            <p className="text-base md:text-lg">{data.reception.time}</p>
                            <motion.p 
                                whileHover={{ scale: 1.05, color: "#328E6E" }}
                                className="text-base md:text-lg font-medium cursor-default"
                            >
                                {data.reception.venue}
                            </motion.p>
                        </div>
                    </motion.div>
                )}

                {/* LOCATIONS SECTION - Show both wedding and reception locations */}
                {(weddingMapUrl || receptionMapUrl) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-200"
                    >
                        <h3 className="text-xl md:text-2xl font-serif text-gray-800 mb-6 md:mb-8">
                            Locations
                        </h3>
                        
                        <div className={`grid ${weddingMapUrl && receptionMapUrl ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 md:gap-8 max-w-4xl mx-auto`}>
                            
                            {/* Wedding Location */}
                            {weddingMapUrl && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="flex flex-col items-center p-4 md:p-6 bg-gray-50 rounded-lg"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#328E6E]/10 rounded-full flex items-center justify-center mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-[#328E6E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
                                        Wedding Venue
                                    </h4>
                                    <p className="text-sm md:text-base text-gray-600 mb-4 text-center">
                                        {data.wedding.venue}
                                    </p>
                                    <motion.a
                                        href={weddingMapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-2 py-2 px-4 bg-[#328E6E] text-white text-sm md:text-base rounded-full hover:bg-[#266d56] transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Wedding Map
                                    </motion.a>
                                </motion.div>
                            )}
                            
                            {/* Reception Location - Only show if available */}
                            {receptionMapUrl && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                    className="flex flex-col items-center p-4 md:p-6 bg-gray-50 rounded-lg"
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#4AA3A2]/10 rounded-full flex items-center justify-center mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-[#4AA3A2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg md:text-xl font-medium text-gray-800 mb-2">
                                        Reception Venue
                                    </h4>
                                    <p className="text-sm md:text-base text-gray-600 mb-4 text-center">
                                        {data.reception.venue}
                                    </p>
                                    <motion.a
                                        href={receptionMapUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="inline-flex items-center gap-2 py-2 px-4 bg-[#4AA3A2] text-white text-sm md:text-base rounded-full hover:bg-[#3a8281] transition"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Reception Map
                                    </motion.a>
                                </motion.div>
                            )}
                        </div>
                        
                        {/* Decorative element */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="flex justify-center mt-8"
                        >
                            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#328E6E] to-transparent"></div>
                        </motion.div>
                    </motion.div>
                )}

                {/* COUNTDOWN - Fully Responsive Circular Rings Design */}
                <div className="mt-12 md:mt-16 animate-fade-in-up animation-delay-800">
                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-8 md:mb-12">
                        Counting down to forever
                    </p>

                    {/* Responsive Grid - 2 columns on mobile, 4 on desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                        {[
                            { 
                                label: "Days", 
                                value: timeLeft.days, 
                                max: 365,
                                color: "#328E6E"
                            },
                            { 
                                label: "Hours", 
                                value: timeLeft.hours, 
                                max: 24,
                                color: "#4AA3A2"
                            },
                            { 
                                label: "Mins", 
                                value: timeLeft.minutes, 
                                max: 60,
                                color: "#6B8C7D"
                            },
                            { 
                                label: "Secs", 
                                value: timeLeft.seconds, 
                                max: 60,
                                color: "#8FBC94"
                            },
                        ].map((item, index) => {
                            const percentage = (item.value / item.max) * 100;
                            const circumference = 2 * Math.PI * 38;
                            const strokeDashoffset = circumference - (percentage / 100) * circumference;
                            
                            return (
                                <motion.div 
                                    key={item.label} 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ 
                                        duration: 0.6, 
                                        delay: index * 0.15,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-2 md:mb-3">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r={window.innerWidth < 640 ? "38" : "45"}
                                                fill="none"
                                                stroke="#f0f0f0"
                                                strokeWidth={window.innerWidth < 640 ? "3" : "4"}
                                                className="opacity-30"
                                            />
                                            <motion.circle
                                                cx="50"
                                                cy="50"
                                                r={window.innerWidth < 640 ? "38" : "45"}
                                                fill="none"
                                                stroke={item.color}
                                                strokeWidth={window.innerWidth < 640 ? "4" : "6"}
                                                strokeLinecap="round"
                                                strokeDasharray={circumference}
                                                strokeDashoffset={strokeDashoffset}
                                                initial={{ strokeDashoffset: circumference }}
                                                animate={{ strokeDashoffset }}
                                                transition={{ duration: 1, delay: index * 0.2 }}
                                                style={{
                                                    filter: `drop-shadow(0 0 4px ${item.color}40)`
                                                }}
                                            />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r={window.innerWidth < 640 ? "32" : "38"}
                                                fill="none"
                                                stroke={item.color}
                                                strokeWidth="1"
                                                strokeDasharray="4 4"
                                                className="opacity-30"
                                            />
                                        </svg>
                                        
                                        <motion.div 
                                            className="absolute inset-0 flex flex-col items-center justify-center"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                                        >
                                            <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#328E6E]">
                                                {String(item.value).padStart(2, "0")}
                                            </span>
                                        </motion.div>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-2 sm:w-4 h-px bg-[#328E6E]/40"></div>
                                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-gray-500 font-medium">
                                            {item.label}
                                        </span>
                                        <div className="w-2 sm:w-4 h-px bg-[#328E6E]/40"></div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Decorative ring separator */}
                    <motion.div 
                        initial={{ opacity: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex justify-center items-center mt-8 md:mt-12"
                    >
                        <div className="relative">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#328E6E]/20 flex items-center justify-center animate-pulse-slow">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#328E6E]/40"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Heart Animation */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex justify-center mt-6 md:mt-8 animate-float"
                >
                    <Lottie 
                        animationData={heartAnimation} 
                        loop={true}
                        className="w-64 sm:w-80 md:w-96 h-12 md:h-16"
                    />
                </motion.div>

                {/* FOOTER */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12 md:mt-16 border-t pt-6 md:pt-8"
                >
                    <p className="text-sm text-gray-500 italic animate-pulse-slow">
                        We look forward to celebrating with you
                    </p>
                </motion.div>

                {/* COMPANY DETAILS - LUVIT WEDS */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200"
                >
                    <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4">

                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="text-center"
                        >
                            <h3 className="text-xl md:text-2xl font-serif text-[#328E6E] mb-1">
                                LUVIT WEDS
                            </h3>
                            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em]">
                                Creating Timeless Memories
                            </p>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 md:h-5 md:w-5 text-[#328E6E] animate-bounce-slow"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            <div className="flex flex-wrap gap-2 items-center justify-center text-sm md:text-base">
                                <motion.a
                                    href="tel:7025784463"
                                    whileHover={{ scale: 1.1, color: "#328E6E" }}
                                    className="hover:text-[#328E6E] transition inline-block"
                                >
                                    7025784463
                                </motion.a>

                                <span className="hidden sm:inline">|</span>

                                <motion.a
                                    href="tel:8301089693"
                                    whileHover={{ scale: 1.1, color: "#328E6E" }}
                                    className="hover:text-[#328E6E] transition inline-block"
                                >
                                    8301089693
                                </motion.a>
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-4 md:space-x-6 pt-2">
                            <motion.a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, color: "#328E6E" }}
                                className="flex items-center space-x-1 text-gray-600 hover:text-[#328E6E] transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 md:h-5 md:w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
                                </svg>
                                <span className="text-xs md:text-sm">Website</span>
                            </motion.a>

                            <motion.a
                                href="https://instagram.com/luvitweds"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, color: "#328E6E" }}
                                className="flex items-center space-x-1 text-gray-600 hover:text-[#328E6E] transition"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 md:h-5 md:w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                <span className="text-xs md:text-sm">Instagram</span>
                            </motion.a>
                        </div>

                        <div className="text-xs text-gray-400 mt-4">
                            © {new Date().getFullYear()} LUVIT WEDS. All rights reserved.
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Custom CSS Animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse 3s ease-in-out infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce 2s ease-in-out infinite;
                }
                
                .animation-delay-200 {
                    animation-delay: 200ms;
                }
                
                .animation-delay-400 {
                    animation-delay: 400ms;
                }
                
                .animation-delay-600 {
                    animation-delay: 600ms;
                }
                
                .animation-delay-800 {
                    animation-delay: 800ms;
                }
                
                .animation-delay-1000 {
                    animation-delay: 1000ms;
                }
                
                .animation-delay-1200 {
                    animation-delay: 1200ms;
                }
                
                .animation-delay-1400 {
                    animation-delay: 1400ms;
                }
            `}</style>
        </main>
    );
}

export default WeddingPage;