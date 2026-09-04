import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check, Layers } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface KeycapProfile {
  id: string;
  name: string;
  material: string;
  profile: string;
  compatibility: string;
  colors: string[];
  description: string;
}

export const ArtisanKeycaps: React.FC<{
  onShopClick: () => void;
}> = ({ onShopClick }) => {
  const [selectedSet, setSelectedSet] = useState<number>(0);

  const keycapSets: KeycapProfile[] = [
    {
      id: 'retro-classic',
      name: 'Keytron OEM Retro Chalk Set',
      material: '1.5mm Ultra-Thick Double-Shot PBT',
      profile: 'Cherry Ergonomic Profile',
      compatibility: '60%, 65%, 75%, TKL, Full Size',
      colors: ['#282a36', '#d6d7db', '#ff5722'],
      description: 'The iconic retro color scheme as featured in our hero presentation. Dual-tone slate charcoal with vibrant orange Escape & Enter accents.'
    },
    {
      id: 'cyber-stealth',
      name: 'Blackout Stealth Shine-Through',
      material: 'Frosted Oil-Resistant Textured PBT',
      profile: 'OEM Profile with South-Facing Legends',
      compatibility: 'ANSI / ISO 138-Key Kit',
      colors: ['#121316', '#1f2128', '#06b6d4'],
      description: 'Sleek murdered-out matte black design. Legends become razor-sharp when backlit with per-key RGB spectrum illumination.'
    },
    {
      id: 'matcha-botanical',
      name: 'Matcha Cream Botanical Dye-Sub',
      material: 'Premium Five-Sided Dye-Sublimated PBT',
      profile: 'XDA Spherical Uniform Profile',
      compatibility: 'Universal Multi-Layout (142 Keys)',
      colors: ['#4b6043', '#ecebe4', '#b5c99a'],
      description: 'Soft earthy olive and warm cream tones inspired by Japanese tea ceremonies and lush moss forests.'
    }
  ];

  const current = keycapSets[selectedSet];

  return (
    <section id="keycaps-section" className="w-full bg-[#f6f6f4] py-20 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Dribbble screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff5722] font-semibold">
              <span>Aesthetics & Tactility</span>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
              Elevate Your<br className="hidden sm:inline" />
              Keyboard Experience
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 leading-relaxed font-normal">
            The keycaps are designed with premium surface materials engineered for the best acoustic feedback, wear resistance, and clean legends that never fade even after hours of marathon coding.
          </p>
        </div>

        {/* Content Layout (Matching Dribbble layout) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: "Artisan Keycaps" description and [Shop Now →] button */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.08] shadow-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-mono font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Limited Batch Production</span>
            </div>

            <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
              Artisan Keycaps
            </h3>
            
            <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              We offer decorative keycaps and premium surface materials that balance aesthetics, consistency, and durability — perfect for gaming, productivity, and collectible setups.
            </p>

            <ul className="mt-6 space-y-3 text-xs sm:text-sm text-neutral-700 font-medium">
              <li className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</div>
                <span>Double-shot injection molded 1.5mm thick walls</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</div>
                <span>Oil-resistant matte PBT texture with no shine degradation</span>
              </li>
              <li className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">✓</div>
                <span>Accentuates deep, solid acoustic bottom-out resonance</span>
              </li>
            </ul>

            {/* Shop Now Black Pill Button (Exact to screenshot) */}
            <div className="mt-8">
              <button
                id="artisan-shop-now-btn"
                onClick={() => {
                  soundEngine.playKeySound('tactile', false);
                  onShopClick();
                }}
                className="group px-7 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full text-sm font-semibold tracking-wide flex items-center gap-3 cursor-pointer shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Keycap Visual Gallery Grid (Matching the multi-keycap tiles from screenshot) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Visual keycap layout preview */}
            <div className="bg-[#181920] p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl text-white">
              
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  Profile: {current.profile}
                </span>
                <span className="text-xs font-mono text-orange-400">
                  {current.material}
                </span>
              </div>

              {/* Realistic Keycap Cluster Layout */}
              <div className="py-8 flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 p-4 bg-neutral-900/90 rounded-xl border border-neutral-800">
                  {/* Row 1 */}
                  <div className="flex gap-2">
                    {['ESC', '1', '2', '3', '4'].map((k, i) => (
                      <div 
                        key={i}
                        onClick={() => soundEngine.playKeySound('linear', false)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer shadow-md transition-transform hover:-translate-y-1 ${
                          k === 'ESC' ? 'bg-[#ff5722] text-white' : 'bg-[#2a2c36] text-neutral-200'
                        }`}
                        style={{ borderBottom: '4px solid #14151b' }}
                      >
                        {k}
                      </div>
                    ))}
                  </div>
                  {/* Row 2 */}
                  <div className="flex gap-2">
                    {['TAB', 'Q', 'W', 'E', 'R'].map((k, i) => (
                      <div 
                        key={i}
                        onClick={() => soundEngine.playKeySound('linear', false)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer shadow-md transition-transform hover:-translate-y-1 ${
                          k === 'TAB' ? 'bg-[#2a2c36] text-neutral-200' : 'bg-[#e2e2df] text-neutral-900'
                        }`}
                        style={{ borderBottom: '4px solid #14151b' }}
                      >
                        {k}
                      </div>
                    ))}
                  </div>
                  {/* Row 3 */}
                  <div className="flex gap-2">
                    {['CAPS', 'A', 'S', 'D', 'F'].map((k, i) => (
                      <div 
                        key={i}
                        onClick={() => soundEngine.playKeySound('linear', false)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer shadow-md transition-transform hover:-translate-y-1 ${
                          k === 'CAPS' ? 'bg-[#2a2c36] text-neutral-200' : 'bg-[#e2e2df] text-neutral-900'
                        }`}
                        style={{ borderBottom: '4px solid #14151b' }}
                      >
                        {k}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Keycap Set Selector Pills */}
              <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {keycapSets.map((set, idx) => (
                    <button
                      key={set.id}
                      onClick={() => {
                        soundEngine.playKeySound('tactile', false);
                        setSelectedSet(idx);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        selectedSet === idx
                          ? 'bg-[#ff5722] text-white font-bold'
                          : 'bg-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {set.name.split(' ')[1] || set.name}
                    </button>
                  ))}
                </div>

                <span className="text-xs font-mono text-neutral-400">
                  {current.compatibility}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
