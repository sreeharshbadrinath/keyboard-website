import React, { useState } from 'react';
import { KEYBOARDS, SWITCH_OPTIONS } from '../data/keyboards';
import { KeyboardProduct, SwitchOption } from '../types';
import { soundEngine } from '../utils/audio';
import { ShoppingBag, Sparkles, Volume2, Check, ArrowRight, Zap, Shield } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: KeyboardProduct, sw: SwitchOption) => void;
  onOpenSoundLab: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onAddToCart,
  onOpenSoundLab
}) => {
  const [selectedSwitches, setSelectedSwitches] = useState<Record<string, string>>({
    'k2-max': 'red',
    'q1-pro': 'banana',
    'q3-he': 'red',
    'k3-pro': 'brown'
  });

  const handleSwitchSelect = (productId: string, switchId: string) => {
    soundEngine.playKeySound('tactile', false);
    setSelectedSwitches(prev => ({ ...prev, [productId]: switchId }));
  };

  const handleQuickAdd = (kb: KeyboardProduct) => {
    const swId = selectedSwitches[kb.id] || kb.switchesAvailable[0];
    const swObj = SWITCH_OPTIONS.find(s => s.id === swId) || SWITCH_OPTIONS[0];
    soundEngine.playKeySound(swObj.type.toLowerCase().includes('click') ? 'clicky' : 'linear', true);
    onAddToCart(kb, swObj);
  };

  return (
    <section id="keyboards" className="w-full bg-[#f6f6f4] py-20 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff5722] font-semibold">
              <span>Collection 2026</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
              High-Performance Keyboards
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 leading-relaxed font-normal">
            Engineered with solid CNC aluminum chassis, sound-absorbing multi-layer silicone damping, and hot-swappable mechanical sockets.
          </p>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {KEYBOARDS.map((kb) => {
            const currentSwId = selectedSwitches[kb.id] || kb.switchesAvailable[0];
            const currentSw = SWITCH_OPTIONS.find(s => s.id === currentSwId) || SWITCH_OPTIONS[0];

            return (
              <div
                key={kb.id}
                id={`product-card-${kb.id}`}
                className="bg-white rounded-2xl border border-black/[0.08] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-black/20 hover:shadow-md transition-all duration-300"
              >
                {/* Visual Header & Tags */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3 py-1 bg-neutral-100 rounded-full font-mono text-xs font-bold text-neutral-700">
                      {kb.series}
                    </span>
                    <div className="flex items-center gap-2">
                      {kb.isNew && (
                        <span className="px-2.5 py-0.5 bg-orange-100 text-[#ff5722] text-[11px] font-bold rounded-full">
                          NEW
                        </span>
                      )}
                      <span className="text-xs font-mono text-neutral-500">
                        ★ {kb.rating} ({kb.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-neutral-950 group-hover:text-[#ff5722] transition-colors">
                      {kb.name}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-neutral-500 line-clamp-2">
                      {kb.tagline}
                    </p>
                  </div>

                  {/* Simulated Keyboard Visual Preview */}
                  <div className="mt-6 relative w-full h-44 bg-gradient-to-b from-[#1c1e24] to-[#121317] rounded-xl p-4 flex flex-col justify-center items-center overflow-hidden border border-neutral-800">
                    <div className="absolute top-2 left-3 font-mono text-[10px] text-neutral-500">
                      {kb.layout}
                    </div>

                    {/* Miniature visual keys bar */}
                    <div className="flex flex-col gap-1.5 w-full max-w-xs opacity-90 group-hover:scale-105 transition-transform duration-300">
                      <div className="flex gap-1 justify-center">
                        <span className="w-5 h-5 bg-[#ff5722] rounded-[3px]"></span>
                        {Array.from({ length: 9 }).map((_, i) => (
                          <span key={i} className="w-4 h-5 bg-[#2d3039] rounded-[3px]"></span>
                        ))}
                      </div>
                      <div className="flex gap-1 justify-center">
                        {Array.from({ length: 11 }).map((_, i) => (
                          <span key={i} className="w-4 h-5 bg-[#d6d6d3] rounded-[3px]"></span>
                        ))}
                      </div>
                      <div className="flex gap-1 justify-center">
                        <span className="w-6 h-5 bg-[#2d3039] rounded-[3px]"></span>
                        {Array.from({ length: 7 }).map((_, i) => (
                          <span key={i} className="w-4 h-5 bg-[#d6d6d3] rounded-[3px]"></span>
                        ))}
                        <span className="w-6 h-5 bg-[#2d3039] rounded-[3px]"></span>
                      </div>
                    </div>

                    <div className="absolute bottom-2 right-3 font-mono text-[10px] text-neutral-400">
                      {kb.chassis.split('+')[0]}
                    </div>
                  </div>

                  {/* Switch Selector */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-500 uppercase">Pre-installed Switch:</span>
                      <span className="font-bold text-neutral-900">{currentSw.name}</span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {kb.switchesAvailable.map((swId) => {
                        const sw = SWITCH_OPTIONS.find(s => s.id === swId);
                        if (!sw) return null;
                        const isSelected = currentSwId === swId;

                        return (
                          <button
                            key={swId}
                            onClick={() => handleSwitchSelect(kb.id, swId)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                            }`}
                          >
                            <span 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: sw.stemColor }} 
                            />
                            <span>{sw.type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Key Features List */}
                  <ul className="mt-6 space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                    {kb.features.slice(0, 3).map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ff5722] mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Add to Cart Footer */}
                <div className="p-6 sm:p-8 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-neutral-400 font-mono">Retail Price</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-mono text-neutral-950">
                        ${kb.price}
                      </span>
                      {kb.originalPrice && (
                        <span className="text-xs font-mono text-neutral-400 line-through">
                          ${kb.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundEngine.playKeySound(currentSw.type.toLowerCase().includes('click') ? 'clicky' : 'linear', false);
                      }}
                      className="p-3 bg-white border border-neutral-200 hover:border-neutral-400 text-neutral-700 rounded-full cursor-pointer transition-colors"
                      title="Test acoustic sound"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      id={`buy-btn-${kb.id}`}
                      onClick={() => handleQuickAdd(kb)}
                      className="px-6 py-3 bg-neutral-950 hover:bg-[#ff5722] text-white rounded-full text-xs font-semibold tracking-wider font-mono uppercase flex items-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Configure & Buy</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
