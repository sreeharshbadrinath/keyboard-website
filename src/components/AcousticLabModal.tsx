import React, { useState, useEffect } from 'react';
import { X, Volume2, Sparkles, Activity, Check, RotateCcw } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { SWITCH_OPTIONS } from '../data/keyboards';
import { SwitchOption } from '../types';

interface AcousticLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AcousticLabModal: React.FC<AcousticLabModalProps> = ({ isOpen, onClose }) => {
  const [selectedSwitch, setSelectedSwitch] = useState<SwitchOption>(SWITCH_OPTIONS[0]);
  const [typingInput, setTypingInput] = useState<string>('');
  const [keystrokeCount, setKeystrokeCount] = useState<number>(0);
  const [lastForce, setLastForce] = useState<number>(45);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const type = selectedSwitch.type.toLowerCase();
      let soundType: 'linear' | 'tactile' | 'clicky' | 'silent' = 'linear';
      if (type.includes('tactile')) soundType = 'tactile';
      else if (type.includes('click')) soundType = 'clicky';
      else if (type.includes('silent')) soundType = 'silent';

      soundEngine.playKeySound(soundType, e.key === ' ');
      setKeystrokeCount(prev => prev + 1);
      setLastForce(Math.floor(40 + Math.random() * 25));

      if (e.key.length === 1) {
        setTypingInput(prev => (prev + e.key).slice(-35));
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, selectedSwitch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#111216] border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Keytron Acoustic Laboratory</h3>
              <p className="text-xs text-neutral-400 font-mono">Real-Time Web Audio Mechanical Frequency Synthesis</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playKeySound('tactile', false);
              onClose();
            }}
            className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Switch Profile Selector */}
        <div className="mt-6">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Select Switch Acoustic Profile:
          </label>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {SWITCH_OPTIONS.map((sw) => {
              const isSelected = selectedSwitch.id === sw.id;
              return (
                <button
                  key={sw.id}
                  onClick={() => {
                    setSelectedSwitch(sw);
                    let st: 'linear' | 'tactile' | 'clicky' | 'silent' = 'linear';
                    if (sw.type.includes('Tactile')) st = 'tactile';
                    else if (sw.type.includes('Clicky')) st = 'clicky';
                    else if (sw.type.includes('Silent')) st = 'silent';
                    soundEngine.playKeySound(st, false);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-800/90 border-[#ff5722] shadow-md ring-1 ring-[#ff5722]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: sw.stemColor }} 
                    />
                    <span className="text-[10px] font-mono text-neutral-400">{sw.actuationForce.split(' ')[0]}</span>
                  </div>
                  <div className="mt-2 text-xs font-bold text-white leading-tight">
                    {sw.name.replace('Keytron G Pro 3.0 ', '')}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">{sw.type}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Typing Sandbox */}
        <div className="mt-6 p-6 bg-black/40 rounded-2xl border border-neutral-800 flex flex-col items-center justify-center text-center">
          <div className="text-xs font-mono text-neutral-400">
            Type on your keyboard or press keys below:
          </div>

          <div className="mt-4 w-full min-h-16 px-4 py-3 bg-neutral-900/80 border border-neutral-700/60 rounded-xl font-mono text-lg text-orange-400 tracking-wider flex items-center justify-center overflow-x-auto">
            {typingInput || <span className="text-neutral-600 text-sm">PRESS ANY KEY ON YOUR KEYBOARD...</span>}
          </div>

          {/* Quick Keys */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {['ESC', 'SPACE', 'ENTER', 'TAB', 'A', 'S', 'D', 'F', 'J', 'K', 'L'].map((k) => (
              <button
                key={k}
                onClick={() => {
                  let st: 'linear' | 'tactile' | 'clicky' | 'silent' = 'linear';
                  if (selectedSwitch.type.includes('Tactile')) st = 'tactile';
                  else if (selectedSwitch.type.includes('Clicky')) st = 'clicky';
                  else if (selectedSwitch.type.includes('Silent')) st = 'silent';
                  soundEngine.playKeySound(st, k === 'SPACE');
                  setTypingInput(prev => (prev + (k === 'SPACE' ? ' ' : k)).slice(-35));
                  setKeystrokeCount(c => c + 1);
                }}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 active:translate-y-0.5 rounded-lg text-xs font-mono text-neutral-200 border border-neutral-700 cursor-pointer transition-all"
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        {/* Real-Time Telemetry Bar */}
        <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-neutral-800 text-center font-mono">
          <div>
            <div className="text-[10px] text-neutral-500 uppercase">Acoustic Signature</div>
            <div className="text-xs font-bold text-neutral-200 mt-0.5">{selectedSwitch.soundProfile.split(',')[0]}</div>
          </div>
          <div>
            <div className="text-[10px] text-neutral-500 uppercase">Actuation Grams</div>
            <div className="text-xs font-bold text-orange-400 mt-0.5">{lastForce} gf</div>
          </div>
          <div>
            <div className="text-[10px] text-neutral-500 uppercase">Keystroke Count</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">{keystrokeCount} strokes</div>
          </div>
        </div>

      </div>
    </div>
  );
};
