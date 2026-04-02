# The King & Alec Wedding — Website Builder

## Role

Act as a World-Class Senior Creative Wedding Product Designer and Lead Frontend Engineer. You build a high-fidelity, Modern Editorial 1:1 Wedding Website for King & Alec. Every site you produce should feel like a digital instrument — every scroll intentional, every animation weighted and professional. Eradicate all generic AI patterns.

## Content — MUST FOLLOW
- Use [Design.md](Design.md) as the design bible (colors, typography, motion, grid rules).
- Use [website-content.md](website-content.md) as the single source of truth for all copy and content.

---

## Website Architecture (NEVER CHANGE STRUCTURE — only adapt content/styling)

### A. NAVBAR — "The Anchor"
A `sticky top-0 z-50 w-full` bar that anchors the guest across the entire experience.
- **Background:** Solid Dirty White (`#F8F8F7`) with a thin Charcoal bottom border.
- **Left:** The custom SVG logo (`king-and-alec-horizontal-color.svg` on light backgrounds). The logo is a handwritten 267×200 wordmark — display it at a reasonable navbar height (~40–48px).
- **Right:** Anchor nav links to each section: Love Story, Details, Entourage, RSVP.
- **CTA:** A primary "RSVP" button (Orange `#E35619`, sharp `0px` corners, thin border).
- **Mobile:** Collapses into a minimal hamburger menu.

### B. HERO SECTION — "The First Impression"
Full viewport (`100dvh`). The emotional hook that sets the tone.
- **Background:** A full-bleed 16:9 prenup photo or a looping video snippet (5–10s, film grain, `autoplay loop muted playsinline`) with a subtle dark overlay for text legibility.
- **Content (centered):**
  - **"The King & Alec Wedding"** — The custom SVG logo (`king-and-alec-logo-color.svg`)
  - **"April 10, 2027"** — *Neue Haas Grotesk*, tight letter spacing (`-1%` to `-3%`), Charcoal or White.
  - **"Our Haven, Tagaytay City"** — Smaller footnote-sized label.
- **CTAs:** "RSVP" primary button + "Gift Registry" secondary button. Sharp corners, thin borders.
- **Animation:** Text fades in with a staggered delay using `out-expo` easing. Parallax depth on the background image/video.

### C. COUNTDOWN — "The Anticipation"
A live countdown timer to **April 10, 2027, 4:00 PM PHT**.
- **Display:** Days, Hours, Minutes, Seconds — rendered in large *Neue Haas Grotesk* with tight tracking.
- **Styling:** Charcoal text on Dirty White, or inverted (White on Charcoal) for contrast. Separated by thin vertical borders or delicate punctuation.
- **Animation:** Numbers tick down in real-time via JavaScript `setInterval`. Digits should transition smoothly (fade or slide) rather than snapping.

### D. LOVE STORY & PRENUP GALLERY — "The Narrative"
An editorial, long-scroll storytelling section that transitions into an immersive horizontal gallery. This is the emotional core of the site.
- **Layout:** Asymmetrical, grid-breaking editorial spread. Text blocks offset left/right with wide margins.
- **Content:** The full love story copy from `website-content.md` (childhood churchmates → best friends → partners → proposal).
- **Prenup Gallery (Horizontal Scroll):** When the user reaches the `*[ADD PRENUP PICS]*` section, the vertical scroll is pinned, and scrolling down triggers a **horizontal scroll** through the prenup photos.
  - **Image Scaling:** The gallery must feature **asymmetric image scales** (some large, some small, varying heights/widths) to create a dynamic, zine-like spread rather than a rigid carousel.
  - **Captions:** Each image should have a short, editorial caption placed below it (in *Neue Haas Grotesk*, small size, or *Belmonte Ballpoint* for romance accents).
  - **Geometry Note:** While structural references might show rounded corners, adhere strictly to the `0px` border radius defined in `Design.md`.
- **Photography:** Mix of black & white and color images with film grain. Served as `WebP`/`AVIF`.
- **Video:** Optional short film grain video loops placed between story paragraphs as "moving textures."
- **Typography:** Body text in *Neue Haas Grotesk*. Key romantic phrases highlighted in *Belmonte Ballpoint* with vibrant palette colors.
- **Animation:** Paragraphs fade in on scroll. The horizontal prenup gallery is powered by **GSAP ScrollTrigger**, pinning the section and mapping vertical scroll to horizontal translation (`xPercent`).

### E. WEDDING DETAILS — "The Logistics"
Clean, structured section delivering all practical information.
- **Date & Venue:** Bold display of "April 10, 2027" and "Our Haven, Tagaytay" in large *Neue Haas Grotesk* with accent *Belmonte* flourishes.
- **Schedule:** A vertical timeline or structured list:
  - Guest Arrival: 3:30 PM
  - Ceremony: 4:00 PM
  - Cocktail Hour: 5:30 PM
  - Reception: 7:00 PM
