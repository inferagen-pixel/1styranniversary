import { useState, useEffect, useRef, Component } from 'react';
import InfiniteMenu from './InfiniteMenu';
import { items, videoUrl } from './images';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error('App error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          height: '100vh', background: '#050508', color: '#ff758f',
          fontFamily: 'Georgia, serif', textAlign: 'center', padding: '2rem',
          flexDirection: 'column', gap: '1rem'
        }}>
          <div style={{ fontSize: '2rem' }}>💖</div>
          <div style={{ fontSize: '1.4rem' }}>Happy 1st Anniversary!</div>
          <div style={{ color: '#a5aab8', fontSize: '1rem' }}>
            Swipe to see our beautiful memories
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Premium SVG Heart Component
function HeartParticle({ type }) {
  if (type === 0) {
    // Elegant Rose-Pink Heart with Glowing Gradient
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 117, 143, 0.6))' }}>
        <path
          fill="url(#roseHeartGradient)"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
        <defs>
          <linearGradient id="roseHeartGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff758f" />
            <stop offset="100%" stopColor="#ff85a2" />
          </linearGradient>
        </defs>
      </svg>
    );
  } else if (type === 1) {
    // Beautiful Gold Highlighted Heart
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 4px rgba(230, 185, 128, 0.6))' }}>
        <path
          fill="url(#goldHeartGradient)"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
        <defs>
          <linearGradient id="goldHeartGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e6b980" />
            <stop offset="100%" stopColor="#c59f6d" />
          </linearGradient>
        </defs>
      </svg>
    );
  } else if (type === 2) {
    // Intertwined Double Hearts
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 4px rgba(255, 133, 162, 0.5))' }}>
        <path
          fill="#ff85a2"
          opacity="0.8"
          d="M9 16.5l-.85-.77C4.7 12.7 2 10.3 2 7.7 2 5.4 3.7 3.7 6 3.7c1.3 0 2.5.6 3.3 1.5C10.1 4.3 11.3 3.7 12.6 3.7c2.3 0 4 1.7 4 4 0 2.6-2.7 5-6.1 8.1L9 16.5z"
        />
        <path
          fill="#ff477e"
          d="M15 20.5l-.85-.77c-3.45-3.03-6.15-5.43-6.15-8.03 0-2.3 1.7-4 4-4 1.3 0 2.5.6 3.3 1.5.8-.9 2-1.5 3.3-1.5 2.3 0 4 1.7 4 4 0 2.6-2.7 5-6.1 8.1l-.9.7z"
        />
      </svg>
    );
  } else {
    // Beautiful Sparkle Star
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ filter: 'drop-shadow(0 0 5px rgba(230, 185, 128, 0.7))' }}>
        <path
          fill="url(#goldStarGradient)"
          d="M12 2l2.6 6.1L21 9.1l-4.7 4.5L17.6 20l-5.6-3.4L6.4 20l1.3-6.4L3 9.1l6.4-1L12 2z"
        />
        <defs>
          <linearGradient id="goldStarGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e6b980" />
            <stop offset="100%" stopColor="#bfa172" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
}

