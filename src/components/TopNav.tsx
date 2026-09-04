import React, { useState } from 'react';
import { Volume2, VolumeX, ShoppingBag, Menu, X, Sparkles, Sliders } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface TopNavProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSoundLab: () => void;
  onSelectSection: (sectionId: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  cartCount,
  onOpenCart,
  onOpenSoundLab,
  onSelectSection
}) => {
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = !isMuted;
    soundEngine.setMuted(next);
    setIsMuted(next);
    if (!next) {
      soundEngine.playKeySound('linear', false);
    }
  };

  const navItems = [
    { label: 'Keyboards', id: 'keyboards' },
    { label: 'Switches', id: 'switches' },
    { label: 'Keycaps', id: 'keycaps' },
    { label: 'Accessories', id: 'accessories' },
    { label: 'Acoustic Lab', id: 'soundlab' }
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playKeySound('linear', false);
    setMobileMenuOpen(false);
    if (id === 'soundlab') {
      onOpenSoundLab();
    } else {
      onSelectSection(id);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f6f6f4]/90 backdrop-blur-md border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching Keymon / Keytron Dribbble design */}
        <button
          id="brand-logo-btn"
          onClick={() => {
            soundEngine.playKeySound('tactile', false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          {/* Orange 7-dot honeycomb circular icon */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <svg viewBox="0 0 36 36" fill="none" className="w-8 h-8 transition-transform duration-300 group-hover:scale-105">
              {/* Center dot */}
              <circle cx="18" cy="18" r="3.2" fill="#ff5722" />
              {/* Surrounding 6 hexagonal dots */}
              <circle cx="18" cy="8.5" r="3.2" fill="#ff5722" />
              <circle cx="26.2" cy="13.25" r="3.2" fill="#ff5722" />
              <circle cx="26.2" cy="22.75" r="3.2" fill="#ff5722" />
              <circle cx="18" cy="27.5" r="3.2" fill="#ff5722" />
              <circle cx="9.8" cy="22.75" r="3.2" fill="#ff5722" />
              <circle cx="9.8" cy="13.25" r="3.2" fill="#ff5722" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight text-neutral-900 font-sans leading-none">
              Keytron
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-medium mt-0.5">
              Acoustic Precision
            </span>
          </div>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className="text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors py-1 cursor-pointer tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Mechanical Sound Toggle */}
          <button
            id="audio-toggle-btn"
            onClick={toggleSound}
            title={isMuted ? "Enable mechanical typing acoustics" : "Mute mechanical acoustics"}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono font-medium transition-all cursor-pointer border ${
              isMuted 
                ? 'bg-neutral-200/70 border-neutral-300 text-neutral-500' 
                : 'bg-orange-50 border-orange-200 text-orange-600 shadow-xs'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#ff5722] animate-pulse" />}
            <span className="hidden sm:inline">{isMuted ? 'Sound OFF' : 'Acoustics ON'}</span>
          </button>

          {/* Cart Trigger */}
          <button
            id="cart-trigger-btn"
            onClick={() => {
              soundEngine.playKeySound('tactile', false);
              onOpenCart();
            }}
            className="relative p-2.5 rounded-full bg-white border border-neutral-200 hover:border-neutral-300 text-neutral-800 transition-all hover:shadow-xs cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff5722] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Dribbble Style Circular Black Hamburger Menu Button */}
          <button
            id="main-menu-trigger"
            onClick={() => {
              soundEngine.playKeySound('clicky', false);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle navigation menu"
            className="w-11 h-11 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <div className="flex flex-col gap-1.25 items-center justify-center">
                <span className="w-5 h-[2px] bg-white rounded-full"></span>
                <span className="w-5 h-[2px] bg-white rounded-full"></span>
                <span className="w-3.5 self-end h-[2px] bg-white rounded-full"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Architectural Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-[#f6f6f4] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
            Navigation Index
          </div>
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="p-3 bg-white border border-neutral-200/80 rounded-lg text-left text-sm font-semibold text-neutral-800 hover:border-orange-500 hover:text-orange-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>Keytron High-Performance</span>
            <button 
              onClick={onOpenSoundLab} 
              className="text-orange-600 font-medium hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Interactive Acoustic Lab
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
