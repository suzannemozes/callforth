/**
 * TimerPicture: the picture on the Make step, in the dawn-to-dusk colors.
 * Four kinds, chosen at random each time the timer starts (never the same twice in a row):
 *   'ring'  a ring that fills clockwise around the clock
 *   'sun'   a small sun crossing a low arc, leaving a colored trail (no clock inside)
 *   'fill'  a circle slowly filling from the bottom, like the breathing circle at the pace of the session
 *   'dots'  fifteen dots around the clock, lighting one after another
 *
 * Usage:
 *   const [kind] = useState(() => pickTimerPicture(lastKind));   // once per timer start; save it as lastKind
 *   <TimerPicture kind={kind} done={1 - secondsLeft / totalSeconds} clock="9:00" showClock={showNumbers} over={keptGoing} />
 *   (Show "9 min left" beneath it yourself, hidden when numbers are off, "Still going" after Keep going.)
 */
import type { CSSProperties } from 'react';

export type TimerPictureKind = 'ring' | 'sun' | 'fill' | 'dots';
export const TIMER_PICTURES: readonly TimerPictureKind[] = ['ring', 'sun', 'fill', 'dots'];

export function pickTimerPicture(last?: TimerPictureKind | null): TimerPictureKind {
  const opts = TIMER_PICTURES.filter(k => k !== last);
  return opts[Math.floor(Math.random() * opts.length)] ?? 'ring';
}

const DUSK: readonly [number, readonly [number, number, number]][] = [
  [0, [233, 211, 198]], [0.3, [227, 200, 146]], [0.55, [185, 196, 154]], [0.78, [141, 186, 176]], [1, [110, 159, 174]],
];
export function duskColor(p: number): string {
  const q = Math.max(0, Math.min(1, p));
  let k = 1;
  while (k < DUSK.length - 1 && (DUSK[k]?.[0] ?? 1) < q) k++;
  const [p0, c0] = DUSK[k - 1] ?? DUSK[0]!;
  const [p1, c1] = DUSK[k] ?? DUSK[DUSK.length - 1]!;
  const t = p1 === p0 ? 0 : (q - p0) / (p1 - p0);
  const mix = c0.map((v, i) => Math.round(v + ((c1[i] ?? v) - v) * t));
  return `rgb(${mix.join(',')})`;
}

const RING_MASK = 'radial-gradient(farthest-side, transparent calc(100% - 14px), #000 calc(100% - 13px))';
const wrap: CSSProperties = { position: 'relative', width: 'min(320px, 78vw)', aspectRatio: '1', margin: '0 auto', display: 'grid', placeItems: 'center' };

function sunPt(t: number): [number, number] {
  const W = 520, H = 190, a = Math.PI * (1 - t);
  return [W / 2 + (W / 2 - 20) * Math.cos(a), H - 10 - (H - 40) * Math.sin(a)];
}
const pts = (to: number, n: number) => Array.from({ length: n + 1 }, (_, i) => sunPt((to * i) / n).map(v => v.toFixed(1)).join(',')).join(' ');

export default function TimerPicture({ kind, done, clock, showClock, over = false, dark = false }: {
  kind: TimerPictureKind; done: number; clock: string; showClock: boolean; over?: boolean; dark?: boolean;
}) {
  const d = Math.max(0, Math.min(1, over ? 1 : done));
  const track = dark ? '#2A2825' : '#ECE8E1';
  const clockEl = (
    <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '3.6rem', letterSpacing: '.02em', position: 'relative', zIndex: 2,
      color: over ? '#8A5A2B' : undefined, visibility: showClock || over ? 'visible' : 'hidden' }}>{clock}</div>
  );
  const soften: CSSProperties = dark ? { filter: 'brightness(.85) saturate(.9)' } : {};

  if (kind === 'ring') {
    const ring: CSSProperties = { position: 'absolute', inset: 0, borderRadius: '50%', WebkitMaskImage: RING_MASK, maskImage: RING_MASK };
    const arc = `${RING_MASK}, conic-gradient(from -90deg, #000 ${d}turn, transparent ${d}turn)`;
    return (
      <div style={wrap} aria-hidden="true">
        <div style={{ ...ring, background: track }} />
        <div style={{ ...ring, ...soften, background: 'conic-gradient(from -90deg, #E9D3C6 0turn, #E3C892 .3turn, #B9C49A .55turn, #8DBAB0 .78turn, #6E9FAE 1turn)',
          WebkitMaskImage: arc, maskImage: arc, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' }} />
        {clockEl}
      </div>
    );
  }
  if (kind === 'fill') {
    return (
      <div style={wrap} aria-hidden="true">
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden', background: dark ? '#262523' : '#F7F3EE',
          border: `1px solid ${dark ? 'rgba(237,233,226,.2)' : 'rgba(28,28,28,.22)'}` }}>
          <div style={{ ...soften, position: 'absolute', left: '-10%', right: '-10%', bottom: 0, height: `${d * 100}%`, background: duskColor(d),
            transition: 'height 1s linear, background-color 2s linear', borderTopLeftRadius: '50% 10px', borderTopRightRadius: '50% 10px' }} />
        </div>
        {clockEl}
      </div>
    );
  }
  if (kind === 'dots') {
    const lit = Math.round(d * 15);
    return (
      <div style={wrap} aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => {
          const a = -Math.PI / 2 + (2 * Math.PI * i) / 15;
          return <i key={i} style={{ ...soften, position: 'absolute', width: 16, height: 16, margin: -8, borderRadius: '50%',
            left: `${50 + 44 * Math.cos(a)}%`, top: `${50 + 44 * Math.sin(a)}%`, transition: 'background-color 1.2s ease',
            background: i < lit ? duskColor(i / 14) : (dark ? '#3B3834' : '#E5E0D8') }} />;
        })}
        {clockEl}
      </div>
    );
  }
  // sun
  const [x, y] = sunPt(d);
  return (
    <svg viewBox="0 0 520 200" aria-hidden="true" style={{ ...soften, width: 'min(520px, 92vw)', margin: '0 auto', display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="tp-dd" gradientUnits="userSpaceOnUse" x1="20" x2="500">
          <stop offset="0" stopColor="#E9D3C6" /><stop offset=".3" stopColor="#E3C892" /><stop offset=".55" stopColor="#B9C49A" />
          <stop offset=".78" stopColor="#8DBAB0" /><stop offset="1" stopColor="#6E9FAE" />
        </linearGradient>
        <radialGradient id="tp-glow"><stop offset="0" stopColor="#E3C892" stopOpacity=".55" /><stop offset="1" stopColor="#E3C892" stopOpacity="0" /></radialGradient>
      </defs>
      <line x1="0" y1="180" x2="520" y2="180" stroke="#D8D2C7" />
      <polyline points={pts(1, 60)} fill="none" stroke="#D8D2C7" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
      <polyline points={pts(d, 40)} fill="none" stroke="url(#tp-dd)" strokeWidth="3" strokeLinecap="round" />
      <circle cx={x} cy={y} r="46" fill="url(#tp-glow)" />
      <circle cx={x} cy={y} r="17" fill={duskColor(d)} />
    </svg>
  );
}