export default function App() {
  const [activeItem, setActiveItem] = useState(items[0] || null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [hearts, setHearts] = useState([]);

  // Prologue Introduction Sequence state
  // Stages: 0: Oi pondattii, 1: Thank you for being with me, 2: Happy anniversary, 3: Completed
  const [introStage, setIntroStage] = useState(0);
  const [isIntroDismissed, setIsIntroDismissed] = useState(false);
  
  const audioRef = useRef(null);

  // Generate premium floating hearts & sparkles
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 10 : 28;
    const initialHearts = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 1.4 + 0.7,
      delay: Math.random() * 8,
      duration: Math.random() * 12 + 8,
      type: Math.floor(Math.random() * 4)
    }));
    setHearts(initialHearts);
  }, []);

  // Music toggle handler
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlayingMusic) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log('Audio playback prevented by browser:', err));
    }
    setIsPlayingMusic(!isPlayingMusic);
  };

  // Progression clicks for introductory overlays
  const handleIntroNext = () => {
    if (introStage < 2) {
      setIntroStage(prev => prev + 1);
    }
  };

  const handleIntroComplete = () => {
    setIsIntroDismissed(true);
    // Auto-trigger music loop on final click interaction
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlayingMusic(true))
        .catch(err => console.log('Autoplay active music track:', err));
    }
    // Fade out overlay beautifully with a cinematic dissolve
    setTimeout(() => {
      setIntroStage(3);
    }, 850);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = (lightboxIndex - 1 + items.length) % items.length;
    setLightboxIndex(prevIndex);
    setActiveItem(items[prevIndex]);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = (lightboxIndex + 1) % items.length;
    setLightboxIndex(nextIndex);
    setActiveItem(items[nextIndex]);
  };

  // Find index of activeItem for lightbox mapping
  const openLightboxForActive = () => {
    if (!activeItem) return;
    const index = items.findIndex(item => item.image === activeItem.image);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  return (
    <ErrorBoundary>
    <div className="app-container">
      {/* Background Ambient Color Orbs */}
      <div className="orb orb-pink"></div>
      <div className="orb orb-gold"></div>
      <div className="orb orb-rose"></div>

      {/* Premium Floating Vector Hearts Background */}
      <div className="hearts-container">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.x}%`,
              width: `${heart.size * 22}px`,
              height: `${heart.size * 22}px`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`
            }}
          >
            <HeartParticle type={heart.type} />
          </div>
        ))}
      </div>

      {/* Ambient Audio Player */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3"
        loop
      />

      {/* Floating Header Capsules Container */}
      <header className="anniversary-header-container">
        {/* Left Capsule: Logo & Title Section */}
        <div className="header-pill-left glass">
          <div className="heart-icon-wrapper" style={{ width: '28px', height: '28px' }}>
            <svg viewBox="0 0 24 24" width="100%" height="100%" className="heart-icon-svg" style={{ filter: 'drop-shadow(0 0 8px #ff758f)' }}>
              <path
                fill="url(#logoHeartGradient)"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
              <defs>
                <linearGradient id="logoHeartGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff758f" />
                  <stop offset="50%" stopColor="#ff477e" />
                  <stop offset="100%" stopColor="#ff85a2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="header-title">Our Year of Love</h1>
        </div>

        {/* Middle Capsule: Statistics Counter HUD */}
        <div className="header-pill-middle glass">
          <span className="stats-pill">365 Days</span>
          <span className="stats-divider">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><circle cx="3" cy="3" r="2.5" fill="#ff758f" opacity="0.8"/></svg>
          </span>
          <span className="stats-pill">8,760 Hours</span>
          <span className="stats-divider">
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><circle cx="3" cy="3" r="2.5" fill="#e6b980" opacity="0.8"/></svg>
          </span>
          <span className="stats-pill">Infinite Memories</span>
        </div>

        {/* Right Capsule: Audio Player Controls */}
        <div className="header-pill-right">
          <button 
            className={`music-btn glass ${isPlayingMusic ? 'playing' : ''}`} 
            onClick={toggleMusic}
            title={isPlayingMusic ? "Pause Music" : "Play Ambient Music"}
          >
            <div className="music-icon-wrapper">
              <svg viewBox="0 0 24 24" width="20" height="20" className="music-icon-svg">
                <path 
                  fill={isPlayingMusic ? "#ff758f" : "#ffffff"} 
                  d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                />
              </svg>
              {isPlayingMusic && (
                <div className="soundwaves">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          </button>
        </div>
      </header>

      {/* Immersive 3D Memories WebGL Background Globe */}
      <main className="menu-viewport">
        <InfiniteMenu items={items} scale={1.0} onActiveItemChange={setActiveItem} />
      </main>

      {/* Floating Bottom Interface Panel */}
      <footer className="footer-hud">
        {/* Left Side: Cinema Journey Button */}
        {videoUrl && (
          <button className="video-journey-btn glass gold-border" onClick={() => setIsVideoOpen(true)}>
            {/* Elegant Clapperboard SVG */}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="btn-clapperboard-svg" style={{ color: '#e6b980' }}>
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4h16v16H4z" />
              <path d="M4 11h16" />
              <path d="M12 4l-4 7" />
              <path d="M16 4l-4 7" />
              <path d="M20 4l-4 7" />
            </svg>
            <span className="btn-text">Play Our Movie</span>
            <span className="btn-badge">1st Year</span>
          </button>
        )}

        {/* Right Side: Selected Photo Glassmorphic HUD Details Card */}
        {activeItem && (
          <div className="active-card glass fade-in-up" onClick={openLightboxForActive}>
            <div className="card-image-thumbnail" style={{ backgroundImage: `url("${activeItem.image}")` }}>
              <div className="thumbnail-overlay">
                {/* Search Magnifier SVG */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
            <div className="card-info">
              <h2 className="card-title">{activeItem.title}</h2>
              <p className="card-description">{activeItem.description}</p>
              <div className="card-click-tip">Click card to enlarge memory</div>
            </div>
          </div>
        )}
      </footer>

      {/* Animated Drag Instructions Banner */}
      <div className="interaction-tip">
        {/* Interactive Hand/Swipe SVG */}
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drag-icon-svg" style={{ marginRight: '6px' }}>
          <path d="M15 18l-6-6 6-6" />
          <path d="M9 12h12" />
        </svg>
        Drag to spin our memory globe
      </div>

      {/* Screen Lightbox Carousel overlay */}
      {lightboxIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
          {/* Close button with premium SVG */}
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          {/* Previous Arrow Button */}
          <button className="lightbox-nav prev" onClick={handlePrevPhoto}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <div className="lightbox-content-wrapper" onClick={e => e.stopPropagation()}>
            <div className="lightbox-image-bezel">
              <img 
                src={items[lightboxIndex].image} 
                alt={items[lightboxIndex].title} 
                className="lightbox-image" 
              />
            </div>
            
            <div className="lightbox-details glass">
              <h3 className="lightbox-title">{items[lightboxIndex].title}</h3>
              <div className="lightbox-divider"></div>
              <p className="lightbox-desc">{items[lightboxIndex].description}</p>
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {items.length}
              </div>
            </div>
          </div>

          {/* Next Arrow Button */}
          <button className="lightbox-nav next" onClick={handleNextPhoto}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      {/* Cinema Widescreen Theater Video Player */}
      {isVideoOpen && videoUrl && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-container glass" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsVideoOpen(false)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="video-header">
              <h3 className="video-title">Our First Year Journey ❤️</h3>
              <p className="video-subtitle">Cherishing every beautiful moment we made together.</p>
            </div>
            <div className="video-player-wrapper">
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                className="anniversary-video-player"
              />
            </div>
            <div className="video-footer">
              <p className="video-caption">Happy 1st Anniversary, Manisha! Here's to a lifetime of love.</p>
            </div>
          </div>
        </div>
      )}

      {/* Prologue Introduction Overlay Screen */}
      {introStage < 3 && (
        <div 
          className={`intro-overlay ${isIntroDismissed ? 'fade-out' : ''}`} 
          onClick={introStage < 2 ? handleIntroNext : undefined}
        >
          {/* Subtle glowing decorative floating hearts inside intro */}
          <div className="intro-hearts-wrapper">
            <div className="intro-heart intro-heart-left"><HeartParticle type={0} /></div>
            <div className="intro-heart intro-heart-right"><HeartParticle type={1} /></div>
            <div className="intro-heart intro-heart-center"><HeartParticle type={2} /></div>
          </div>

          <div className="intro-card-content">
            {introStage === 0 && (
              <div className="intro-step">
                <h1 className="intro-title">Oi pondattii... ❤️</h1>
                <p className="intro-subtitle">A beautiful year of holding your hand.</p>
                <div className="intro-tap-helper">Tap anywhere to begin our journey</div>
              </div>
            )}
            
            {introStage === 1 && (
              <div className="intro-step">
                <h1 className="intro-title">Thank you for being with me... ✨</h1>
                <p className="intro-subtitle">Making every single day brighter with your radiant love.</p>
                <div className="intro-tap-helper">Tap anywhere to continue</div>
              </div>
            )}
            
            {introStage === 2 && (
              <div className="intro-step" onClick={e => e.stopPropagation()}>
                <h1 className="intro-title">Happy Anniversary, My Love! 💖</h1>
                <p className="intro-subtitle">Let's explore our beautiful journey together, forever and always.</p>
                <button className="intro-btn glass gold-border" onClick={handleIntroComplete}>
                  Explore Our Infinite Love ♾️
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
    </ErrorBoundary>
  );
}