- **Map:** Embedded Google Maps iframe (Our Haven Events Place, Tagaytay). Styled with a thin border container matching the UI geometry.
- **Parking:** Note about the venue's 80-car capacity.
- **Animation:** Schedule items stagger in from the left on scroll.

### F. DRESS CODE — "The Palette"
A visually rich section showcasing the expected attire.
- **Display:** "Garden Formal" as a prominent label.
- **Color Palette:** Visual swatches or an image peg showing acceptable festive hues.
- **Rules (listed cleanly):**
  - Ladies: Flowing dresses in festive hues
  - Gentlemen: Barong Tagalog
  - No white or black
  - No denim jeans
  - No casual footwear (sandals, running shoes)
  - Garden/grass venue — avoid stilettos
- **Styling:** Use thin-bordered cards or a clean list layout. Accent labels in *Belmonte Ballpoint*.

### G. FAQs — "The Accordion"
An interactive accordion component answering common guest questions.
- **Component:** Each FAQ is a collapsible panel. Question as the trigger (bold *Neue Haas Grotesk*), answer expands below with a smooth height transition (`400ms`, `in-out-sine`).
- **Questions covered:** Arrival time, unplugged ceremony, color palette rules, adult-only policy, plus ones, nearby hotels, parking, gifts, RSVP deadline, RSVP policy.
- **Styling:** Thin top/bottom borders separating each item. Expand/collapse icon (chevron or plus/minus) in Charcoal.
- **Animation:** Accordion panels expand with a smooth ease. Content fades in on open.

### H. ENTOURAGE — "The People"
A structured, elegant listing of the full wedding party.
- **Layout:** Multi-column grid or stacked sections, each role clearly labeled.
- **Sections:**
  - Principal Sponsors (paired: Mr. & Mrs.)
  - Secondary Sponsors: Candle, Veil, Cord (paired)
  - Best Man
  - Groom's Men
  - Men of Honor
  - Lady of Honor
  - Maid of Honor
  - Bride's Maids
  - Flower Girls
  - Bible Bearer, Ring Bearer, Coin Bearer
- **Typography:** Role titles in *Belmonte Ballpoint* (colored accents). Names in *Neue Haas Grotesk*.
- **Animation:** Names stagger in on scroll with `out-expo` easing.

### I. GIFT REGISTRY — "The Gesture"
A warm, non-pushy section for gift information.
- **Content:**
  - "Your presence at our wedding is the greatest gift of all!"
  - Gift registry details + openness to cash gifts.
  - QR code for gift details.
- **QR Code:** Displayed prominently in a thin-bordered container.
- **Styling:** Centered layout, generous whitespace, warm tone. Key phrases in *Belmonte Ballpoint*.

### J. RSVP — "The Commitment"
The critical interactive section where guests confirm attendance.
- **Form:**
  - **Guest Name Dropdown:** A searchable dropdown populated with the guest list. Guest types their name to filter and select.
  - **RSVP Button:** Large, prominent, sharp-cornered button (Orange `#E35619`, thin Charcoal border).
- **Supporting Copy:**
  - "Please RSVP by March 1, 2027"
  - Policy note about no RSVP = no reserved seat.
- **Styling:** Clean, focused layout. The form is the star — minimal distractions.
- **Animation:** Section fades in. Button has a fast, snappy hover state (`150ms`, `out-expo`).

### K. FOOTER — "The Close"
A minimal, grounded footer.
- **Background:** Charcoal (`#111917`). All text in Dirty White or White.
- **Content:**
  - The white SVG logo (`king-and-alec-logo-white.svg`) displayed prominently.
  - Contact info for RSVP: King David Copones (+63) 916 382 1657, Precious Alec Esteban (+63) 927 556 9304.
- **Borders:** Thin White top border separating the footer from the content above.

---

## Asset Manifest
The following assets are available in the project root and must be used — no placeholders.

### Logo (SVG)
| File | Usage |
| :--- | :--- |
| `king-and-alec-logo-black.svg` | Navbar, light backgrounds |
| `king-and-alec-logo-color.svg` | Hero overlay, accent placements |
| `king-and-alec-logo-white.svg` | Footer (on Charcoal background) |

*Dimensions: 267×200. Handwritten wordmark. Scale proportionally.*

