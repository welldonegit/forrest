# FORREST Trinity Resort — DESIGN.md

Source of truth for every screen generated for this project. When a rule here and a "nicer" idea conflict, the rule wins. When a case is not covered, decide from the **Principles** section and stay inside the token set — never invent a new color, font size or radius.

Content language: **Ukrainian**. Rules and tokens below are in English so the tool follows them precisely.

---

## 1. What we are designing

**Product.** FORREST Trinity Resort — a premium investment resort in Bukovel (Ukrainian Carpathians). One asset, three autonomous buildings for three audiences: **WIND** (adults, silence, recovery, biohacking), **ROCK** (business, networking, strategy), **SUN** (family, warmth, generations). Ski‑in/ski‑out to slope 5G, 2 300+ m² wellness, opening Q4 2028.

**Deliverable.** A new marketing landing page (desktop + mobile). Later: supporting pages in the same system.

**Audience.** Investors buying apartments from ~$130k to $500k: business owners, executives, HNWI families. They read fast, distrust hype, and judge the developer by the quality of the page itself.

**Job of the page.** Make the "three worlds, one asset" idea instantly legible, prove seriousness (partners, numbers, timeline), and lead to one action: request the investment offer.

---

## 2. Character

**In three words: quiet, precise, natural.**

The brand is built on Carpathian nature reduced to geometry: angular shapes (wind, sun, rock), organic line patterns, a palette of forest, spruce, sand and stone. The page should feel like a well‑printed architecture monograph, not a real‑estate ad. Premium here means **restraint**: few colors per screen, generous but not empty spacing, large type used sparingly, photography doing the emotional work.

**The one memorable device.** Photography and color fields are cut into the brand shapes (WIND chevron, SUN twin peaks, ROCK double slab) or outlined with a thin brand‑shape stroke over a photo. This is the signature move of the identity — use it as the hero of a section, at most once per section, never as decoration sprinkled everywhere.

**What we are not.** Not a SaaS template, not a "luxury" site with gold and serif italics, not a dark cinematic scroll‑jacking experience, not a grey‑on‑grey corporate brochure.

---

## 3. Color

### 3.1 Primitives (from the brand book — exact, never adjusted)

| Token        | Hex       | Brand name            | Role                                                               |
| ------------ | --------- | --------------------- | ------------------------------------------------------------------ |
| `bark`       | `#322512` | Black 4C (dark brown) | ROCK deep tone, inverse sections                                   |
| `spruce`     | `#182820` | Смерековий шепіт      | Primary dark; SUN deep tone                                        |
| `forest`     | `#5B756A` | Лісова тиша           | Secondary text, SUN mid tone                                       |
| `stone`      | `#928C8E` | Мокрий камінь         | ROCK surface and mid tone, hairlines; not for body text on light   |
| `path-sand`  | `#E1D4CB` | Пісок стежини         | ROCK light surface                                                 |
| `white-sand` | `#F2EAD8` | Білий пісок           | Warm light surface                                                 |
| `sea-wave`   | `#7ABFB2` | Морська хвиля         | WIND accent                                                        |
| `sea-fog`    | `#DDEBE6` | Морський туман        | WIND light surface                                                 |
| `air`        | `#FFFFFF` | Гірське повітря       | Page background                                                    |
| `night-bark` | `#0C0C0C` | Нічна кора            | Brand black: logo on white, or a dark surface with white logo/text |

Nothing else exists. No `#111`, no `#F5F5F5`, no Tailwind greys, no gradients between these values.

### 3.2 Semantic tokens (light theme — the only theme)

