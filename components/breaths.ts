/**
 * Call Forth breaths: the exact words, timings and chimes from prototype/index.html.
 * Merge these into src/lib/content.ts (keep your existing field names; add rounds, pattern and chime
 * if they are missing). BreathCircle reads rounds, pattern and chime from content.ts.
 * Coherent breathing, Alternate nostril and Somatic release are kept for later and are not listed here.
 */
export type ChimeName = 'terra' | 'aqua' | 'aria' | 'ignis';

export const BREATHS = {
  box: {
    name: "Box breath",
    rounds: 4,
    pattern: [['In',4],['Hold',4],['Out',4],['Hold',4]] as const,
    chime: 'aria' as ChimeName,
    how: "In for four. Hold for four. Out for four. Hold, empty, for four. Four rounds.",
    why: "When your head is full of chatter, a steady, even rhythm gives your attention one simple thing to hold. Slow, paced breathing is linked to a calmer heart rate and a more settled nervous system, which clears room for the work.",
    src: "Source: Zaccaro et al. (2018), \"How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing,\" Frontiers in Human Neuroscience.",
  },
  vagal: {
    name: "Vagal nerve breath",
    rounds: 5,
    pattern: [['In',4],['Sip',2],['Out',8]] as const,
    chime: 'terra' as ChimeName,
    how: "Breathe in through your nose for four, then take a second short sip of air on top for two. Let it all out slowly through your mouth for eight, as a long sigh. Five times.",
    why: "This double inhale with a long exhale, sometimes called the physiological sigh, is the quickest brake on a freeze. In a 2023 Stanford study, five minutes a day of this breathing (called cyclic sighing) improved mood more than mindfulness meditation did.",
    src: "Source: Balban et al. (2023), \"Brief structured respiration practices enhance mood and reduce physiological arousal,\" Cell Reports Medicine.",
  },
  lion: {
    name: "Lion's breath",
    rounds: 4,
    pattern: [['In',4],['Haaa',7]] as const,
    chime: 'ignis' as ChimeName,
    how: "Breathe in deeply through your nose for four. Then open your mouth wide, stick your tongue out toward your chin, and breathe out with a long, loud \"haaa\" for seven. Four times. Yes, you will feel silly. That is the point.",
    why: "\"I'm not a real artist\" lives in the body as a tight jaw, a held face, a closed throat. Lion's breath releases all three on purpose, and feeling a little ridiculous loosens the grip of self-consciousness. It comes from yoga, and there is little formal research on it, so we offer it as a release, not a cure.",
    src: "Tradition: Simhasana (yoga). [Suz to add a source she trusts.]",
  },
  bee: {
    name: "Bumble bee hum",
    rounds: 5,
    pattern: [['In',4],['Hum',7]] as const,
    chime: 'aqua' as ChimeName,
    how: "Close your eyes. Gently press the soft flap of each ear closed with your index fingers. Breathe in through your nose for four, then hum low and steady as you breathe out for seven. Five times.",
    why: "Humming makes your exhale long and slow, and the vibration gives your mind something to listen to besides the critic. Humming also raises nitric oxide in the nose many times over compared with quiet breathing.",
    src: "Tradition: Bhramari pranayama (yoga). Source: Weitzberg & Lundberg (2002), \"Humming greatly increases nasal nitric oxide,\" American Journal of Respiratory and Critical Care Medicine.",
  },
  four78: {
    name: "4-7-8 breathing",
    rounds: 4,
    pattern: [['In',4],['Hold',7],['Out',8]] as const,
    chime: 'aqua' as ChimeName,
    how: "Breathe in quietly through your nose for four. Hold gently at the top for seven. Breathe out slowly through your mouth for eight. Four rounds.",
    why: "A relaxation pattern that pairs a four-second inhale with a seven-second hold and an eight-second exhale. It supports settling and self-regulation. Research on this exact pattern is still small: one study found it improved heart rate variability and blood pressure in healthy young adults, while another found plain slow breathing helped more. We offer it as a way to settle, not a cure.",
    src: "Taught by the Andrew Weil Center for Integrative Medicine. Sources: Vierra et al. (2022), \"Effects of sleep deprivation and 4-7-8 breathing control on heart rate variability, blood pressure, blood glucose, and endothelial function in healthy young adults,\" Physiological Reports. Appl Psychophysiol Biofeedback (2025), \"Comparing the effects of square, 4-7-8, and 6 breaths-per-minute breathing conditions on heart rate variability, CO2 levels, and mood.\"",
  },
  belly: {
    name: "Diaphragmatic breathing",
    rounds: 6,
    pattern: [['In',4],['Out',6]] as const,
    chime: 'terra' as ChimeName,
    how: "Rest one hand on your chest and one on your belly. Breathe in slowly through your nose for four, so your belly rises and your chest stays still. Let your belly fall as you breathe out for six. Six rounds.",
    why: "A systematic review found diaphragmatic breathing reduces both the physical and psychological signs of stress in adults, though it drew on only three studies. A single trial adds signals for steadier attention, better mood and lower cortisol, and broader breathwork research shows a small-to-medium drop in stress. It suits everyday stress, anxiety, restlessness or a busy mind.",
    src: "Sources: Hopper et al. (2019), \"Effectiveness of diaphragmatic breathing for reducing physiological and psychological stress in adults: a quantitative systematic review,\" JBI Database of Systematic Reviews. Ma et al. (2017), \"The effect of diaphragmatic breathing on attention, negative affect and stress in healthy adults,\" Frontiers in Psychology. Fincham et al. (2023), \"Effect of breathwork on stress and mental health: a meta-analysis of randomised-controlled trials,\" Scientific Reports.",
  },
  exhale: {
    name: "Extended exhale",
    rounds: 5,
    pattern: [['In',4],['Out',8]] as const,
    chime: 'aqua' as ChimeName,
    how: "Breathe in through your nose for four. Breathe out slowly, through your nose or softly through your mouth, for eight, twice as long as the in-breath. Five rounds.",
    why: "A slow-breathing practice in which the out-breath is deliberately longer than the in-breath, here twice as long. In studies, a longer exhale shifted heart rate variability toward the body's rest-and-recover side, though results vary from study to study. It is a portable way to settle when you feel stressed, anxious or keyed up.",
    src: "Sources: Bae et al. (2021), \"Increased exhalation to inhalation ratio during breathing enhances high-frequency heart rate variability in healthy adults,\" Psychophysiology. Van Diest et al. (2014), \"Inhalation/exhalation ratio modulates the effect of slow breathing on heart rate variability and relaxation,\" Applied Psychophysiology and Biofeedback.",
  },
  pursed: {
    name: "Pursed-lip breathing",
    rounds: 10,
    pattern: [['In',2],['Out',4]] as const,
    chime: 'aria' as ChimeName,
    how: "Breathe in gently through your nose for two. Purse your lips as if blowing out a candle, and breathe out slowly and steadily for four. Ten rounds.",
    why: "You breathe in gently through the nose and out slowly through pursed lips, which creates a light back-pressure that lengthens the exhale and slows your breathing. It is best studied for breathlessness, where it lowers breathing rate, and people who feel wound up or short of breath from stress may find the longer exhale helpful too. A longer out-breath is linked to more activity in the vagus nerve, the main channel of the body's rest-and-recover system.",
    src: "Sources: European Respiratory Review (2024), \"Breathing techniques to reduce symptoms in people with serious respiratory illness: a systematic review.\" Bae et al. (2021), Psychophysiology.",
  },
};

