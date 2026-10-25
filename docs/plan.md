# Portfolio Website: Implementation Plan for Antigravity

*Prepared for Tariq · 21 October 2026 · Version 2 (content kept in GitHub, no Supabase)*

## How to use this document

- Save this file as `docs/PLAN.md` at the root of the repo and open the repo in Antigravity.
- Start every agent session with: 'Read docs/PLAN.md in full. Work only on Phase N. Write your plan first and wait for my approval before changing any file.'
- One phase per session. Commit at the end of each phase and keep the site deployable at all times.
- Items tagged **YOU** are manual steps the agent cannot do (accounts, keys, photos, writing).
- This is a spec, not a script. If the agent finds a better way to reach the same goal, it should propose it, not silently deviate.

## 1. Project brief

A personal portfolio that holds all of me: data and software work first, then everything else (photography, writing, film, history, poetry, achievements). The principle is **one clear front door, many rooms**. The landing page tells a visitor who I am and what I do within ten seconds; every other topic lives on its own page, one click away.

Audience: recruiters, clients (including for Tenstral Technologies), collaborators, and friends.

Pages: Landing, Projects, Gallery, Achievements (trophy cabinet), Blog, About, Contact, plus a private Admin area.

## 2. Agent rules (non-negotiable)

1. **Never hard-code content.** Every project, post, photo, skill, achievement, stat, contact detail and social link comes from content files in the repo and is edited through the admin screen at `/admin`. Starter demo files are allowed and must be clearly marked as placeholder.
2. **Never invent facts.** No fake awards, metrics, testimonials, client logos or skill percentages. Placeholder text says 'Placeholder'.
3. TypeScript in strict mode, small components, no dead code, no unused dependencies.
4. Mobile first. Design and test at 360px wide before desktop.
5. Respect `prefers-reduced-motion`. Every animation needs a static fallback.
6. Every image needs alt text (a required field in admin).
7. Ask before adding any dependency that is not listed in section 4.
8. Secrets live only in environment variables. The GitHub token and form-service keys never reach client code.
9. Each phase ends with: build passes, lint passes, a mobile Lighthouse check, and a short summary of what changed and what comes next.

## 3. Key decision: where the content lives

Decision: content lives in the GitHub repo as plain files, edited through a form-based admin screen. There is no database and no Supabase.

- **Content as files:** blog posts, projects, photos and achievements are Markdown files with structured fields at the top; settings and skills are JSON files, all inside a `content/` folder in the repo.
- **Admin screen:** a Git-based CMS gives me forms at `/admin`. When I save, it commits the change to GitHub, and the site rebuilds and goes live in about one to two minutes.
- **Hosting:** Vercel builds from the GitHub repo on every commit (Cloudflare Pages or Netlify work the same way). GitHub Pages alone is possible, but the CMS login then needs a separate helper service, so it is the harder route.
- **CMS choice:** use Keystatic first (built for Next.js, stores content in GitHub). If its setup proves painful, fall back to Decap CMS or TinaCMS. The agent must read the current setup docs before wiring any of them, then explain its choice.

Trade-offs I accept: edits are not instant (there is a short rebuild delay); photos must stay web-sized so the repo stays light (section 10); the contact form uses an email service instead of a database (section 7.7).

Check at build time (policies change): Vercel's free Hobby plan is meant for non-commercial use, so if the site will openly promote Tenstral as a business, check the current terms or use Cloudflare Pages instead. If the repo is public, everything committed to it, including drafts, is public (section 11).

## 4. Tech stack

- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS with design tokens as CSS variables
- **Animation:** Framer Motion (scroll-linked footer, folder switching, page transitions); GSAP only if Framer cannot do the gallery 3D
- **Content and admin:** Keystatic CMS with GitHub storage (see section 3). Content is read at build time and validated with Zod schemas, so a bad entry fails the build with a clear message
- **Markdown display:** `react-markdown` with syntax highlighting (or the CMS's own renderer)
- **Images:** `next/image`, plus a small `sharp` build script that resizes new photos, creates blur placeholders and strips location data
- **Contact form:** React Hook Form + Zod, sent through Resend or Formspree and protected by Cloudflare Turnstile
- **Analytics:** privacy-friendly (Plausible, or Vercel Analytics)
- **Fonts:** self-hosted through `next/font`

## 5. Design system

The look is cinematic and tactile: dark, earthy, paper-grain, film-credit typography.

**Colour system, built around the logo's red.** The logo's vivid red-orange is the brand colour, so everything else is warm and quiet to let it stand out. Rule of thumb: about 60 percent dark neutrals, 30 percent cream and paper tones, and no more than 10 percent accent, most of which is the red. Sample the exact red from `public/brand/logo-full.svg` and use it as `--signal`; the hex values below are starting points to tune by eye.

| Token | Dark theme (default) | Light 'paper' theme | Used for |
| --- | --- | --- | --- |
| `--bg` | #121211 warm charcoal | #F4EFE3 warm paper | Page background |
| `--surface` | #1B1A18 | #EDE6D3 cream | Cards, folders, panels |
| `--text` | #EDE6D3 cream | #1B1A18 | Body text and headings |
| `--text-muted` | #A9A38F | #5E5A4C | Captions, meta, mono labels |
| `--border` | cream at 12% | charcoal at 14% | Hairlines, glass border |
| `--signal` | the logo red (about #FF2A0A) | a darker red (about #C21F08) | Accent only, see the rules below |
| `--earth-olive`, `--earth-slate`, `--earth-tan` | #7A7961, #6E7A8C, #A97B4F | same | Project folder paper colours and illustrations only |
| `--gold` | #D9A832 | #B8860B | Trophy cabinet and hairline details only |

Keep the neutrals warm (brown-leaning charcoal, yellow-leaning cream, never blue-black or pure white) so the red sits comfortably beside them.

**Rules that keep it professional**

1. **Red is a spice, not a sauce.** Use one or two small red touches per screen: the logo, a short label, the active nav indicator, one hover state. Never a large red background; the biggest red area on the site is the logo badge.
2. **Primary buttons are cream with charcoal text**, and secondary buttons are outlined. Red is not a button fill, because cream text on this red is too low in contrast for small type.
3. **Red text** only for large or bold text, or short monospace labels at 14px or more, on charcoal (about 5:1). On cream or paper use the darker red (about 4.8:1). Check every pairing with a contrast checker.
4. **Never put red text or the logo directly on olive, slate or tan.** Red against those colours vibrates and looks muddy. Place the logo on charcoal or cream. Folders use the earth colours with charcoal or cream labels; only the primary project's tab label is red, which marks it as the front folder.
5. **Keep gold away from red.** Red beside yellow reads as fast food. Gold appears only in the trophy cabinet and as thin hairlines, never next to a red element.
6. **Photos stay natural.** No colour tint overlays; use only the dark gradient for text legibility. Frame gallery photos on neutral surfaces so photo colours do not fight the accent.
7. **Error and success states** always pair colour with an icon and text, because the brand red also looks like an error red. Errors appear only inside forms.
8. **Focus rings** are cream on dark and charcoal on light, never red on red.

**Logo check (the agent does this before finishing the navbar).** Render the logo on charcoal, on cream, over the hero photo, and beside each folder colour. Take screenshots and compare. Any background where the red vibrates or looks muddy is a fail and gets fixed.

**Implementation.** Colours are CSS variables on `:root`, with the light values redefined under `[data-theme='light']` and a `prefers-color-scheme` guard. Tailwind reads from the variables. The logo SVG takes its fill from a `--logo` variable: the original red on dark surfaces, the darker red on light ones.

**Typography:**

- Display: heavy extended or condensed grotesque (Archivo or Anton) for the name and big headings
- Accent: italic serif (Instrument Serif or Playfair Display Italic), one word at a time, for contrast
- Labels: monospace (JetBrains Mono or IBM Plex Mono) for tags like `CODE_001 //` and `FILE_01//`, vertical text on folder tabs
- Body: Inter or DM Sans

**Texture and motion:** a subtle noise overlay at 4 to 6 percent opacity on the whole site, paper texture on folders, slow and smooth easing (400 to 600ms), nothing bouncy. Keep text contrast at 4.5:1 or better everywhere, including over photos.

The agent should recreate the *style and mechanics* of the references, not copy their artwork, text or imagery.

### 5.1 Visual references (read before building any UI)

Four reference images define the look. Save them in the repo with exactly these names. The images carry the feel; the notes below say what to take from each and what to leave. If an image and the words disagree, ask me.

| File | Shows | Used for |
| --- | --- | --- |
| `docs/references/01-project-folders.jpg` | Poster of tabbed paper files standing side by side | Projects folder switcher (7.2) |
| `docs/references/02-footer-wordmark.png` | Adobe.com footer: social icons and a giant cropped wordmark | Footer (section 6) |
| `docs/references/03-hero.jpg` | Cinematic film-title frame: close-up photo, blur, bold type, credit lines | Hero (7.1) |
| `docs/references/04-gallery-journal.jpg` | Journal app showing a 3D fan of page spreads | Gallery (7.3) |
| `docs/references/05-logo-source.png` | My red circular badge logo (an asset, not a style reference) | Navbar, favicon, footer, share images (section 6) |

There is no reference image for the trophy cabinet (7.4). Follow its text spec and the style rules below, and show me a first draft early.

**01 Project folders.**

- Take: layered paper folders, each with a notched tab on its top edge carrying a small monospace code label; different paper colours and textures (olive, cream, slate, tan, black); one folder large at the front while the others peek out as slivers; paper grain and soft shadows between layers; big heavy vertical title type.
- Do not take: the poster's own text and titles, its photos, the watermark and stamp, or its exact colours (use the tokens in section 5).

**02 Footer wordmark.**

- Take: a dark footer with a small row of social icons and quiet small print, and below it one huge white wordmark that spans the full width and is cropped by the bottom edge of the screen, so large it feels like architecture.
- Do not take: Adobe's logo or links, the grey bar at the top, or the browser window and taskbar (the image is only a screenshot). Use my display name as the wordmark and my five socials (Facebook, Instagram, GitHub, LinkedIn, YouTube). The scroll reveal is described in section 6; the picture cannot show it.

**03 Hero.**

- Take: a full-bleed extreme close-up photo with shallow depth of field, one side sharp and the other heavily blurred; a dark, grainy, cinematic mood; a bold sans headline in red and white across the lower part with one small italic serif word for contrast; a block of tiny uppercase credit-style lines with red labels over white names.
- Do not take: the film's title, names or credits, or its photo. Use my own photo and my own labels.

**04 Gallery journal.**

- Take: a coverflow of page spreads. The centre spread is open and large; spreads on both sides tilt in perspective and shrink and fade towards the edges; a soft shadow sits under the row; a title and page count are centred at the top; round icon buttons sit at the top for view mode (book and grid), search and menu, and a row of round action buttons sits under the centre spread.
- Do not take: the collage content (stickers, flags, postcards, handwritten-style text), the blue background, or the travel story. The bottom buttons become more, share link and details; delete and add belong only to the admin, never the public gallery.

**05 Logo (an asset, not a style reference).** Use it exactly as supplied; section 6 covers where it goes and how it behaves. Its 1970s swash lettering is a deliberate contrast to the quiet, cinematic mood, so keep it small and use it as a red stamp. Do not imitate its lettering style elsewhere on the site.

**Style rules for the agent**

- Mood: cinematic, quiet, tactile, analog, editorial.
- Avoid: a glossy SaaS look, purple-blue gradients, stock icons, emoji, rounded corners everywhere, centred card grids, cheerful pastel colours, and any generic template hero.
- Numbers beat adjectives: use the colour, font, blur, radius and timing values from sections 5 and 6.

**Workflow for each UI piece** (hero, navbar, footer, folder switcher, gallery, cabinet, one at a time)

1. Before writing code, open the matching reference and describe it back in about ten bullets (layout, colours, type, texture, depth). I correct it, and the corrected description is saved to `docs/DESIGN.md`, which the agent reads at the start of every session.
2. Build only that piece, in isolation first, with placeholder content.
3. Open the site in a browser, take a screenshot, compare it with the reference, list the five biggest differences and fix them. Repeat once or twice.
4. Show me the result before wiring in real content.

## 6. Global components

### Navigation bar and logo

The bar has two states. It changes between them as the page scrolls, and the logo moves with it.

**State 1: at the top of the page.** A normal, full-width bar in the glass style below. The logo sits on the left at a larger size (about 72 to 88px tall), the page links sit on the right (Home, Projects, Gallery, Achievements, Blog, About, Contact), and a CV button sits at the far right.

**State 2: after scrolling down about 80px.** The bar condenses into a compact, tabular bar centred at the top. The links become tabs in a segmented row, split evenly on both sides of the logo, with a sliding highlight under the active tab. The logo shrinks to about 40 to 48px and glides to the centre of the bar, between the two groups of tabs.

- Make the change one continuous animation using shared-layout motion (Framer Motion `layout` and `layoutId`), 400 to 600ms, with no jumps. The bar's width, the logo's size and position, and the link spacing all animate together.
- Scrolling back to the top returns the bar to State 1. Use two thresholds (collapse at about 80px going down, expand at about 40px going up) so it does not flicker near the boundary.
- Glass style in both states: translucent dark fill, `backdrop-filter: blur(16px) saturate(140%)`, 1px light border at about 12 percent opacity, soft shadow. Corner radius 16 to 20px, rounded but clearly not a pill. Fall back to a solid dark background where `backdrop-filter` is unsupported, and check legibility over bright photos.
- The active link has a clear indicator in both states.
- **Mobile:** State 1 shows the logo on the left and a menu button on the right. After scrolling, the logo shrinks and glides to the centre with the menu button beside it; the menu opens as a glass panel with all links.
- **Reduced motion:** switch between states instantly, without the glide.
- The logo links to the home page. The bar is a `nav` landmark with an accessible name, and the logo has my name as its alt text.

**Logo.** Source file: `docs/references/05-logo-source.png`, a red circular badge with 1970s-style lettering of my name. Use the supplied artwork only; never redraw or retype it.

- Prepare these files in `public/brand/`: `logo-full.svg` (the full badge as a vector with a transparent background), `logo-mark.svg` (a simplified version for very small sizes), `favicon.svg` with PNG fallbacks, and an Open Graph share image built around the badge.
- The lettering becomes unreadable at small sizes. In the nav, keep the full badge at about 40px or larger, and optionally crossfade to the simplified mark as it shrinks.
- Colour: keep the logo's own red and set the site's signal red token to match it, so the hero labels and the logo agree. Define the SVG fill through a variable so it can switch to cream on light surfaces.
- Where it appears: navbar, favicon, footer (small, above the contact list), share images and the 404 page. It does not go over the hero photo, and it does not replace the hero name or the giant footer wordmark.

### Footer with the giant name

- Top part: contact list (email, phone, address, each shown only if enabled in admin), social icons with labels (Facebook, Instagram, GitHub, LinkedIn, YouTube), quick links, CV link, copyright.
- Bottom part: my display name as one enormous wordmark spanning the full width and cropped by the bottom edge, in the style of adobe.com.
- **Behaviour:** the wordmark is hidden while the page is read. As the user reaches the end of the page it rises into view from below, scroll-linked (progress follows the scrollbar, not a one-time trigger). Scrolling back up lowers it away again.
- Render the name as real text (not an image), sized with `vw` units so it always fits the width. Display name comes from site settings; confirm the exact spelling to use.

### Other global pieces

Subtle page transitions, a designed 404 page, skip-to-content link, consistent section headings with mono labels.

## 7. Pages

### 7.1 Landing page `/`

Sections in this order, all content pulled from the database:

1. **Hero:** full-viewport, one bold photo with a dark gradient for legibility and slight depth (blur or parallax). My name in huge display type with one italic serif accent word. Beneath it, small uppercase film-credit style lines with red labels, for example a short tagline and label/value pairs such as FOCUS, BASED IN, STUDYING. Two buttons: View projects, Contact. Photo, text and focal point are editable in admin.
2. **Stats strip:** four or five animated counters. Each stat is configured in admin as either *auto* (projects, blog posts, photos, achievements, counted from the content files at build time) or *manual* (label and value I type). No made-up numbers.
3. **About:** short bio (2 to 3 paragraphs), portrait, a few quick facts, link to the full About page.
4. **Projects overview:** the folder switcher (see 7.2) showing up to five featured projects, plus a 'See all projects' link.
5. **Skills:** grouped as Data, Software, Tools. Shown as tags with a simple level label (Learning, Comfortable, Strong), never percentage bars.
6. **Latest from the blog:** three newest posts as cards, plus 'All posts'.
7. **Footer** (section 6).

### 7.2 Projects `/projects` and `/projects/[slug]`

**The folder switcher** is the signature component. Projects look like physical files that people can switch through.

- **Desktop:** the active project is the *front folder*: a large card with cover image, title, one-line summary, tags, status badge, and buttons (Details, Live, Code). All other projects sit behind it as stored folders. Only their tabs and a vertical sliver show, staggered along the edge, each in its own paper colour with a mono tab label such as `CODE_002 // NAME`.
- **Interaction:** hovering a tab lifts that folder a few pixels. Clicking it brings it forward (slides, scales, raises its z-index) while the previous front folder slides back into the stack. Arrow keys and swipe also work. Use proper tab semantics for accessibility.
- **Mobile:** tabs become a horizontally scrollable row above a full-width active card; swipe left and right to switch.
- **Primary project:** the one flagged as primary in admin is the front folder when the page loads. Only one project can be primary at a time.
- `/projects` shows the switcher with all projects, then a filterable list below (by status and tag).
- `/projects/[slug]` is a case-study page: problem, what I built, tools, my role, outcome or status, image gallery, links.
- **Status badges are mandatory and honest:** Live, In development, Concept, Archived. Several of my projects are early or conceptual, and labelling them accurately is better than overselling.

Starter projects to seed as editable placeholders: Tenstral Technologies, HIMA (AI companion platform), the Historical Atlas of borders and states, the History of Bengal documentation, the COLORPLAN website, the Python learning game concept, and this portfolio itself. I will write the real descriptions in admin.

### 7.3 Gallery `/gallery`

A journal-style gallery based on the fourth reference.

- **Journal view:** a 3D coverflow. The centre item is an open *spread*: photo on the left page, text on the right page (title, caption, optional longer story, location, date, tags). Neighbouring spreads fan out to both sides with perspective (rotateY, translateZ, scale, fade). Drag, swipe, mouse wheel, arrow keys and on-screen arrows move through it.
- **Header controls:** a toggle between Journal view and Grid view, an album filter, a search box, and a photo count under the title.
- **Per photo:** title, caption, story (markdown), alt text, location name (optional latitude and longitude, linking to an OpenStreetMap view, no API key needed), date taken, album, tags.
- Deep links such as `/gallery?photo=slug` and a copy-link button. Lazy-load only the neighbouring three or four spreads on each side.
- **Mobile:** one spread at a time (photo above, text below) with the neighbours peeking in from the sides. With reduced motion, fall back to a plain slider.

### 7.4 Achievements `/achievements` (trophy cabinet)

- A dark glass cabinet with spotlit shelves: **Victories** (winner or first place), **Podium and finalists**, **Participations**. Each item is a trophy, medal or certificate emblem, depending on type.
- Hover shows a short tooltip. Click opens a detail panel: event, type (Hackathon, CTF, Competition, Other), organiser, date, exact result, team and my role, what we built or solved, and links (project, write-up, certificate image).
- Counters above the cabinet (events entered, wins, CTFs, hackathons) and filters by type and year.
- Empty shelf slots stay visible with a 'more coming' mark, so the cabinet looks intentional even with only a few entries.
- Results must be labelled exactly. A participation is never displayed as a win.

### 7.5 Blog `/blog` and `/blog/[slug]`

- List page: featured post, grid of posts, category filter, search, pagination.
- Post page: cover image, title, date, reading time, table of contents for long posts, rendered markdown with code highlighting and captioned images, related posts, previous and next, share buttons.
- Starter categories (editable): Data, Software, History, Film, Poetry, Life. Poetry posts preserve line breaks and work well with Roman Urdu.
- RSS feed at `/rss.xml`, sitemap entries, automatic Open Graph images.

### 7.6 About `/about`

Longer biography, portrait, a timeline of education and milestones, interests (history, filmmaking, detective fiction, aerospace, and so on, all editable), what I am working on now, and CV download.

### 7.7 Contact `/contact`

Contact form (name, email, subject, message) with spam protection, plus the contact list and social links. Messages are emailed to me by the form service; nothing is stored on the site.

**Privacy recommendation:** show only the city rather than a full street address, and show the phone number behind a click-to-reveal. Each contact field has its own show/hide switch in admin.

## 8. Admin panel `/admin` (Git-based CMS)

The goal: after launch, I never edit code to change content.

- **How it works:** I fill in a form, the CMS commits the files to GitHub, and the site rebuilds. Every change stays in Git history, so any mistake can be undone.
- **Access:** sign in with GitHub. Only my account, and anyone I add to the repo, can save changes. The route is `noindex`.
- **Phone use:** writing and editing text should work on a phone. Photo uploads work too, but a laptop is easier.

**Collections (one per content type, fields in section 9):**

1. **Site settings** (single entry): name, tagline, hero, bio texts, contact details with show/hide switches, socials, CV file, stats, navigation.
2. **Projects:** status, primary flag, featured flag, order number, accent colour, tags, links, cover and images, draft flag.
3. **Skills:** name, group, level, order.
4. **Blog posts:** Markdown body, cover image, category, tags, draft flag, publish date.
5. **Albums and Photos:** image, caption, story, location, date, alt text, order.
6. **Achievements:** kind, exact result, certificate image, link to a project.

General behaviour: required alt text on every image, slugs generated from titles, an `order` number field for manual ordering (lower comes first, since drag-and-drop is not available), and a draft flag on posts, projects and photos. Future-dated posts stay hidden until the next rebuild, and a daily scheduled rebuild publishes them. Optionally, save changes to a branch first to get a Vercel preview link before they go live.

## 9. Content model

Everything lives in the `content/` folder of the repo. Each file is checked against a schema at build time. Drafts and future-dated entries are left out of the public build.

- **settings (one file):** display\_name, tagline, hero\_image, hero\_focal\_point, hero\_credit\_lines (list of label/value), about\_short, about\_long, portrait, contact fields plus a visibility flag for each, socials (Facebook, Instagram, GitHub, LinkedIn, YouTube, others), cv\_file, stats\_config, seo defaults.
- **projects (one file each):** slug, title, tagline, body (Markdown), status, role, start and end dates, tags, links (live, repo, demo, video), cover\_image, images, accent\_color, is\_primary, featured, order, draft. The build fails if more than one project is primary.
- **skills (one file):** a list of name, category (data, software, tools, other), level, icon, order, visible.
- **posts (one file each):** slug, title, excerpt, body (Markdown), cover\_image, category, tags, publish\_date, draft, seo fields. Reading time is calculated at build.
- **categories (one file):** name, slug, order.
- **albums (one file each):** slug, title, description, cover\_photo, order.
- **photos (one file each):** album, title, caption, story (Markdown), alt\_text, location\_name, latitude, longitude, taken\_at, tags, image path, order, draft. Width, height, smaller sizes and the blur placeholder are generated at build.
- **achievements (one file each):** title, event\_name, kind (hackathon, ctf, competition, other), result (winner, podium, finalist, participant), result\_text, organizer, date, team, role, summary, links, certificate\_image, project (optional), featured, draft.

Images live in `public/images/`. Use one helper function that turns an image path into a URL, so the images can move to an external host later without touching any page.

## 10. Image pipeline

Photos are the heaviest thing on the site and many visitors will be on mobile data, so every photo is stored at web size, never as a hi-res original.

1. Before adding a photo, export it at about 2000px on the long edge as JPEG or WebP (quality around 80). Aim for under 500KB each.
2. Add it through the admin screen, or drop it into the images folder and commit.
3. A `sharp` build script creates smaller sizes (about 400px and 1200px) and a tiny blur placeholder, and re-encodes every image so GPS and other camera data are not published. Location appears only if I type it into the location field.
4. Pages display images with `next/image` and correct `sizes`. The hero image gets priority loading; everything else loads lazily. The agent should check the host's free image-optimisation limits and explain which approach it chose.
5. Videos are not hosted; embed YouTube links instead.
6. Repo budget: Git keeps history forever, so never commit large originals and delete them later. Start with 15 to 20 photos, which should stay well under 100MB in total. If the repo ever nears 1GB, move the images to Cloudinary or Cloudflare R2 (the single image-URL helper from section 9 makes that a small change).

## 11. Security and privacy

- There is no database, and nothing can be written from the public site. Only someone with write access to the GitHub repo can change content.
- **Public or private repo:** if the repo is public, every file in it, including drafts, is readable by anyone. Keep drafts out of a public repo, or make the repo private (Vercel can build private repos).
- Contact form: honeypot field, Turnstile, the provider's rate limiting, and server-side validation. API keys live in environment variables only.
- Security headers and a Content Security Policy; no secrets in the browser bundle.
- Dependabot or equivalent for dependency updates.
- Backups come from Git history; optionally mirror the repo to a second remote.

## 12. SEO, performance and accessibility

- Per-page metadata, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`, RSS, and JSON-LD `Person` data on the landing page.
- Targets on mobile: Lighthouse 90 or higher for Performance, Accessibility, Best Practices and SEO; Largest Contentful Paint under 2.5 seconds on a throttled connection.
- Keyboard-navigable everywhere (folders, gallery, cabinet, menus), visible focus states, semantic landmarks, reduced-motion fallbacks.

## 13. Build phases

Each phase ends with a working, deployed preview.

**Phase 0: Foundation.** Repo, Next.js, Tailwind, design tokens, fonts, noise overlay, base layout, glass navbar with the scroll-morphing logo, footer with the scroll-linked giant name, placeholder pages for every route, first deploy to Vercel.

**Phase 1: Content system and admin core.** Install the CMS (Keystatic first), create the `content/` folder and schemas (section 9), add clearly marked placeholder content files, set up GitHub login for `/admin`, build the site settings collection and the image build script (section 10). The landing page now reads its settings from the content files.

**Phase 2: Landing page.** Hero, stats, about, skills, blog overview, all wired to the content files with sensible empty states.

**Phase 3: Projects.** Folder switcher component (desktop and mobile), projects overview on the landing page, `/projects`, `/projects/[slug]`, and the Projects collection in admin with order and primary flag.

**Phase 4: Blog.** List and post pages, markdown rendering, categories and tags, RSS, the Blog posts collection with draft flag and publish date, and a daily scheduled rebuild.

**Phase 5: Gallery.** Journal coverflow, grid view, albums, search, deep links, and the Albums and Photos collections.

**Phase 6: Achievements.** Trophy cabinet UI, detail panel, filters, and the Achievements collection.

**Phase 7: About and Contact.** About page with timeline, contact form with email delivery and spam protection, CV file download.

**Phase 8: Polish and hardening.** SEO, Open Graph images, performance pass, accessibility audit, security review, analytics, 404 page, final QA.

**Phase 9: Launch.** Custom domain, production environment variables, real content entered through the admin screen, Search Console submission.

## 14. YOU: manual tasks and content to prepare

- Create accounts: GitHub repo, Vercel, an email-sending service (Resend or Formspree), Cloudflare Turnstile.
- Decide whether the repo is public or private (see section 11).
- Choose a domain name (optional at first; the free Vercel address works for testing).
- Decide the exact display name for the hero and footer (the logo reads Tariq Youhana Leon).
- Prepare a high-resolution hero photo with calm space where text can sit, and a portrait, then export both at web size.
- Prepare the logo: confirm the background is transparent (remove it if it is solid black) and, if possible, convert it to an SVG vector. Keep the original as the source file.
- Gather photos with a caption, location and date for each, exported at about 2000px on the long edge. Start with 15 to 20, not hundreds.
- For each project, write 3 to 5 sentences: the problem, what you built, the tools, and the honest status.
- List your hackathons, CTFs and competitions with the exact result of each.
- Export your CV as a PDF.
- Collect your social profile links and decide which contact details to show publicly.
- Write the short About text and a first blog post.

## 15. Extras worth adding

- **CV download** button in the navbar and footer.
- **Command palette** (Ctrl+K) to jump to any page or post.
- **Now page:** a short, editable 'what I am working on right now'.
- **Availability badge** in the hero (for example, open to internships or projects), toggled in admin.
- **Light 'paper' theme** alongside the dark default.
- **Auto-generated Open Graph images** so shared links look good.
- **Bangla language option** later, once the English site is stable.
- **Case studies from Tenstral** as blog posts or project pages, which helps attract clients.

## 16. Definition of done

- Every piece of content can be created, edited, reordered and deleted from `/admin`, with no code changes.
- Public visitors can see only published content; the admin cannot be accessed without logging in.
- All pages work at 360px and at desktop widths, by touch, mouse and keyboard.
- Reduced-motion users get a calm version of every animation.
- Lighthouse targets in section 12 are met on the deployed site.
- Nothing on the live site is placeholder, invented or mislabelled.
