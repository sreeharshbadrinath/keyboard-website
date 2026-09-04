import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles, Volume2, RotateCcw, Eye, Sliders, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { RGBEffect } from '../types';

interface HeroExactProps {
  onExploreClick: () => void;
  onOpenSoundLab: () => void;
}

export const HeroExact: React.FC<HeroExactProps> = ({ onExploreClick, onOpenSoundLab }) => {
  // Hero view mode: 'desk' (Exact Dribbble top-down with hands) or 'video' (Exact 3D floating RGB animation from user's video)
  const [viewMode, setViewMode] = useState<'desk' | 'video'>('desk');
  
  // Interactive keystroke state
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [typedText, setTypedText] = useState<string>('KEYTRON');
  const [typingHandState, setTypingHandState] = useState<{ leftFinger: number; rightFinger: number }>({
    leftFinger: 1,
    rightFinger: 2
  });

  // Video Animation settings (reflecting the uploaded video)
  const [rgbEffect, setRgbEffect] = useState<RGBEffect>('spectrum');
  const [isPlayingAnimation, setIsPlayingAnimation] = useState<boolean>(true);
  const [cameraAngle, setCameraAngle] = useState<'perspective' | 'macro' | 'flat'>('perspective');
  const [tiltAngle, setTiltAngle] = useState<{ x: number; y: number }>({ x: 18, y: -12 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle physical keyboard typing listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      
      const key = e.key.toUpperCase();
      setActiveKey(key);
      soundEngine.playKeySound('linear', key === ' ');

      // Animate hands typing
      setTypingHandState({
        leftFinger: Math.floor(Math.random() * 4),
        rightFinger: Math.floor(Math.random() * 4)
      });

      if (e.key.length === 1) {
        setTypedText(prev => (prev + e.key).slice(-18));
      }

      setTimeout(() => {
        setActiveKey(null);
      }, 140);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse tilt tracking in 3D video mode
  const handleMouseMove = (e: React.MouseEvent) => {
    if (viewMode !== 'video' || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTiltAngle({ x: 16 + y, y: -10 + x });
  };

  // Keyboard key rows configuration (75% Compact Layout)
  const keyboardRows = [
    // Function Row
    ['ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'DEL'],
    // Number Row
    ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'BACK'],
    // Tab / QWERTY
    ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    // Caps / Home Row
    ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'ENTER', 'PGUP'],
    // Shift Row
    ['SHIFT', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT', 'UP', 'PGDN'],
    // Bottom Row
    ['CTRL', 'OPT', 'CMD', 'SPACE', 'CMD', 'OPT', 'CTRL', 'LEFT', 'DOWN', 'RIGHT']
  ];

  const triggerKeyAction = (keyLabel: string) => {
    setActiveKey(keyLabel);
    soundEngine.playKeySound(keyLabel === 'ESC' ? 'tactile' : 'linear', keyLabel === 'SPACE');
    setTypedText(prev => (prev + (keyLabel === 'SPACE' ? ' ' : keyLabel)).slice(-18));
    setTimeout(() => setActiveKey(null), 150);
  };

  return (
    <section 
      id="hero-exact" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[720px] lg:min-h-[820px] bg-[#f6f6f4] border-b border-black/[0.08] overflow-hidden select-none transition-colors duration-500"
    >
      {/* 1. Architectural CAD Grid & Coordinate Crosshairs */}
      <div className="absolute inset-0 bg-cad-grid pointer-events-none opacity-90" />
      
      {/* Architectural CAD Markings */}
      <div className="absolute top-6 left-8 font-mono text-[11px] text-neutral-400 tracking-wider flex items-center gap-2 pointer-events-none hidden sm:flex">
        <span>+ 00.12.98</span>
        <span className="w-8 h-[1px] bg-neutral-300"></span>
        <span>LAT 75% CNC</span>
      </div>
      <div className="absolute top-6 right-10 font-mono text-[11px] text-neutral-400 tracking-wider pointer-events-none hidden sm:block">
        CAD REF: KT-84-PRO
      </div>
      <div className="absolute bottom-6 left-8 font-mono text-[11px] text-neutral-400 tracking-widest pointer-events-none hidden sm:block">
        + X: 420.00 / Y: 108.00 / Z: 18.50mm
      </div>
      <div className="absolute bottom-6 right-10 font-mono text-[11px] text-neutral-400 tracking-widest pointer-events-none hidden sm:block">
        ISO/ANSI MULTI-LAYOUT
      </div>

      {/* Crosshair markers */}
      <div className="absolute top-1/4 left-12 text-neutral-300 font-mono text-sm pointer-events-none hidden md:block">+</div>
      <div className="absolute top-1/3 right-1/4 text-neutral-300 font-mono text-sm pointer-events-none hidden md:block">+</div>
      <div className="absolute bottom-1/4 left-1/3 text-neutral-300 font-mono text-sm pointer-events-none hidden md:block">+</div>
      <div className="absolute bottom-12 right-16 text-neutral-300 font-mono text-sm pointer-events-none hidden md:block">+</div>

      {/* 2. Top Right Headline Block (Exact to Dribbble Shot) */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 z-20 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        
        {/* Left: Mode Switcher & Live Keystroke Status */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/80 backdrop-blur-md p-1 rounded-full border border-black/10 shadow-xs flex items-center">
            <button
              id="mode-desk-btn"
              onClick={() => {
                soundEngine.playKeySound('tactile', false);
                setViewMode('desk');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'desk'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <span>⌨ Desk Top-Down View</span>
            </button>
            <button
              id="mode-video-btn"
              onClick={() => {
                soundEngine.playKeySound('tactile', false);
                setViewMode('video');
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'video'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-orange-400" />
              <span>✦ 3D Video Animation</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white/70 border border-black/5 rounded-full text-[11px] font-mono text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Type on physical keyboard to hear acoustics:</span>
            <span className="font-bold text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded">
              {activeKey ? activeKey : 'READY'}
            </span>
          </div>
        </div>

        {/* Right: Headline & Statement (Exact typography from Dribbble shot) */}
        <div className="max-w-md md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-tight leading-[1.12]">
            Mechanical<br />Keyboards
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
            We design and create premium mechanical keyboards that combine aesthetics, durability, and high performance for every typing experience.
          </p>
        </div>
      </div>

      {/* 3. Massive Fragmented Architectural Typography (Exact Dribbble layout) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        <div className="relative w-full max-w-7xl h-full flex items-center justify-between px-6 select-none">
          
          {/* Top-Left: "Ke" */}
          <span className="absolute left-4 sm:left-12 top-[16%] text-[100px] sm:text-[140px] md:text-[180px] lg:text-[230px] font-extrabold text-neutral-950 tracking-tighter leading-none opacity-95">
            Ke
          </span>

          {/* Top-Right: "d" */}
          <span className="absolute right-4 sm:right-16 top-[18%] text-[100px] sm:text-[140px] md:text-[180px] lg:text-[230px] font-extrabold text-neutral-950 tracking-tighter leading-none opacity-95">
            d
          </span>

          {/* Bottom-Left: "Lo" */}
          <span className="absolute left-6 sm:left-14 bottom-[12%] text-[90px] sm:text-[130px] md:text-[170px] lg:text-[210px] font-extrabold text-neutral-950 tracking-tighter leading-none opacity-95">
            Lo
          </span>

          {/* Bottom-Right: "su" */}
          <span className="absolute right-6 sm:right-16 bottom-[10%] text-[90px] sm:text-[130px] md:text-[170px] lg:text-[210px] font-extrabold text-neutral-950 tracking-tighter leading-none opacity-95">
            su
          </span>

          {/* Graphic Accent: Radiant Sunset Orange Bottom Glow */}
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[850px] h-[340px] bg-gradient-to-t from-[#ff5722]/40 via-[#ff7844]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Graphic Accent: Salmon Pink Solid Circle on bottom-left */}
          <div className="absolute left-[12%] sm:left-[15%] bottom-[28%] w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#f87171] shadow-lg transform -translate-x-1/2 z-10 pointer-events-auto hover:scale-110 transition-transform cursor-pointer" 
            title="PBT Accent Specimen"
            onClick={() => soundEngine.playKeySound('tactile', false)}
          />

          {/* Graphic Accent: Mint Green Circle in bottom-center */}
          <div className="absolute left-[36%] sm:left-[38%] bottom-[22%] w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#7ee7c9] shadow-md z-10 pointer-events-auto hover:scale-110 transition-transform cursor-pointer"
            title="Silicone Acoustic Pad"
            onClick={() => soundEngine.playKeySound('linear', false)}
          />

          {/* Graphic Accent: Warm Yellow Tape / Note on bottom-right of keyboard */}
          <div className="absolute right-[22%] sm:right-[26%] bottom-[28%] w-14 sm:w-18 h-7 sm:h-9 bg-[#fae997] shadow-xs rounded-[2px] z-10 rotate-1 flex items-center justify-center font-mono text-[9px] font-bold text-neutral-700/80 pointer-events-auto cursor-pointer hover:rotate-3 transition-transform"
            title="QMK / VIA Remappable"
            onClick={() => soundEngine.playKeySound('clicky', false)}
          >
            VIA v3.0
          </div>
        </div>
      </div>

      {/* 4. Centerpiece Showcase: View 1 (Desk Top-Down Exact) OR View 2 (3D Video Animation) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-20 flex flex-col items-center justify-center">
        
        {viewMode === 'desk' ? (
          /* =========================================================================
             MODE 1: EXACT DRIBBLE TOP-DOWN VIEW WITH HANDS TYPING & INTERACTIVE KEYS
             ========================================================================= */
          <div className="relative w-full max-w-3xl flex flex-col items-center">
            
            {/* Keyboard Chassis & Keys Container */}
            <div className="relative w-full bg-[#1b1c20] p-3 sm:p-4 rounded-2xl shadow-2xl border border-neutral-700/60 ring-1 ring-black/40">
              
              {/* Top Bezel Status Accent */}
              <div className="flex items-center justify-between pb-2 px-1 text-[10px] font-mono text-neutral-400 border-b border-neutral-800/80 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-neutral-300 font-semibold tracking-wider">KEYTRON K2 MAX // 75% WIRELESS</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400">BT 1 • 2.4G • USB</span>
                  <span className="text-neutral-400">BATTERY: 98%</span>
                </div>
              </div>

              {/* 75% Mechanical Keyboard Grid Layout */}
              <div className="flex flex-col gap-1 sm:gap-1.25">
                {keyboardRows.map((row, rIdx) => (
                  <div key={rIdx} className="flex gap-1 sm:gap-1.25 justify-center">
                    {row.map((key, kIdx) => {
                      const isEsc = key === 'ESC';
                      const isSpace = key === 'SPACE';
                      const isReturn = key === 'ENTER';
                      const isBack = key === 'BACK';
                      const isTab = key === 'TAB';
                      const isCaps = key === 'CAPS';
                      const isShift = key === 'SHIFT';
                      const isAlt = key === 'CMD' || key === 'OPT' || key === 'CTRL';
                      const isNav = ['DEL', 'PGUP', 'PGDN', 'UP', 'DOWN', 'LEFT', 'RIGHT'].includes(key);
                      const isAlpha = /^[A-Z]$/.test(key);
                      const isPressed = activeKey === key;

                      // Width calculations
                      let widthClass = 'w-6 sm:w-10 h-7 sm:h-9 text-[10px] sm:text-xs';
                      if (isSpace) widthClass = 'flex-1 max-w-[200px] sm:max-w-[280px] h-7 sm:h-9 text-[9px]';
                      else if (isShift) widthClass = 'w-12 sm:w-18 h-7 sm:h-9 text-[9px]';
                      else if (isReturn) widthClass = 'w-11 sm:w-16 h-7 sm:h-9 text-[9px]';
                      else if (isBack) widthClass = 'w-10 sm:w-14 h-7 sm:h-9 text-[9px]';
                      else if (isTab || isCaps) widthClass = 'w-9 sm:w-13 h-7 sm:h-9 text-[9px]';
                      else if (isAlt) widthClass = 'w-7 sm:w-10 h-7 sm:h-9 text-[8px] sm:text-[9px]';

                      // Color themes matching Dribbble screenshot:
                      // - ESC: Iconic Keytron Orange (#ff5722)
                      // - Alphas: Off-white / light bone slate (#dcdcd9 text-neutral-900)
                      // - Modifiers & F-keys: Charcoal dark matte (#2d2f36 text-neutral-200)
                      let colorClass = 'bg-[#2b2d35] text-neutral-200 border-t border-neutral-600/50 shadow-xs hover:bg-[#343740]';
                      if (isEsc) {
                        colorClass = 'bg-[#ff5722] text-white font-bold border-t border-orange-400 shadow-md hover:bg-[#ff6838]';
                      } else if (isAlpha) {
                        colorClass = 'bg-[#e4e4e1] text-neutral-900 font-semibold border-t border-white/80 shadow-xs hover:bg-white';
                      } else if (isSpace) {
                        colorClass = 'bg-[#3b3e48] text-neutral-300 border-t border-neutral-500/40 shadow-xs hover:bg-[#434652]';
                      }

                      return (
                        <button
                          key={`${rIdx}-${kIdx}`}
                          id={`key-${key}-${rIdx}-${kIdx}`}
                          onClick={() => triggerKeyAction(key)}
                          className={`relative rounded sm:rounded-md transition-transform flex items-center justify-center font-sans tracking-tight cursor-pointer active:scale-95 ${widthClass} ${colorClass} ${
                            isPressed ? 'translate-y-1 shadow-inner ring-2 ring-orange-500' : 'shadow-xs'
                          }`}
                        >
                          <span>{key}</span>
                          {/* Subtle RGB underglow dot */}
                          <span className="absolute bottom-0.5 w-1.5 h-0.5 rounded-full bg-orange-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Realistic Typing Hands Overlay (Matching the Dribbble Screenshot) */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-12 sm:px-24 overflow-hidden z-20">
                {/* Left Hand */}
                <div 
                  className="relative -bottom-16 sm:-bottom-12 transition-transform duration-150 ease-out filter drop-shadow-2xl"
                  style={{
                    transform: `translateY(${typingHandState.leftFinger * 2}px) rotate(${-3 + typingHandState.leftFinger}deg)`
                  }}
                >
                  <svg width="220" height="240" viewBox="0 0 220 240" fill="none" className="w-36 sm:w-56 h-auto opacity-95">
                    {/* Realistic Arm & Palm in Warm Medium Skin Tone */}
                    <path
                      d="M20 240C25 190 35 150 50 120C65 90 95 75 115 80C130 85 145 105 155 130C165 155 175 200 180 240H20Z"
                      fill="url(#leftSkinGrad)"
                    />
                    {/* Index Finger pressing key */}
                    <path
                      d="M115 80C118 60 125 40 132 30C136 24 145 28 143 36C140 52 135 75 130 95"
                      stroke="#8a4b2d"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Middle Finger */}
                    <path
                      d="M95 75C95 50 102 32 108 20C112 14 122 17 120 26C116 46 112 68 110 88"
                      stroke="#9c5432"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Ring Finger */}
                    <path
                      d="M75 80C72 60 76 44 80 34C84 28 93 31 92 39C88 56 85 75 85 92"
                      stroke="#8a4b2d"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    {/* Pinky */}
                    <path
                      d="M55 95C50 80 52 64 56 56C59 50 67 52 66 60C63 74 62 90 65 105"
                      stroke="#7c4328"
                      strokeWidth="13"
                      strokeLinecap="round"
                    />
                    {/* Thumb hovering over spacebar */}
                    <path
                      d="M135 125C150 120 170 115 185 120C192 122 192 134 184 136C168 138 152 140 140 142"
                      stroke="#a85b37"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="leftSkinGrad" x1="100" y1="80" x2="100" y2="240" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9c5432" />
                        <stop offset="0.6" stopColor="#8a4b2d" />
                        <stop offset="1" stopColor="#68351e" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Right Hand */}
                <div 
                  className="relative -bottom-16 sm:-bottom-12 transition-transform duration-150 ease-out filter drop-shadow-2xl"
                  style={{
                    transform: `translateY(${typingHandState.rightFinger * 2}px) rotate(${3 - typingHandState.rightFinger}deg)`
                  }}
                >
                  <svg width="220" height="240" viewBox="0 0 220 240" fill="none" className="w-36 sm:w-56 h-auto opacity-95">
                    {/* Palm and Wrist */}
                    <path
                      d="M200 240C195 190 185 150 170 120C155 90 125 75 105 80C90 85 75 105 65 130C55 155 45 200 40 240H200Z"
                      fill="url(#rightSkinGrad)"
                    />
                    {/* Right Index Finger */}
                    <path
                      d="M105 80C102 60 95 40 88 30C84 24 75 28 77 36C80 52 85 75 90 95"
                      stroke="#8a4b2d"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Right Middle Finger */}
                    <path
                      d="M125 75C125 50 118 32 112 20C108 14 98 17 100 26C104 46 108 68 110 88"
                      stroke="#9c5432"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Right Ring Finger */}
                    <path
                      d="M145 80C148 60 144 44 140 34C136 28 127 31 128 39C132 56 135 75 135 92"
                      stroke="#8a4b2d"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    {/* Right Pinky */}
                    <path
                      d="M165 95C170 80 168 64 164 56C161 50 153 52 154 60C157 74 158 90 155 105"
                      stroke="#7c4328"
                      strokeWidth="13"
                      strokeLinecap="round"
                    />
                    {/* Right Thumb hovering */}
                    <path
                      d="M85 125C70 120 50 115 35 120C28 122 28 134 36 136C52 138 68 140 80 142"
                      stroke="#a85b37"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="rightSkinGrad" x1="120" y1="80" x2="120" y2="240" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#9c5432" />
                        <stop offset="0.6" stopColor="#8a4b2d" />
                        <stop offset="1" stopColor="#68351e" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom typing buffer badge */}
            <div className="mt-3 flex items-center gap-3">
              <span className="text-[11px] font-mono text-neutral-500">BUFFER:</span>
              <div className="px-3 py-1 bg-white/90 border border-black/10 rounded-full font-mono text-xs text-neutral-800 tracking-wider shadow-xs">
                {typedText || 'START TYPING...'}
                <span className="animate-ping inline-block w-1.5 h-3 bg-orange-500 ml-1"></span>
              </div>
              <button 
                onClick={() => setTypedText('')}
                className="text-[10px] font-mono text-neutral-400 hover:text-neutral-700 underline cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
             MODE 2: 3D FLOATING VIDEO ANIMATION (Exact to user's uploaded video)
             ========================================================================= */
          <div className="relative w-full max-w-4xl bg-[#0a0c10] p-6 sm:p-8 rounded-3xl shadow-2xl border border-neutral-800 text-white overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            
            {/* Dark Studio Ceiling Rim Light */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent pointer-events-none" />

            {/* Video Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-800/80 mb-6 z-10 relative">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                <span className="font-mono text-xs tracking-wider text-neutral-300 uppercase">
                  Cinematic 3D Video Render [4K 60FPS]
                </span>
              </div>

              {/* RGB Lighting Effect Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 hidden sm:inline">Lighting Wave:</span>
                <div className="flex items-center gap-1 bg-neutral-900/80 p-1 rounded-full border border-neutral-800 text-[11px] font-mono">
                  {(['spectrum', 'sunset', 'cyberpunk', 'aurora', 'monochrome'] as RGBEffect[]).map((fx) => (
                    <button
                      key={fx}
                      onClick={() => {
                        soundEngine.playKeySound('tactile', false);
                        setRgbEffect(fx);
                      }}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer capitalize ${
                        rgbEffect === fx 
                          ? 'bg-neutral-800 text-white shadow-xs font-semibold' 
                          : 'text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {fx}
                    </button>
                  ))}
                </div>
              </div>

              {/* Perspective toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playKeySound('linear', false);
                    setCameraAngle(cameraAngle === 'perspective' ? 'macro' : 'perspective');
                  }}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-full text-xs font-mono text-neutral-300 flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-orange-400" />
                  <span>{cameraAngle === 'perspective' ? 'Camera: 3D Float' : 'Camera: Macro Zoom'}</span>
                </button>
              </div>
            </div>

            {/* The 3D Floating Keyboard Stage (Matching the video frames 00:00 - 00:04) */}
            <div className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center overflow-hidden perspective-[1000px]">
              
              {/* Radial Studio Spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(40,50,80,0.25)_0%,rgba(10,12,16,0.95)_75%)] pointer-events-none" />

              {/* Floating 3D Keyboard Body */}
              <div 
                className={`relative transition-all duration-700 ease-out transform-style-3d cursor-grab active:cursor-grabbing ${
                  isPlayingAnimation ? 'animate-float-keyboard' : ''
                }`}
                style={{
                  transform: cameraAngle === 'macro'
                    ? 'scale(1.7) translate(-40px, -20px) rotateX(25deg) rotateY(-18deg) rotateZ(3deg)'
                    : `rotateX(${tiltAngle.x}deg) rotateY(${tiltAngle.y}deg) scale(0.95)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 3D CNC Aluminum Case Edge & Shadow */}
                <div className="relative bg-[#14151a] p-4 sm:p-5 rounded-2xl border-2 border-neutral-700/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(255,87,34,0.15)] ring-1 ring-white/10">
                  
                  {/* Glowing Key Matrix with dynamic RGB sweep */}
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    {keyboardRows.map((row, rIdx) => (
                      <div key={rIdx} className="flex gap-1.5 sm:gap-2 justify-center">
                        {row.map((key, kIdx) => {
                          const isEsc = key === 'ESC';
                          const isSpace = key === 'SPACE';
                          const isReturn = key === 'ENTER';
                          const isBack = key === 'BACK';
                          const isTab = key === 'TAB';
                          const isCaps = key === 'CAPS';
                          const isShift = key === 'SHIFT';
                          const isAlt = key === 'CMD' || key === 'OPT' || key === 'CTRL';
                          const isAlpha = /^[A-Z]$/.test(key);

                          let keyWidth = 'w-7 sm:w-11 h-8 sm:h-10 text-[10px] sm:text-xs';
                          if (isSpace) keyWidth = 'w-48 sm:w-64 h-8 sm:h-10 text-[9px]';
                          else if (isShift) keyWidth = 'w-14 sm:w-20 h-8 sm:h-10 text-[9px]';
                          else if (isReturn) keyWidth = 'w-12 sm:w-16 h-8 sm:h-10 text-[9px]';
                          else if (isBack) keyWidth = 'w-11 sm:w-14 h-8 sm:h-10 text-[9px]';
                          else if (isTab || isCaps) keyWidth = 'w-10 sm:w-13 h-8 sm:h-10 text-[9px]';
                          else if (isAlt) keyWidth = 'w-8 sm:w-11 h-8 sm:h-10 text-[9px]';

                          // Calculate dynamic RGB color based on wave effect and column index
                          let rgbGlow = 'rgba(255, 87, 34, 0.4)';
                          if (rgbEffect === 'spectrum') {
                            const hue = (kIdx * 24 + rIdx * 18) % 360;
                            rgbGlow = `hsla(${hue}, 85%, 60%, 0.7)`;
                          } else if (rgbEffect === 'sunset') {
                            rgbGlow = kIdx < 6 ? 'rgba(255, 87, 34, 0.7)' : 'rgba(245, 158, 11, 0.7)';
                          } else if (rgbEffect === 'cyberpunk') {
                            rgbGlow = kIdx % 2 === 0 ? 'rgba(6, 182, 212, 0.8)' : 'rgba(236, 72, 153, 0.8)';
                          } else if (rgbEffect === 'aurora') {
                            rgbGlow = 'rgba(16, 185, 129, 0.75)';
                          } else {
                            rgbGlow = 'rgba(255, 255, 255, 0.5)';
                          }

                          let keyBg = isAlpha 
                            ? 'bg-[#d8d9dc] text-neutral-900 font-semibold' 
                            : isEsc 
                              ? 'bg-[#ff5722] text-white font-bold' 
                              : 'bg-[#262830] text-neutral-300 font-medium';

                          return (
                            <div
                              key={`3d-${rIdx}-${kIdx}`}
                              onClick={() => triggerKeyAction(key)}
                              className={`relative rounded-md flex items-center justify-center font-sans tracking-tight transition-all cursor-pointer ${keyWidth} ${keyBg} ${
                                activeKey === key ? 'translate-y-1' : ''
                              }`}
                              style={{
                                boxShadow: `0 4px 0 #121317, 0 0 16px ${rgbGlow}`
                              }}
                            >
                              <span>{key}</span>
                              {/* LED Gap Underglow (Exact to video frames) */}
                              <span 
                                className="absolute -inset-0.5 rounded-md -z-10 opacity-70 blur-[3px]"
                                style={{ backgroundColor: rgbGlow }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* CNC Aluminum Bevel Polish Highlight */}
                  <div className="absolute -bottom-2 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-neutral-500/60 to-transparent" />
                </div>

                {/* Dark Studio Floor Reflection */}
                <div 
                  className="absolute -bottom-16 inset-x-4 h-16 bg-gradient-to-b from-neutral-800/20 to-transparent blur-md rounded-full -z-20 transform rotateX(70deg)"
                  style={{
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
                  }}
                />
              </div>
            </div>

            {/* Video Footer Interactive Bar */}
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-neutral-800/80 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
                  className="flex items-center gap-1.5 text-neutral-200 hover:text-white cursor-pointer"
                >
                  {isPlayingAnimation ? <Pause className="w-3.5 h-3.5 text-orange-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isPlayingAnimation ? 'Pause Float Loop' : 'Play Float Loop'}</span>
                </button>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400">Drag mouse over keyboard to inspect angles</span>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={onOpenSoundLab}
                  className="text-orange-400 hover:underline flex items-center gap-1 cursor-pointer font-sans font-medium"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Test Switch Sound Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};
