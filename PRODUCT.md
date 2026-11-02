# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: React 18 + Vite (`app/`), plan data as per-block JSON (`app/src/bloque-B0.json`, source of truth copy in `data/bloque-B0.json`). No backend.

## Users

Single user: the author himself — male, 26, 85 kg (in active weight loss), starting from zero running experience though with mountain hiking background and 50 days of 30-min daily walks. He trains between coached-by-plan and self-tracked: free weekends, weekday afternoons after work.

## Product Purpose

A day-by-day training tracker web app for preparing the 14K Onil Trails (14 March 2027, 09:00 start, 4-hour cutoff; intermediate cuts at km 7.4 — 10:30 and km 10 — 12:00). The goal is to finish within the cutoff with margin up to 3h30. Success means: the athlete opens the app, knows exactly what to do today, marks it done, and by race day has completed every block of the plan.

## Positioning

A personal, zero-to-14K plan that survives a real life: ski weekends (season 7 Jan – 7 Feb 2027, weekends reserved for skiing, plus the full week 18–24 Jan 2027), knees that protest, home-only strength work (no gym), and a plan specified per concrete day — nothing left "in the air". A generic training app cannot copy that specificity.

## Operating Context

- Plan is generated block by block by the `onil14k` skill and delivered as one JSON per block (B0 done: 2026-11-09 → 2026-11-29; later blocks B1, B2, … follow).
- The web app reads the active block's JSON and lets the athlete view/mark each day.
- Progress is stored locally in the browser (localStorage, key `onil14k-progreso`); without accounts or backend.
- Tracking devices: Strava + chest heart-rate monitor. HR zones pending a max-HR test scheduled 2026-11-14 (Z1–Z5 defined in the block JSON).
- Strength training at home with resistance-band kit (+ adjustable dumbbells up to 20 kg, mat pending purchase).
- Weekly weigh-in, fixed day, fasted (e.g. Sundays).
- Language: Spanish.

## Capabilities and Constraints

- Confirmed: single-user, no backend; localStorage persistence; one JSON file per training block; app loads/displays the active block day by day with status, notes, chips (block, week), race countdown, FC max display.
- Known constraints: knee sensitivity limits running volume (block B0 uses short jogs alternated with walking); ski-season weeks replace weekend workouts; material purchases gate real strength sessions.
- Terminology: blocks (B0, B1, …), HR zones Z1–Z5, avituallamiento cutoffs.
- Undecided facts: target race weight (weight loss is context, not a confirmed numeric goal); what the app does once B0 ends — document as open decision, revise at block revision 2026-11-29.

## Evidence on Hand

- `assets/intent.md` — the athlete's own brief (profile, constraints, race info, planning wishes).
- `assets/Carrera-onil-14k.gpx` — the real race course track.
- `data/bloque-B0.json` (copy at `app/src/bloque-B0.json`) — the complete confirmed B0 plan: day-by-day sessions, material shopping list, race metadata, priorities.
- Race facts (start 09:00, cutoffs, 13:00 finish) from official info quoted in intent.md.
- Absences: no testimonials, no press, no user studies — none may be fabricated.

## Product Principles

1. The plan is the product: every screen answers "what do I do today" without ambiguity.
2. Zero-to-finisher honesty: constraints (knees, ski, no gym) are features of the plan, not things to hide.
3. One JSON per block: data is explicit, auditable, and editable in plain files.
4. Friction near zero: marking a day done must take seconds, because the athlete does it tired after training.
5. Nothing left in the air: open product decisions are recorded as open, never invented.

## Accessibility & Inclusion

Single known user; standard web accessibility (readable contrast, keyboard-friendly checkboxes, legible on a phone after a workout) is expected but no special requirement beyond that has been established.
