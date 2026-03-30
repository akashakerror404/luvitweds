import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom';

// Desktop Hero Images
import hero1 from '../../assets/HERO_IMAGES/hero1.jpg';
import hero2 from '../../assets/HERO_IMAGES/hero2.jpg';
import hero3 from '../../assets/HERO_IMAGES/hero3.jpg';
import hero4 from '../../assets/HERO_IMAGES/hero4.jpg';
import hero5 from '../../assets/HERO_IMAGES/hero5.jpg';
import hero6 from '../../assets/HERO_IMAGES/hero6.jpg';
import hero7 from '../../assets/HERO_IMAGES/hero7.jpg';

// Mobile Hero Images
import hero1mobile from '../../assets/HERO_IMAGES/hero1mobile.jpeg';
import hero2mobile from '../../assets/HERO_IMAGES/hero2mobile.jpeg';
import hero3mobile from '../../assets/HERO_IMAGES/hero3mobile.jpeg';
import hero4mobile from '../../assets/HERO_IMAGES/hero4mobile.jpeg';
import hero5mobile from '../../assets/HERO_IMAGES/hero5mobile.jpeg';
import hero6mobile from '../../assets/HERO_IMAGES/hero6mobile.jpeg';
import hero7mobile from '../../assets/HERO_IMAGES/hero7mobile.jpeg';

// Gallery & Testimonials
import wed01 from '../../assets/WEDDING_IMAGES/wed01.jpg';
import wed02 from '../../assets/WEDDING_IMAGES/wed02.jpg';
import wed03 from '../../assets/WEDDING_IMAGES/wed03.jpg';
import wed04 from '../../assets/WEDDING_IMAGES/wed04.jpg';
import wed05 from '../../assets/WEDDING_IMAGES/wed05.jpg';
import wed06 from '../../assets/WEDDING_IMAGES/wed06.jpg';
import wed07 from '../../assets/WEDDING_IMAGES/wed07.jpg';

import TESTIMONIALS01 from '../../assets/TESTIMONIALS/TESTIMONIALS-01.jpg';
import TESTIMONIALS02 from '../../assets/TESTIMONIALS/TESTIMONIALS-02.jpg';
import TESTIMONIALS03 from '../../assets/TESTIMONIALS/TESTIMONIALS-03.jpg';
import TESTIMONIALS04 from '../../assets/TESTIMONIALS/TESTIMONIALS-04.jpg';

const HERO_IMAGES = [hero1, hero2, hero3, hero4, hero5, hero6, hero7];
const HERO_IMAGESMOBILE = [hero1mobile, hero2mobile, hero3mobile, hero4mobile, hero5mobile, hero6mobile, hero7mobile];
const WEDDING_IMAGES = [wed01, wed02, wed03, wed04, wed05, wed06];

const TESTIMONIALS = [
  { name: 'Sudeesh & Rincy', image: TESTIMONIALS01, text: 'Every detail was flawlessly executed. The team understood our vision before we could even put it into words.', type: 'Engagement', date: 'June 2024' },
  { name: 'Rahul & Smaya', image: TESTIMONIALS02, text: 'Luvit Weds blended our rituals with such elegance. Our traditional wedding became a timeless film.', type: 'Traditional Wedding', date: 'May 2024' },
  { name: 'Pranav & Kavya', image: TESTIMONIALS03, text: 'Our engagement shoot was captured like a piece of fine art. We return to these images every anniversary.', type: 'Engagement', date: 'April 2024' },
  { name: 'Deepak & Rash Patil', image: TESTIMONIALS04, text: 'The post-wedding shoot in Manali was absolutely magical. An experience we will cherish forever.', type: 'Post Wedding Shoot', date: 'March 2025' }
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } })
};

// const fadeIn = {
//   hidden: { opacity: 0 },
//   show: (i = 0) => ({ opacity: 1, transition: { duration: 1.1, delay: i * 0.15, ease: 'easeOut' } })
// };

