import React, { useState } from 'react';
import { Settings, ShieldCheck, Cpu, Layers, Sparkles, Check, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AccessoryItem {
  id: string;
  name: string;
  category: 'mechanical' | 'keycaps' | 'switches';
  price: number;
  tag: string;
  description: string;
  specs: string[];
}

export const CustomizableAccessories: React.FC<{
  onAddToCart: (item: any) => void;
}> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<'mechanical' | 'keycaps' | 'switches'>('mechanical');
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const accessoriesData: Record<'mechanical' | 'keycaps' | 'switches', AccessoryItem[]> = {
    mechanical: [
      {
        id: 'acc-brass-plate',
        name: 'Precision CNC Brass Switch Plate',
        category: 'mechanical',
        price: 38,
        tag: 'Acoustic Density',
        description: 'Increases bottom-out acoustic pitch and stiffness. Delivers a bright, high-frequency clack and rock-solid keystroke stability.',
        specs: ['1.5mm Milled Brass', 'Electrophoretic Coating', 'Compatible with 75% PCB']
      },
      {
        id: 'acc-fr4-plate',
        name: 'Acoustic FR4 Flexible Plate',
        category: 'mechanical',
        price: 26,
        tag: 'Deep Thock',
        description: 'High-flex composite material designed to enhance low-end acoustic resonance and provide a bouncy, cushioned typing feel.',
        specs: ['1.2mm Flex Cut PCB Plate', 'Gold Immersion Traces', 'Acoustic Gasket Tabs']
      },
      {
        id: 'acc-wrist-rest',
        name: 'Solid Walnut Wooden Wrist Rest',
        category: 'mechanical',
        price: 32,
        tag: 'Ergonomic Support',
        description: 'Naturally oiled American walnut wood cut at an ergonomic 8-degree slope to prevent wrist strain during marathon coding and gaming sessions.',
        specs: ['Natural Solid Walnut', 'Anti-Slip Silicone Base', 'Chamfered Comfort Edges']
      }
    ],
    keycaps: [
      {
        id: 'acc-retro-chalk',
        name: 'Keytron Retro Classic Double-Shot PBT',
        category: 'keycaps',
        price: 49,
        tag: 'Flagship Set',
        description: 'Thick 1.5mm oil-resistant PBT keycaps with crisp legends. Dual-tone charcoal and slate colorway with the signature vibrant orange accent keys.',
        specs: ['Cherry Profile / OEM Available', 'Double-Shot Injection Molding', '138 Keys Universal Compatibility']
      },
      {
        id: 'acc-cyberpunk-neon',
        name: 'Cyberpunk Neon Glow Shine-Through Set',
        category: 'keycaps',
        price: 45,
        tag: 'RGB Optimized',
        description: 'South-facing translucent legend engravings optimized for vivid spectrum illumination in low-light gaming environments.',
        specs: ['Frosted Matte PBT', 'South-Facing Legends', '126 Keys Set']
      },
      {
        id: 'acc-artisan-resin',
        name: 'Handcrafted Resin Artisan Esc Keycap',
        category: 'keycaps',
        price: 28,
        tag: 'Limited Edition',
        description: 'Individually cast and polished miniature mechanical switch enclosed in crystal-clear jewel resin with gold leaf inclusions.',
        specs: ['100% Hand Polished Resin', 'Standard MX Stem Compatible', 'Numbered Certificate']
      }
    ],
    switches: [
      {
        id: 'acc-banana-pack',
        name: 'Keytron G Pro 3.0 Banana (Pack of 35)',
        category: 'switches',
        price: 24,
        tag: 'Enthusiast Favorite',
        description: 'Early tactile bump positioned right at the keystroke apex. Factory pre-lubed with Krytox 205g0 for zero scratchiness.',
        specs: ['57gf Actuation', '3.6mm Total Travel', 'Factory Pre-Lubricated']
      },
      {
        id: 'acc-red-pack',
        name: 'Keytron G Pro 3.0 Red Linear (Pack of 35)',
        category: 'switches',
        price: 22,
        tag: 'Buttery Smooth',
        description: 'Ultra-fast 45g actuation with light resistance. Engineered for effortless rapid key triggers and quiet acoustic profile.',
        specs: ['45gf Linear', '4.0mm Travel', 'Gold Alloy Contact Leaf']
      },
      {
        id: 'acc-silent-pack',
        name: 'Keytron Silent Black Dampened (Pack of 35)',
        category: 'switches',
        price: 28,
        tag: 'Whisper Quiet',
        description: 'Integrated dual silicone dampeners eliminate harsh bottom-out clatter without introducing a mushy bottom feel.',
        specs: ['50gf Silent Linear', 'Dual TPE Dampeners', 'Zero Rebound Echo']
      }
    ]
  };

  const currentList = accessoriesData[selectedCategory];
  const currentItem = currentList[activeItemIndex] || currentList[0];

  const handleCategoryChange = (cat: 'mechanical' | 'keycaps' | 'switches') => {
    soundEngine.playKeySound('tactile', false);
    setSelectedCategory(cat);
    setActiveItemIndex(0);
  };

  return (
    <section id="accessories-section" className="w-full bg-[#f6f6f4] py-20 border-b border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Dribbble shot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#ff5722] font-semibold">
              <span>Accessories</span>
              <Settings className="w-3.5 h-3.5" />
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
              Customizable Accessories & Support
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 leading-relaxed font-normal">
            Several additional accessories and supports that can be modified according to the needs of the keyboard and your ergonomic workstation.
          </p>
        </div>

        {/* Content Layout matching screenshot */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: "Built for everyday performance" + Radio Selector Options */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.08] shadow-xs">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
              Built for everyday performance
            </h3>
            <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
              Rather than pushing unnecessary features, we design keyboards that support your daily tasks with precision, comfort, and reliability.
            </p>

            {/* Radio Category Cards (Exact to Dribbble shot) */}
            <div className="mt-8 space-y-3">
              {[
                { key: 'mechanical', title: 'Mechanical', desc: 'Choose our collection mechanical keyboard components' },
                { key: 'keycaps', title: 'Keycaps', desc: 'Choose our collection custom artisan keycaps' },
                { key: 'switches', title: 'Switches', desc: 'Choose our collection tactile & linear switches' }
              ].map((opt) => {
                const isSelected = selectedCategory === opt.key;
                return (
                  <div
                    key={opt.key}
                    onClick={() => handleCategoryChange(opt.key as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? 'bg-neutral-50 border-neutral-900 shadow-xs'
                        : 'bg-white border-neutral-200/80 hover:border-neutral-400'
                    }`}
                  >
                    {/* Radio Button Indicator */}
                    <div className="mt-1 flex items-center justify-center">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-neutral-950' : 'border-neutral-300'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-neutral-950" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="text-base font-bold text-neutral-950">
                        {opt.title}
                      </div>
                      <div className="text-xs text-neutral-500 mt-0.5">
                        {opt.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Dynamic Interactive Gear Preview & Customizer */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.08] shadow-xs">
            
            {/* Category tabs within selected group */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-neutral-400">Available:</span>
                <span className="text-xs font-bold text-neutral-900 capitalize">{selectedCategory} Editions</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                {currentList.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEngine.playKeySound('linear', false);
                      setActiveItemIndex(idx);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      activeItemIndex === idx
                        ? 'bg-neutral-900 text-white font-semibold'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Showcase Visual Display */}
            <div className="mt-6">
              <div className="relative w-full h-56 sm:h-64 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl overflow-hidden flex items-center justify-center p-6 border border-neutral-200/80">
                
                {/* Background CAD grid */}
                <div className="absolute inset-0 bg-cad-grid opacity-50 pointer-events-none" />

                {/* Visual Representation */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xl border border-neutral-700/60 mb-3 group-hover:scale-105 transition-transform">
                    {selectedCategory === 'mechanical' && <Cpu className="w-10 h-10 text-[#ff5722]" />}
                    {selectedCategory === 'keycaps' && <Layers className="w-10 h-10 text-[#f87171]" />}
                    {selectedCategory === 'switches' && <Sparkles className="w-10 h-10 text-[#7ee7c9]" />}
                  </div>
                  
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-xs border border-black/10 rounded-full text-xs font-mono font-bold text-neutral-800 shadow-xs">
                    {currentItem.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 right-4 font-mono text-xl font-bold text-neutral-900">
                  ${currentItem.price}
                </div>
              </div>

              {/* Item Details */}
              <div className="mt-6">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-xl font-bold text-neutral-950">
                    {currentItem.name}
                  </h4>
                  <span className="text-sm font-mono text-emerald-600 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> In Stock
                  </span>
                </div>

                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {currentItem.description}
                </p>

                {/* Specs bullets */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentItem.specs.map((spec, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 text-neutral-700 rounded-md text-xs font-mono"
                    >
                      • {spec}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-mono">
                    Express Worldwide Shipping Available
                  </span>

                  <button
                    id={`add-acc-${currentItem.id}`}
                    onClick={() => {
                      soundEngine.playKeySound('tactile', false);
                      onAddToCart({
                        product: {
                          id: currentItem.id,
                          name: currentItem.name,
                          price: currentItem.price,
                          series: 'Pro Series',
                          layout: currentItem.tag
                        },
                        quantity: 1
                      });
                    }}
                    className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>Add to Setup</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
