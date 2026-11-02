/**
 * Pure Web Audio API Sound Synthesizer for ChiquiTap.
 * Generates copyright-free procedural effects:
 * - Referee pea whistle (forced "Sí")
 * - Rubber stamp impact ("APROBADO" / "FORMATO MODIFICADO")
 * - Stadium bombo legüero thud (Official Resolution popup)
 * - Soft ambient drone hum (Drone Show canvas)
 */

class ChiquiTapSoundEngine {
  private ctx: AudioContext | null = null;
  private unlocked = false;
  private manuallyMuted = false;
  private droneOscA: OscillatorNode | null = null;
  private droneOscB: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
  }

  public isSoundActive(): boolean {
    return this.unlocked && !this.manuallyMuted;
  }

  public isMuted(): boolean {
    return !this.unlocked || this.manuallyMuted;
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public unlockFromGesture(): void {
    if (!this.unlocked) {
      this.unlocked = true;
      this.ensureContext();
      this.notify();
    } else if (this.ctx && this.ctx.state === 'suspended' && !this.manuallyMuted) {
      void this.ctx.resume();
    }
  }

  public toggleMute(): void {
    if (!this.unlocked) {
      this.unlocked = true;
      this.manuallyMuted = false;
      this.ensureContext();
    } else {
      this.manuallyMuted = !this.manuallyMuted;
      if (this.manuallyMuted) {
        this.stopDroneHum();
      } else {
        this.ensureContext();
      }
    }
    this.notify();
  }

  /**
   * Short crisp referee pea-whistle trill when forcing a "Sí"
   */
  public playWhistle(): void {
    if (!this.isSoundActive()) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 0.42;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.linearRampToValueAtTime(0.11, now + 0.03);
    masterGain.gain.setValueAtTime(0.11, now + duration - 0.08);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    masterGain.connect(ctx.destination);

    // Pea trill LFO (~32Hz amplitude modulation)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(34, now);
    lfoGain.gain.setValueAtTime(0.045, now);
    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(2760, now);
    osc1.frequency.linearRampToValueAtTime(2840, now + 0.08);
    osc1.frequency.setValueAtTime(2810, now + duration);

    osc2.frequency.setValueAtTime(2915, now);
    osc2.frequency.linearRampToValueAtTime(2990, now + 0.08);

    osc1.connect(masterGain);
    osc2.connect(masterGain);

    lfo.start(now);
    osc1.start(now);
    osc2.start(now);

    lfo.stop(now + duration);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  /**
   * Mechanical desk rubber-stamp thump + crisp ink snap
   */
  public playStamp(): void {
    if (!this.isSoundActive()) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Low desk thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(165, now);
    osc.frequency.exponentialRampToValueAtTime(46, now + 0.11);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.14);

    // Short filtered noise burst for paper impact
    const bufferSize = Math.floor(ctx.sampleRate * 0.06);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1100, now);
    filter.Q.setValueAtTime(1.2, now);

    const nGain = ctx.createGain();
    nGain.gain.setValueAtTime(0.14, now);
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noise.connect(filter);
    filter.connect(nGain);
    nGain.connect(ctx.destination);
    noise.start(now);
  }

  /**
   * Deep resonant bombo legüero double-hit when an Official Resolution appears
   */
  public playBombo(): void {
    if (!this.isSoundActive()) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const triggerHit = (offset: number, peakGain: number, startFreq: number) => {
      const t = ctx.currentTime + offset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(48, t + 0.18);
      osc.frequency.exponentialRampToValueAtTime(38, t + 0.42);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(peakGain, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.46);
    };

    // Classic two-stroke bombo pulse
    triggerHit(0, 0.32, 128);
    triggerHit(0.22, 0.22, 112);
  }

  /**
   * Soft warm harmonic hum for the night-sky Drone Show
   */
  public startDroneHum(): void {
    if (!this.isSoundActive()) return;
    if (this.droneGain) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.032, now + 0.8);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(340, now);

    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    oscA.type = 'sawtooth';
    oscB.type = 'triangle';
    oscA.frequency.setValueAtTime(110, now);
    oscB.frequency.setValueAtTime(165.4, now); // gentle fifth

    oscA.connect(filter);
    oscB.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    oscA.start(now);
    oscB.start(now);

    this.droneOscA = oscA;
    this.droneOscB = oscB;
    this.droneGain = gain;
  }

  public stopDroneHum(): void {
    if (!this.droneGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      this.droneGain.gain.cancelScheduledValues(now);
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, now);
      this.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.25);
      const oscA = this.droneOscA;
      const oscB = this.droneOscB;
      setTimeout(() => {
        try {
          oscA?.stop();
          oscB?.stop();
          oscA?.disconnect();
          oscB?.disconnect();
        } catch {
          // ignore already stopped
        }
      }, 280);
    } catch {
      // ignore cleanup error
    }
    this.droneOscA = null;
    this.droneOscB = null;
    this.droneGain = null;
  }
}

export const soundEngine = new ChiquiTapSoundEngine();
