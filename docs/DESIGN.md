# Visual Design System & Reference Guide

*Saved from approved visual reference review · Phase 0*

## 1. Visual References

### 01 · Project Folders (`docs/references/01-project-folders.jpg`)
* **Layout:** Vertical card/folder cascade arranged side-by-side in an overlapping deck formation.
* **Focal Element:** The leftmost active/front folder commands primary attention, standing taller and wider in the foreground while the rest recede to the right.
* **Tab Mechanism:** Each stacked folder has a distinct top-edge index tab with a clean notched shoulder cut, staggered along the top margin.
* **Tab Typography:** Vertical monospace metadata (`CODE_001 // DRIFT`, `CODE_002 // FALLING`, `CODE_004 // SIGNAL`, `FILE_01//`) runs along each tab.
* **Cover Typography:** A heavy, condensed grotesque display title ("GRID DAILY_01-05") runs vertically up the spine of the front folder.
* **Supporting Type:** Small uppercase monospace coordinates, bracketed stamps (`LOG [ 1:00:47 025 RED ]`), and subtle captions (`Visual Studies: Type · Image · Emotion`).
* **Colours:** Tactical earthy paper palette: olive drab/khaki (`--earth-olive`), aged ivory/cream (`--surface`), muted slate-blue (`--earth-slate`), warm kraft tan (`--earth-tan`), and deep charcoal/black.
* **Accents:** High-contrast dark charcoal on light folders, with a thin warm golden hairline border accenting the dark folder.
* **Texture:** Visible physical paper tooth, matte fibers, and analog print artifacts (halftones, barcode stamp, ink distress).
* **Depth & Layering:** Distinct soft drop shadows cast left-to-right between adjacent paper layers, giving genuine physical z-axis separation.

