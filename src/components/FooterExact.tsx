import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const FooterExact: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundEngine.playKeySound('clicky', false);
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#0d0e13] text-white pt-20 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid matching Dribbble screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-800/80">
          
          {/* Left Column: Newsletter & Tagline (Exact to screenshot) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              {/* Honeycomb Icon */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 36 36" fill="none" className="w-7 h-7">
                  <circle cx="18" cy="18" r="3.2" fill="#ff5722" />
                  <circle cx="18" cy="8.5" r="3.2" fill="#ff5722" />
                  <circle cx="26.2" cy="13.25" r="3.2" fill="#ff5722" />
                  <circle cx="26.2" cy="22.75" r="3.2" fill="#ff5722" />
                  <circle cx="18" cy="27.5" r="3.2" fill="#ff5722" />
                  <circle cx="9.8" cy="22.75" r="3.2" fill="#ff5722" />
                  <circle cx="9.8" cy="13.25" r="3.2" fill="#ff5722" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight font-sans">
                Keytron
              </span>
            </div>

            <p className="text-base sm:text-lg text-neutral-300 font-normal max-w-md leading-relaxed">
              Subscribe to our newsletter and get your daily boost of Training Tips straight to your inbox
            </p>

            {/* Newsletter Input Form */}
            <form onSubmit={handleSubscribe} className="relative max-w-md flex items-center">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900/90 border border-neutral-800 rounded-full px-5 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff5722] font-mono tracking-wide"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-5 py-2.5 bg-white hover:bg-[#ff5722] text-neutral-950 hover:text-white rounded-full text-xs font-semibold font-mono tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Joined</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Columns: Exact Navigation Links from screenshot */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
            <div>
              <h5 className="text-neutral-500 uppercase tracking-wider mb-4 font-semibold">
                Ecosystem
              </h5>
              <ul className="space-y-3">
                <li><a href="#keyboards" className="text-neutral-300 hover:text-white transition-colors">Training Programs</a></li>
                <li><a href="#keyboards" className="text-neutral-300 hover:text-white transition-colors">Plans & Pricing</a></li>
                <li><a href="#switches-section" className="text-neutral-300 hover:text-white transition-colors">Community Hub</a></li>
                <li><a href="#keycaps-section" className="text-neutral-300 hover:text-white transition-colors">Firmware VIA / QMK</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-neutral-500 uppercase tracking-wider mb-4 font-semibold">
                Company
              </h5>
              <ul className="space-y-3">
                <li><a href="#hero-exact" className="text-neutral-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#hero-exact" className="text-neutral-300 hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#accessories-section" className="text-neutral-300 hover:text-white transition-colors">Acoustic Specs</a></li>
                <li><a href="#hero-exact" className="text-neutral-300 hover:text-white transition-colors">Press & Media</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-neutral-500 uppercase tracking-wider mb-4 font-semibold">
                Legal & Safety
              </h5>
              <ul className="space-y-3">
                <li><a href="#hero-exact" className="text-neutral-300 hover:text-white transition-colors">Cookies & Privacy</a></li>
                <li><a href="#hero-exact" className="text-neutral-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#hero-exact" className="text-neutral-300 hover:text-white transition-colors">2-Year Warranty</a></li>
                <li><a href="#hero-exact" className="text-neutral-300 hover:text-white transition-colors">Security Disclosures</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 Keytron Brand. High-performance mechanical keyboards engineered for seamless typing.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              All Systems Operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
