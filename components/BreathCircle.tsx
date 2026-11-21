/**
 * BreathCircle: the Breathe step of Call Forth, as one self-contained React component.
 *
 * What it does (matches prototype/index.html):
 * - On mount: a 3-2-1 countdown shown large inside the circle, with "Breathing with you in 3…",
 *   and the breath's Koshi chime plays as the countdown begins.
 * - Then the breath runs by itself: the circle grows on "In", grows a touch more on "Sip",
 *   stays put on "Hold", and shrinks on "Out" / "Haaa" / "Hum". Each phase eases over its own length.
 * - The circle's color moves along the dawn-to-dusk palette as the rounds go by
 *   (blush -> ochre -> sage -> teal -> dusk blue), lit softly from the upper left.
 * - A small progress bar in the same palette fills one step per round; "Round N done" below.
 * - Main button: "Pause" (during the countdown or breath), then "Begin again" (replays the chime and restarts).
 * - When all rounds are done it shows "Done" and calls onComplete() after 1.2s.
 * - Reduced motion: no growing or shrinking, the words and colors still guide the breath.
 *
 * Usage:
 *   <BreathCircle breath="box" onComplete={() => goToStep('move')} onSkip={() => goToStep('move')} />
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { playKoshi, type ChimeName } from './koshi';

export type BreathId = 'box' | 'vagal' | 'lion' | 'bee';

type Phase = [word: string, seconds: number];
interface Breath { rounds: number; pattern: Phase[]; chime: ChimeName }

export const BREATH_PATTERNS: Record<BreathId, Breath> = {
  box:   { rounds: 4, pattern: [['In', 4], ['Hold', 4], ['Out', 4], ['Hold', 4]], chime: 'aria' },
  vagal: { rounds: 5, pattern: [['In', 2], ['Sip', 1], ['Out', 6]],              chime: 'terra' },
  lion:  { rounds: 4, pattern: [['In', 4], ['Haaa', 3]],                          chime: 'ignis' },
  bee:   { rounds: 5, pattern: [['In', 4], ['Hum', 8]],                           chime: 'aqua' },
};

const DUSK: Array<[number, [number, number, number]]> = [
  [0, [233, 211, 198]], [0.3, [227, 200, 146]], [0.55, [185, 196, 154]], [0.78, [141, 186, 176]], [1, [110, 159, 174]],
];
function duskColor(p: number): string {
  const x = Math.max(0, Math.min(1, p));
  let k = 1;
  while (k < DUSK.length - 1 && (DUSK[k]?.[0] ?? 1) < x) k++;
  const lo = DUSK[k - 1] ?? DUSK[0]!;
  const hi = DUSK[k] ?? lo;
  const [p0, c0] = lo;
  const [p1, c1] = hi;
  const f = (x - p0) / (p1 - p0 || 1);
  const mix = (a: number, z: number) => Math.round(a + (z - a) * f);
  return `rgb(${mix(c0[0], c1[0])},${mix(c0[1], c1[1])},${mix(c0[2], c1[2])})`;
}

const SMALL = 0.6, BIG = 0.95, SIP = 1.05;

export default function BreathCircle({ breath, onComplete, onSkip }: {
  breath: BreathId;
  onComplete: () => void;
  onSkip?: () => void;
}) {
  const b = BREATH_PATTERNS[breath] ?? BREATH_PATTERNS.box;
  const [mode, setMode] = useState<'counting' | 'breathing' | 'paused' | 'done'>('counting');
  const [count, setCount] = useState(3);
  const [word, setWord] = useState('3');
  const [scale, setScale] = useState(SMALL);
  const [ease, setEase] = useState(0.4);
  const [color, setColor] = useState('#EFE3DA');
  const [rounds, setRounds] = useState(0);
  const timer = useRef<number | undefined>(undefined);
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const clear = () => { if (timer.current !== undefined) window.clearTimeout(timer.current); timer.current = undefined; };

  const runBreath = useCallback(() => {
    setMode('breathing');
    let i = 0, r = 0, current = SMALL;
    const tick = () => {
      const [w, secs] = b.pattern[i] ?? ['Out', 4];
      setWord(w);
      setEase(secs);
      setColor(duskColor((r + i / b.pattern.length) / b.rounds));
      if (w === 'Sip') current = SIP;
      else if (w.startsWith('In')) current = BIG;
      else if (w !== 'Hold') current = SMALL;
      setScale(current);
      i = (i + 1) % b.pattern.length;
      if (i === 0) { r += 1; setRounds(r); }
      if (r >= b.rounds) {
        timer.current = window.setTimeout(() => {
          setMode('done'); setWord('Done');
          timer.current = window.setTimeout(onComplete, 1200);
        }, secs * 1000);
        return;
      }
      timer.current = window.setTimeout(tick, secs * 1000);
    };
    tick();
  }, [b, onComplete]);

  const startCountdown = useCallback(() => {
    clear();
    setMode('counting'); setRounds(0); setScale(SMALL); setEase(0.4); setColor('#EFE3DA');
    let n = 3;
    setCount(n); setWord(String(n));
    playKoshi(b.chime);
    const step = () => {
      n -= 1;
      if (n > 0) { setCount(n); setWord(String(n)); timer.current = window.setTimeout(step, 1000); return; }
      runBreath();
    };
    timer.current = window.setTimeout(step, 1000);
  }, [b, runBreath]);

  useEffect(() => { startCountdown(); return clear; }, [startCountdown]);

  const onMain = () => {
    if (mode === 'counting' || mode === 'breathing') { clear(); setMode('paused'); setWord('Ready'); setScale(SMALL); setEase(0.4); return; }
    if (mode === 'paused') startCountdown();
  };

  const isCount = mode === 'counting';
  const total = b.rounds;
  const status = isCount ? `Breathing with you in ${count}…`
    : mode === 'paused' ? 'Paused'
    : mode === 'done' ? 'Done'
    : rounds > 0 ? `Round ${rounds} done` : 'About 60 to 90 seconds';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, margin: '24px 0' }}>
      <div
        aria-live="polite"
        style={{
          width: 200, height: 200, borderRadius: '50%',
          border: '1px solid rgba(28,28,28,.35)',
          backgroundColor: color,
          backgroundImage: 'radial-gradient(circle at 38% 32%, rgba(255,255,255,.55), rgba(255,255,255,0) 62%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: reduced ? 'none' : `scale(${scale})`,
          transition: `transform ${ease}s ease-in-out, background-color ${ease}s ease-in-out`,
        }}
      >
        <span style={isCount
          ? { fontFamily: '"Playfair Display", serif', fontSize: '3.4rem', lineHeight: 1, color: '#1C1C1C' }
          : { fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', letterSpacing: '.16em', fontSize: '.72rem', color: '#1C1C1C' }}>
          {word}
        </span>
      </div>

      <div style={{ width: 200, height: 6, background: '#ECE8E1', border: '1px solid #D8D2C7', position: 'relative', overflow: 'hidden' }}>
        <span style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(rounds / total) * 100}%`, transition: 'width .6s',
          background: 'linear-gradient(90deg,#E9D3C6 0%,#E3C892 30%,#B9C49A 55%,#8DBAB0 78%,#6E9FAE 100%)',
          backgroundSize: '200px 100%', backgroundRepeat: 'no-repeat',
        }} />
      </div>
      <div style={{ fontStyle: 'italic', color: '#6B655D' }}>{status}</div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 6 }}>
        {mode !== 'done' && (
          <button type="button" className="btn" onClick={onMain}>
            {mode === 'paused' ? 'Begin again' : 'Pause'}
          </button>
        )}
        {onSkip && mode !== 'done' && (
          <button type="button" className="quiet" onClick={() => { clear(); onSkip(); }}>Skip to my move →</button>
        )}
      </div>
    </div>
  );
}
