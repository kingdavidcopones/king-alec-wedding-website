# 🎨 The King & Alec Wedding - Visual Direction

## 1. Visual Direction
**Modern Editorial + Playful Handwritten Accent**

*Description:* The visual language strikes a delicate balance between a high-end, sophisticated lifestyle editorial and the lighthearted, personal warmth of the couple. The editorial aspect brings structure, clean lines, and crisp readability, while the handwritten accents act as spontaneous "notes" of joy, breaking the grid and adding a charming, intimate touch. 

---

## 2. Colors
The palette is vibrant, festive, and modern, grounded by clean neutral foundations.

| Color Name | Hex Code | Preview / Usage |
| :--- | :--- | :--- |
| **Orange** | `#E35619` | Accents, highlights, buttons |
| **Pink** | `#FF3E8F` | Accents, graphical elements |
| **Blue** | `#007CEF` | Accents |
| **Yellow** | `#E8B80D` | Highlights |
| **Violet** | `#C640E1` | Fun pops of color |
| **Green** | `#068E40` | Secondary accents |
| **Dirty White** | `#F8F8F7` | Primary background color |
| **Charcoal** | `#111917` | Primary text color |
| **White** | `#FFFFFF` | Card backgrounds, overlapping sections |

---

## 3. Typography

### Primary Typography: *Neue Haas Grotesk Display Pro*
Provides the modern, editorial foundation of the website.
- **Usage:** Paragraphs, Body Text, Labels, Footnotes.
- **Rules:** 
  - Letter spacing must be set to tightly tracked **`-1%` to `-3%`** for that crisp, editorial feel.
  - Text color will generally be Charcoal or White.

### Accent Typography: *Belmonte Ballpoint*
The fun, personal juxtaposition to the strict editorial font.
- **Usage:** Displays, Accents, Decorative elements.
- **Rules:**
  - The vibrant colors from the palette (Orange, Pink, Blue, etc.) will be applied *exclusively* to this handwritten font.
  - This color application can be styled dynamically (e.g., switching colors per word or per statement) to create colorful pops of emphasis across the site.

### Engineering & Implementation: The Type Scale
*Establishes a mathematical sizing scale for harmony and enforces strict line heights to uphold the rigid editorial feel.*
- **Scale:** Use a mathematical scale (like 1.250 Major Third) for harmony between H1 and body text.
- **Line Height:** Every heading must have a tight line height (`1.1` to `1.3`) to maintain "editorial tightness" in layouts.

---

## 4. Design Elements & Assets

### Imagery, Video & Photography Style
A nostalgic yet high-end aesthetic will be achieved through the use of **film grain**. The photography will feature a curated mix of **black & white and vibrant colored imagery** to emphasize both the raw, timeless emotion and the bright joy of the moments captured.
- **Video Loop Snippets (Aesthetics):** Short, cinematic video loops should emulate vintage 8mm or 16mm film. These snippets should perform as "moving textures" that feel like candid, intimate moments rather than heavily produced scenes.
- **Performance (Images):** All heavy editorial photography should be served as highly compressed `WebP` or `AVIF`.
- **Performance (Video):** Video loops must be kept short (5-10 seconds) and served as optimized `.mp4` or `.webm` files. Always implement using strictly silent background properties (`<video autoplay loop muted playsinline>`).
- **Performance (Vectors):** Use vector-based animations (`Lottie` or `SVG`) for icons and micro-interactions to ensure absolute sharpness.

### UI Components & Geometry
Staying true to the crisp, modern editorial structure, the UI elements will maintain architectural exactness.
- **Geometry:** Strict **sharp corners** for all buttons, cards, and containers (e.g., `0px` border radius).
- **Borders:** Consistent use of **thin borders** to delineate sections and highlight interactions cleanly, without adding heavy visual weight.
- **Contrast (A11y):** Maintain a `4.5:1` ratio for primary body text, but explicitly relax this rule for large *Belmonte Ballpoint* decorative accents (e.g., Yellow on Dirty White) to preserve the vibrant brand aesthetic.
- **Focus States (A11y):** Never "reset" or remove the focus outline without providing a custom, high-visibility alternative for keyboard users.

### Motion & Animations
The website will feel alive and dynamic, balancing high-end elegance with a sense of playfulness.
- **Scrolling:** Smooth **parallax scrolling** will create a layered, dimensional feel, positioning images and text at different speeds.
- **Entry:** Elements will use soft, elegant **fade-ins** as they enter the viewport or are triggered by scroll.
- **Interactions:** Buttons and clickable elements will feature **fast, snappy hover states** instead of bounces, offering a clean response that perfectly aligns with the strict `0px` geometric architecture.

#### Expected Implementation: The Motion Manifesto
*Standardizes CSS animation for polished, intentional movement.*
- **Intent:** No element moves without a reason. Animation serves as the bridge between design and code.
- **Curves:** Standardize bezier curves. Avoid "linear"; use `out-expo` for snappy entrances and `in-out-sine` for subtle loops.
- **Duration:** Fast micro-interactions for UI (`150ms` - `250ms`) and slower, elegant durations for page transitions (`400ms` - `600ms`).

### Grid & Spacing
A bold, editorial layout strategy that is unafraid of negative space.
- **Margins:** Characterized by **wide margins** that allow the content and typography to breathe.
- **Layout Strategy:** Deliberately **breaking the grid** by utilizing asymmetrical alignments and **overlapping text / images**, achieving a high-fashion, zine-like editorial spread.

#### Expected Implementation: The "Fluid" Grid
*Replaces static, jumpy breakpoints with fluid scaling.*
- **Fluidity:** Use CSS `clamp()` for typography and spacing so the design scales completely smoothly from mobile screens up to big monitors.
- **Grid Flexibility:** Define strict 12-column gutters and margins, but allow for dedicated "breakout" sections where images span 100% of the viewport width.
