# Surface brief — app (tracker B0)

## Scope & visitor mode
- Target: the whole web app (`app/index.html`, `app/src/App.jsx`, `app/src/styles.css`), mobile-first.
- Mode: **Operate** — the athlete completes today's session, marks it done, scans the block.

## Audience / job / action / proof / constraints
- Audience: the author, one athlete, tired after a session, home, evening, phone.
- Job: know exactly what to do today, mark it done in seconds, see the block's state.
- Proof/content: the B0 JSON is the whole truth (21 days, reto caminata 100 días, FC zones, race metadata).
- Constraints: no backend, localStorage `onil14k-progreso` unchanged; structure of data and copy comes from the JSON; Spanish.

## Chosen direction & memorable moment
- World: **emission-line rail** (catalog `operate-c-emission-line-rail`), locked via decision sketch `.impeccable/mocks/decision/challenger-rail.html` (mobile frame 390x844), seed `seed:bdc606e4606ebf2d` (hand roll `96da0ab8158c0af90d9c8db93e43c6db`, ASSIGNED run).
- Memorable moment: the rail — every register of the app hangs off one vertical pauta; today's line is full-height solid and inverted; done is solid, pending is dashed, rest is half-height.

## Open decisions
- Later blocks (B1+) reuse the app untouched; FC máx fills in after the test of 2026-11-14.

## Direction contract
THESIS: the whole app hangs off one calibrated rail — day state is carried in line form (height, dash, doubling), never in colored pills; the category default it refuses is stat-cards + status pills + blue buttons.
OWN-WORLD: near-black charcoal ground (#111210 family), bone ink (#e6e2d6), one sodium-yellow emission accent (#f0a832 family) plus a hairline dusk scale for zone data; type is a condensed grotesk display over a mono data voice (letterspaced small caps for labels, mono tabular for figures); components are hairline-outlined plates, controls outlined with a tick and arrow, focus shown as dashed border like an active reading; dark because the use scene is a dim living room after training.
STORY: the athlete arrives, the rail shows exactly where today sits in the block, the inverted plate names today's session, one button marks it done; weeks and the 100-day reto read as continuous traced lines.
FIRST VIEWPORT: top mast (nombre + cuenta atrás to the right), reto-caminata line as a running count under it, stat row as three bone figures over hairline rules (no cards), then the riel of the visible week with HOY inverted mid-plate, tabs at the bottom foot in the standard nav position, signature interaction: the inversion of today's line and the dashed→solid state change when a day is marked done.
FORM: chosen challenger (dealt #6 emission-line-rail), verdict competitive, locked by user pick; `seed:bdc606e4606ebf2d`.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
