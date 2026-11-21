# Ready-made components

Finished, tested code for parts of Call Forth that are hard to rebuild from a description. Copy them into the app as they are.

## BreathCircle (the Breathe step)

- `BreathCircle.tsx`: the breathing circle, 3-2-1 countdown, rounds, dawn-to-dusk colors, progress bar, Pause / Begin again, Skip.
- `koshi.ts`: the Koshi chime that plays as the countdown begins (Web Audio, no sound files).

Copy both into `src/components/`, then use it on the Breathe step:

```tsx
import BreathCircle from './components/BreathCircle';

<BreathCircle breath={breathId} onComplete={() => goToStep('move')} onSkip={() => goToStep('move')} />
```

`breath` is one of `'box' | 'vagal' | 'lion' | 'bee'`. The breath's name, how-to and "Why this works" text stay in the app's content file and sit above the component, as in the prototype. Remount it (for example with `key={sessionId}`) to restart for a new session.

It needs React 18+ and nothing else. It passes TypeScript with `strict`, `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`. The buttons use the app's existing `btn` and `quiet` classes.
