import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Hero Asset imports
import sectionOne1 from '../../assets/GALLERY/SECTION_ONE/sectionone (1).jpg';
import sectionOne2 from '../../assets/GALLERY/SECTION_ONE/sectionone (2).jpg';
import sectionOne3 from '../../assets/GALLERY/SECTION_ONE/sectionone (3).jpg';
import sectionOne4 from '../../assets/GALLERY/SECTION_ONE/sectionone (4).jpg';
import sectionOne6 from '../../assets/GALLERY/SECTION_ONE/sectionone (6).jpg';
import sectionOne7 from '../../assets/GALLERY/SECTION_ONE/sectionone (7).jpg';

const heroImages = [sectionOne1, sectionOne2, sectionOne3, sectionOne4, sectionOne6, sectionOne7];

/* ─── Styles ─── */
const GalleryStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Unbounded:wght@200;300&family=Alex+Brush&display=swap');

    :root {
      --cream:    #f8f4ee;
      --parchment: #efe8dc;
      --blush:    #e4cfc0;
      --rose:     #c4856b;
      --mink:     #8c7b70;
      --ink:      #231f1b;
      --white:    #fdfaf6;
    }

    .gallery-root {
      font-family: 'Cormorant Garamond', serif;
      background: var(--cream);
      color: var(--ink);
      overflow-x: hidden;
      cursor: crosshair;
    }

    .gallery-root::before {
      content: '';
      position: fixed; inset: 0; z-index: 9998;
      pointer-events: none; opacity: 0.028;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 160px;
    }

    .gal-masthead {
      padding: clamp(80px,12vw,160px) clamp(24px,6vw,88px) 0;
      max-width: 1440px; margin: 0 auto;
    }
    .gal-eyebrow {
      display: flex; align-items: center; gap: 18px;
      font-family: 'Unbounded', sans-serif;
      font-size: 8px; font-weight: 200;
      letter-spacing: 0.55em; text-transform: uppercase;
      color: var(--mink); margin-bottom: 32px;
    }
    .gal-eyebrow-line { flex: 0 0 36px; height: 1px; background: var(--blush); }

    .gal-title-row {
      display: flex; align-items: flex-end;
      justify-content: space-between; gap: 24px;
      flex-wrap: wrap;
      border-bottom: 1px solid rgba(35,31,27,0.08);
      padding-bottom: clamp(32px, 5vw, 64px);
    }
    .gal-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(64px, 11vw, 148px);
      font-weight: 300; line-height: 0.88;
      color: var(--ink); letter-spacing: -0.01em;
    }
    .gal-title em {
      font-style: italic; color: var(--rose);
    }
    .gal-title-meta {
      max-width: 280px; padding-bottom: 8px;
    }
    .gal-title-meta p {
      font-size: 15px; font-weight: 300; font-style: italic;
      color: var(--mink); line-height: 1.75; margin-bottom: 20px;
    }
    .gal-count {
      font-family: 'Unbounded', sans-serif;
      font-size: 9px; font-weight: 200; letter-spacing: 0.35em;
      color: var(--rose); text-transform: uppercase;
    }

    .filmstrip-wrap {
      overflow: hidden; width: 100%;
      padding: clamp(40px, 7vw, 80px) 0;
      background: var(--cream);
      position: relative;
    }
    .filmstrip-label {
      font-family: 'Unbounded', sans-serif;
      font-size: 8px; font-weight: 200; letter-spacing: 0.5em;
      text-transform: uppercase; color: var(--mink);
      padding: 0 clamp(24px, 6vw, 88px);
      margin-bottom: 24px; display: block;
    }
    .filmstrip-track {
      display: flex; gap: 12px;
      animation: filmScroll 28s linear infinite;
      width: max-content;
      padding: 0 clamp(24px, 6vw, 88px);
    }
    .filmstrip-track:hover { animation-play-state: paused; }

    @keyframes filmScroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .filmstrip-frame {
      position: relative; flex: 0 0 auto;
      width: clamp(220px, 26vw, 380px);
      aspect-ratio: 3/4; overflow: hidden;
      cursor: pointer;
    }
    .filmstrip-frame.landscape {
      aspect-ratio: 4/3;
      width: clamp(300px, 36vw, 500px);
    }
    .filmstrip-frame img {
      width: 100%; height: 100%; object-fit: cover;
      filter: brightness(0.95) saturate(0.9);
      transition: transform 0.9s cubic-bezier(0.22,1,0.36,1), filter 0.6s;
    }
    .filmstrip-frame:hover img {
      transform: scale(1.06); filter: brightness(1) saturate(1.05);
    }
    .frame-number {
      position: absolute; bottom: 10px; right: 14px;
      font-family: 'Unbounded', sans-serif;
      font-size: 7px; font-weight: 200; letter-spacing: 0.2em;
      color: rgba(255,255,255,0.55); z-index: 2;
    }
    .filmstrip-frame::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(35,31,27,0.22) 0%, transparent 40%);
      pointer-events: none;
    }

    .gal-divider {
      display: flex; align-items: center; gap: 20px;
      padding: clamp(48px, 7vw, 96px) clamp(24px, 6vw, 88px) clamp(32px, 5vw, 64px);
      max-width: 1440px; margin: 0 auto;
    }
    .gal-div-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(72px, 10vw, 130px); font-weight: 300;
      color: var(--parchment); line-height: 1;
      flex-shrink: 0; user-select: none;
    }
    .gal-div-content { flex: 1; }
    .gal-div-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(28px, 4vw, 52px);
      font-weight: 300; font-style: italic;
      color: var(--ink); line-height: 1.1; margin-bottom: 8px;
    }
    .gal-div-line { height: 1px; background: var(--blush); margin-top: 16px; }

    .gal-grid-wrap {
      padding: 0 clamp(24px, 6vw, 88px) clamp(80px, 12vw, 140px);
      max-width: 1440px; margin: 0 auto;
    }

    .gal-layout-a {
      display: grid;
      grid-template-columns: 1.55fr 1fr;
      grid-template-rows: auto auto;
      gap: 10px; margin-bottom: 10px;
    }
    .gal-layout-a .cell-main {
      grid-row: span 2; aspect-ratio: 2/3;
    }
    .gal-layout-a .cell-side { aspect-ratio: 4/3; }

    .gal-layout-b {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px; margin-bottom: 10px;
    }
    .gal-layout-b .cell { aspect-ratio: 1; }

    .gal-layout-c {
      display: grid;
      grid-template-columns: 1fr 0.6fr;
      gap: 10px; margin-bottom: 10px;
    }
    .gal-layout-c .cell-wide { aspect-ratio: 16/10; }
    .gal-layout-c .cell-port { aspect-ratio: 3/4; }

    .gal-layout-d {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px; margin-bottom: 10px;
    }
    .gal-layout-d .cell { aspect-ratio: 3/4; }

    .gal-layout-e { margin-bottom: 10px; }
    .gal-layout-e .cell-full { aspect-ratio: 21/9; }

    @media (max-width: 768px) {
      .gal-layout-a, .gal-layout-b, .gal-layout-c, .gal-layout-d {
        grid-template-columns: 1fr 1fr;
      }
      .gal-layout-a .cell-main { grid-row: unset; aspect-ratio: 1; }
      .gal-layout-e .cell-full { aspect-ratio: 4/3; }
    }
    @media (max-width: 480px) {
      .gal-layout-a, .gal-layout-b, .gal-layout-c, .gal-layout-d {
        grid-template-columns: 1fr;
      }
    }

    .img-cell {
      position: relative; overflow: hidden;
      background: var(--parchment); cursor: pointer;
    }
    .img-cell img {
      width: 100%; height: 100%; object-fit: cover;
      display: block;
      filter: brightness(0.97) saturate(0.92);
      transition: transform 1s cubic-bezier(0.22,1,0.36,1), filter 0.7s;
    }
    .img-cell:hover img {
      transform: scale(1.05);
      filter: brightness(1.02) saturate(1.04);
    }
    .img-cell-overlay {
      position: absolute; inset: 0; pointer-events: none;
      background: linear-gradient(135deg, transparent 60%, rgba(35,31,27,0.08));
      opacity: 0; transition: opacity 0.5s;
    }
    .img-cell:hover .img-cell-overlay { opacity: 1; }
    .img-cell-tag {
      position: absolute; bottom: 12px; left: 14px;
      font-family: 'Unbounded', sans-serif;
      font-size: 7px; font-weight: 200; letter-spacing: 0.35em;
      color: rgba(255,255,255,0); text-transform: uppercase;
      transition: color 0.5s; pointer-events: none;
    }
    .img-cell:hover .img-cell-tag { color: rgba(255,255,255,0.6); }

    .load-more-zone {
      padding: clamp(40px, 6vw, 80px) clamp(24px, 6vw, 88px);
      display: flex; align-items: center; justify-content: center; gap: 32px;
    }
    .load-line { flex: 1; height: 1px; background: var(--blush); max-width: 200px; }
    .load-btn {
      font-family: 'Unbounded', sans-serif; font-size: 9px; font-weight: 200;
      letter-spacing: 0.42em; text-transform: uppercase;
      color: var(--ink); background: transparent; border: none;
      padding: 18px 40px; cursor: pointer; position: relative;
      transition: color 0.3s;
    }
    .load-btn::before {
      content: ''; position: absolute; inset: 0;
      border: 1px solid rgba(35,31,27,0.18);
      transition: border-color 0.4s, background 0.4s;
    }
    .load-btn:hover { color: var(--white); }
    .load-btn:hover::before { background: var(--ink); border-color: var(--ink); }
    .load-btn:disabled { opacity: 0.4; pointer-events: none; }

    .lightbox-bg {
      position: fixed; inset: 0; z-index: 9999;
      background: rgba(245,240,233,0.97);
      display: flex; align-items: center; justify-content: center;
      padding: 40px;
      backdrop-filter: blur(2px);
    }
    .lightbox-close {
      position: fixed; top: 28px; right: 32px;
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; z-index: 10;
    }
    .lightbox-close span {
      position: absolute; width: 24px; height: 1px; background: var(--ink);
    }
    .lightbox-close span:first-child { transform: rotate(45deg); }
    .lightbox-close span:last-child { transform: rotate(-45deg); }
    .lightbox-img {
      max-width: min(88vw, 1100px);
      max-height: 85vh;
      object-fit: contain;
      box-shadow: 0 40px 100px rgba(35,31,27,0.18);
    }
    .lightbox-nav {
      position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 20px; align-items: center;
      font-family: 'Unbounded', sans-serif;
      font-size: 8px; letter-spacing: 0.4em; color: var(--mink);
    }
    .lightbox-nav-btn {
      background: none; border: 1px solid var(--blush);
      color: var(--ink); padding: 10px 24px; cursor: pointer;
      font-family: 'Unbounded', sans-serif;
      font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase;
      transition: background 0.3s, color 0.3s;
    }
    .lightbox-nav-btn:hover { background: var(--ink); color: var(--white); border-color: var(--ink); }

    .gal-footer {
      border-top: 1px solid rgba(35,31,27,0.07);
      padding: 32px clamp(24px, 6vw, 88px);
      display: flex; justify-content: space-between; align-items: center;
      flex-wrap: wrap; gap: 12px;
    }
    .gal-footer-logo {
      font-family: 'Alex Brush', cursive; font-size: 26px; color: var(--mink);
    }
    .gal-footer-copy {
      font-family: 'Unbounded', sans-serif; font-size: 7px;
      font-weight: 200; letter-spacing: 0.35em; text-transform: uppercase; color: var(--blush);
    }
  `}</style>
);

/* ─── Image Cell component ─── */
function ImgCell({ src, tag, onClick, className = '' }) {
  return (
    <motion.div
      className={`img-cell ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <img src={src} alt="" loading="lazy" />
      <div className="img-cell-overlay" />
      {tag && <span className="img-cell-tag">{tag}</span>}
    </motion.div>
  );
}

