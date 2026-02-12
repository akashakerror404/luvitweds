import React from "react";
import { useParams } from "react-router-dom";
import { allWeddings } from "./ClinetDetails";
import Lottie from "lottie-react";
import invitation from '../../assets/Invitation/invitation.jpg'

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

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <h2 className="text-xl font-light text-gray-600 animate-fade-in">
                    Wedding not found
                </h2>
            </div>
        );
    }

    const mobileImage = data?.couple?.images?.mobile;
    const desktopImage = data?.couple?.images?.desktop;

    const googleMapsUrl = data?.wedding?.mapLocation || null;

    return (
        <main className="min-h-screen bg-white overflow-hidden">
            
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 animate-fade-in">
                    <Lottie 
                        animationData={confettiAnimation} 
                        loop={false}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* HERO SECTION */}
            <div className="relative h-[60vh] md:h-[80vh] overflow-hidden animate-slide-down">
                
                {/* Rings Animation Overlay */}
                <div className="absolute top-10 right-10 z-20 w-24 h-24 md:w-32 md:h-32 opacity-70 animate-float">
                    <Lottie 
                        animationData={ringsAnimation} 
                        loop={true}
                        className="w-full h-full"
                    />
                </div>

                {/* Responsive Image */}
                <picture>
                    {desktopImage && (
                        <source media="(min-width: 768px)" srcSet={desktopImage} />
                    )}
                    <img
                        src={
                            mobileImage ||
                           invitation
                        }
                        alt={`${data.couple.bride} & ${data.couple.groom}`}
                        className="w-full h-full object-cover animate-zoom-in"
                    />
                </picture>

                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-white"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white px-4 animate-fade-in-up">
                        <h1 className="font-serif text-4xl md:text-6xl tracking-wide drop-shadow-lg">
                            {data.couple.bride} & {data.couple.groom}
                        </h1>
                        <div className="w-16 h-px bg-white/60 mx-auto mt-4 animate-scale-x"></div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">

                <div className="animate-fade-in-up animation-delay-200">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#328E6E] mb-6 font-medium">
                        You are invited to celebrate
                    </p>

                    <h2 className="font-serif text-3xl md:text-4xl text-gray-800 mb-8 hover:scale-105 transition-transform duration-300">
                        Our Wedding
                    </h2>
                </div>

                <div className="space-y-4 text-gray-700 animate-fade-in-up animation-delay-400">
                    <p className="text-lg">
                        {data.wedding.day}, {data.wedding.date}{" "}
                        {data.wedding.month} {data.wedding.year}
                    </p>

                    <p className="text-lg">{data.wedding.time}</p>

                    <p className="text-lg font-medium">
                        {data.wedding.venue}
                    </p>
                </div>

                {/* Reception */}
                {data?.reception?.date && (
                    <div className="mt-10 pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-600">
                        <p className="text-sm text-gray-500 mb-2">Reception</p>
                        <p className="text-lg text-gray-700">
                            {data.reception.date}
                        </p>
                    </div>
                )}

                {/* COUNTDOWN */}
                <div className="mt-16 animate-fade-in-up animation-delay-800">
                    <p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-8">
                        Counting down to forever
                    </p>

                    <div className="grid grid-cols-4 gap-6 max-w-xl mx-auto">
                        {[
                            { label: "Days", value: timeLeft.days },
                            { label: "Hours", value: timeLeft.hours },
                            { label: "Min", value: timeLeft.minutes },
                            { label: "Sec", value: timeLeft.seconds },
                        ].map((item, index) => (
                            <div 
                                key={item.label} 
                                className="transform hover:scale-110 transition-transform duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-4xl font-light text-[#328E6E] font-serif animate-pulse-slow">
                                    {String(item.value).padStart(2, "0")}
                                </div>
                                <div className="text-xs uppercase text-gray-400">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Heart Animation */}
                <div className="flex justify-center mt-8 animate-float">
                    <Lottie 
                        animationData={heartAnimation} 
                        loop={true}
                        className="w-96 h-16"
                    />
                </div>

                {/* LOCATION SECTION */}
                {googleMapsUrl && (
                    <div className="mt-16 animate-fade-in-up animation-delay-1000">
                        <h3 className="text-2xl font-serif text-gray-800 mb-8">
                            Location
                        </h3>

                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block py-3 px-6 bg-[#328E6E] text-white rounded-full hover:bg-[#266d56] transition transform hover:scale-105 hover:shadow-lg"
                        >
                            Open in Google Maps
                        </a>
                    </div>
                )}

                {/* FOOTER */}
                <div className="mt-16 border-t pt-8 animate-fade-in-up animation-delay-1200">
                    <p className="text-sm text-gray-500 italic animate-pulse-slow">
                        We look forward to celebrating with you
                    </p>
                </div>

                {/* COMPANY DETAILS - LUVIT WEDS */}
                <div className="mt-12 pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-1400">
                    <div className="flex flex-col items-center justify-center space-y-4">

                        {/* Company Name & Tagline */}
                        <div className="text-center transform hover:scale-105 transition-transform duration-300">
                            <h3 className="text-2xl font-serif text-[#328E6E] mb-1">
                                LUVIT WEDS
                            </h3>
                            <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">
                                Creating Timeless Memories
                            </p>
                        </div>

                        {/* Contact Number */}
                        <div className="flex items-center justify-center space-x-2 text-gray-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-[#328E6E] animate-bounce-slow"
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
                            <div className="flex gap-2 items-center justify-center">
                                <a
                                    href="tel:7025784463"
                                    className="hover:text-[#328E6E] transition hover:scale-110 inline-block"
                                >
                                    7025784463
                                </a>

                                <span>|</span>

                                <a
                                    href="tel:8301089693"
                                    className="hover:text-[#328E6E] transition hover:scale-110 inline-block"
                                >
                                    8301089693
                                </a>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="flex items-center justify-center space-x-6 pt-2">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-gray-600 hover:text-[#328E6E] transition transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
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
                                <span className="text-sm">Website</span>
                            </a>

                            <a
                                href="https://instagram.com/luvitweds"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-gray-600 hover:text-[#328E6E] transition transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                <span className="text-sm">Instagram</span>
                            </a>
                        </div>

                        {/* Copyright */}
                        <div className="text-xs text-gray-400 mt-4">
                            © {new Date().getFullYear()} LUVIT WEDS. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes zoomIn {
                    from {
                        opacity: 0;
                        transform: scale(1.1);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
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
                
                @keyframes scaleX {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                
                .animate-fade-in {
                    animation: fadeIn 1s ease-out;
                }
                
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out;
                }
                
                .animate-slide-down {
                    animation: slideDown 1s ease-out;
                }
                
                .animate-zoom-in {
                    animation: zoomIn 1.2s ease-out;
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
                
                .animate-scale-x {
                    animation: scaleX 0.8s ease-out;
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