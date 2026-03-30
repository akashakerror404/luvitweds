import React from "react";
import { useParams } from "react-router-dom";
import { allWeddings } from "./ClinetDetails";
import Lottie from "lottie-react";
import invitation from '../../assets/Invitation/invitation.jpg';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import song from '../../assets/Invitation/en.mp3';
import heartAnimation from "./animations/weddingfloral.json";
import ringsAnimation from "./animations/Hearth";

/* ─────────────────────────────────────────
    ENGAGEMENT SPECIFIC STYLES
───────────────────────────────────────── */
const EngagementStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Great+Vibes&family=Jost:wght@200;300;400&display=swap');

    :root {
      --ivory:    #faf6ef;
      --parch:    #f2ead9;
      --blush:    #e8d0c3;
      --mauve:    #c9a08c;
      --rose:     #b5785c;
      --sage:     #8fa68a;
      --ink:      #2c2218;
      --muted:    #7a6a5a;
      --gold:     #c9a96e;
      --white:    #fefcf8;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .wp-root {
      font-family: 'Jost', sans-serif;
      background: var(--ivory);
      color: var(--ink);
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }

    /* Grain effect */
    .wp-root::before {
      content: '';
      position: fixed; inset: 0; z-index: 9997;
      pointer-events: none; opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }
 .footer-logo {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(42px, 8vw, 64px);
      color: var(--gold); margin-bottom: 8px;
    }
    .footer-sub {
      font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
      color: rgba(250,246,239,0.4); margin-bottom: 36px; font-weight: 200;
    }
    .footer-contacts {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 20px 40px;
      margin-bottom: 28px;
    }
    .footer-contact-link {
      font-size: 12px; letter-spacing: 0.2em; color: rgba(250,246,239,0.65);
      text-decoration: none; font-weight: 200;
      transition: color 0.3s;
    }
    .footer-contact-link:hover { color: var(--gold); }
    .footer-socials {
      display: flex; justify-content: center; gap: 24px; margin-bottom: 32px;
    }
    .footer-social {
      width: 38px; height: 38px; border: 1px solid rgba(201,169,110,0.3);
      display: flex; align-items: center; justify-content: center;
      text-decoration: none; color: var(--gold);
      transition: background 0.3s, border-color 0.3s;
    }
    .footer-social:hover { background: rgba(201,169,110,0.12); border-color: var(--gold); }
    .footer-copy {
      font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
      color: rgba(250,246,239,0.25); font-weight: 200;
    }
    .petals-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; }
    .petal { position: absolute; top: -40px; width: 10px; height: 14px; border-radius: 80% 0 80% 0; opacity: 0; animation: petalFall linear infinite; }
    
    @keyframes petalFall {
      0%   { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.8); }
      10%  { opacity: 0.6; }
      90%  { opacity: 0.4; }
      100% { opacity: 0; transform: translateY(110vh) rotate(720deg) scale(1.2); }
    }

    /* Frame Styling */
    .invite-frame { max-width: 760px; margin: 0 auto; padding: clamp(40px, 8vw, 96px) clamp(24px, 6vw, 72px); position: relative; z-index: 2; }
    .border-top, .border-bottom { width: 100%; height: 2px; background: linear-gradient(to right, transparent, var(--gold), var(--mauve), var(--gold), transparent); }
    .border-side { position: absolute; top: 0; bottom: 0; width: 2px; background: linear-gradient(to bottom, transparent, var(--gold), var(--mauve), var(--gold), transparent); }
    .border-side.left { left: 0; } .border-side.right { right: 0; }
    
    .corner { position: absolute; width: 24px; height: 24px; border-color: var(--gold); }
    .corner.tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
    .corner.tr { top: -1px; right: -1px; border-top: 2px solid; border-right: 2px solid; }
    .corner.bl { bottom: -1px; left: -1px; border-bottom: 2px solid; border-left: 2px solid; }
    .corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

    /* Hero */
    .hero-section { position: relative; height: 100svh; overflow: hidden; display: flex; align-items: flex-end; }
    .hero-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: brightness(0.75) saturate(0.85); }
    .hero-veil { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(44,34,24,0.1) 0%, transparent 30%, transparent 55%, rgba(250,246,239,0.92) 100%); }
    .hero-content { position: relative; z-index: 2; width: 100%; text-align: center; padding: 0 24px clamp(60px, 12vw, 120px); }
    .hero-eyebrow { font-family: 'Jost', sans-serif; font-weight: 200; font-size: 10px; letter-spacing: 0.6em; text-transform: uppercase; color: rgba(250,246,239,0.8); margin-bottom: 16px; display: block; }
    .hero-names { font-family: 'Great Vibes', cursive; font-size: clamp(52px, 12vw, 110px); color: #fff; line-height: 1.0; text-shadow: 0 4px 40px rgba(44,34,24,0.35); margin-bottom: 12px; }
    .hero-amp { font-family: 'Playfair Display', serif; font-size: clamp(24px, 4vw, 42px); font-style: italic; color: var(--gold); display: block; line-height: 1; }
    .hero-date-strip { display: inline-flex; align-items: center; gap: 16px; margin-top: 20px; }
    .hero-date-line { width: 40px; height: 1px; background: rgba(255,255,255,0.4); }
    .hero-date-text { font-family: 'Jost', sans-serif; font-weight: 200; font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(255,255,255,0.85); }

    /* Sections */
    .section-block { padding: clamp(48px, 8vw, 96px) clamp(24px, 6vw, 64px); text-align: center; position: relative; }
    .section-tag { display: block; font-size: 9px; letter-spacing: 0.52em; text-transform: uppercase; color: var(--mauve); font-weight: 300; margin-bottom: 20px; }
    .section-heading { font-family: 'Playfair Display', serif; font-size: clamp(28px, 5vw, 48px); font-weight: 400; font-style: italic; color: var(--ink); margin-bottom: 8px; line-height: 1.15; }
    
    /* Event Cards */
    .event-card { background: var(--white); padding: 36px 32px; position: relative; border: 1px solid rgba(201,160,140,0.2); margin-bottom: 2px; }
    .event-tag { font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase; color: var(--rose); font-weight: 300; margin-bottom: 14px; display: block; }
    .event-title { font-family: 'Playfair Display', serif; font-size: clamp(22px, 3.5vw, 30px); font-weight: 400; color: var(--ink); margin-bottom: 16px; font-style: italic; }
    .event-detail { font-size: 13px; font-weight: 300; color: var(--muted); line-height: 2.0; letter-spacing: 0.04em; }

    .map-link {
      display: inline-flex; align-items: center; gap: 8px; margin-top: 20px;
      font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
      color: var(--rose); font-weight: 300; text-decoration: none;
      border-bottom: 1px solid rgba(181,120,92,0.3); padding-bottom: 2px;
      transition: color 0.3s, border-color 0.3s;
    }
    .map-link:hover { color: var(--ink); border-color: var(--ink); }

    /* Countdown */
    .countdown-section { background: var(--parch); padding: clamp(48px, 8vw, 96px) 24px; text-align: center; position: relative; }
    .countdown-num { font-family: 'Playfair Display', serif; font-size: clamp(48px, 8vw, 84px); font-weight: 400; color: var(--ink); line-height: 1; }
    
    /* Controls & Footer */
    .music-btn { position: fixed; bottom: 28px; right: 28px; z-index: 9999; width: 52px; height: 52px; border-radius: 50%; background: var(--white); border: 1px solid var(--blush); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    .wedding-footer { background: var(--ink); color: var(--ivory); text-align: center; padding: clamp(48px, 8vw, 96px) 24px; position: relative; }
    .footer-logo { font-family: 'Great Vibes', cursive; font-size: clamp(42px, 8vw, 64px); color: var(--gold); margin-bottom: 8px; }
  `}</style>
);

/* ─────────────────────────────────────────
    HELPERS
───────────────────────────────────────── */
const PETAL_COLORS = ['#e8d0c3', '#c9a08c', '#d4bba6', '#e8d8cc', '#f0e4d8'];
const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  color: PETAL_COLORS[i % PETAL_COLORS.length],
  duration: `${10 + Math.random() * 14}s`,
  delay: `${Math.random() * 12}s`,
  size: `${8 + Math.random() * 8}px`,
  rotate: Math.random() > 0.5 ? '80% 0 80% 0' : '0 80% 0 80%',
}));

function PetalsCanvas() {
  return (
    <div className="petals-canvas">
      {petals.map(p => (
        <div key={p.id} className="petal" style={{ left: p.left, background: p.color, width: p.size, height: `calc(${p.size} * 1.4)`, borderRadius: p.rotate, animationDuration: p.duration, animationDelay: p.delay }} />
      ))}
    </div>
  );
}

function CountdownDisplay({ timeLeft }) {
  const units = [ 
    { val: timeLeft.days, label: 'Days' }, 
    { val: timeLeft.hours, label: 'Hours' }, 
    { val: timeLeft.minutes, label: 'Mins' }, 
    { val: timeLeft.seconds, label: 'Secs' } 
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(16px, 4vw, 32px)', marginTop: '40px' }}>
      {units.map((u, i) => (
        <div key={u.label} className="countdown-item" style={{ textAlign: 'center' }}>
          <AnimatePresence mode="popLayout">
            <motion.span key={u.val} className="countdown-num" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.3 }} style={{ display: 'block' }}>
              {String(u.val).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <div style={{ fontSize: '8px', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'var(--mauve)', marginTop: '8px' }}>{u.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
    MAIN COMPONENT
───────────────────────────────────────── */
function EngagementPage() {
  const { slug } = useParams();
  const data = allWeddings[slug];

  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  const event = data?.engagement || data?.wedding;
  const eventMapUrl = event?.mapLocation || null;

  // Countdown Effect
  React.useEffect(() => {
    if (!event) return;
    const startTime = event.time.split(" - ")[0];
    const eventDateTime = new Date(`${event.month} ${event.date}, ${event.year} ${startTime}`);
    
    const tick = () => {
      const diff = eventDateTime - new Date();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return false; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
      return true;
    };
    tick();
    const id = setInterval(() => { if (!tick()) clearInterval(id); }, 1000);
    return () => clearInterval(id);
  }, [event]);

  // Music Effect
  React.useEffect(() => {
    audioRef.current = new Audio(song);
    audioRef.current.loop = true;
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) audioRef.current.pause(); else audioRef.current.play();
    setIsMusicPlaying(!isMusicPlaying);
  };

  if (!data) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf6ef' }}>
      <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#7a6a5a' }}>Engagement details not found</p>
    </div>
  );

  // Metadata for Social Sharing
  const pageTitle = `${data.couple.bride} & ${data.couple.groom} — Engagement Invitation`;
  const pageDesc = `We joyfully invite you to the engagement ceremony of ${data.couple.bride} and ${data.couple.groom} on ${event.date} ${event.month} ${event.year}.`;
  const shareImage = data?.couple?.images?.desktop || invitation;
  const pageUrl = `https://luvitweds.vercel.app/luvit-engagement/${slug}`;

  const stagger = (i) => ({ 
    initial: { opacity: 0, y: 28 }, 
    whileInView: { opacity: 1, y: 0 }, 
    viewport: { once: true }, 
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } 
  });

  return (
    <div className="wp-root">
      <EngagementStyles />
      <PetalsCanvas />
      
      <Helmet>
        {/* SEO & WhatsApp Preview tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={shareImage} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:image" content={shareImage} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section">
        <img src={shareImage} alt="" className="hero-img" />
        <div className="hero-veil" />
        <div className="hero-content">
          <motion.span className="hero-eyebrow" {...stagger(0)}>The Beginning of Always · Save the Date</motion.span>
          <motion.div {...stagger(0.5)}>
            <h1 className="hero-names">{data.couple.bride}</h1>
            <span className="hero-amp">&amp;</span>
            <h1 className="hero-names">{data.couple.groom}</h1>
          </motion.div>
          <motion.div className="hero-date-strip" {...stagger(1)}>
            <div className="hero-date-line" />
            <span className="hero-date-text">Engagement · {event.date} {event.month} {event.year}</span>
            <div className="hero-date-line" />
          </motion.div>
        </div>
      </section>

      {/* Invitation Frame */}
      <div className="invite-frame">
        <div className="border-top" /><div className="border-side left" /><div className="border-side right" />
        <div className="corner tl" /><div className="corner tr" />
        <div className="corner bl" /><div className="corner br" />

        <div className="section-block">
          <motion.span className="section-tag" {...stagger(0)}>An Invitation</motion.span>
          <motion.h2 className="section-heading" {...stagger(1)}>We joyfully invite you<br />to our Engagement</motion.h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <Lottie animationData={heartAnimation} loop style={{ width: 280, height: 56 }} />
          </div>
        </div>

        <div className="section-block" style={{ paddingTop: 0 }}>
          <motion.div className="event-card" {...stagger(1.5)}>
            <span className="event-tag">The Ceremony</span>
            <h3 className="event-title">The Joyful Promise</h3>
            <div className="event-detail">
              <p><strong>{event.day}</strong></p>
              <p>{event.date} {event.month}, {event.year}</p>
              <p>{event.time}</p>
              <p style={{ marginTop: 8 }}><strong>{event.venue}</strong></p>
            </div>

            {eventMapUrl && (
              <a href={eventMapUrl} target="_blank" rel="noopener noreferrer" className="map-link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  Get Directions
                </a>
            )}
          </motion.div>
        </div>

        <div className="border-bottom" />
      </div>

      {/* Countdown Section */}
      <div className="countdown-section">
        <motion.span className="section-tag" {...stagger(0)}>Counting Down</motion.span>
        <motion.h2 className="section-heading" {...stagger(0.5)}>To The Big Promise</motion.h2>
        <CountdownDisplay timeLeft={timeLeft} />
        <motion.div {...stagger(1)} style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <Lottie animationData={ringsAnimation} loop style={{ width: 64, height: 64 }} />
        </motion.div>
      </div>

      {/* Footer */}
   <footer className="wedding-footer">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="footer-logo">Luvit Weds</div>
            <div className="footer-sub">Creating Timeless Memories</div>
  
            <div className="footer-contacts">
              <a href="tel:7025784463" className="footer-contact-link">7025784463</a>
              <span style={{ color: 'rgba(250,246,239,0.2)', fontSize: 12 }}>·</span>
              <a href="tel:8301089693" className="footer-contact-link">8301089693</a>
            </div>
  
            <div className="footer-socials">
              <a href="/" className="footer-social" title="Website">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
                </svg>
              </a>
              <a href="https://instagram.com/luvitweds" target="_blank" rel="noopener noreferrer" className="footer-social" title="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
  
            <p className="footer-copy">© {new Date().getFullYear()} Luvit Weds · All rights reserved</p>
          </motion.div>
        </footer>

      {/* Music Button */}
      <motion.button 
        className="music-btn" 
        onClick={toggleMusic} 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMusicPlaying ? (
          <span style={{ fontSize: '20px', color: 'var(--rose)' }}>♫</span>
        ) : (
          <span style={{ fontSize: '20px', color: 'var(--muted)' }}>♪</span>
        )}
      </motion.button>
    </div>
  );
}

export default EngagementPage;