```
--bg-page:            #FFFFFF   (air)
--bg-surface-warm:    #F2EAD8   (white-sand)   — default alternate section background
--bg-surface-mist:    #DDEBE6   (sea-fog)      — WIND sections, soft highlight
--bg-surface-sand:    #E1D4CB   (path-sand)    — ROCK light sections
--bg-inverse:         #182820   (spruce)       — dark sections, primary button
--bg-inverse-warm:    #322512   (bark)         — ROCK dark section, footer

--text-primary:       #182820   (spruce)       — all headings and body on light bg
--text-secondary:     #5B756A   (forest)       — supporting copy, captions
--text-on-inverse:    #F2EAD8   (white-sand)   — text on spruce/bark (pure white #FFFFFF is also a brand colour and allowed)
--text-on-inverse-2:  #DDEBE6   (sea-fog)      — secondary text on spruce

--accent:             #7ABFB2   (sea-wave)     — highlights, active states, WIND
--accent-deep:        #5B756A   (forest)       — links, focus ring, SUN
--accent-earth:       #928C8E   (stone)        — ROCK, dividers

--interactive:        #7ABFB2   (sea-wave)     — the ONE color of interaction: hover fills, selection, active states, link underlines
--interactive-text:   #182820   (spruce)       — text/icon on an --interactive fill (7:1)
--interactive-soft:   #DDEBE6   (sea-fog)      — hover background behind icons and rows on light surfaces

--border-hairline:    #E1D4CB   (path-sand)    — 1px rules on light bg
--border-strong:      #928C8E   (stone)        — table rules, input borders
--border-on-inverse:  #5B756A   (forest)       — hairlines on spruce; on bark use stone #928C8E (solid brand colours, no opacity)
```

### 3.3 World palettes

From the brand book's colour pairs for graphic elements. WIND: sea‑fog, sea‑wave, forest, stone — no spruce. SUN: white‑sand, forest, spruce, sea‑fog. ROCK: path‑sand, stone, bark, white‑sand. The book allows other brand colours, but these pairs are preferred.

Each world has a fixed pair; use it whenever that world is the subject.

| World    | Surface              | Shape / accent     | Dark                                   |
| -------- | -------------------- | ------------------ | -------------------------------------- |
| **WIND** | `sea-fog` #DDEBE6    | `sea-wave` #7ABFB2 | `forest` #5B756A (and `stone` #928C8E) |
| **SUN**  | `white-sand` #F2EAD8 | `forest` #5B756A   | `spruce` #182820                       |
| **ROCK** | `path-sand` #E1D4CB  | `stone` #928C8E    | `bark` #322512                         |

### 3.4 Color rules

