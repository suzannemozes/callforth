/**
 * Koshi chimes for Call Forth, made with the Web Audio API (no sound files).
 * Each breath opens with its own chime, an octave below the real Koshi chime:
 *   Box breath -> Aria (air) · Vagal nerve breath -> Terra (earth)
 *   Lion's breath -> Ignis (fire) · Bumble bee hum -> Aqua (water)
 * Eight steel-rod notes per chime; a soft pass of five notes over about two seconds,
 * ringing out by about 3.5 seconds, so it fills the 3-2-1 countdown.
 */
export type ChimeName = 'terra' | 'aqua' | 'aria' | 'ignis';

const KOSHI: Record<ChimeName, number[]> = {
  terra: [196.0, 261.6, 329.6, 349.2, 392.0, 523.3, 659.3, 784.0], // G C E F G C E G
  aqua:  [220.0, 293.7, 349.2, 392.0, 440.0, 587.3, 698.5, 880.0], // A D F G A D F A
  aria:  [220.0, 261.6, 329.6, 440.0, 493.9, 523.3, 659.3, 987.8], // A C E A B C E B
  ignis: [196.0, 246.9, 293.7, 392.0, 493.9, 587.3, 784.0, 880.0], // G B D G B D G A
};

// [seconds after start, rod index, velocity]
const PATTERN: Array<[number, number, number]> = [[0, 1, 0.9], [0.38, 3, 0.75], [0.8, 2, 0.7], [1.3, 5, 0.6], [1.85, 4, 0.5]];
// [frequency ratio, gain, decay factor] for a struck steel rod
const PARTIALS: Array<[number, number, number]> = [[1, 1, 1], [1.0018, 0.35, 1], [2.756, 0.2, 0.45], [5.404, 0.05, 0.22]];

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function playKoshi(chime: ChimeName, volume = 0.045): void {
  const ac = audio();
  if (!ac) return;
  const rods = KOSHI[chime];
  const lp = ac.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 4200;
  lp.Q.value = 0.3;
  lp.connect(ac.destination);
  // a little room: three short echoes
  for (const [d, g] of [[0.023, 0.2], [0.041, 0.14], [0.067, 0.09]] as Array<[number, number]>) {
    const delay = ac.createDelay();
    delay.delayTime.value = d;
    const gain = ac.createGain();
    gain.gain.value = g;
    lp.connect(delay).connect(gain).connect(ac.destination);
  }
  for (const [at, rod, vel] of PATTERN) {
    const t0 = ac.currentTime + 0.03 + at;
    for (const [ratio, g, decay] of PARTIALS) {
      const osc = ac.createOscillator();
      const env = ac.createGain();
      osc.type = 'sine';
      osc.frequency.value = (rods[rod] ?? rods[0] ?? 220) * ratio;
      env.gain.setValueAtTime(0, t0);
      env.gain.linearRampToValueAtTime(volume * vel * g, t0 + 0.004);
      env.gain.exponentialRampToValueAtTime(0.0001, t0 + 3 * decay + 0.004);
      osc.connect(env).connect(lp);
      osc.start(t0);
      osc.stop(t0 + 3 * decay + 0.05);
    }
  }
}
