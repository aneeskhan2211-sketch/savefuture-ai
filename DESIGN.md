# Design Brief

## Direction

SaveFuture AI — premium fintech SaaS for personalized savings, career guidance, and 10-year life planning targeting students, freshers, and low-income workers.

## Tone

Refined fintech with trustworthy, emotional depth; clean cards with subtle depth, smooth Framer Motion animations, and floating financial stat cards that establish premium positioning without sterility.

## Differentiation

Circular progress rings with teal-to-gold gradient fills, bottom mobile navigation optimized for emerging markets, and finance-style card hierarchies with contextual premium lock overlays.

## Color Palette

| Token           | OKLCH           | Role                                  |
| --------------- | --------------- | ------------------------------------- |
| background      | 0.98 0.008 260  | Light off-white (light mode primary) |
| foreground      | 0.12 0.02 260   | Deep navy text                        |
| card            | 1.0 0.0 0       | Pure white elevated surfaces          |
| primary         | 0.65 0.2 190    | Teal for trust, growth, CTAs          |
| accent          | 0.72 0.15 60    | Gold for premium, highlights          |
| muted           | 0.94 0.01 260   | Subtle backgrounds, dividers          |
| destructive     | 0.55 0.22 25    | Warm red for warnings, errors         |
| dark background | 0.12 0.02 260   | Deep navy (dark mode primary)         |
| dark card       | 0.18 0.022 260  | Elevated charcoal (dark mode cards)   |

## Typography

- Display: **Space Grotesk** — bold fintech headings, tech/SaaS trust signal
- Body: **DM Sans** — clean, modern, high-readability UI labels and paragraphs
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl font-bold`, label `text-sm font-semibold uppercase`, body `text-base`

## Elevation & Depth

Card-based hierarchy with soft elevated shadows: `elevated` (1px subtle), `premium` (4px raised for hero/dashboard hero sections), and `card` (2px default card). No neon or glow effects.

## Structural Zones

| Zone    | Background | Border                            | Notes                                         |
| ------- | ---------- | --------------------------------- | --------------------------------------------- |
| Header  | card       | 1px muted with opacity           | Sticky nav with bottom border                 |
| Content | background | —                                 | Light #F8FAFC; dark mode #0F1B35              |
| Cards   | card       | 1px border-border, rounded 8-12px | Finance-style with elevated shadow            |
| Footer  | muted/30   | 1px muted top                     | Secondary action zone, spacious rhythm        |
| Sidebar | sidebar    | 1px sidebar-border                | Bottom nav bar on mobile, vertical on desktop |

## Spacing & Rhythm

Hierarchical spacing: section gaps 32px (lg:48px), card groups 24px, component micro-spacing 8px/12px. Tighter density in dashboards, spacious rhythm on landing page.

## Component Patterns

- **Buttons**: Teal primary (`bg-primary text-primary-foreground`), white secondary, gold accent for premium CTAs. Rounded 8px. Hover: opacity shift via transition-smooth. No shadows.
- **Cards**: White background, 1px border-border, rounded 8-12px, elevated shadow. Premium cards use 4px premium shadow. Lock overlay: blur + gradient with upgrade CTA.
- **Progress**: Circular rings with teal-to-gold gradient, animated stroke on load. Linear progress bars use `progress-gradient` utility.
- **Badges**: Teal for Free/active, navy for Premium, gold for Lifetime. Rounded full (pill).

## Motion

- **Entrance**: `fade-in-up` (0.5s ease-out, 12px upward) on dashboard card load, staggered per group
- **Hover**: Button opacity 0.9 → 1.0, card slight lift (1-2px via transform), all via `transition-smooth`
- **Decorative**: Subtle pulse on savings score ring, slide-in-right for toast notifications

## Constraints

- Mobile-first, bottom navigation (5 icons: Home, Dashboard, Career, Business, Profile)
- Token-only colors: no raw hex or arbitrary Tailwind colors
- OKLCH functions only; no mixing with hsl()/rgb()
- Fintech trust aesthetic; no playful gradients or overanimation
- Premium lock pattern: blur background + gold CTA overlay
- Charts: teal primary (65 0.2 190), navy secondary (40 0.1 260), gold accent (72 0.15 60), purple (60 0.18 280), green (55 0.16 150)

## Signature Detail

Floating financial stat cards on hero section with subtle parallax and teal accent underlines establish premium positioning; paired with smooth fade-in-up animations on dashboard load create a cohesive emotional journey from aspirational hero to actionable dashboard.
