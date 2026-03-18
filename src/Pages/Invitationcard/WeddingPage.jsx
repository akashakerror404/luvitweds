import React from "react";
import { useParams } from "react-router-dom";
import { allWeddings } from "./ClinetDetails";
import Lottie from "lottie-react";
import invitation from '../../assets/Invitation/invitation.jpg';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import song from '../../assets/Invitation/song.mp3';
import heartAnimation from "./animations/weddingfloral.json";
import confettiAnimation from "./animations/weddingfloral.json";
import ringsAnimation from "./animations/Hearth";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const WeddingStyles = () => (
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

    /* ── Grain ── */
    .wp-root::before {
      content: '';
      position: fixed; inset: 0; z-index: 9997;
      pointer-events: none; opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 160px;
    }

    /* ── Petals ── */
    .petals-canvas {
      position: fixed; inset: 0; pointer-events: none; z-index: 1; overflow: hidden;
    }
    .petal {
      position: absolute; top: -40px;
      width: 10px; height: 14px;
      border-radius: 80% 0 80% 0;
      opacity: 0;
      animation: petalFall linear infinite;
    }
    @keyframes petalFall {
      0%   { opacity: 0; transform: translateY(0) rotate(0deg) scale(0.8); }
      10%  { opacity: 0.6; }
      90%  { opacity: 0.4; }
      100% { opacity: 0; transform: translateY(110vh) rotate(720deg) scale(1.2); }
    }

    /* ── Ornamental border frame ── */
    .invite-frame {
      max-width: 760px; margin: 0 auto;
      padding: clamp(40px, 8vw, 96px) clamp(24px, 6vw, 72px);
      position: relative; z-index: 2;
    }
    .border-top, .border-bottom {
      width: 100%; height: 2px;
      background: linear-gradient(to right, transparent, var(--gold), var(--mauve), var(--gold), transparent);
    }
    .border-side {
      position: absolute; top: 0; bottom: 0; width: 2px;
      background: linear-gradient(to bottom, transparent, var(--gold), var(--mauve), var(--gold), transparent);
    }
    .border-side.left { left: 0; }
    .border-side.right { right: 0; }
    .corner {
      position: absolute; width: 24px; height: 24px;
      border-color: var(--gold);
    }
    .corner.tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
    .corner.tr { top: -1px; right: -1px; border-top: 2px solid; border-right: 2px solid; }
    .corner.bl { bottom: -1px; left: -1px; border-bottom: 2px solid; border-left: 2px solid; }
    .corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

    /* ── HERO ── */
    .hero-section {
      position: relative;
      height: 100svh; overflow: hidden;
      display: flex; align-items: flex-end;
    }
    .hero-img {
      position: absolute; inset: 0;
      width: 100%; height: 100%; object-fit: cover;
      filter: brightness(0.75) saturate(0.85);
    }
    .hero-veil {
      position: absolute; inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(44,34,24,0.1) 0%,
        transparent 30%,
        transparent 55%,
        rgba(250,246,239,0.92) 100%
      );
    }
    .hero-content {
      position: relative; z-index: 2;
      width: 100%; text-align: center;
      padding: 0 24px clamp(60px, 12vw, 120px);
    }
    .hero-eyebrow {
      font-family: 'Jost', sans-serif; font-weight: 200;
      font-size: 10px; letter-spacing: 0.6em; text-transform: uppercase;
      color: rgba(250,246,239,0.8); margin-bottom: 16px; display: block;
    }
    .hero-names {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(52px, 12vw, 110px);
      color: #fff; line-height: 1.0;
      text-shadow: 0 4px 40px rgba(44,34,24,0.35);
      margin-bottom: 12px;
    }
    .hero-amp {
      font-family: 'Playfair Display', serif;
      font-size: clamp(24px, 4vw, 42px);
      font-style: italic; color: var(--gold);
      display: block; line-height: 1;
      text-shadow: 0 2px 20px rgba(44,34,24,0.3);
    }
    .hero-date-strip {
      display: inline-flex; align-items: center; gap: 16px; margin-top: 20px;
    }
    .hero-date-line { width: 40px; height: 1px; background: rgba(255,255,255,0.4); }
    .hero-date-text {
      font-family: 'Jost', sans-serif; font-weight: 200;
      font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase;
      color: rgba(255,255,255,0.85);
    }

    /* ── Scroll Down ── */
    .scroll-down {
      position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
      z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 6px;
    }
    .scroll-down span {
      font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase;
      color: rgba(255,255,255,0.5); font-weight: 300;
    }
    .scroll-mouse {
      width: 20px; height: 32px; border: 1px solid rgba(255,255,255,0.35);
      border-radius: 10px; display: flex; justify-content: center; padding-top: 6px;
    }
    .scroll-wheel {
      width: 3px; height: 6px; background: rgba(255,255,255,0.6);
      border-radius: 2px;
      animation: scrollWheel 1.8s ease-in-out infinite;
    }
    @keyframes scrollWheel {
      0%   { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(10px); opacity: 0; }
    }

    /* ── SECTION BLOCKS ── */
    .section-block {
      padding: clamp(48px, 8vw, 96px) clamp(24px, 6vw, 64px);
      text-align: center; position: relative;
    }
    .section-tag {
      display: block; font-size: 9px; letter-spacing: 0.52em; text-transform: uppercase;
      color: var(--mauve); font-weight: 300; margin-bottom: 20px;
    }
    .section-heading {
      font-family: 'Playfair Display', serif;
      font-size: clamp(28px, 5vw, 48px);
      font-weight: 400; font-style: italic;
      color: var(--ink); margin-bottom: 8px; line-height: 1.15;
    }
    .ornament {
      display: flex; align-items: center; justify-content: center;
      gap: 12px; margin: 20px auto;
    }
    .ornament-line { width: 48px; height: 1px; background: var(--blush); }
    .ornament-diamond {
      width: 6px; height: 6px; background: var(--gold);
      transform: rotate(45deg);
    }

    /* ── EVENT CARDS ── */
    .events-wrap {
      display: grid; grid-template-columns: 1fr;
      gap: 0; max-width: 560px; margin: 0 auto;
    }
    .event-card {
      background: var(--white); padding: 36px 32px;
      position: relative; border: 1px solid rgba(201,160,140,0.2);
      margin-bottom: 2px;
    }
    .event-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(to right, transparent, var(--gold), transparent);
    }
    .event-tag {
      font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase;
      color: var(--rose); font-weight: 300; margin-bottom: 14px; display: block;
    }
    .event-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(22px, 3.5vw, 30px); font-weight: 400;
      color: var(--ink); margin-bottom: 16px; font-style: italic;
    }
    .event-detail {
      font-size: 13px; font-weight: 300; color: var(--muted);
      line-height: 2.0; letter-spacing: 0.04em;
    }
    .event-detail strong {
      font-weight: 400; color: var(--ink); font-style: normal;
    }
    .map-link {
      display: inline-flex; align-items: center; gap: 8px; margin-top: 20px;
      font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
      color: var(--rose); font-weight: 300; text-decoration: none;
      border-bottom: 1px solid rgba(181,120,92,0.3); padding-bottom: 2px;
      transition: color 0.3s, border-color 0.3s;
    }
    .map-link:hover { color: var(--ink); border-color: var(--ink); }

    /* ── COUNTDOWN ── */
    .countdown-section {
      background: var(--parch); padding: clamp(48px, 8vw, 96px) 24px;
      text-align: center; position: relative;
    }
    .countdown-section::before, .countdown-section::after {
      content: '';
      position: absolute; left: 0; right: 0; height: 1px;
      background: linear-gradient(to right, transparent, var(--gold), transparent);
    }
    .countdown-section::before { top: 0; }
    .countdown-section::after { bottom: 0; }

    .countdown-grid {
      display: flex; justify-content: center; gap: clamp(16px, 4vw, 48px);
      margin-top: 40px; flex-wrap: wrap;
    }
    .countdown-item {
      display: flex; flex-direction: column; align-items: center;
      min-width: 80px;
    }
    .countdown-num {
      font-family: 'Playfair Display', serif;
      font-size: clamp(48px, 8vw, 84px);
      font-weight: 400; color: var(--ink); line-height: 1;
      font-variant-numeric: tabular-nums;
    }
    .countdown-label {
      font-size: 8px; letter-spacing: 0.5em; text-transform: uppercase;
      color: var(--mauve); font-weight: 300; margin-top: 8px;
    }
    .countdown-sep {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 6vw, 64px);
      color: var(--blush); line-height: 1; align-self: flex-start;
      padding-top: 4px;
    }

    /* ── MUSIC BUTTON ── */
    .music-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 52px; height: 52px; border-radius: 50%;
      background: var(--white);
      border: 1px solid var(--blush);
      box-shadow: 0 8px 32px rgba(44,34,24,0.12);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: transform 0.3s, box-shadow 0.3s;
    }
    .music-btn:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(44,34,24,0.18); }
    .music-icon { width: 20px; height: 20px; color: var(--rose); }

    .music-waves {
      display: flex; align-items: center; gap: 3px;
    }
    .music-bar {
      width: 3px; background: var(--rose); border-radius: 2px;
      animation: musicBar 0.8s ease-in-out infinite;
    }
    .music-bar:nth-child(1) { height: 8px; animation-delay: 0s; }
    .music-bar:nth-child(2) { height: 14px; animation-delay: 0.15s; }
    .music-bar:nth-child(3) { height: 10px; animation-delay: 0.3s; }
    .music-bar:nth-child(4) { height: 16px; animation-delay: 0.1s; }
    @keyframes musicBar {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.4); }
    }

    .music-prompt {
      position: fixed; bottom: 92px; right: 28px; z-index: 9998;
      background: var(--white); border: 1px solid var(--blush);
      padding: 20px 24px; max-width: 260px;
      box-shadow: 0 12px 40px rgba(44,34,24,0.12);
    }
    .music-prompt p {
      font-size: 13px; font-weight: 300; color: var(--muted);
      line-height: 1.6; margin-bottom: 14px;
      font-style: italic;
    }
    .prompt-btns { display: flex; gap: 8px; }
    .prompt-btn-yes, .prompt-btn-no {
      flex: 1; padding: 10px; font-size: 9px;
      letter-spacing: 0.3em; text-transform: uppercase;
      cursor: pointer; font-weight: 300; border: none; transition: all 0.3s;
    }
    .prompt-btn-yes { background: var(--ink); color: var(--ivory); }
    .prompt-btn-yes:hover { background: var(--rose); }
    .prompt-btn-no { background: var(--parch); color: var(--muted); }
    .prompt-btn-no:hover { background: var(--blush); }

    /* ── FOOTER AREA ── */
    .wedding-footer {
      background: var(--ink); color: var(--ivory);
      text-align: center; padding: clamp(48px, 8vw, 96px) 24px;
      position: relative;
    }
    .wedding-footer::before {
      content: '';
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(to right, transparent, var(--gold), transparent);
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

    /* ── Confetti overlay ── */
    .confetti-overlay {
      position: fixed; inset: 0; pointer-events: none; z-index: 9996;
    }

    /* ── Responsive ── */
    @media (max-width: 600px) {
      .countdown-sep { display: none; }
      .countdown-grid { gap: 20px 24px; }
    }
  `}</style>
);

/* ─────────────────────────────────────────
   PETALS
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
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            background: p.color,
            width: p.size,
            height: `calc(${p.size} * 1.4)`,
            borderRadius: p.rotate,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   COUNTDOWN
───────────────────────────────────────── */
function CountdownDisplay({ timeLeft }) {
  const units = [
    { val: timeLeft.days,    label: 'Days' },
    { val: timeLeft.hours,   label: 'Hours' },
    { val: timeLeft.minutes, label: 'Mins' },
    { val: timeLeft.seconds, label: 'Secs' },
  ];
  return (
    <div className="countdown-grid">
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          {i > 0 && <div className="countdown-sep">·</div>}
          <div className="countdown-item">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={u.val}
                className="countdown-num"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {String(u.val).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="countdown-label">{u.label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
function WeddingPage() {
  const { slug } = useParams();
  const data = allWeddings[slug];

  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(false);
  const [showMusicPrompt, setShowMusicPrompt] = React.useState(true);
  const audioRef = React.useRef(null);

  /* Countdown */
  React.useEffect(() => {
    if (!data?.wedding) return;
    const startTime = data.wedding.time.split(" - ")[0];
    const weddingDateTime = new Date(`${data.wedding.month} ${data.wedding.date}, ${data.wedding.year} ${startTime}`);
    const tick = () => {
      const diff = weddingDateTime - new Date();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); setShowConfetti(true); setTimeout(() => setShowConfetti(false), 5000); return false; }
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
  }, [data]);

  /* Music */
  React.useEffect(() => {
    audioRef.current = new Audio(song);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.6;
    audioRef.current.play()
      .then(() => { setIsMusicPlaying(true); setShowMusicPrompt(false); })
      .catch(() => { setIsMusicPlaying(false); setShowMusicPrompt(true); });
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setIsMusicPlaying(p => !p);
    setShowMusicPrompt(false);
  };

  if (!data) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf6ef' }}>
      <p style={{ fontFamily: 'Playfair Display, serif', fontStyle: 'italic', color: '#7a6a5a' }}>Wedding not found</p>
    </div>
  );

  const mobileImage  = data?.couple?.images?.mobile;
  const desktopImage = data?.couple?.images?.desktop;
  const shareImage   = desktopImage || mobileImage || invitation;
  const hasReception = data?.reception?.date && data?.reception?.date !== "";
  const weddingMapUrl   = data?.wedding?.mapLocation || null;
  const receptionMapUrl = hasReception ? data?.reception?.mapLocation : null;
  const pageUrl   = `https://luvitweds.vercel.app/luvit-wedding/${data.slug}`;
  const pageTitle = `${data.couple.bride} & ${data.couple.groom} — Wedding Invitation | Luvit Weds`;
  const pageDesc  = `Celebrating the union of ${data.couple.bride} & ${data.couple.groom} on ${data.wedding.date} ${data.wedding.month} ${data.wedding.year}.`;

  const stagger = (i) => ({ initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } });

  return (
    <div className="wp-root">
      <WeddingStyles />
      <PetalsCanvas />

      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={shareImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:image" content={shareImage} />
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      {/* ── Confetti ── */}
      {showConfetti && (
        <div className="confetti-overlay">
          <Lottie animationData={confettiAnimation} loop={false} style={{ width: '100%', height: '100%' }} />
        </div>
      )}

      {/* ── Music Button ── */}
      <motion.button
        className="music-btn"
        onClick={toggleMusic}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle music"
      >
        {isMusicPlaying ? (
          <div className="music-waves">
            <div className="music-bar" /><div className="music-bar" /><div className="music-bar" /><div className="music-bar" />
          </div>
        ) : (
          <svg className="music-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
          </svg>
        )}
      </motion.button>

      {/* Music Prompt */}
      <AnimatePresence>
        {showMusicPrompt && !isMusicPlaying && (
          <motion.div
            className="music-prompt"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
          >
            <p>♪ A melody has been composed for your experience. Shall we play it?</p>
            <div className="prompt-btns">
              <button className="prompt-btn-yes" onClick={toggleMusic}>Play</button>
              <button className="prompt-btn-no" onClick={() => setShowMusicPrompt(false)}>Later</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════
          HERO
      ══════════════════════════════ */}
      <section className="hero-section">
        <picture>
          {desktopImage && <source media="(min-width: 768px)" srcSet={desktopImage} />}
          <img src={mobileImage || invitation} alt="" className="hero-img" />
        </picture>
        <div className="hero-veil" />

        <div className="hero-content">
          <motion.span className="hero-eyebrow"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}>
            Together with their families · Request the pleasure of your company
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
            <h1 className="hero-names">
              {data.couple.bride}
            </h1>
            <span className="hero-amp">&amp;</span>
            <h1 className="hero-names">
              {data.couple.groom}
            </h1>
          </motion.div>

          <motion.div className="hero-date-strip"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.9 }}>
            <div className="hero-date-line" />
            <span className="hero-date-text">
              {data.wedding.day} · {data.wedding.date} {data.wedding.month} {data.wedding.year}
            </span>
            <div className="hero-date-line" />
          </motion.div>
        </div>

        <div className="scroll-down">
          <span>Scroll</span>
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        </div>
      </section>

      {/* ══════════════════════════════
          INVITATION BODY
      ══════════════════════════════ */}
      <div className="invite-frame" style={{ position: 'relative' }}>
        <div className="border-top" />
        <div className="border-side left" />
        <div className="border-side right" />
        <div className="corner tl" /><div className="corner tr" />
        <div className="corner bl" /><div className="corner br" />

        {/* Invitation intro */}
        <div className="section-block">
          <motion.span className="section-tag" {...stagger(0)}>An Invitation</motion.span>
          <motion.h2 className="section-heading" {...stagger(1)}>
            We joyfully invite you<br />to witness our union
          </motion.h2>
          <div className="ornament">
            <div className="ornament-line" />
            <div className="ornament-diamond" />
            <div className="ornament-line" />
          </div>
          <motion.div {...stagger(2)} style={{ display: 'flex', justifyContent: 'center' }}>
            <Lottie animationData={heartAnimation} loop style={{ width: 280, height: 56 }} />
          </motion.div>
        </div>

        {/* Events */}
        <div className="section-block" style={{ paddingTop: 0 }}>
          <motion.span className="section-tag" {...stagger(0)}>The Celebrations</motion.span>
          <div className="events-wrap">

            {/* Wedding */}
            <motion.div className="event-card" {...stagger(1)}>
              <span className="event-tag">Wedding Ceremony</span>
              <h3 className="event-title">The Sacred Union</h3>
              <div className="event-detail">
                <p><strong>{data.wedding.day}</strong></p>
                <p>{data.wedding.date} {data.wedding.month}, {data.wedding.year}</p>
                <p style={{ marginTop: 6 }}>{data.wedding.time}</p>
                <p style={{ marginTop: 8 }}><strong>{data.wedding.venue}</strong></p>
                {data.wedding.note && (
                  <p style={{ marginTop: 8, fontStyle: 'italic', fontSize: 12, color: 'var(--mauve)' }}>{data.wedding.note}</p>
                )}
              </div>
              {weddingMapUrl && (
                <a href={weddingMapUrl} target="_blank" rel="noopener noreferrer" className="map-link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  Get Directions
                </a>
              )}
            </motion.div>

            {/* Reception */}
            {hasReception && (
              <motion.div className="event-card" {...stagger(2)}>
                <span className="event-tag">Reception</span>
                <h3 className="event-title">The Grand Celebration</h3>
                <div className="event-detail">
                  <p><strong>{data.reception.day}</strong></p>
                  <p>{data.reception.date} {data.reception.month}, {data.reception.year}</p>
                  <p style={{ marginTop: 6 }}>{data.reception.time}</p>
                  <p style={{ marginTop: 8 }}><strong>{data.reception.venue}</strong></p>
                </div>
                {receptionMapUrl && (
                  <a href={receptionMapUrl} target="_blank" rel="noopener noreferrer" className="map-link">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    Get Directions
                  </a>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <div className="border-bottom" />
      </div>

      {/* ══════════════════════════════
          COUNTDOWN
      ══════════════════════════════ */}
      <div className="countdown-section">
        <motion.span className="section-tag"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Counting Down
        </motion.span>
        <motion.h2 className="section-heading"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}>
          Until Forever Begins
        </motion.h2>
        <CountdownDisplay timeLeft={timeLeft} />

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <Lottie animationData={ringsAnimation} loop style={{ width: 64, height: 64 }} />
        </motion.div>
      </div>

      {/* ══════════════════════════════
          CLOSING NOTE
      ══════════════════════════════ */}
      <div className="section-block" style={{ background: 'var(--ivory)', paddingTop: 64, paddingBottom: 48 }}>
        <div className="ornament" style={{ marginBottom: 32 }}>
          <div className="ornament-line" style={{ width: 80 }} />
          <div className="ornament-diamond" />
          <div className="ornament-line" style={{ width: 80 }} />
        </div>
        <motion.p {...stagger(0)} style={{
          fontFamily: 'Playfair Display, serif', fontSize: 'clamp(18px, 3vw, 26px)',
          fontStyle: 'italic', fontWeight: 400, color: 'var(--muted)',
          lineHeight: 1.8, maxWidth: 500, margin: '0 auto',
          textAlign: 'center'
        }}>
          "Two souls, one heart — we look forward<br />to celebrating with you."
        </motion.p>
        <div className="ornament" style={{ marginTop: 32 }}>
          <div className="ornament-line" style={{ width: 80 }} />
          <div className="ornament-diamond" />
          <div className="ornament-line" style={{ width: 80 }} />
        </div>
      </div>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
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
    </div>
  );
}

export default WeddingPage;