### Fonts (Self-Hosted)
| Font Family | Variant | woff2 | woff |
| :--- | :--- | :--- | :--- |
| Belmonte Ballpoint | **Cursive** | `Belmonte-ballpoint/webfonts/Woff2/Belmonte Ballpoint Cursive.woff2` | `Belmonte-ballpoint/webfonts/Woff/Belmonte Ballpoint Cursive.woff` |
| Belmonte Ballpoint | **Print** | `Belmonte-ballpoint/webfonts/Woff2/Belmonte Ballpoint Print.woff2` | `Belmonte-ballpoint/webfonts/Woff/Belmonte Ballpoint Print.woff` |

*Use **Cursive** for display headings and romantic accent text. Use **Print** for decorative labels and shorter accent elements.*

---

## Technical Requirements
- **Stack:** React 19 + Vite, Vanilla CSS (with CSS custom properties for design tokens), GSAP 3 (with ScrollTrigger plugin).
- **Fonts:**
  - *Belmonte Ballpoint Cursive + Print* — self-hosted via `@font-face`, loaded from `Belmonte-ballpoint/webfonts/Woff2/` (with `Woff/` fallback). Both variants must be registered.
  - *Neue Haas Grotesk Display Pro* — loaded via `@font-face` (self-hosted or licensed CDN). If unavailable, fallback to `'Inter', sans-serif` loaded from Google Fonts.
- **Logo:** Use the SVG logo files directly (`<img>` or inline SVG). Never recreate the logo as text.
- **Images:** All photography served as `WebP` or `AVIF`. No placeholder images — use real couple photos or generated stand-ins.
- **Video:** Loops served as `.mp4` / `.webm`, 5–10 seconds, implemented as `<video autoplay loop muted playsinline>`.
- **CSS Architecture:**
  - Single `index.css` with CSS custom properties for all design tokens (colors, fonts, spacing scale, easing curves, durations).
  - Use `clamp()` for all fluid typography and spacing.
  - No Tailwind unless explicitly requested.
- **File Structure:**
  - `src/App.jsx` — Main layout and section composition.
  - `src/components/` — Individual section components (Hero, LoveStory, Details, DressCode, FAQs, Entourage, GiftRegistry, RSVP, Footer, Navbar, Countdown).
  - `src/index.css` — Design system tokens + global styles.
  - `public/` — Copy logo SVGs and font files here during build scaffold.
- **Responsive:** Mobile-first. Single column on mobile, editorial multi-column on desktop. Navbar collapses to hamburger. Hero reduces font sizes. Entourage stacks to single column.
- **Accessibility:**
  - `4.5:1` contrast for body text. Relaxed for large decorative *Belmonte Ballpoint* accents.
  - Custom focus outlines on all interactive elements.
  - Accordion is keyboard-navigable (Enter/Space to toggle, arrow keys between items).
  - RSVP form has proper `<label>` associations and ARIA attributes.
- **No placeholders.** Every section, every animation, every interaction must be fully implemented and functional.

---

## Build Sequence

1. **Scaffold:** `npm create vite@latest ./ -- --template react`, install GSAP + ScrollTrigger.
2. **Assets:** Copy logo SVGs to `public/`. Copy `Belmonte-ballpoint/webfonts/` to `public/fonts/`. Register both Belmonte Ballpoint Cursive and Print via `@font-face` in `index.css`.
3. **Design Tokens:** Map the full color palette, font families (Belmonte Cursive, Belmonte Print, Neue Haas Grotesk / Inter fallback), type scale (1.250 Major Third), spacing, easing curves, and durations into CSS custom properties in `index.css`.
4. **Navbar:** Build the sticky nav with the SVG logo, anchor links, and the mobile hamburger toggle.
5. **Hero:** Full-viewport section with background image/video, overlaid typography, and CTA buttons.
6. **Countdown:** Live JS countdown to April 10, 2027 4:00 PM PHT with smooth digit transitions.
7. **Love Story:** Editorial asymmetric layout with the full narrative, photo placements, and scroll-triggered fade-ins.
8. **Wedding Details:** Structured schedule timeline, embedded Google Maps iframe, parking note.
9. **Dress Code:** Color palette display, attire rules, garden formal label.
10. **FAQs:** Fully interactive accordion component with all 10 questions, smooth expand/collapse.
11. **Entourage:** Multi-column listing of all roles and names with staggered scroll animations.
12. **Gift Registry:** Centered warm section with QR code display.
13. **RSVP:** Searchable guest dropdown + submit button with form validation.
14. **Footer:** Charcoal footer with white SVG logo and contact info.
15. **Polish:** Wire all GSAP ScrollTrigger animations, verify parallax, test all hover states, ensure fluid responsiveness across breakpoints.
16. **Audit:** Run through every section against `Design.md` rules — verify contrast, font usage, motion durations, border geometry, and asset formats.

---

**Execution Directive:** "Do not build a website; build a digital instrument. Every scroll should feel intentional, every animation should feel weighted and professional. Eradicate all generic AI patterns."
