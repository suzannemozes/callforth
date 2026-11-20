# Call Forth: AI Studio build prompts

Use these in Google AI Studio, Build mode, in order. Paste one phase, let it finish, check it against the screenshots, then paste the next. Don't paste the smaller change prompts from our chat: everything in them is already included here and in the prototype.

Everything lives in the repository https://github.com/suzannemozes/callforth:
- **prototype/index.html** (the working prototype: the exact look, words and behavior)
- **docs/App Brief.md** (every screen, rule and event, in writing)
- **docs/Phase 1 paste-in.txt** (the Phase 1 prompt plus the App Brief, for tools that only take pasted text)
- **screenshots/** (14 key phone screens, in order)

Give AI Studio the repository link, or attach the prototype and App Brief with the + (Add files) button.

If AI Studio won't take the HTML file, use "Import from GitHub" in the same + menu instead (Claude can put the prototype in a GitHub repository for you).

**If only images can be uploaded (as in FEA Create):** skip the Phase 1 prompt below. Instead, upload the 14 images from screenshots/, then paste the whole of docs/Phase 1 paste-in.txt (the Phase 1 prompt plus the full App Brief). After the first build, for an exact match, open the Code tab, create a file called reference/prototype.html, paste in the contents of prototype/index.html, and ask: "Compare the app with reference/prototype.html and match its design, wording and behavior exactly, screen by screen." Then continue with Phase 2.

---

## Phase 1: Rebuild the app from the prototype (no accounts or payments yet)

```
Build "Call Forth", a web app for creators (writers, artists, musicians, makers) that gets them from blocked to making in under two minutes.

Use the repository https://github.com/suzannemozes/callforth.
1) "prototype/index.html" is a complete working prototype. Treat it as the source of truth for design, wording, layout, animation and behavior. Recreate it faithfully as a React app: same screens, same text, same colors, fonts, spacing, buttons, animations and logic. Do not redesign, rename, add or remove anything.
2) "docs/App Brief.md" is the written App Brief: every screen, rule and tracked event. Where the prototype and the brief differ, follow the prototype.

Ignore the dashed "Preview: jump to screen" panel in the prototype. It's a testing tool, not part of the app. Keep it only as a hidden developer panel that shows when the URL has ?preview.

For this first phase:
- Store everything on the device for now (local storage): the user's profile, sessions, settings, studio hours and the events list. Structure the data so it can move to a real database later: a "users" record, a "sessions" list and an "events" list, matching the brief.
- Keep the sample content (prompts, breaths, "something else" options, greetings, questions, Daily light lines) in one separate content file so I can edit the words without touching code.
- Keep "Free" vs "Studio" as a simple switch for now (no payment yet).
- Make it look and work well on phones first, and on computers.

Brand: Gallery white #F4F2EE, white cards, stone #D8D2C7 hairlines, bronze #8A5A2B labels, charcoal #1C1C1C text and buttons, Gallery red #C9332A only for the dot after "Call Forth". Playfair Display headings, EB Garamond body, Oswald small uppercase labels (Google Fonts). No emojis, US spelling.
```

**Check before moving on:** walk through Sign in → Registration → Home → a session (countdown, breath, "Get your work open first", your move, timer, log, Daily light). Compare with the screenshots. To fix anything, use AI Studio's annotation mode (highlight the part and describe the change) or say: "Compare this screen with the prototype and match it exactly."

---

## Phase 2: Real sign-in and saving

```
Add real accounts and storage.
- Sign-in by emailed magic link (no passwords). Button text: "Email me a sign-in link". Keep users signed in on their device, so returning users open straight to Home.
- Move all stored data from local storage to a real database (Firebase Authentication and Cloud Firestore are fine): users, sessions and events, matching the brief's "What it saves for each person" and "Usage history (database)" sections.
- Never store the text people write in their log inside the events table. Their log text belongs only in their own sessions.
- Add a short privacy note page linked from the registration screen, and a way for a user to ask for all their data to be deleted.
- Make the Insights screen visible only to the owner account (my email: [your email]).
```

---

## Phase 3: The $27 studio upgrade

```
Add payment for the full studio with Stripe Checkout.
- One-time payment, $27, labeled "Founding member, lifetime access". After the first [100] founding members, the price becomes $47 automatically.
- On successful payment, mark the user as a studio member in the database and show the "Welcome to the full studio" message.
- Keep the Stripe secret key in AI Studio's Secrets settings, never in front-end code.
- Track the "upgraded" event with the price paid.
```

---

## Phase 4: Studio hours (calendar and email reminders)

```
Make studio hours fully work, as described in the brief (screen 9b).
- "Add to Google Calendar": open Google's add-event link with the weekly repeat rule, title "Call Forth: make the thing", and the start link as the first line of the description.
- "Add to Apple Calendar" and "Add to Outlook": download an .ics file with the weekly repeat, the start link, the user's time zone, and a reminder at the start time.
- The start link (?start=1&len=[minutes]) opens Home with the greeting "The studio is open, [name]", the question "What's in the way today?", and the timer set to the booked length.
- Email backup: at the start time of each scheduled session, email members who left the switch on. Subject and body: "Are you ready to practice? Tap to begin." with the start link. Use Resend (or Postmark) and keep the API key in Secrets.
- Track hours_set, hours_removed, scheduled_slot and scheduled_open (calendar or email).
```

---

## Phase 5: Finishing touches and launch

```
Final polish before launch.
- Make it an installable web app (manifest, icons, offline caching) so it opens like an app from the phone's home screen and loads fast on a weak connection.
- Keep the screen awake during a session (Screen Wake Lock API), re-requested when the page becomes visible again.
- Check reduced-motion support everywhere (fades, the cue swap, the breathing circle, the Daily light shapes).
- Check the dark room (10pm to 5am, or when the device is in dark mode) on every screen, especially text fields.
- Add the consult booking link: [your booking link].
- Then deploy to Cloud Run.
```

---

## Things to fill in first

- Your owner email (Phase 2) and your booking link (Phase 5)
- Your Stripe account (Phase 3) and an email service account, such as Resend (Phase 4)
- Your real content: craft prompts, the 14 "something else" options, the 7 audio clips, your photo and the About page details
- Your refund policy
