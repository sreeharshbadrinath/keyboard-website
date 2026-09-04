import React, { useState } from 'react';
import { Settings, Volume2, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface SwitchBrand {
  number: string;
  name: string;
  subtitle: string;
  category: 'Linear' | 'Tactile' | 'Clicky' | 'Silent';
  force: string;
  travel: string;
  soundType: 'linear' | 'tactile' | 'clicky' | 'silent';
  description: string;
  accentColor: string;
  testedFrequency: string;
}

export const SwitchExplorer: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(2); // Default to "03 Oetemu" just like the screenshot!
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const switchList: SwitchBrand[] = [
    {
      number: '01',
      name: 'Cherry Mix',
      subtitle: 'Original German Engineering Classic',
      category: 'Tactile',
      force: '55 ± 10 gf',
      travel: '2.0 mm / 4.0 mm',
      soundType: 'tactile',
      description: 'The golden standard that started custom mechanical keyboards. Features a precise tactile bump at actuation and high-cycle gold-crosspoint contacts.',
      accentColor: '#ef4444',
      testedFrequency: '850 Hz Crisp Clack'
    },
    {
      number: '02',
      name: 'Kailh/Kaihua',
      subtitle: 'Box Stem Dustproof Architecture',
      category: 'Linear',
      force: '45 ± 10 gf',
      travel: '1.8 mm / 3.6 mm',
      soundType: 'linear',
      description: 'Patented IP56 box stem structure protects switch contacts from debris and moisture while delivering minimal stem wobble and smooth actuation.',
      accentColor: '#3b82f6',
      testedFrequency: '620 Hz Muted Thock'
    },
    {
      number: '03',
      name: 'Oetemu',
      subtitle: 'High-Value Tactile & Mechanical Precision',
      category: 'Clicky',
      force: '50 ± 15 gf',
      travel: '2.2 mm / 4.0 mm',
      soundType: 'clicky',
      description: 'Engineered with reinforced switch housing and crisp auditory feedback. Highly responsive keystroke resistance ideal for both fast typing and gaming precision.',
      accentColor: '#ff5722',
      testedFrequency: '1200 Hz Sharp Acoustic Snap'
    },
    {
      number: '04',
      name: 'Romer G',
      subtitle: 'Dual-Contact High Speed Actuation',
      category: 'Linear',
      force: '45 ± 5 gf',
      travel: '1.5 mm / 3.2 mm',
      soundType: 'linear',
      description: 'Engineered for competitive esports with an ultra-short 1.5mm actuation distance and center-surface surface-mount LED light tube illumination.',
      accentColor: '#10b981',
      testedFrequency: '540 Hz Low-Pitch Thump'
    },
    {
      number: '05',
      name: 'Keytron Banana Pro',
      subtitle: 'Early-Bump Panda Style Custom Tactile',
      category: 'Tactile',
      force: '57 ± 10 gf',
      travel: '2.0 mm / 3.6 mm',
      soundType: 'tactile',
      description: 'Factory pre-lubed with Krytox 205g0. Delivers the tactile pop directly at the top of keystroke, eliminating sluggish pre-travel completely.',
      accentColor: '#eab308',
      testedFrequency: '720 Hz Deep Creamy Pop'
    }
  ];

  const current = switchList[selectedIdx];

  const handleTestSound = (type: 'linear' | 'tactile' | 'clicky' | 'silent') => {
    soundEngine.playKeySound(type, false);
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 300);
  };

  return (
    <section id="switches-section" className="w-full bg-[#f6f6f4] py-20 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Dribbble shot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff5722] font-semibold">
              <span>Switch</span>
              <Settings className="w-3.5 h-3.5" />
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
              Work Smarter, Not<br className="hidden sm:inline" />
              Harder For Seamless
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 leading-relaxed font-normal">
            The comprehensive mechanical switch engineering catalog that determines your tactile actuation, sound profile, and typing velocity.
          </p>
        </div>

        {/* Interactive Switch List (Matching Dribbble layout) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Switch Names Accordion List */}
          <div className="lg:col-span-7 space-y-2">
            {switchList.map((sw, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <div
                  key={sw.number}
                  id={`switch-item-${sw.number}`}
                  onClick={() => {
                    setSelectedIdx(idx);
                    handleTestSound(sw.soundType);
                  }}
                  className={`group w-full p-4 sm:p-5 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                    isSelected
                      ? 'bg-neutral-950 text-white border-neutral-950 shadow-lg translate-x-1'
                      : 'bg-white hover:bg-neutral-50/80 text-neutral-900 border-neutral-200/80'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Index Number */}
                    <span className={`font-mono text-sm sm:text-base font-bold ${
                      isSelected ? 'text-orange-400' : 'text-neutral-400'
                    }`}>
                      {sw.number}
                    </span>

                    {/* Switch Name & Subtitle */}
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${
                        isSelected ? 'text-white' : 'text-neutral-950'
                      }`}>
                        {sw.name}
                      </h3>
                      <p className={`text-xs mt-0.5 ${
                        isSelected ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>
                        {sw.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-medium ${
                      isSelected ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'
                    }`}>
                      {sw.category}
                    </span>
                    <ArrowUpRight className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-orange-400 rotate-45' : 'text-neutral-400 group-hover:text-neutral-900'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Switch Showcase Card (Matching image thumbnail card from Dribbble) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.08] shadow-xs">
            
            {/* Visual Stem & Housing Graphic */}
            <div className="relative w-full h-56 bg-[#181920] rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 border border-neutral-800 shadow-inner">
              
              {/* Studio lighting */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

              {/* Interactive Switch Representation */}
              <div 
                onClick={() => handleTestSound(current.soundType)}
                className={`relative cursor-pointer group transition-transform duration-150 ${
                  isPlayingAudio ? 'scale-95 translate-y-1' : 'hover:scale-105'
                }`}
                title="Click to Actuate Switch"
              >
                {/* Switch Upper Housing */}
                <div className="w-24 h-24 rounded-2xl bg-neutral-800 border-2 border-neutral-700 shadow-2xl flex items-center justify-center relative">
                  {/* Stem */}
                  <div 
                    className="w-10 h-10 rounded-md shadow-md flex items-center justify-center transition-colors"
                    style={{ backgroundColor: current.accentColor }}
                  >
                    {/* Cross-mount (+) stem */}
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div className="w-5 h-1.5 bg-black/30 rounded-xs"></div>
                      <div className="w-1.5 h-5 bg-black/30 rounded-xs absolute"></div>
                    </div>
                  </div>

                  {/* Sound Wave indicator */}
                  {isPlayingAudio && (
                    <span className="absolute -inset-2 rounded-2xl border-2 border-orange-500 animate-ping pointer-events-none" />
                  )}
                </div>

                <div className="mt-3 text-center">
                  <span className="text-[11px] font-mono text-orange-400 uppercase tracking-widest">
                    CLICK TO ACTUATE
                  </span>
                </div>
              </div>

              {/* Acoustic frequency tag */}
              <div className="absolute bottom-3 left-4 font-mono text-[11px] text-neutral-400">
                ACTUATION: {current.testedFrequency}
              </div>
            </div>

            {/* Switch Specs */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-neutral-950">
                    {current.name}
                  </h4>
                  <span className="text-xs font-mono text-neutral-500">{current.category} Engineering</span>
                </div>

                {/* Audio Trigger Button */}
                <button
                  id="listen-actuation-btn"
                  onClick={() => handleTestSound(current.soundType)}
                  className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingAudio ? 'text-orange-400 animate-bounce' : 'text-neutral-300'}`} />
                  <span>Acoustic Test</span>
                </button>
              </div>

              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                {current.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 pt-4 border-t border-neutral-100">
                <div className="p-3 bg-neutral-50 rounded-xl">
                  <div className="text-xs text-neutral-400 font-mono uppercase">Actuation Force</div>
                  <div className="text-base font-bold text-neutral-900 font-mono mt-0.5">{current.force}</div>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl">
                  <div className="text-xs text-neutral-400 font-mono uppercase">Total Travel</div>
                  <div className="text-base font-bold text-neutral-900 font-mono mt-0.5">{current.travel}</div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