/* ─── Grain overlay injected once ─── */
const GrainStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400&family=Alex+Brush&display=swap');

    :root {
      --ivory: #faf7f2;
      --linen: #f2ebe0;
      --blush: #e8d5c4;
      --rose:  #c9907a;
      --sage:  #9aab8f;
      --ink:   #2a2520;
      --muted: #7a6e66;
    }

    *, *::before, *::after { box-sizing: border-box; }

    .lw-root {
      font-family: 'Jost', sans-serif;
      background: var(--ivory);
      color: var(--ink);
      overflow-x: hidden;
    }

    /* ── Grain ── */
    .lw-root::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 9999;
      pointer-events: none;
      opacity: 0.032;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 180px;
    }

    /* ── Typography ── */
    .font-cormorant { font-family: 'Cormorant Garamond', serif; }
    .font-alex      { font-family: 'Alex Brush', cursive; }
    .font-jost      { font-family: 'Jost', sans-serif; }

    /* ── Hero ── */
    .hero-wrap { position: relative; height: 90svh; overflow: hidden; background: var(--blush); }
    .hero-img  { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

    .hero-vignette {
      position: absolute; inset: 0;
      background: linear-gradient(
        to bottom,
        rgba(250,247,242,0.18) 0%,
        transparent 35%,
        transparent 60%,
        rgba(250,247,242,0.55) 100%
      );
    }

    .hero-content {
      position: absolute; inset: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: flex-end;
      padding-bottom: clamp(64px, 10vh, 120px);
      text-align: center; z-index: 2;
    }

    .hero-eyebrow {
      letter-spacing: 0.42em; font-size: 9px; text-transform: uppercase;
      color: rgba(255,255,255,0.78); font-family: 'Jost', sans-serif;
      font-weight: 300; margin-bottom: 14px;
    }

    .hero-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(52px, 9vw, 110px);
      font-weight: 300; line-height: 1.02;
      color: #fff;
      text-shadow: 0 2px 40px rgba(42,37,32,0.22);
      margin-bottom: 8px;
    }

    .hero-title em { font-style: italic; font-weight: 300; }

    .hero-script {
      font-family: 'Alex Brush', cursive;
      font-size: clamp(28px, 4.5vw, 58px);
      color: rgba(255,255,255,0.88);
      margin-bottom: 44px;
      display: block;
    }

    .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }

    .btn-primary {
      font-family: 'Jost', sans-serif; font-weight: 300;
      font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
      padding: 14px 36px; border-radius: 100px;
      background: rgba(255,255,255,0.92); color: var(--ink);
      border: none; cursor: pointer;
      transition: background 0.3s, color 0.3s, transform 0.2s;
    }
    .btn-primary:hover { background: #fff; transform: translateY(-2px); }

    .btn-ghost {
      font-family: 'Jost', sans-serif; font-weight: 300;
      font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase;
      padding: 14px 36px; border-radius: 100px;
      background: transparent; color: #fff;
      border: 1px solid rgba(255,255,255,0.5); cursor: pointer;
      transition: background 0.3s, transform 0.2s;
    }
    .btn-ghost:hover { background: rgba(255,255,255,0.12); transform: translateY(-2px); }

    .hero-dots {
      position: absolute; bottom: 28px; left: 50%;
      transform: translateX(-50%); display: flex; gap: 8px; z-index: 3;
    }
    .hero-dot {
      width: 5px; height: 5px; border-radius: 50%;
      background: rgba(255,255,255,0.35); transition: all 0.4s;
      cursor: pointer; border: none; padding: 0;
    }
    .hero-dot.active { background: #fff; transform: scale(1.4); }

    /* ── Scroll marker ── */
    .scroll-hint {
      position: absolute; right: 32px; bottom: 40px; z-index: 3;
      display: flex; flex-direction: column; align-items: center; gap: 8px;
    }
    .scroll-hint span {
      font-size: 8px; letter-spacing: 0.4em; text-transform: uppercase;
      color: rgba(255,255,255,0.5); writing-mode: vertical-rl;
      font-family: 'Jost', sans-serif; font-weight: 300;
    }
    .scroll-line {
      width: 1px; height: 48px;
      background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
    }

    /* ── ABOUT ── */
    .about-section {
      padding: clamp(80px, 14vw, 180px) clamp(24px, 6vw, 96px);
      background: var(--ivory);
    }
    .about-inner {
      max-width: 1240px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: clamp(40px, 8vw, 120px); align-items: center;
    }
    @media (max-width: 860px) { .about-inner { grid-template-columns: 1fr; } }

    .about-tag {
      display: inline-block;
      font-size: 9px; letter-spacing: 0.48em; text-transform: uppercase;
      color: var(--rose); font-family: 'Jost'; font-weight: 300;
      margin-bottom: 20px;
    }
    .about-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(42px, 6vw, 80px);
      font-weight: 300; line-height: 1.05;
      color: var(--ink); margin-bottom: 28px;
    }
    .about-heading em { font-style: italic; color: var(--rose); }

    .about-body {
      font-size: 14px; line-height: 1.9; color: var(--muted);
      font-weight: 300; max-width: 400px; margin-bottom: 40px;
    }

    .about-stats {
      display: flex; gap: 40px;
    }
    .stat-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 46px; font-weight: 300; color: var(--ink); line-height: 1;
    }
    .stat-lbl {
      font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
      color: var(--muted); font-weight: 300; margin-top: 4px;
    }

    .about-img-wrap {
      position: relative; padding-top: 20px;
    }
    .about-img-main {
      width: 80%; aspect-ratio: 3/4; object-fit: cover;
      box-shadow: 24px 24px 0 var(--linen);
    }
    .about-img-accent {
      position: absolute; bottom: -20px; right: 0;
      width: 48%; aspect-ratio: .8; object-fit: cover;
      border: 8px solid var(--ivory);
      box-shadow: 0 12px 40px rgba(42,37,32,0.12);
    }
    .about-label {
      position: absolute; top: 0; left: -10px;
      font-family: 'Alex Brush', cursive;
      font-size: 18px; color: var(--rose);
      transform: rotate(-4deg);
    }

    /* ── GALLERY ── */
    .gallery-section {
      padding: clamp(60px, 10vw, 140px) clamp(24px, 5vw, 72px);
      background: var(--linen);
    }
    .section-header {
      text-align: center; margin-bottom: clamp(40px, 6vw, 80px);
    }
    .section-tag {
      display: block; font-size: 9px; letter-spacing: 0.48em;
      text-transform: uppercase; color: var(--sage);
      font-family: 'Jost'; font-weight: 300; margin-bottom: 16px;
    }
    .section-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(38px, 5.5vw, 72px);
      font-weight: 300; color: var(--ink); line-height: 1.05;
    }
    .section-heading em { font-style: italic; color: var(--rose); }

    .gallery-grid {
      max-width: 1320px; margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: auto;
      gap: 12px;
    }
    @media (max-width: 720px) { .gallery-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 480px) { .gallery-grid { grid-template-columns: 1fr; } }

    .gallery-item { overflow: hidden; position: relative; cursor: pointer; }
    .gallery-item:nth-child(1) { grid-row: span 2; aspect-ratio: 2/3; }
    .gallery-item:nth-child(2) { aspect-ratio: 4/3; }
    .gallery-item:nth-child(3) { aspect-ratio: 4/3; }
    .gallery-item:nth-child(4) { aspect-ratio: 4/3; }
    .gallery-item:nth-child(5) { aspect-ratio: 4/3; }
    .gallery-item:nth-child(6) { grid-column: span 1; aspect-ratio: 4/3; }

    .gallery-item img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.6s;
    }
    .gallery-item:hover img { transform: scale(1.06); filter: brightness(0.88); }

    .gallery-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(42,37,32,0.4) 0%, transparent 50%);
      opacity: 0; transition: opacity 0.5s;
      display: flex; align-items: flex-end; padding: 20px;
    }
    .gallery-item:hover .gallery-overlay { opacity: 1; }
    .gallery-overlay-text {
      font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
      color: rgba(255,255,255,0.85); font-family: 'Jost'; font-weight: 300;
    }

    .gallery-cta {
      text-align: center; margin-top: 48px;
    }
    .btn-outline {
      display: inline-block;
      font-family: 'Jost', sans-serif; font-weight: 300;
      font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
      padding: 14px 44px; border-radius: 100px;
      border: 1px solid var(--ink); color: var(--ink);
      background: transparent; cursor: pointer;
      transition: background 0.35s, color 0.35s, transform 0.2s;
    }
    .btn-outline:hover { background: var(--ink); color: var(--ivory); transform: translateY(-2px); }

    /* ── TESTIMONIALS ── */
    .testimonials-section {
      padding: clamp(60px, 10vw, 140px) clamp(24px, 5vw, 72px);
      background: var(--ivory);
    }
    .testimonials-track {
      display: flex; gap: 24px; overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none; max-width: 1320px; margin: 0 auto;
      padding-bottom: 8px;
    }
    .testimonials-track::-webkit-scrollbar { display: none; }

    .testimonial-card {
      flex: 0 0 clamp(280px, 38vw, 440px);
      scroll-snap-align: start;
      background: var(--linen);
      padding: clamp(28px, 4vw, 48px);
      position: relative; overflow: hidden;
    }
    .testimonial-card::before {
      content: '"';
      font-family: 'Cormorant Garamond', serif;
      font-size: 180px; font-weight: 300; color: var(--blush);
      position: absolute; top: -20px; right: 16px;
      line-height: 1; pointer-events: none; z-index: 0;
    }
    .testimonial-img {
      width: 56px; height: 56px; border-radius: 50%; object-fit: cover;
      margin-bottom: 20px; position: relative; z-index: 1;
    }
    .testimonial-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(17px, 1.8vw, 21px);
      font-weight: 300; font-style: italic;
      line-height: 1.65; color: var(--ink);
      margin-bottom: 24px; position: relative; z-index: 1;
    }
    .testimonial-name {
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 400; color: var(--ink); margin-bottom: 4px;
    }
    .testimonial-meta {
      font-size: 10px; letter-spacing: 0.2em; color: var(--muted);
      font-weight: 300; font-family: 'Jost';
    }
    .testimonial-type {
      display: inline-block; margin-top: 14px;
      font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
      color: var(--rose); font-weight: 300;
    }

    /* ── CONTACT ── */
    .contact-section {
      padding: clamp(60px, 10vw, 140px) clamp(24px, 6vw, 96px);
      background: var(--linen);
    }
    .contact-inner {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr;
      gap: clamp(40px, 8vw, 100px); align-items: start;
    }
    @media (max-width: 820px) { .contact-inner { grid-template-columns: 1fr; } }

    .contact-eyebrow {
      font-size: 9px; letter-spacing: 0.44em; text-transform: uppercase;
      color: var(--rose); font-weight: 300; display: block; margin-bottom: 20px;
    }
    .contact-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(40px, 5.5vw, 70px);
      font-weight: 300; line-height: 1.05;
      color: var(--ink); margin-bottom: 24px;
    }
    .contact-heading em { font-style: italic; }

    .contact-body {
      font-size: 13px; line-height: 1.9; color: var(--muted);
      font-weight: 300; margin-bottom: 36px; max-width: 360px;
    }

    .contact-details { display: flex; flex-direction: column; gap: 10px; }
    .contact-detail-item {
      display: flex; gap: 12px; align-items: center;
      font-size: 11px; letter-spacing: 0.18em; color: var(--muted); font-weight: 300;
    }
    .contact-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--rose); flex-shrink: 0; }

    .contact-form { display: flex; flex-direction: column; gap: 0; }
    .form-field { position: relative; margin-bottom: 4px; }
    .form-input, .form-textarea {
      width: 100%; padding: 20px 0 14px;
      border: none; border-bottom: 1px solid rgba(42,37,32,0.15);
      background: transparent; outline: none;
      font-family: 'Jost', sans-serif; font-size: 11px;
      letter-spacing: 0.28em; text-transform: uppercase; color: var(--ink);
      font-weight: 300; resize: none;
      transition: border-color 0.3s;
    }
    .form-input:focus, .form-textarea:focus { border-color: var(--rose); }
    .form-input::placeholder, .form-textarea::placeholder { color: rgba(42,37,32,0.35); }

    .form-label {
      position: absolute; top: 20px; left: 0; pointer-events: none;
      font-size: 9px; letter-spacing: 0.44em; text-transform: uppercase;
      color: transparent; transition: all 0.3s;
    }

    .btn-submit {
      margin-top: 32px; padding: 16px 48px; align-self: flex-start;
      font-family: 'Jost', sans-serif; font-weight: 300;
      font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
      background: var(--ink); color: var(--ivory);
      border: none; border-radius: 100px; cursor: pointer;
      transition: background 0.3s, transform 0.2s;
    }
    .btn-submit:hover { background: var(--rose); transform: translateY(-2px); }

    /* ── FOOTER STRIP ── */
    .footer-strip {
      background: var(--ink); padding: 28px clamp(24px, 5vw, 72px);
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
    }
    .footer-logo {
      font-family: 'Alex Brush', cursive; font-size: 28px; color: rgba(250,247,242,0.7);
    }
    .footer-copy {
      font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
      color: rgba(250,247,242,0.3); font-weight: 300;
    }

    /* ── Divider flourish ── */
    .divider {
      display: flex; align-items: center; gap: 16px;
      max-width: 240px; margin: 0 auto 52px;
    }
    .divider-line { flex: 1; height: 1px; background: var(--blush); }
    .divider-icon { font-family: 'Alex Brush', cursive; font-size: 22px; color: var(--rose); }

    @media (max-width: 600px) {
      .hero-btns { flex-direction: column; align-items: center; }
      .about-stats { gap: 24px; }
      .scroll-hint { display: none; }
    }
  `}</style>
);

function HomeHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setCurrentIndex(p => (p + 1) % HERO_IMAGES.length), 5500);
    return () => clearInterval(id);
  }, []);

  const imgs = isMobile ? HERO_IMAGESMOBILE : HERO_IMAGES;

  return (
    <div className="lw-root">
      <GrainStyle />

      {/* ═══ HERO ═══ */}
      <section className="hero-wrap" ref={heroRef}>
        <AnimatePresence mode="sync">
          <motion.img
            key={currentIndex}
            src={imgs[currentIndex]}
            className="hero-img"
            style={{ y: heroY }}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        <div className="hero-vignette" />

        <div className="hero-content">
          <motion.p className="hero-eyebrow"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}>
            Wedding Photography &amp; Films · Kerala
          </motion.p>

          <motion.h1 className="hero-title"
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}>
            Where Every <em>Moment</em><br />Becomes Eternal
          </motion.h1>

          <motion.span className="hero-script"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 1 }}>
            Luvit Weds
          </motion.span>

          <motion.div className="hero-btns"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.9 }}>
            <button className="btn-primary" onClick={() => navigate('/packages')}>
              Explore Packages
            </button>
            <button className="btn-ghost" onClick={() => navigate('/gallery')}>
              View Portfolio
            </button>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="hero-dots">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} className={`hero-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span>Scroll</span>
          <motion.div className="scroll-line"
            animate={{ scaleY: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="about-section">
        <div className="about-inner">
          {/* Text */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span className="about-tag" variants={fadeUp} custom={0}>
              Our Story
            </motion.span>
            <motion.h2 className="about-heading" variants={fadeUp} custom={1}>
              We Don't Just<br /><em>Photograph</em> —<br />We Feel
            </motion.h2>
            <motion.p className="about-body" variants={fadeUp} custom={2}>
              Based in Kerala, Luvit Weds is a collective of storytellers who believe
              that authentic emotion is the most beautiful thing a camera can capture.
              From intimate elopements to grand celebrations, we bring our hearts
              to every frame.
            </motion.p>
            <motion.div className="about-stats" variants={fadeUp} custom={3}>
              {[['150+', 'Weddings'], ['7+', 'Years']].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-num">{n}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Images */}
          <div className="about-img-wrap">
            <span className="about-label">since 2017</span>
            <motion.img
              src={wed01} alt="Wedding" className="about-img-main"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }} />
            <motion.img
              src={wed07} alt="Detail" className="about-img-accent"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }} />
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section className="gallery-section">
        <motion.div className="section-header"
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.span className="section-tag" variants={fadeUp} custom={0}>Portfolio</motion.span>
          <motion.h2 className="section-heading" variants={fadeUp} custom={1}>
            Moments <em>Preserved</em>
          </motion.h2>
          <div className="divider" style={{ marginTop: 28 }}>
            <div className="divider-line" />
            <span className="divider-icon">✦</span>
            <div className="divider-line" />
          </div>
        </motion.div>

        <div className="gallery-grid">
          {WEDDING_IMAGES.map((img, i) => (
            <motion.div className="gallery-item" key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}>
              <img src={img} alt={`Gallery ${i + 1}`} />
              <div className="gallery-overlay">
                <span className="gallery-overlay-text">View Story</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="gallery-cta">
          <motion.button className="btn-outline"
            onClick={() => navigate('/gallery')}
            whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
            Explore Full Gallery
          </motion.button>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="testimonials-section">
        <motion.div className="section-header"
          initial="hidden" whileInView="show" viewport={{ once: true }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.span className="section-tag" variants={fadeUp} custom={0}>Kind Words</motion.span>
          <motion.h2 className="section-heading" variants={fadeUp} custom={1}>
            Stories They <em>Shared</em>
          </motion.h2>
        </motion.div>

        <div className="testimonials-track">
          {TESTIMONIALS.map((t, i) => (
            <motion.div className="testimonial-card" key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}>
              <img src={t.image} alt={t.name} className="testimonial-img" />
              <p className="testimonial-text">{t.text}</p>
              <p className="testimonial-name">{t.name}</p>
              <p className="testimonial-meta">{t.date}</p>
              <span className="testimonial-type">{t.type}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact-section">
        <div className="contact-inner">
          {/* Left */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span className="contact-eyebrow" variants={fadeUp} custom={0}>
              Let's Begin
            </motion.span>
            <motion.h2 className="contact-heading" variants={fadeUp} custom={1}>
              Tell Us Your<br /><em>Dream Day</em>
            </motion.h2>
            <motion.p className="contact-body" variants={fadeUp} custom={2}>
              We'd love to hear about your vision. Share the details and
              our team will respond within 24 hours with everything you need.
            </motion.p>
            <motion.div className="contact-details" variants={fadeUp} custom={3}>
              {['luvitweds@gmail.com', '+91 88482 12636', 'Kozhikode, Kerala'].map(d => (
                <div className="contact-detail-item" key={d}>
                  <div className="contact-dot" />
                  <span>{d}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form className="contact-form"
            initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            onSubmit={e => e.preventDefault()}>
            {[
              { placeholder: 'Your Name', type: 'text' },
              { placeholder: 'Phone Number', type: 'tel' },
              { placeholder: 'Wedding Date', type: 'text' },
            ].map(f => (
              <div className="form-field" key={f.placeholder}>
                <input type={f.type} placeholder={f.placeholder}
                  className="form-input" />
              </div>
            ))}
            <div className="form-field">
              <textarea placeholder="Tell Us About Your Day" rows={4}
                className="form-textarea" />
            </div>
            <motion.button type="submit" className="btn-submit"
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* ═══ FOOTER STRIP ═══ */}
      <footer className="footer-strip">
        <span className="footer-logo">Luvit Weds</span>
        <span className="footer-copy">© 2025 Luvit Weds · All Rights Reserved</span>
      </footer>
    </div>
  );
}

export default HomeHeader;