/* ─── Main Component ─── */
function Gallery() {
  const [loadedImages, setLoadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [totalLoaded, setTotalLoaded] = useState(0);
  const TOTAL = 111;
  const BATCH = 15;

  const imageIds = useMemo(() => Array.from({ length: TOTAL }, (_, i) => i + 1), []);

  const loadImages = useCallback(async (start, end) => {
    setIsLoading(true);
    try {
      const batch = await Promise.all(
        imageIds.slice(start, end).map(async (id) => {
          const mod = await import(`../../assets/GALLERY/SECTION_TWO/sectiontwo (${id}).jpg`);
          return { id, src: mod.default };
        })
      );
      setLoadedImages(prev => [...prev, ...batch]);
      setTotalLoaded(end);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [imageIds]);

  useEffect(() => { loadImages(0, BATCH); }, [loadImages]);

  const lightboxImages = loadedImages.map(i => i.src);

  const openLightbox = (idx) => setLightboxIndex(idx);
  
  // FIXED: Wrapped in useCallback to satisfy dependency requirements
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  
  const prevImage = useCallback(() => {
    setLightboxIndex(i => (i - 1 + lightboxImages.length) % lightboxImages.length);
  }, [lightboxImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex(i => (i + 1) % lightboxImages.length);
  }, [lightboxImages.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, prevImage, nextImage, closeLightbox]); // FIXED: Added missing dependencies

  const chunks = useMemo(() => {
    const arr = [];
    for (let i = 0; i < loadedImages.length; i += 7) {
      arr.push(loadedImages.slice(i, i + 7));
    }
    return arr;
  }, [loadedImages]);

  const layouts = ['a', 'b', 'c', 'd', 'e'];

  return (
    <div className="gallery-root">
      <GalleryStyles />

      <div className="gal-masthead">
        <motion.div className="gal-eyebrow"
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}>
          <div className="gal-eyebrow-line" />
          The Archive · Luvit Weds
        </motion.div>

        <div className="gal-title-row">
          <motion.h1 className="gal-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            Our<br /><em>Gallery</em>
          </motion.h1>

          <motion.div className="gal-title-meta"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}>
            <p>A curated archive of frames where light, love, and fleeting moments converge into something eternal.</p>
            <span className="gal-count">{TOTAL}+ Frames Captured</span>
          </motion.div>
        </div>
      </div>

      <div className="filmstrip-wrap">
        <span className="filmstrip-label">Selected Works — Scroll</span>
        <div className="filmstrip-track">
          {[...heroImages, ...heroImages].map((src, i) => (
            <div
              key={i}
              className={`filmstrip-frame ${i % 3 === 1 ? 'landscape' : ''}`}
              onClick={() => openLightbox(i % heroImages.length)}
            >
              <img src={src} alt="" />
              <span className="frame-number">{String(i % heroImages.length + 1).padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>

      {chunks.map((chunk, ci) => {
        const layout = layouts[ci % layouts.length];
        const offset = ci * 7;

        return (
          <React.Fragment key={ci}>
            {ci % 2 === 0 && (
              <div className="gal-divider">
                <span className="gal-div-num">{String(ci / 2 + 1).padStart(2, '0')}</span>
                <div className="gal-div-content">
                  <h2 className="gal-div-title">
                    {['Wedded Moments', 'Light & Shadow', 'Unscripted Joy', 'Golden Hours'][Math.floor(ci / 2) % 4]}
                  </h2>
                  <div className="gal-div-line" />
                </div>
              </div>
            )}

            <div className="gal-grid-wrap">
              {layout === 'a' && chunk.length >= 3 && (
                <div className="gal-layout-a">
                  <ImgCell src={chunk[0].src} className="cell-main" onClick={() => openLightbox(offset)} />
                  <ImgCell src={chunk[1].src} className="cell-side" onClick={() => openLightbox(offset + 1)} />
                  <ImgCell src={chunk[2].src} className="cell-side" onClick={() => openLightbox(offset + 2)} />
                </div>
              )}

              {layout === 'b' && chunk.length >= 3 && (
                <div className="gal-layout-b">
                  {chunk.slice(0, 3).map((img, i) => (
                    <ImgCell key={img.id} src={img.src} className="cell" onClick={() => openLightbox(offset + i)} />
                  ))}
                </div>
              )}

              {layout === 'c' && chunk.length >= 2 && (
                <div className="gal-layout-c">
                  <ImgCell src={chunk[0].src} className="cell-wide" onClick={() => openLightbox(offset)} />
                  <ImgCell src={chunk[1].src} className="cell-port" onClick={() => openLightbox(offset + 1)} />
                </div>
              )}

              {layout === 'd' && chunk.length >= 2 && (
                <div className="gal-layout-d">
                  <ImgCell src={chunk[0].src} className="cell" onClick={() => openLightbox(offset)} />
                  <ImgCell src={chunk[1].src} className="cell" onClick={() => openLightbox(offset + 1)} />
                </div>
              )}

              {layout === 'e' && chunk.length >= 1 && (
                <div className="gal-layout-e">
                  <ImgCell src={chunk[0].src} className="cell-full" onClick={() => openLightbox(offset)} tag="Full Frame" />
                </div>
              )}

              {chunk.length > 3 && (
                <div className="gal-layout-b" style={{ marginTop: 10 }}>
                  {chunk.slice(layout === 'a' ? 3 : layout === 'e' ? 1 : layout === 'c' ? 2 : layout === 'd' ? 2 : 3).map((img, i) => (
                    <ImgCell key={img.id} src={img.src} className="cell"
                      onClick={() => openLightbox(offset + (layout === 'a' ? 3 : layout === 'e' ? 1 : layout === 'c' ? 2 : layout === 'd' ? 2 : 3) + i)} />
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}

      {totalLoaded < TOTAL && (
        <div className="load-more-zone">
          <div className="load-line" />
          <button
            className="load-btn"
            onClick={() => loadImages(totalLoaded, Math.min(totalLoaded + BATCH, TOTAL))}
            disabled={isLoading}
          >
            {isLoading ? 'Loading…' : 'Load More Frames'}
          </button>
          <div className="load-line" />
        </div>
      )}

      <footer className="gal-footer">
        <span className="gal-footer-logo">Luvit Weds</span>
        <span className="gal-footer-copy">© 2025 · All Stories Captured with Heart</span>
      </footer>

      <AnimatePresence>
        {lightboxIndex !== null && lightboxImages[lightboxIndex] && (
          <motion.div
            className="lightbox-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeLightbox}
          >
            <div className="lightbox-close" onClick={closeLightbox}>
              <span /><span />
            </div>

            <motion.img
              key={lightboxIndex}
              src={lightboxImages[lightboxIndex]}
              className="lightbox-img"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              alt="Lightbox"
            />

            <div className="lightbox-nav" onClick={e => e.stopPropagation()}>
              <button className="lightbox-nav-btn" onClick={prevImage}>← Prev</button>
              <span>{String(lightboxIndex + 1).padStart(2, '0')} / {String(lightboxImages.length).padStart(3, '0')}</span>
              <button className="lightbox-nav-btn" onClick={nextImage}>Next →</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;