/** Suggested breath for each block (the block ids in your content.ts may differ: match by the block text). */
export const BLOCK_BREATH = {
  "I'd rather pull my teeth out": 'box',
  "I'm afraid of the white, blank space": 'vagal',
  "I don't know what comes next": 'exhale',
  "I'm not a real artist": 'bee',
  "I'm not in the mood": 'lion',
  "I'm exhausted": 'belly',
  "I'm overstimulated": 'four78',
  "I'm understimulated": 'lion',
  "My inner critic is too loud": 'pursed', // later door, not shown yet
};

/** Studio members only: two other breaths offered for each block ("Prefer a different breath?"). [Suz to confirm]
 *  If a member's learned breath is showing instead of the block's own, offer the block's own breath first. */
export const ALT_BREATHS = {
  "I'd rather pull my teeth out": ['exhale', 'belly'],
  "I'm afraid of the white, blank space": ['exhale', 'box'],
  "I don't know what comes next": ['box', 'vagal'],
  "I'm not a real artist": ['lion', 'pursed'],
  "I'm not in the mood": ['bee', 'box'],
  "I'm exhausted": ['lion', 'box'],
  "I'm overstimulated": ['bee', 'exhale'],
  "I'm understimulated": ['bee', 'box'],
};

/** One short line for each breath on its choice card. */
export const ALT_LINE = {
  box: 'In 4, hold 4, out 4, hold 4. Steady and even.',
  vagal: 'In, a sip more, then a long sigh out.',
  lion: 'In, then a big "haaa." Shakes it loose.',
  bee: 'In, then a low hum out. Quiets the noise.',
  four78: 'In 4, hold 7, out 8. Deeply settling.',
  belly: 'In 4, out 6. Slow and low, into the belly.',
  exhale: 'In 4, out 8. Settles a keyed-up body.',
  pursed: 'In 2, out 4 through pursed lips. Slows things down.',
};
