---
name: Cho-log
colors:
  surface: "#fbf9f8"
  surface-dim: "#dcd9d9"
  surface-bright: "#fbf9f8"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f6f3f2"
  surface-container: "#f0eded"
  surface-container-high: "#eae8e7"
  surface-container-highest: "#e4e2e1"
  on-surface: "#1b1c1c"
  on-surface-variant: "#424843"
  inverse-surface: "#303030"
  inverse-on-surface: "#f3f0f0"
  outline: "#727973"
  outline-variant: "#c1c8c1"
  surface-tint: "#436651"
  primary: "#163826"
  on-primary: "#ffffff"
  primary-container: "#2d4f3c"
  on-primary-container: "#9ac0a7"
  inverse-primary: "#a9cfb7"
  secondary: "#4a654f"
  on-secondary: "#ffffff"
  secondary-container: "#c9e7cc"
  on-secondary-container: "#4e6953"
  tertiary: "#32322d"
  on-tertiary: "#ffffff"
  tertiary-container: "#494843"
  on-tertiary-container: "#b9b7b0"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#c5ecd2"
  primary-fixed-dim: "#a9cfb7"
  on-primary-fixed: "#002112"
  on-primary-fixed-variant: "#2c4e3b"
  secondary-fixed: "#cceacf"
  secondary-fixed-dim: "#b0ceb4"
  on-secondary-fixed: "#062010"
  on-secondary-fixed-variant: "#334d38"
  tertiary-fixed: "#e5e2db"
  tertiary-fixed-dim: "#c9c6c0"
  on-tertiary-fixed: "#1c1c18"
  on-tertiary-fixed-variant: "#474742"
  background: "#fbf9f8"
  on-background: "#1b1c1c"
  surface-variant: "#e4e2e1"
typography:
  display-lg:
    fontFamily: >
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.1"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: >
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif
    fontSize: 32px
    fontWeight: "600"
    lineHeight: "1.2"
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: >
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif
    fontSize: 28px
    fontWeight: "600"
    lineHeight: "1.2"
  headline-md:
    fontFamily: >
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif
    fontSize: 24px
    fontWeight: "600"
    lineHeight: "1.3"
  body-lg:
    fontFamily: >
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: >
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  label-md:
    fontFamily: >
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif
    fontSize: 14px
    fontWeight: "600"
    lineHeight: "1.4"
    letterSpacing: 0.05em
  label-sm:
    fontFamily: >
      "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont,
      system-ui, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif
    fontSize: 12px
    fontWeight: "500"
    lineHeight: "1.4"
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is rooted in the concept of organic growth and quiet community. It eschews the frantic density of traditional social platforms in favor of a **Minimalist and Modern** aesthetic that breathes. The personality is polite and professional, yet maintains a warm, approachable core through soft organic tones.

The target audience seeks a sanctuary for sharing experiences—a digital "third space" that feels as intentional as a curated lifestyle magazine but as accessible as a local neighborhood park. The UI should evoke a sense of calm, clarity, and mutual respect. High-quality whitespace is treated as a functional element to reduce cognitive load and emphasize the shared content.

## Colors

The palette is inspired by forest floors and natural light.

- **Primary (Deep Forest):** Used for key actions, brand moments, and structural emphasis. It provides a grounded, professional weight.
- **Secondary (Soft Sage):** Used for supportive elements, active states, and decorative accents that signify growth.
- **Background (Cream & Off-White):** A warm off-white replaces harsh pure white to reduce eye strain and feel more inviting.
- **Text (Charcoal):** A deep grey provides high legibility without the jarring contrast of pure black.

Success, warning, and error states should utilize muted, "dusty" versions of green, amber, and red to remain cohesive with the desaturated nature of the system.

## Typography

This design system uses **Pretendard** as the primary typeface for all weights—headlines and body alike—chosen for its balance between Latin and Hangul characters and its crisp numeral rendering (well suited to stats like member and study counts). Pretendard is loaded as a variable font with a system-font fallback stack to guarantee consistent rendering across platforms.

Headlines use heavier weights (600–700) with tighter tracking and leading to create a sophisticated, editorial impact. Body text uses a regular weight with generous line height (1.6x) to maintain the "spacious" visual mood and maximize readability.

## Layout & Spacing

The layout follows a **Fixed Grid** model for desktop to maintain the editorial, magazine-like feel, centering content with wide outer margins.

- **Desktop:** 12-column grid, 1200px max-width, 24px gutters.
- **Tablet:** 8-column grid, fluid width, 24px margins.
- **Mobile:** 4-column grid, fluid width, 16px margins.

Spacing follows a strict 4px base unit. Use larger increments (XL - 40px+) between major sections to emphasize the "clean and spacious" narrative. Content should "float" within containers rather than being cramped against borders.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Ambient Shadows**. Surfaces should not appear to "hover" high above the background; instead, they sit just above it, like paper on a desk.

- **Level 0 (Background):** The base off-white surface.
- **Level 1 (Cards/Sections):** Pure white background with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)).
- **Level 2 (Modals/Popovers):** Pure white with a slightly more defined shadow and a subtle 1px border in a pale grey-green.

Backdrop blurs (10px - 20px) are used sparingly for navigation bars to maintain context of the content beneath while ensuring text legibility.

## Shapes

The shape language is defined by **Medium Roundedness**. This strikes a balance between the clinical feel of sharp corners and the overly casual nature of pill shapes.

Standard components (buttons, input fields) use a 0.5rem (8px) radius. Larger containers, such as content cards, utilize 1rem (16px) to soften the overall visual footprint. This consistency in rounding communicates the "polite and warm" brand personality.

## Components

- **Buttons:** Primary buttons are solid Deep Forest green with white text. Secondary buttons use a Soft Sage ghost style (outline and text only). Padding is generous horizontally to create a "prominent but minimal" look.
- **Cards:** White background, Level 1 shadow, and 16px corner radius. Internal padding should be at least 24px (LG) to ensure a premium, airy feel.
- **Chips:** Used for community tags. These should have a very light sage background with Deep Forest text, using a pill shape to distinguish them from actionable buttons.
- **Input Fields:** Minimalist design with a 1px soft grey border. Upon focus, the border transitions to Soft Sage with a subtle outer glow. Labels are always placed above the field in `label-md` style.
- **Lists:** Clean, border-less lists with generous vertical spacing (16px) between items. Use subtle dividers only when content density is high.
- **Community Feed:** A specialized component utilizing a vertical timeline or masonry grid that emphasizes imagery and thoughtful typography over heavy UI "chrome."
