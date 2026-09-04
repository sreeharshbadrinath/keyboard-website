/**
 * Web Audio API synthesizer for mechanical keyboard acoustics
 * Generates realistic "thock", "tactile clack", and "clicky" sound profiles
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.6;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public getVolume(): number {
    return this.volume;
  }

  /**
   * Play realistic mechanical keystroke sound based on switch profile
   */
  public playKeySound(type: 'linear' | 'tactile' | 'clicky' | 'silent' = 'linear', isSpacebar: boolean = false) {
    if (this.isMuted) return;

    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(this.volume * (isSpacebar ? 0.9 : 0.7), now);
      master.connect(this.ctx.destination);

      if (type === 'clicky') {
        // High-pitch click leaf snap + bottom out
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(2400, now);
        clickOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.008);
        clickGain.gain.setValueAtTime(0.6, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
        clickOsc.connect(clickGain);
        clickGain.connect(master);
        clickOsc.start(now);
        clickOsc.stop(now + 0.015);
      }

      // 1. Transient click/impact (noise burst)
      const bufferSize = this.ctx.sampleRate * 0.03;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';

      if (type === 'linear') {
        // Creamy deep thock filter
        noiseFilter.frequency.setValueAtTime(isSpacebar ? 420 : 680, now);
        noiseFilter.Q.setValueAtTime(3.2, now);
      } else if (type === 'tactile') {
        // Crisp tactile pop
        noiseFilter.frequency.setValueAtTime(isSpacebar ? 580 : 920, now);
        noiseFilter.Q.setValueAtTime(2.5, now);
      } else if (type === 'silent') {
        // Heavily damped stroke
        noiseFilter.frequency.setValueAtTime(280, now);
        noiseFilter.Q.setValueAtTime(1.5, now);
      } else {
        // Clicky bottom-out
        noiseFilter.frequency.setValueAtTime(1100, now);
        noiseFilter.Q.setValueAtTime(3.0, now);
      }

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(type === 'silent' ? 0.2 : 0.7, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + (type === 'silent' ? 0.025 : 0.045));

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start(now);

      // 2. Low-end resonant body thump (the signature "thock" resonance)
      const bodyOsc = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      bodyOsc.type = 'sine';

      const baseFreq = isSpacebar ? (type === 'linear' ? 120 : 140) : (type === 'linear' ? 180 : 220);
      bodyOsc.frequency.setValueAtTime(baseFreq, now);
      bodyOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.04);

      bodyGain.gain.setValueAtTime(type === 'silent' ? 0.15 : 0.5, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpacebar ? 0.08 : 0.05));

      bodyOsc.connect(bodyGain);
      bodyGain.connect(master);
      bodyOsc.start(now);
      bodyOsc.stop(now + (isSpacebar ? 0.09 : 0.06));

    } catch {
      // Graceful fallback if Web Audio is blocked or not yet activated by user
    }
  }
}

export const soundEngine = new SoundEngine();
