import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, Gift, Music } from 'lucide-react';
import SayingPrayers from './components/SayingPrayers';

// Lazy loading component for images
const LazyImage = ({ src, alt, className, style }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => setIsLoaded(true);
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      data-src={src}
      alt={alt}
      className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={style}
    />
  );
};

const WeddingInvitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef(null);

  // Set your wedding date here
  const weddingDate = new Date('2025-11-30T10:00:00');

  // Background images - replace these URLs with your actual images
  const backgroundImages = {
    cover: '/cover-min.jpg',
    hero: '/hero-min.jpg',
    couple: '/couple-min.jpg',
    countdown: '/countdown-min.jpg',
    events: '/events-min.jpg',
  };

  // Preload critical images
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImages.cover;
    img.onload = () => setIsLoaded(true);
  }, []);

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio('/perfect.mp3');
    audioRef.current.loop = true;
    audioRef.current.preload = 'none'; // Don't preload until user interacts

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Audio control effect
  useEffect(() => {
    if (!isOpen || !audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.log('Audio play failed:', err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isOpen]);

  const openInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        {/* Background Image with Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-700"
          style={{ 
            backgroundImage: `url(${backgroundImages.cover})`,
            opacity: isLoaded ? 1 : 0
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400/30 via-pink-400/20 to-rose-400/30 backdrop-blur-sm" />

        <div className="relative z-10 max-w-md w-full bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-500 animate-fade-in">
          <div className="mb-6">
            <Heart className="w-16 h-16 mx-auto text-rose-500 animate-pulse drop-shadow-lg" />
          </div>
          <h1 className="text-4xl font-serif text-gray-800 mb-2 drop-shadow">The Wedding Of</h1>
          <h2 className="text-5xl font-serif text-rose-600 mb-2 drop-shadow">Dr.Supriya & Er.Vishal</h2>
          <p className="text-gray-800 mb-6 font-light drop-shadow">November 30, 2025</p>
          <div className="mb-6">
            <p className="text-sm text-rose-600 mb-2 font-medium">Dear Guest,</p>
            <p className="text-gray-700 drop-shadow">You are invited to celebrate our special day</p>
          </div>
          <button
            onClick={openInvitation}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform"
          >
            Open Invitation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Music Control - Enhanced */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-110 transform"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <Music className={`w-6 h-6 transition-colors ${isPlaying ? 'text-rose-500 animate-pulse' : 'text-gray-400'}`} />
      </button>

      {/* Hero Section - Optimized */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-ken-burns"
          style={{ backgroundImage: `url(${backgroundImages.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/40 via-pink-500/30 to-rose-500/40" />

        <div className="text-center z-10 max-w-4xl mx-auto animate-fade-in-up">
          <div className="mb-8">
            <Heart className="w-20 h-20 mx-auto text-white drop-shadow-lg mb-6 animate-pulse" />
          </div>
          <p className="text-lg text-white drop-shadow-lg mb-4 font-light">The Wedding Celebration of</p>
          <h1 className="text-6xl md:text-8xl font-serif text-white drop-shadow-2xl mb-4">
            Dr.Supriya <span className="text-rose-200">&</span> Er.Vishal
          </h1>
          <p className="text-2xl text-white drop-shadow-lg mb-8 font-light">November 30, 2025</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Couple Section - With Lazy Loading */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100" />

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-16">The Happy Couple</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bride */}
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center shadow-xl">
                <div className="w-60 h-60 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <LazyImage
                    src="/bride-min.jpg"
                    alt="Dr. Supriya Yachawad"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center', transform: 'scale(1.3)' }}
                  />
                </div>
              </div>
              <h3 className="text-3xl font-serif text-gray-800 mb-2">Dr.Supriya Yachawad</h3>
              <p className="text-gray-600 mb-4">Daughter of Smt.Suchitha & Late Vishvanath Yachawad</p>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                A beautiful soul with a heart full of love and dreams
              </p>
            </div>

            {/* Groom */}
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center shadow-xl">
                <div className="w-60 h-60 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <LazyImage
                    src="/groom-min.jpg"
                    alt="Vishal Pastapure"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center', transform: 'scale(1.5)' }}
                  />
                </div>
              </div>
              <h3 className="text-3xl font-serif text-gray-800 mb-2">Er.Vishal Pastapure</h3>
              <p className="text-gray-600 mb-4">Son of Smt.Anusaya & Shri Ravinder Pastapure</p>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                A gentleman with kindness and strength in equal measure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages.countdown})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/50 via-pink-500/40 to-rose-500/50 backdrop-blur-sm" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-serif text-white drop-shadow-lg mb-4">Counting Down To</h2>
          <p className="text-xl text-white drop-shadow-lg mb-12">Our Special Day</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
              <div key={unit} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-rose-500 mb-2">
                  {timeRemaining[unit] || 0}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wider">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${backgroundImages.events})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/90 to-pink-50/90" />

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-16">Event Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Haldi */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Heart className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-2xl font-serif text-gray-800 text-center mb-4">Haldi Ceremony</h3>
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-2 text-rose-500" />
                  <span>Saturday, November 29, 2025</span>
                </div>
                <div className="text-gray-700">
                  <p className="font-semibold">02:45 PM onwards</p>
                </div>
                <div className="flex items-start justify-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-rose-500 mt-1 flex-shrink-0" />
                  <span>Chilkuri Laxmi Garden Mavala<br />Dist Adilabad, Telangana</span>
                </div>
                <div className="text-center mt-6">
                  <a
                    href="https://maps.app.goo.gl/UjpVCGrNvemhermp8?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Wedding */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Gift className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-2xl font-serif text-gray-800 text-center mb-4">Wedding Ceremony</h3>
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-2 text-rose-500" />
                  <span>Sunday, November 30, 2025</span>
                </div>
                <div className="text-gray-700">
                  <p className="font-semibold">1:16 PM onwards</p>
                </div>
                <div className="flex items-start justify-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-rose-500 mt-1 flex-shrink-0" />
                  <span>Chilkuri Laxmi Garden Mavala<br />Dist Adilabad, Telangana</span>
                </div>
                <div className="text-center mt-6">
                  <a
                    href="https://maps.app.goo.gl/JWeAbgJUzGcFcUAX9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - With Lazy Loading */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-16">Our Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <LazyImage
                  src={`/g${i}-min.jpg`}
                  alt={`Gallery image ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blessings */}
      <SayingPrayers />

      {/* Footer */}
      <footer className="py-12 px-4 relative overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages.countdown})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/80 via-rose-500/70 to-transparent" />

        <div className="relative z-10">
          <p className="text-white text-lg mb-2 drop-shadow-lg">Made with</p>
          <Heart className="w-12 h-12 mx-auto text-white drop-shadow-lg mb-4 animate-pulse" />
          <p className="text-white text-lg mb-2 drop-shadow-lg">Thank you for being part of our special day</p>
          <p className="text-white drop-shadow-lg font-semibold">Dr. Supriya & Er.Vishal</p>
          <p className="text-white/90 text-sm mt-4 drop-shadow-lg">November 30, 2025</p>
          <p className="text-white/90 text-sm mt-4 drop-shadow-lg font-semibold">By Omkar Gaikwad</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes ken-burns {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        .animate-ken-burns {
          animation: ken-burns 20s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default WeddingInvitation;