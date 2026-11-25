/**
 * Call Forth: the done tone.
 * One low, warm, rewarding note, played when the Make timer reaches zero and whenever the person taps "I'm done".
 * Same singing-bowl family as the timer, but lower (G3, 196 Hz), with a quicker 25 ms landing, a small lift into
 * pitch and bright major-chord overtones (octave, major third, fifth), so it reads as "yes, that's it" rather than
 * "begin". About 3 seconds. Built in the browser with Web Audio: no sound files.
 *
 * Usage: import { playDoneTone } from './doneTone';  playDoneTone(soundOn);
 * Pass the person's Play sounds setting; when it's off, nothing plays.
 */
let ctx: AudioContext | null = null;

export function playDoneTone(soundOn: boolean = true): void {
  if (!soundOn || typeof window === 'undefined') return;
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    const t0 = ctx.currentTime + 0.02;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2200; lp.Q.value = 0.3; lp.connect(ctx.destination);
    // [frequency Hz, relative level, decay seconds]
    const partials: Array<[number, number, number]> = [
      [196, 1, 3.2], [196.6, 0.45, 3.2], [392, 0.3, 2.4], [490, 0.2, 2], [588, 0.12, 1.6], [784, 0.05, 1.2],
    ];
    for (const [f, g, d] of partials) {
      const o = ctx.createOscillator(), v = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(f * 0.985, t0);
      o.frequency.exponentialRampToValueAtTime(f, t0 + 0.12);
      v.gain.setValueAtTime(0, t0);
      v.gain.linearRampToValueAtTime(0.065 * g, t0 + 0.025);
      v.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
      o.connect(v).connect(lp);
      o.start(t0); o.stop(t0 + d + 0.1);
    }
  } catch { /* audio unavailable: stay silent */ }
}
