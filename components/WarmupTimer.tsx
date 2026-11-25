/**
 * WarmupTimer: the five-minute warm-up on the Your move step. Livelier than the calm timer pictures:
 * a thick ochre-to-clay ring that empties over five minutes, a slowly turning dashed rim, a small pulse
 * each second, and its own start and end tones (the timer's singing bowl, a fifth higher; no sound files).
 *
 * Usage (mount it when the person taps "I need a five-minute warm-up"; it starts at once):
 *   <WarmupTimer sound={soundOn} dark={darkRoom} onDone={() => track('warmup_finished')}
 *     onAutoStart={() => { track('warmup_auto_start'); beginMaking(); }} />
 * It counts down 5:00, plays the end tone, shows "Warmed up" with "Your work block starts in 30 seconds",
 * then calls onAutoStart. Unmounting it (e.g. "I'm ready to start working") stops everything.
 * To keep the same clock running on the Something else page, pass the same startedAt to both copies.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';

export const WARMUP_SECONDS = 300;
export const WARMUP_HANDOVER_SECONDS = 30;
const CIRC = 2 * Math.PI * 78; // 490.1

let ctx: AudioContext | null = null;
/** The warm-up's tones: the same singing bowl as the work timer, a fifth higher (330 Hz), so they belong to the
 *  same family but mark the warm-up. Start: one strike. End: two strikes, 1.2 seconds apart. No sound files. */
export function sparkTone(kind: 'start' | 'end'): void {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    const c = ctx;
    const strike = (when: number, vol: number) => {
      const t0 = c.currentTime + when, lp = c.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 1400; lp.Q.value = 0.3; lp.connect(c.destination);
      ([[220, 1], [220.7, 0.6], [556, 0.22], [557.1, 0.15], [1017, 0.05]] as const).forEach(([f, g]) => {
        const o = c.createOscillator(), v = c.createGain();
        o.type = 'sine'; o.frequency.value = f * 1.5;
        v.gain.setValueAtTime(0, t0); v.gain.linearRampToValueAtTime(vol * g, t0 + 0.18);
        v.gain.exponentialRampToValueAtTime(0.0001, t0 + 5.5);
        o.connect(v).connect(lp); o.start(t0); o.stop(t0 + 5.7);
      });
    };
    if (kind === 'end') { strike(0, 0.04); strike(1.2, 0.03); } else strike(0, 0.045);
  } catch { /* sound is optional */ }
}

const STYLE_ID = 'warmup-timer-style';
const CSS = `
@keyframes wu-spin { to { transform: rotate(360deg); } }
@keyframes wu-beat { 0% { transform: scale(1); } 30% { transform: scale(1.035); } 100% { transform: scale(1); } }
.wu-rim { transform-origin: 100px 100px; animation: wu-spin 14s linear infinite; }
.wu-beat { animation: wu-beat .5s ease-out; }
@media (prefers-reduced-motion: reduce) { .wu-rim, .wu-beat { animation: none !important; } }`;

export default function WarmupTimer({ sound = true, dark = false, startedAt, onDone, onAutoStart }: {
  sound?: boolean; dark?: boolean; startedAt?: number; onDone?: () => void; onAutoStart?: () => void;
}) {
  const [start] = useState(() => startedAt ?? Date.now());
  const [now, setNow] = useState(() => Date.now());
  const fired = useRef({ start: false, end: false, auto: false });
  const doneRef = useRef(onDone); doneRef.current = onDone;
  const autoRef = useRef(onAutoStart); autoRef.current = onAutoStart;

  useEffect(() => {
    if (!document.getElementById(STYLE_ID)) {
      const s = document.createElement('style'); s.id = STYLE_ID; s.textContent = CSS; document.head.appendChild(s);
    }
    if (!fired.current.start && startedAt === undefined) { fired.current.start = true; if (sound) sparkTone('start'); }
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const elapsed = Math.floor((now - start) / 1000);
  const left = Math.max(0, WARMUP_SECONDS - elapsed);
  const done = left === 0;
  const after = Math.max(0, WARMUP_HANDOVER_SECONDS - (elapsed - WARMUP_SECONDS));

  useEffect(() => {
    if (done && !fired.current.end) { fired.current.end = true; if (sound) sparkTone('end'); doneRef.current?.(); }
    if (done && after === 0 && !fired.current.auto) { fired.current.auto = true; autoRef.current?.(); }
  }, [done, after, sound]);

  const m = Math.floor(left / 60), s = left % 60;
  const clay = dark ? '#E0A07A' : '#B5654A';
  const wrap: CSSProperties = { position: 'relative', width: 'min(210px, 56vw)', aspectRatio: '1', margin: '0 auto', display: 'grid', placeItems: 'center' };
  return (
    <div style={{ textAlign: 'center', margin: '0 0 18px' }}>
      <div key={done ? 'done' : left} className={done ? '' : 'wu-beat'} style={wrap} aria-hidden="true">
        <svg viewBox="0 0 200 200" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <linearGradient id="wu-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#E3A04F" /><stop offset=".55" stopColor="#D2794A" /><stop offset="1" stopColor="#B5654A" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" className={done ? '' : 'wu-rim'} fill="none" stroke="#E3A04F" strokeWidth="3" strokeDasharray="3 9" strokeLinecap="round" opacity=".8" />
          <circle cx="100" cy="100" r="78" fill="none" stroke={dark ? '#3B3430' : '#F1E2CC'} strokeWidth="16" />
          <circle cx="100" cy="100" r="78" fill="none" stroke="url(#wu-g)" strokeWidth="16" strokeLinecap="round" transform="rotate(-90 100 100)"
            strokeDasharray={CIRC} strokeDashoffset={(CIRC * left) / WARMUP_SECONDS} style={{ transition: 'stroke-dashoffset 1s linear' }} />
        </svg>
        <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 500, position: 'relative', color: clay,
          fontSize: done ? '1.05rem' : 'clamp(2.6rem, 9vw, 3.4rem)', letterSpacing: done ? '.14em' : '.04em', textTransform: done ? 'uppercase' : 'none' }}>
          {done ? 'Warmed up' : `${m}:${String(s).padStart(2, '0')}`}
        </div>
      </div>
      <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: clay, margin: '12px 0 0' }}>
        {done ? `Your work block starts in ${after} seconds` : 'Five-minute warm-up'}
      </p>
    </div>
  );
}
