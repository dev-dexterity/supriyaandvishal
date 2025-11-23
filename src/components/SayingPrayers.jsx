import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Heart, Send } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4lzSHtzwJFkPby92NbUcdJeQibLLFd7w",
  authDomain: "sups-dd179.firebaseapp.com",
  projectId: "sups-dd179",
  storageBucket: "sups-dd179.firebasestorage.app",
  messagingSenderId: "629086944270",
  appId: "1:629086944270:web:ffbc0f91d99827d633105f",
  measurementId: "G-J23J3Q97PH"
};

// Initialize Firebase once (outside component to avoid re-initialization)
let app;
let db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  // Already initialized
  console.log('Firebase already initialized');
}

// Suggested blessings data (moved outside component)
const SUGGESTED_BLESSINGS = [
  "May your love be a beautiful reflection of God's grace, growing stronger with each passing day.",
  "Wishing you a lifetime of shared dreams, deep trust, and cozy moments together.",
  "May the road rise to meet you, and may the wind be always at your back.",
  "Love is patient, love is kind. May your marriage be blessed with both."
];

export default function SayingsPrayersSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [blessings, setBlessings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const unsubscribeRef = useRef(null);

  // Memoize the initial display count
  const displayedBlessings = useMemo(() => {
    return showAll ? blessings : blessings.slice(0, 10);
  }, [blessings, showAll]);

  // Load blessings in real-time from Firebase
  useEffect(() => {
    // Query with limit for better performance
    const q = query(
      collection(db, 'blessings'), 
      orderBy('timestamp', 'desc'),
      limit(100) // Limit to prevent loading too many documents
    );
    
    unsubscribeRef.current = onSnapshot(q, (querySnapshot) => {
      const loadedBlessings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setBlessings(loadedBlessings);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading blessings:', error);
      setIsLoading(false);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) {
      alert('Please fill in both name and message fields');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'blessings'), {
        name: name.trim(),
        message: message.trim(),
        timestamp: new Date().getTime(),
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        })
      });

      setName('');
      setMessage('');
      
      // Smooth scroll to blessings section after submitting
      setTimeout(() => {
        const blessingsSection = document.getElementById('blessings-list');
        if (blessingsSection) {
          blessingsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 500);
      
    } catch (error) {
      console.error('Error submitting blessing:', error);
      alert('Failed to submit blessing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debounced input handlers for better performance
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Image with Tint - Using lazy loading technique */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/rsvp.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/90 via-pink-50/85 to-purple-50/90 backdrop-blur-sm" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-lg transform hover:scale-105 transition-all duration-300">
          <Heart className="w-12 h-12 mx-auto text-rose-500 mb-4 animate-pulse" />
          <h2 className="text-4xl font-serif text-gray-800 mb-4">Sayings & Prayers</h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Share your heartfelt blessings, prayers, and well wishes for Dr.Supriya & Er.Vishal as they begin their beautiful journey together
          </p>
        </div>

        {/* Blessing Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 transform hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">Leave Your Blessing</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Your Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="w-full px-6 py-3 border-2 border-rose-200 rounded-full focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
                disabled={isSubmitting}
                maxLength={50}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Your Message</label>
              <textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                placeholder="Share your blessings, prayers, or well wishes for the couple..."
                rows="5"
                className="w-full px-6 py-3 border-2 border-rose-200 rounded-2xl focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all resize-none"
                disabled={isSubmitting}
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {message.length}/500 characters
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Blessing
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Blessings */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 mb-12 shadow-md">
          <h4 className="text-lg font-serif text-gray-800 mb-4 text-center">Need Inspiration?</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            {SUGGESTED_BLESSINGS.map((blessing, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setMessage(blessing)}
              >
                <p className="italic">"{blessing}"</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">Click any suggestion to use it</p>
        </div>

        {/* Blessings Display */}
        <div id="blessings-list">
          <h3 className="text-2xl font-serif text-gray-800 mb-8 text-center bg-white/90 backdrop-blur-sm rounded-3xl p-4 shadow-md">
            Blessings from Loved Ones ({blessings.length})
          </h3>
          
          {isLoading ? (
            <div className="text-center py-12 bg-white rounded-3xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading blessings...</p>
            </div>
          ) : blessings.length > 0 ? (
            <>
              <div className="space-y-6">
                {displayedBlessings.map((blessing, index) => (
                  <div
                    key={blessing.id}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Heart className="w-6 h-6 text-rose-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <h4 className="font-semibold text-gray-800">{blessing.name}</h4>
                          <span className="text-sm text-gray-500">{blessing.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{blessing.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Load More Button */}
              {blessings.length > 10 && !showAll && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAll(true)}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Load More Blessings ({blessings.length - 10} more)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No blessings yet. Be the first to share your wishes!</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}