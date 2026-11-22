# Ready-made components

Finished, tested code for parts of Call Forth that are hard to rebuild from a description. Copy them into the app as they are.

## BreathCircle (the Breathe step)

- `BreathCircle.tsx`: the breathing circle, 3-2-1 countdown, rounds, dawn-to-dusk colors, progress bar, Pause / Begin again, Skip.
- `koshi.ts`: the Koshi chime that plays as the countdown begins (Web Audio, no sound files).

Copy both into `src/components/`, then use it on the Breathe step:

Every breath's timing lives in the app's content file, `src/lib/content.ts`, next to its name, how-to, "Why this works" and sources. Each breath there has `rounds`, `pattern` and `chime`:

```ts
vagal: { name: 'Vagal nerve breath', rounds: 5, pattern: [['In', 4], ['Sip', 2], ['Out', 8]], chime: 'terra', /* how, why, src */ },
```

The component reads them from there:

```tsx
import BreathCircle from './components/BreathCircle';
import { BREATHS } from '../lib/content';

const br = BREATHS[breathId];
<BreathCircle key={`${sessionId}-${breathId}`} timing={{ rounds: br.rounds, pattern: br.pattern, chime: br.chime }}
  onComplete={() => goToStep('move')} onSkip={() => goToStep('move')} />
```

So changing a count, adding a round or adding a new breath means editing `content.ts` only. Pattern words: `In` grows the circle, `Sip` grows it a touch more, `Hold` keeps it still, anything else (`Out`, `Haaa`, `Hum`) shrinks it. `chime` is one of `'terra' | 'aqua' | 'aria' | 'ignis'`. Give it a new `key` to restart it for a new session or breath; it ignores ordinary re-renders, so it never restarts mid-breath. `PROTOTYPE_TIMINGS` in the file is a reference copy of the prototype's timings, for checking only.

It needs React 18+ and nothing else. It passes TypeScript with `strict`, `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. The buttons use the app's existing `btn` and `quiet` classes.

## TimerPicture.tsx

The picture on the Make step: one of four (ring, sun, rising fill, one dot at a time), chosen at random each time a timer starts, never the same twice in a row. Copy it exactly as it is.

```tsx
import TimerPicture, { pickTimerPicture } from './components/TimerPicture';
const kind = pickTimerPicture(lastKind);   // when the timer starts; save it as lastKind
<TimerPicture kind={kind} done={1 - secondsLeft / totalSeconds} clock="9:00" showClock={showNumbers} over={keptGoing} dark={darkRoom} />
```

Show "9 min left" beneath it (hidden when numbers are off; "Still going" after Keep going). It has no sound and needs no other files.
