import React from 'react';
import { soundEngine } from '../utils/audio';

export const KeyboardStatement: React.FC = () => {
  return (
    <section className="w-full bg-[#f6f6f4] py-16 sm:py-24 border-b border-black/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant KEYBOARD typographic display */}
        <div className="relative w-full flex items-center justify-between select-none py-4 border-b border-black/10">
          <div className="w-full flex items-baseline justify-between text-[64px] sm:text-[110px] md:text-[150px] lg:text-[195px] font-black text-neutral-950 tracking-tighter leading-none">
            
            {/* K */}
            <span className="hover:text-orange-600 transition-colors cursor-default">K</span>
            
            {/* E */}
            <span className="hover:text-orange-600 transition-colors cursor-default">E</span>
            
            {/* Y with nested miniature mechanical keyboard icon inside */}
            <div className="relative inline-flex items-center justify-center">
              <span className="hover:text-orange-600 transition-colors cursor-default">Y</span>
              
              {/* Miniature pixel-art / isometric keyboard nested inside the Y fork */}
              <div 
                onClick={() => soundEngine.playKeySound('clicky', false)}
                title="Keytron 75% Micro Specimen"
                className="absolute top-[18%] sm:top-[20%] left-1/2 -translate-x-1/2 w-8 sm:w-14 md:w-18 h-5 sm:h-9 md:h-11 bg-[#1e2029] rounded-[4px] border border-neutral-600/80 p-0.5 sm:p-1 shadow-md hover:scale-125 transition-transform cursor-pointer flex flex-col justify-between"
              >
                {/* 3 tiny rows of keys */}
                <div className="flex gap-0.5 justify-center">
                  <span className="w-1.5 h-1 bg-orange-500 rounded-[1px]"></span>
                  <span className="w-1 h-1 bg-neutral-300 rounded-[1px]"></span>
                  <span className="w-1 h-1 bg-neutral-300 rounded-[1px]"></span>
                  <span className="w-1 h-1 bg-neutral-300 rounded-[1px]"></span>
                  <span className="w-1.5 h-1 bg-neutral-400 rounded-[1px]"></span>
                </div>
                <div className="flex gap-0.5 justify-center">
                  <span className="w-1.5 h-1 bg-neutral-400 rounded-[1px]"></span>
                  <span className="w-1 h-1 bg-neutral-200 rounded-[1px]"></span>
                  <span className="w-1 h-1 bg-neutral-200 rounded-[1px]"></span>
                  <span className="w-1 h-1 bg-neutral-200 rounded-[1px]"></span>
                  <span className="w-1.5 h-1 bg-neutral-400 rounded-[1px]"></span>
                </div>
                <div className="flex gap-0.5 justify-center">
                  <span className="w-1 h-1 bg-neutral-400 rounded-[1px]"></span>
                  <span className="w-4 h-1 bg-neutral-300 rounded-[1px]"></span>
                  <span className="w-1 h-1 bg-neutral-400 rounded-[1px]"></span>
                </div>
              </div>
            </div>

            {/* B */}
            <span className="hover:text-orange-600 transition-colors cursor-default">B</span>

            {/* O with Salmon Coral Dot inside */}
            <div className="relative inline-flex items-center justify-center">
              <span className="hover:text-orange-600 transition-colors cursor-default">O</span>
              {/* Salmon / Coral circular dot nested in O */}
              <div 
                onClick={() => soundEngine.playKeySound('tactile', false)}
                title="Acoustic Gasket Core"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 sm:w-8 md:w-11 lg:w-14 h-4 sm:h-8 md:h-11 lg:h-14 rounded-full bg-[#f87171] shadow-inner hover:scale-125 transition-transform cursor-pointer" 
              />
            </div>

            {/* A */}
            <span className="hover:text-orange-600 transition-colors cursor-default">A</span>

            {/* R */}
            <span className="hover:text-orange-600 transition-colors cursor-default">R</span>

            {/* D */}
            <span className="hover:text-orange-600 transition-colors cursor-default">D</span>

          </div>
        </div>

        {/* 2-Column Manifesto directly below KEYBOARD */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="md:col-span-6 lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-neutral-950 tracking-tight leading-[1.15]">
              Work Smarter, Not<br className="hidden sm:inline" />
              Harder. Seamless Typing.
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#ff5722]"></span>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                Precision Hardware Engineering
              </span>
            </div>
          </div>

          {/* Right Column: Body Statement */}
          <div className="md:col-span-6 lg:col-span-7">
            <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed">
              Say goodbye to mushy membrane keys and scattered focus. Our intuitive mechanical keyboards help <span className="text-neutral-950 font-semibold underline decoration-[#ff5722] decoration-2 underline-offset-4">enthusiasts</span>—and everyday creators—unlock tactile satisfaction, peak typing velocity, and fatigue-free ergonomic endurance.
            </p>
            <p className="mt-4 text-sm sm:text-base text-neutral-500 leading-relaxed">
              Every switch plate, sound dampening gasket, and PBT keycap is meticulously calibrated to produce an authentic acoustic signature and zero-wobble keystroke response.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 pt-6 border-t border-neutral-200/80">
              <div>
                <div className="text-2xl font-bold font-mono text-neutral-900">0.125ms</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide">Input Latency</div>
              </div>
              <div className="w-[1px] h-8 bg-neutral-200"></div>
              <div>
                <div className="text-2xl font-bold font-mono text-neutral-900">100M+</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide">Keystroke Life</div>
              </div>
              <div className="w-[1px] h-8 bg-neutral-200"></div>
              <div>
                <div className="text-2xl font-bold font-mono text-neutral-900">1000Hz</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide">Polling Rate</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
