import React from 'react';
import { soundEngine } from '../utils/audio';

interface PillFeatureNavProps {
  onSelectFeature: (featureId: string) => void;
  activeFeature?: string;
}

export const PillFeatureNav: React.FC<PillFeatureNavProps> = ({
  onSelectFeature,
  activeFeature
}) => {
  const features = [
    { id: 'switches', label: 'MECHANICAL SWITCHES', target: 'switches-section' },
    { id: 'keycaps', label: 'PBT KEYCAPS', target: 'keycaps-section' },
    { id: 'hotswap', label: 'HOT-SWAPPABLE', target: 'accessories-section' },
    { id: 'rgb', label: 'RGB LIGHTING', target: 'rgb-section' }
  ];

  const handleClick = (id: string, target: string) => {
    soundEngine.playKeySound('tactile', false);
    onSelectFeature(id);
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#f6f6f4] py-8 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6">
          {features.map((item) => {
            const isActive = activeFeature === item.id;
            return (
              <button
                key={item.id}
                id={`pill-nav-${item.id}`}
                onClick={() => handleClick(item.id, item.target)}
                className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-105'
                    : 'bg-white/80 hover:bg-white text-neutral-800 border-neutral-200/90 hover:border-neutral-400 hover:shadow-xs'
                }`}
              >
                {/* Red/Orange Diamond Marker matching screenshot */}
                <span className="text-[#ff5722] text-[10px] transform group-hover:rotate-45 transition-transform duration-200">
                  ◆
                </span>
                
                <span className="tracking-wide">{item.label}</span>
                
                <span className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