- **Max 3 color roles per section**: one background, one text color, one accent. A muted state of the text role (`text-secondary` on light, `text-on-inverse-2` on dark) counts as the same role, not as a fourth color — it is how inactive items, captions and secondary copy are shown. The page is rich because sections alternate, not because a section is busy.
- Section backgrounds alternate: `air` → warm/mist/sand surface → `air` → inverse. Never two dark sections in a row; never more than two consecutive tinted sections.
- `sea-wave` on light backgrounds: the brand book uses it for the logo and for world names/slogans on `sea-fog` and `white-sand`. On the site this is allowed **only as decorative display** (world names as graphics, with the real text available to screen readers). Informational text in `sea-wave` on light is not used — it fails contrast (≈2:1). This is an accessibility rule, not a brand rule.
- **Interaction is always `sea-wave`.** Every hover, active, selected and "current" state uses `--interactive` as a fill with `spruce` on top, or `--interactive-soft` as a background behind an icon or row on light surfaces. `forest` and `spruce` are never used as hover colors — they are resting colors (text, dark surfaces). `::selection` is `sea-wave` background with `spruce` text, site‑wide.
- Focus rings stay `spruce` on light surfaces and `sea-wave` on dark ones (WCAG 3:1 for UI components).
- `stone` is not used for body text on light backgrounds (contrast ≈3.3:1). Allowed for large display numbers, hairlines and shapes.
- Primary CTA is `spruce` fill + `white-sand` text. There is exactly one primary CTA per viewport.
- **Forbidden pairs** (exactly the brand book's «Не використовувати поєднання»): `spruce` on `bark`; `path-sand` on `white-sand`; `forest` on `sea-wave`; `white-sand` on `sea-fog`; `sea-wave` on a grey‑green tint; `sea-fog` on a light grey. `sea-fog` on `stone` **is allowed** (brand book shows it).
- No decorative gradients, no glassmorphism, no shadows, no opacity variants of brand colours on UI elements (buttons, borders, text, panels).
- **Photo scrims are allowed and expected** wherever text sits on a photo or video. Rules: the scrim colour is `night-bark` #0C0C0C or `spruce` #182820, never a tint (no sea-wave, sand or forest washes). Prefer a **directional gradient** from the edge where the text sits (e.g. bottom 0→65%, left 0→55%) over a flat layer; a flat layer is allowed for full‑bleed sections with centred text, max 45%. Keep the scrim off the subject where possible so the render keeps its colour. Mobile crops get their own scrim tuned to the crop.
- **Text on photos and video**: `air` #FFFFFF on a scrim; `spruce` only when the text sits on a genuinely light, calm area (e.g. sky) without a scrim. Body text on a photo must reach 4.5:1 against the brightest pixels under it, display text 3:1 — adjust the scrim, not the text colour, to get there.

---

## 4. Typography

Two families, clearly separated by role. Both are free (Google Fonts). The brand book also lists **Google Sans** as an additional font; it is not used until its web licence is confirmed — the book calls it free, but Google Sans has historically not been licensed for third‑party sites. Mulish covers its role.

```
--font-display: "Unbounded", "Arial Black", sans-serif;   /* headings, numbers, world names */
--font-text:    "Mulish", "Segoe UI", Arial, sans-serif;  /* everything else */
```

### 4.1 Scale (desktop / mobile, size/line‑height in px)

| Token            | Family & weight           | Desktop | Mobile | Use                                                                                                                                                                                                                                        |
| ---------------- | ------------------------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type/display`   | Unbounded 500, ls −0.02em | 64/72   | 40/46  | Hero headline only. One per page.                                                                                                                                                                                                          |
| `type/h2`        | Unbounded 500, ls −0.01em | 40/48   | 28/34  | Every section title. All of them.                                                                                                                                                                                                          |
| `type/h3`        | Unbounded 400             | 24/32   | 20/28  | Sub‑block titles inside a section                                                                                                                                                                                                          |
| `type/h4`        | Mulish 700                | 18/26   | 17/24  | Card / item titles                                                                                                                                                                                                                         |
| `type/stat`      | Unbounded 400, ls −0.02em | 56/60   | 36/40  | Key numbers (45 000+, 12%)                                                                                                                                                                                                                 |
| `type/stat-hero` | Unbounded 500, ls −0.03em | 144/136 | 56/56  | One dominant number per section, max one section per page. Qualifiers ("від", "$", "%", "років", "м²") set in Mulish `type/h3` `text-secondary`, baseline‑aligned. Mobile size is fixed by the widest value ("27,4–115 м²") fitting 350 px |
| `type/lead`      | Mulish 400                | 20/30   | 18/28  | Intro paragraph under h2, max 2 per page                                                                                                                                                                                                   |
| `type/body`      | Mulish 400                | 17/27   | 16/26  | Default text                                                                                                                                                                                                                               |
| `type/small`     | Mulish 400                | 14/20   | 14/20  | Captions, legal, footnotes                                                                                                                                                                                                                 |
| `type/label`     | Mulish 600                | 13/18   | 13/18  | Form labels, tags. Sentence case, **no letter‑spacing**                                                                                                                                                                                    |
| `type/button`    | Mulish 600                | 16/20   | 16/20  | Buttons, nav                                                                                                                                                                                                                               |
| `type/world`     | Unbounded 500, UPPERCASE  | 40–96   | 32–56  | Only the words WIND / SUN / ROCK                                                                                                                                                                                                           |

### 4.2 Typography rules

- **One role, one token, everywhere.** Every section title on the page is `type/h2` — same size, weight and line‑height — regardless of how long the section is or how important it feels. Every item title is `type/h4`. If a block "needs" a different size, the block is wrong, not the scale.
- Headings are **sentence case** ("Переваги інвестиційного активу"), not Title Case, not ALL CAPS. The only uppercase words on the page are the world names WIND / SUN / ROCK.
- No eyebrow labels above headings (the small tracked "SECTION 02 · ABOUT" line). If a section needs context, put it in the lead paragraph.
- Do not accent a single word in a headline with another color, italic or weight. The one allowed device is **two‑tone h2**: exactly two lines, same `type/h2` size and weight; line 1 in `text-primary` (`white-sand` on dark), line 2 in `text-secondary` (`sea-fog` on dark). Line 2 must be a continuation of the thought, not a slogan. Used on section titles only, never in hero or h3/h4, and never split mid‑sentence by word.
- Body line length 55–75 characters. Columns of text max 640 px wide.
- Numbers in Unbounded, always with a Mulish label under them, never a caption above.
- Unbounded is wide: never set body text or paragraphs in it, never below 17 px.
- No monospace anywhere. No text‑shadows. Text on photos per §3.4 (white on a scrim, or spruce on a calm light area).

---

## 5. Space, grid, shape

### 5.1 Spacing scale (8‑based)

```
--space-1: 4px   --space-2: 8px   --space-3: 12px  --space-4: 16px
--space-5: 24px  --space-6: 32px  --space-7: 48px  --space-8: 64px
--space-9: 96px  --space-10: 128px
```

- Section padding: desktop `128px` top/bottom, mobile `64px`. Same on every section — rhythm is a system feature.
- Every section: one `type/h2`, at most one accent color, at most one brand shape.
- Gap between h2 and content: `48px`. Between lead and content: `32px`. Between items in a list/grid: `32px` desktop, `24px` mobile.
- Inside a card/panel: `32px` padding desktop, `24px` mobile.

### 5.2 Grid

- 12 columns, `24px` gutter, container `1280px`, side padding `32px` (mobile `20px`).
- Content is **left‑aligned** by default. Centered text only for: hero on mobile, single stat callouts. Never center long paragraphs.
- Max two content columns of text. Three‑up grids allowed only for the three worlds and for partner logos.

### 5.3 Radius

```
--radius-control: 4px   buttons, inputs, tags
--radius-panel:   6px   cards, panels, accordion items
--radius-media:   0px   photos, video, brand-shape masks — always sharp
```

Nothing is rounder than 6 px. Pill buttons, circles as decoration and 16–24 px "soft" cards are out of system.

### 5.4 Elevation

**No drop shadows.** Depth comes from background color changes and 1 px hairlines (`--border-hairline` on light, `--border-on-inverse` on dark). A card on `air` is a `white-sand` panel, not a white box with a grey shadow.

---

## 6. Imagery and brand graphics

- **Photography** is real, warm, editorial: people in Carpathian settings, interiors, snow, forest. No stock smiles, no 3D renders styled as photos, no AI‑looking imagery, no purple/teal color grading. Photos are never rounded.
- **Brand shapes** (WIND chevron, SUN twin peaks, ROCK double slab) are used in exactly three ways: (a) as a solid fill in a world color on a world surface; (b) as a mask that crops a photo; (c) as a 1–1.5 px outline stroke laid over a photo in `air`, `white-sand` or `sea-fog`. One shape per composition. Shapes keep their proportions (never stretched), are never gradient‑filled or shadowed. Rotating, cropping by the frame edge and deriving new elements from the brand shapes are allowed — the brand book does all three («Допускається створення унікальних елементів на основі існуючих брендових»).
- **Patterns** (WIND contour swirls, SUN rings, ROCK cell mesh) fill only: a shape, a full‑bleed band under a section title, or the integrator mark. Line color = shape/accent color of that world, background = that world's surface or dark. Patterns never sit under body text.
- **Logo**: the primary horizontal logo (mark + FORREST + Trinity Resort) in the header and footer; the integrator (mark + Trinity Resort) for favicon, small badges and repeated marks. Use only the brand‑book color variants: `spruce`/`bark`/`night-bark` on light, `white-sand`/`sea-fog`/`sea-wave` on dark. Minimum width 120 px on screen. Clear space = height of the mark on all sides. Never recolor, outline, add effects, change proportions, rearrange parts or place where contrast is insufficient (brand book «Заборонені модифікації»).
- **Icons**: none, unless functional (phone, social, chevron, close, play). 1.5 px stroke, `currentColor`, 20 or 24 px. Hover on light surfaces: a 40 px `--interactive-soft` square (radius 4) appears behind the icon, icon stays `spruce`; on dark surfaces the icon itself turns `sea-wave`. No icon‑in‑a‑colored‑circle, no illustrated feature icons. The play control is a 64 px square, radius 4, `white-sand` fill, `spruce` solid triangle; it is the only filled icon on the site.

---

## 7. Components

Every component uses the tokens above; states are listed so they are never improvised.

**Button / primary** — `spruce` bg, `white-sand` text, `type/button`, padding 16×28, radius 4. Hover: `sea-wave` bg, `spruce` text, 150 ms. On dark surfaces the resting state is `white-sand` bg + `spruce` text, hover `sea-wave` + `spruce`. Focus: 2 px ring (`spruce` on light, `sea-wave` on dark), 2 px offset. Disabled: `path-sand` bg, `stone` text. Text describes the outcome: "Отримати інвест‑пропозицію", never "Надіслати". No arrow glyphs appended to the label.

**Button / secondary** — transparent, 1 px `spruce` border, `spruce` text. On dark: 1 px `white-sand` border, `white-sand` text. Hover (both): `sea-wave` fill, `sea-wave` border, `spruce` text.

**Button / text** — `type/button`, `spruce` (`white-sand` on dark), 1 px underline `path-sand` (`border-on-inverse` on dark), offset 4 px. Hover: underline becomes 2 px `sea-wave`, text color unchanged. For "Дивитись відео", "Усі питання".

**Input / select** — 48 px high, `air` bg, 1 px `border-strong`, radius 4, `type/body`, label above in `type/label` (`text-secondary`). Hover: border `sea-wave`. Focus: border `spruce` 2 px. Error: border `bark`, message in `type/small`. Placeholder is an example, not the label.

**Panel** (replaces "card") — a surface token bg (`white-sand`, `sea-fog`, `path-sand` or `spruce`), padding 32, radius 6, no border, no shadow. Title `type/h4`, text `type/body`. Panels in one row share height and internal structure.

**World block** — the signature component. Full‑bleed band on that world's surface; left: `type/world` name + `type/h3` tagline ("Тиша. Відновлення. Біохакінг.") + `type/body` description + text button; right: photo masked into the world's shape or shape outline over photo. Three world blocks always follow the same layout; only colors, shape and photo change.

**Accordion** (advantages, FAQ) — full‑width rows separated by 1 px `border-hairline`; question in `type/h4`, 24 px vertical padding; a single chevron rotates 180°. Hover: row background `--interactive-soft` (on dark: chevron and question turn `sea-wave`). Open state adds `type/body` answer, no background change. One item open at a time on mobile.

**Stat** — `type/stat` number in `spruce` on light or `white-sand` on dark, `type/small` label below in `text-secondary`. Prefix/suffix qualifiers ("від", "до", "$", "%", "років", "м²") in Mulish `type/h4` `text-secondary`, baseline‑aligned. Laid out in one row with columns **sized by content** (flex, gap ≥ 48, label wraps under its own number, min label width 160 px) — not forced into equal columns. No boxes, no lines.

**Timeline** (project phases — a true sequence, so numbering is allowed) — horizontal on desktop, vertical on mobile; 1 px `border-strong` line; year in `type/h3`, world name in `type/world` small (32 px), description `type/body`.

**Quote / ambassador** — photo (sharp corners, 4:5), name `type/h4`, role `type/small`, quote `type/body` in `text-primary`. No giant decorative quotation marks.

**Partner row** — logos in `stone` (monochrome), 40 px high, equal spacing, hairline above and below.

**Nav** — transparent over hero, becomes `air` with hairline bottom on scroll; logo left, 5–6 links `type/button` in `spruce`, phone number, one primary button. Link hover and current: 2 px `sea-wave` underline, offset 6 px, text color unchanged. Mobile: full‑screen `spruce` menu, links in `type/h3` `white-sand`.

**Footer** — `bark` bg, `white-sand` text, logo in `white-sand`, hairlines `border-on-inverse`. Legal in `type/small` `text-on-inverse-2`.

**Form section** — on `white-sand` surface; two columns desktop (h2 + lead left, form right), stacked mobile. Fields: name, phone, contact method, investment category, one primary button, `type/small` privacy line.

---

## 8. Motion

- One orchestrated moment: hero headline and photo fade in on load (400 ms, ease‑out). Nothing else animates on scroll — no fade‑and‑slide on every section, no parallax, no counters ticking up.
- Interaction feedback only: accordion open/close 200 ms, button hover 150 ms, menu 250 ms. `prefers-reduced-motion` disables all of it.
- **Menu open choreography.** The full‑screen menu may reveal its items in sequence: each menu line rises from behind a mask (translateY 100 % → 0, 600 ms, `cubic-bezier(0.22, 1, 0.36, 1)`, stagger 70 ms), and the side cards fade in with a 24 px rise (500 ms, stagger 90 ms) starting 200 ms after the first line. Closing reverses in half the time with no stagger. Reduced motion: everything appears at once.
- No hover zoom on photos, no cursor effects, no marquee logos.
- **Single exception — rotating stat.** A `type/stat-hero` number may cycle through a fixed list of values every 4 s: outgoing value fades out and moves up 12 px, incoming fades in from 12 px below, 500 ms ease‑in‑out, no digit counting or ticking. Pauses on hover/focus and on tab blur; with `prefers-reduced-motion` the rotation stops and all values are shown as a static grid. Used in at most one section per page.
- **Third exception — shape outline draw.** A 1.5 px outline of one brand shape (WIND, SUN or ROCK) may draw itself over a photo once, when the section enters the viewport: single continuous stroke, 1200 ms ease‑out, from 0 to full length, no fill, no fade. Plays once per page load; with `prefers-reduced-motion` the outline is shown fully drawn. The shape is never stretched, never overlaps text, and the world it belongs to matches the section's world (neutral sections use ROCK or the shape of the nearest world). Max one outline per section.
- **Second exception — scroll‑scrubbed video (hero and "Три світи").** At most two pinned sections may map scroll progress to `video.currentTime`; they must use different segments of the footage, never the same frames twice. The hero may additionally move its headline and scale/translate the video frame into the next screen (transform and opacity only). "Три світи" may switch a text overlay in three steps. This is scroll‑driven, not time‑driven: nothing moves unless the user scrolls. Text switches by crossfade 300 ms, no slide, no parallax. With `prefers-reduced-motion`, on devices that cannot seek smoothly, or when the video fails to load, the section degrades to a static poster frame with the three text blocks stacked. All three texts are always present in the DOM for assistive tech.

---

## 9. Copy and voice

- Ukrainian, sentence case, plain verbs, active voice. One idea per sentence.
- Tone: calm, factual, confident. Numbers over adjectives: "до 12% дохідності" beats "надзвичайно прибутково".
- Buttons name the result. Section titles are statements, not slogans ("Три світи — один актив").
- No exclamation marks, no emojis, no "✅⭐️☎️" in visible copy or meta tags.

---

## 10. Banned list (things that read as a template)

From the client:

- Washed‑out, low‑saturation "pastel default" palettes — use the brand hexes at full value.
- Default fonts (Inter, Roboto, Arial, system UI) anywhere.
- Grey as a mood: no grey text on white, no neutral grey cards — the only grey is `stone`, used as the ROCK surface/tone, for hairlines and partner logos.
- Off‑system sizes: if a heading is not `type/h2` or `type/h3`, it is a bug.
- "Interesting" blocks built as a pile of elements. A distinctive section has **one** idea (a shape‑masked photo, a big number, a full‑bleed pattern band) and quiet everything else.

Generic AI‑design tells to avoid:

- Cream background + serif display + terracotta accent.
- Near‑black + single neon accent.
- Cards for everything: identical rounded boxes with the same soft grey shadow in a 3×3 grid.
- Tracked ALL‑CAPS eyebrow labels above headings; meta strings joined with "·"; "→" after link text.
- Feature icons in colored circles; illustrated 3D blobs; gradient washes; glass panels.
- Numbered markers 01/02/03 on content that is not a sequence.
- Fade‑up animation on every section; hover‑lift on every card.
- Centered hero with a badge pill above the headline and two buttons below it.

Brand‑book prohibitions (absolute):

- Distorting, recoloring, outlining, shadowing or restructuring the logo; using it on a low‑contrast background; violating clear space.
- Using brand shapes and patterns in any color outside the palette.
- Combining the forbidden color pairs from §3.4.

---

## 11. Accessibility floor

- Body text contrast ≥ 4.5:1, large text ≥ 3:1 — checked with the actual tokens (see §3.4 for the two tokens that fail on white).
- Visible focus on every interactive element (2 px `accent-deep` ring).
- Touch targets ≥ 44 px. Form fields have real `<label>`s.
- Photos carry descriptive alt text in Ukrainian; decorative shapes are `aria-hidden`.
- Layout works at 360 px wide without horizontal scroll; type scale switches at 768 px.

---

## 12. Self‑check before delivering any screen

Run this list and fix violations before showing the result:

1. Every section title is `type/h2`; every item title is `type/h4`. No stray sizes.
2. Section padding is identical across sections.
3. ≤ 3 colors per section; all hexes are from §3.1; no greys outside `stone`.
4. Fonts are Unbounded (display/h2/h3/stat/world) and Mulish (everything else) only.
5. Radii are 4 / 6 / 0 only. No shadows.
6. At most one brand shape per section; shapes are undistorted and in palette colors.
7. Photos have sharp corners; text on photos passes contrast, with a `night-bark`/`spruce` scrim where needed (§3.4).
8. No eyebrows, no all‑caps except world names, no arrows in labels, no single‑word color accents in headlines.
9. Exactly one primary button in view at a time.
10. Logo untouched and inside its clear space.

If any item fails, list the violation and the fix in the response, then regenerate.
