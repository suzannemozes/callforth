/**
 * WarmupTimer: the five-minute warm-up on the Your move step. Livelier than the calm timer pictures:
 * a thick ochre-to-clay ring that empties over five minutes, a slowly turning dashed rim, a small pulse
 * each second, and its own start and end tones (a rising spark, built in the browser, no sound files).
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
export function sparkTone(kind: 'start' | 'end'): void {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new AC();
    const notes = kind === 'end' ? [659.3, 830.6, 987.8, 1318.5] : [523.3, 659.3, 784];
    notes.forEach((f, i) => {
      const t0 = ctx!.currentTime + i * (kind === 'end' ? 0.14 : 0.11);
      const dur = kind === 'end' ? 1.6 : 0.7;
      ([[1, 0.5], [3.01, 0.12], [5.2, 0.04]] as const).forEach(([mult, amp]) => {
        const o = ctx!.createOscillator(), g = ctx!.createGain();
        o.type = 'sine'; o.frequency.value = f * mult;
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.05 * amp, t0 + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(ctx!.destination); o.start(t0); o.stop(t0 + dur + 0.05);
      });
    });
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