### 02 · Footer Wordmark (`docs/references/02-footer-wordmark.png`)
* **Layout:** Full-width dark container anchored at the bottom edge of the viewport.
* **Top Utility Row:** Subtle, left-aligned monochromatic social icons (Facebook, Instagram, X, LinkedIn) accompanied by quiet copyright and legal links.
* **Dominant Architectural Element:** A massive, full-width wordmark ("Adobe") dominating the bottom half of the footer.
* **Bleed & Cropping:** The giant wordmark is intentionally cropped at its baseline by the bottom edge of the screen, creating an architectural horizon line rather than floating text.
* **Scale:** Sized aggressively so letterforms stretch across the entire viewport width.
* **Colours:** Near-monochrome dark contrast—pitch charcoal/black background (#000000 / dark neutral) paired with pure warm-white / cream letterforms.
* **Secondary Colours:** Muted mid-grey (#A9A38F) for social icons, copyright text, and utility links to avoid distraction.
* **Typeface:** Clean, bold, geometric sans-serif grotesque with tight tracking for the monumental wordmark; small, quiet neutral sans for legal lines.
* **Texture:** Smooth, flat digital surface with no noise, gradients, or bevels.
* **Depth:** Completely flat graphic plane; the sense of depth is created purely through colossal typographic scale and edge-cropping.

### 03 · Hero (`docs/references/03-hero.jpg.jpg`)
* **Layout:** Full-bleed cinematic landscape frame focusing on an extreme macro close-up of an eye behind spectacle frames.
* **Focal Point:** The spectacle lens frames a razor-sharp human iris and pupil, while surrounding features dissolve into soft bokeh.
* **Headline Positioning:** Lower-third typographic lockup reading: "I GO *quiet* WHEN I NEED PEOPLE MOST".
* **Credit Block:** A three-column film-credit style block below the title ("DIRECTED BY / BISHAL", "AUDIO MIX AND MASTER / AKUL", "ANIMATION BY / TARUN").
* **Colours:** Low-key chiaroscuro palette dominated by deep charcoal, velvety blacks, warm skin tones, and a faint cyan glass reflection.
* **Accent Colour:** A vivid, electric vermilion / signal red-orange (`--signal`) used selectively on the words "I GO", "WHEN I NEED PEOPLE MOST", and the credit category labels.
* **Type Contrast:** Heavy modern grotesque all-caps for "I GO" and credit headers, contrasted with a flowing, high-contrast italic serif for the single accent word "*quiet*".
* **Sub-type:** Compact, tracked-out uppercase sans-serif for the subtitle and crew names.
* **Texture:** Authentic 35mm film grain distributed evenly over shadows and highlights; specular light flares on the glasses.
* **Depth:** Extreme shallow depth of field (optical macro bokeh) layered with sharp foreground text, producing multi-layered cinematic immersion.

### 04 · Gallery Journal (`docs/references/04-gallery-journal.jpg.jfif`)
* **Layout:** Centered 3D coverflow carousel set against a dark canvas with floating navigational controls.
* **Header Controls:** Circular utility buttons at top-left (Book Spread view, Grid view) and top-right (Search, Menu), with centered title ("Journal") and page indicator ("⊘ 70 Pages").
* **Centerstage Spread:** An open, two-page book spread displayed flat and front-facing (travel photo on left page, editorial text and architectural detail on right).
* **Fanned Perspective:** Adjacent spreads fan outward to both sides, receding in 3D perspective with progressive Y-axis rotation, shrinking scale, and subtle fade.
* **Footer Actions:** Floating circular action buttons docked beneath the center spread (options, share, action, add).
* **Colours:** Deep slate/navy background tone (#1E2638), off-white paper spreads, and vibrant, natural sun-drenched photography.
* **Type:** Friendly geometric sans for header controls; inside spreads, romantic cursive handwriting for titles ("18 year old Dream life") paired with condensed editorial body copy.
* **Texture:** Tactile scrapbook collage elements—postage stamp scalloped edges, tape/photo corners, cutout stickers, and a subtle center book gutter crease.
* **Depth:** Pronounced spatial 3D perspective (CSS `perspective`, `rotateY`, `translateZ`) coupled with soft grounded drop shadows under the open book spreads.

### 05 · Logo Source (`docs/references/05-logo-source.png`) & Brand Vector (`docs/public/brand/logo-full.svg`)
* **Layout:** Circular medallion / badge enclosed by a fine concentric outer ring.
* **Composition:** Custom lettering tightly packed into three stacked horizontal tiers conforming to the circular perimeter: "TARIQ" (top), "YOUHANA" (middle), "LEON" (bottom).
* **Letterform Dynamics:** Letterforms expand, compress, and interlock organically like a jigsaw puzzle, leaving consistent negative space channels throughout.
* **Colours:** Pure monochrome two-tone: fiery red-orange (#FB1C06 / #FC1C06 sampled from vector paths, establishing our `--signal` token) on transparent/white ground.
* **Type Style:** 1970s psychedelic / Art Nouveau revival swash lettering featuring voluptuous bulbous terminals, sweeping flourishes, and flared stems.
* **Artistic Intent:** Deliberate expressive contrast to the quiet, dark, cinematic editorial typography across the rest of the site.
* **Texture:** Vector art with clean, razor-sharp edges.
* **Depth:** Flat 2D graphic seal, deriving internal dimension solely from the undulating weight and negative space flow of the interlocking letter strokes.

## 2. Design Tokens

| Token | Dark Theme (Default) | Light 'Paper' Theme | Description |
| :--- | :--- | :--- | :--- |
| `--bg` | `#121211` (warm charcoal) | `#F4EFE3` (warm paper) | Page background |
| `--surface` | `#1B1A18` | `#EDE6D3` (cream) | Cards, folders, panels |
| `--text` | `#EDE6D3` (cream) | `#1B1A18` | Headings and primary copy |
| `--text-muted` | `#A9A38F` | `#5E5A4C` | Captions, meta, mono labels |
| `--border` | `rgba(237, 230, 211, 0.12)` | `rgba(27, 26, 24, 0.14)` | Glass borders, hairlines |
| `--signal` | `#FB1C06` (logo red) | `#C21F08` (darker red) | Brand accent spice |
| `--earth-olive`| `#7A7961` | `#7A7961` | Earth project folder |
| `--earth-slate`| `#6E7A8C` | `#6E7A8C` | Earth project folder |
| `--earth-tan`  | `#A97B4F` | `#A97B4F` | Earth project folder |
| `--gold`       | `#D9A832` | `#B8860B` | Trophy cabinet and fine hairlines |
