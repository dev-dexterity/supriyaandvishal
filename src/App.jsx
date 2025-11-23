import React, { useState, useEffect, useRef } from 'react';
import { Heart, Calendar, MapPin, Gift, Music, X, Send } from 'lucide-react';
import SayingPrayers from './components/SayingPrayers';

const WeddingInvitation = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);


  // Set your wedding date here
  const weddingDate = new Date('2025-11-30T10:00:00');

  // Background images - replace these URLs with your actual images
  const backgroundImages = {
    cover: '/cover-min.jpg', // Cover page
    hero: '/hero-min.jpg', // Hero section
    couple: '/couple-min.jpg', // Couple section
    countdown: '/countdown-min.jpg', // Countdown
    events: '/events-min.jpg', // Events
    gallery: '/gallery-min.jpg', // Gallery
    rsvp: '/rsvp-min.jpg', // RSVP
  };

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio('/perfect.mp3');
    audioRef.current.loop = true;

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
    // Ensure audio is initialized when opening
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  if (!isOpen) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
        {/* Background Image with Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages.cover})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-300/30 via-pink-300/20 to-rose-300/30" />

        <div className="relative z-10 max-w-md w-full bg-pink-300/30 rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6">
            <Heart className="w-16 h-16 mx-auto text-rose-500 animate-pulse" />
          </div>
          <h1 className="text-4xl font-serif text-gray-800 mb-2">The Wedding Of</h1>
          <h2 className="text-5xl font-serif text-rose-600 mb-2">Dr.Supriya & Er.Vishal</h2>
          <p className="text-gray-800 mb-6 font-light">November 30, 2025</p>
          <div className="mb-6">
            <p className="text-sm text-pink-600 mb-2">Dear Guest,</p>
            <p className="text-gray-700">You are invited to celebrate our special day</p>
          </div>
          <button
            onClick={openInvitation}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Open Invitation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Music Control */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <Music className={`w-6 h-6 ${isPlaying ? 'text-rose-500' : 'text-gray-400'}`} />
      </button>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        {/* Background Image with Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/40 via-pink-500/30 to-rose-500/40" />

        <div className="text-center z-10 max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Heart className="w-20 h-20 mx-auto text-white drop-shadow-lg mb-6 animate-pulse" />
          </div>
          <p className="text-lg text-white drop-shadow-lg mb-4 font-light">The Wedding Celebration of</p>
          <h1 className="text-7xl md:text-8xl font-serif text-white drop-shadow-2xl mb-4 animate-fade-in-up">
            Dr.Supriya <span className="text-rose-200">&</span> Er.Vishal
          </h1>
          <p className="text-2xl text-white drop-shadow-lg mb-8 font-light">November 30, 2025</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-pink-300/50" />

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-16">The Happy Couple</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bride */}
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center shadow-xl">
                <div className="w-60 h-60 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src="/bride-min.jpg"
                    alt="Dr. Supriya Yachawad"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center', transform: 'scale(1.3)' }}
                  />
                </div>
              </div>
              <h3 className="text-3xl font-serif text-gray-800 mb-2">Dr.Supriya Yachawad</h3>
              <p className="text-gray-600 mb-4">Daughter of Smt.Suchitha Late Vishvanath Yachawad</p>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                A beautiful soul with a heart full of love and dreams
              </p>
            </div>

            {/* Groom */}
            <div className="text-center">
              <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center shadow-xl">
                <div className="w-60 h-60 rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
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
        {/* Background Image with Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages.countdown})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/40 via-pink-500/30 to-rose-500/40" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-serif text-white drop-shadow-lg mb-4">Counting Down To</h2>
          <p className="text-xl text-white drop-shadow-lg mb-12">Our Special Day</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
              <div key={unit} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
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
        {/* Background Image with Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages.events})` }}
        />
        <div className="absolute inset-0 bg-white/30" />

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-16">Event Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Haldi */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
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
                  <p className="font-semibold">02:45 PM onwards...</p>
                </div>
                <div className="flex items-start justify-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-rose-500 mt-1 flex-shrink-0" />
                  <span>Chilkuri Laxmi Garden Mavala<br />Dist Adilabad, Telangana</span>
                </div>
                <div className="text-center mt-12">
                  <a
                    href="https://maps.app.goo.gl/UjpVCGrNvemhermp8?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Wedding */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
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
                  <p className="font-semibold">1:16 PM onwards...</p>
                </div>
                <div className="flex items-start justify-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-rose-500 mt-1 flex-shrink-0" />
                  <span>Chilkuri Laxmi Garden Mavala<br />Dist Adilabad, Telangana</span>
                </div>
                <div className="text-center mt-12">
                  <a
                    href="https://maps.app.goo.gl/JWeAbgJUzGcFcUAX9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-red-500/30"
        />
        <div className="absolute inset-0 bg-red/30" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-serif text-center text-gray-800 mb-16">Our Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer overflow-hidden"
              >
                <img
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
        {/* Background Image with Tint */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImages.countdown})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/75 via-rose-500/70 to-transparent" />

        <div className="relative z-10">
          <p className="text-white text-lg mb-2 drop-shadow-lg">Made with</p>
          <Heart className="w-12 h-12 mx-auto text-white drop-shadow-lg mb-4" />
          <p className="text-white text-lg mb-2 drop-shadow-lg">Thank you for being part of our special day</p>
          <p className="text-white drop-shadow-lg">Dr. Supriya & Er.Vishal</p>
          <p className="text-white/90 text-sm mt-4 drop-shadow-lg">November 30, 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingInvitation;