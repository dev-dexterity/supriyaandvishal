import React, { useState, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function SayingsPrayersSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [blessings, setBlessings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load blessings in real-time from Firebase
  useEffect(() => {
    const q = query(collection(db, 'blessings'), orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedBlessings = [];
      querySnapshot.forEach((doc) => {
        loadedBlessings.push({ id: doc.id, ...doc.data() });
      });
      setBlessings(loadedBlessings);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading blessings:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
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
      alert('Thank you for your blessing! Your message has been shared with love. ❤️');
    } catch (error) {
      console.error('Error submitting blessing:', error);
      alert('Failed to submit blessing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Image with Tint */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/rsvp.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/10 via-pink-50/10 to-purple-50/10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 bg-pink-300/30 rounded-3xl p-8 mb-12">
          <Heart className="w-12 h-12 mx-auto text-rose-500 mb-4" />
          <h2 className="text-4xl font-serif text-gray-800 mb-4">Sayings & Prayers</h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Share your heartfelt blessings, prayers, and well wishes for Dr.Supriya & Er.Vishal as they begin their beautiful journey together
          </p>
        </div>

        {/* Blessing Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-serif text-gray-800 mb-6 text-center">Leave Your Blessing</h3>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Your Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-6 py-3 border-2 border-rose-200 rounded-full focus:border-rose-400 focus:outline-none transition-colors"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Your Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your blessings, prayers, or well wishes for the couple..."
                rows="5"
                className="w-full px-6 py-3 border-2 border-rose-200 rounded-2xl focus:border-rose-400 focus:outline-none transition-colors resize-none"
                disabled={isSubmitting}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 mb-12">
          <h4 className="text-lg font-serif text-gray-800 mb-4 text-center">Need Inspiration?</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="italic">"May your love be a beautiful reflection of God's grace, growing stronger with each passing day."</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="italic">"Wishing you a lifetime of shared dreams, deep trust, and cozy moments together."</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="italic">"May the road rise to meet you, and may the wind be always at your back."</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="italic">"Love is patient, love is kind. May your marriage be blessed with both."</p>
            </div>
          </div>
        </div>

        {/* Blessings Display */}
        <div>
          <h3 className="text-2xl font-serif text-gray-800 mb-8 text-center bg-white rounded-3xl">
            Blessings from Loved Ones ({blessings.length})
          </h3>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading blessings...</p>
            </div>
          ) : blessings.length > 0 ? (
            <div className="space-y-6">
              {blessings.map((blessing) => (
                <div
                  key={blessing.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-200 to-pink-200 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-rose-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{blessing.name}</h4>
                        <span className="text-sm text-gray-500">{blessing.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{blessing.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No blessings yet. Be the first to share your wishes!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}