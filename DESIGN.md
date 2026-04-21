# Design Brief

## Vision
Clean, modern AI chat interface optimized for extended conversational sessions. Emphasizes clarity, efficiency, and approachability without visual noise. Dark mode primary with subtle blue-grey palette for tech credibility.

## Differentiation
User messages right-aligned on accent backgrounds; AI responses left-aligned on card surfaces with subtle borders. Loading states use delicate pulsing animations. No gradients or decorative elements — hierarchy through typography and strategic spacing.

## Color Palette (OKLCH)

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Primary | `0.5 0.12 248` | `0.65 0.15 248` | Buttons, send actions, primary interactions |
| Accent | `0.58 0.18 260` | `0.7 0.2 260` | User message background (indigo) |
| Background | `0.97 0.01 210` | `0.1 0.01 210` | Page canvas |
| Card | `0.99 0.01 210` | `0.135 0.01 210` | AI message containers, subtle contrast |
| Muted | `0.9 0.01 210` | `0.165 0.01 210` | Disabled states, secondary UI |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Error states, delete actions |

## Typography
- **Display/Header**: Figtree (geometric, modern, professional)
- **Body/Chat**: Figtree (consistent, readable, friendly)
- **Mono**: GeistMono (code snippets, fixed-width content)

## Structural Zones

| Zone | Treatment | Rationale |
|------|-----------|-----------|
| Header | `bg-background` with subtle `border-b border-border` | Minimal, grounded, differentiates from content |
| Message Thread | `bg-background` scrollable container | Maximum content space, clean separation |
| Input Area | `bg-background` with `border-t border-border` | Sticky footer, always accessible |
| User Message | `bg-accent` rounded-2xl, right-aligned, max-w-xs | High visual contrast, clear directionality |
| AI Message | `bg-card` with `border border-border`, left-aligned, max-w-lg | Subtle depth, scannability |

## Spacing & Density
- Message bubbles: 16px margin-bottom, 16px horizontal padding, 12px vertical padding
- Input field: 16px padding, 8px border radius
- Header/Footer: 16px padding, 12px vertical rhythm
- Mobile-first: 100vw width at `sm:`, max-w-2xl at `lg:`

## Component Patterns
- **Message Bubble**: `animate-message-slide` on render for smooth entry
- **Input Field**: `.message-input` utility with focus ring styling
- **Loading State**: Three dots using `.loading-dot` with `animate-pulse-subtle`
- **Send Button**: Uses `bg-primary` with hover state at `opacity-90`

## Motion
- **Message Entry**: 0.3s ease-out slide-fade (subtle, not distracting)
- **Loading Pulse**: 1.5s cubic-bezier loop on indicator dots
- **Transitions**: All interactive elements use smooth 0.3s cubic-bezier(0.4, 0, 0.2, 1)

## Constraints
- No shadows on message bubbles (border instead for depth)
- No gradients or decorative patterns
- Consistent 0.5rem border-radius for cards
- Maximum message width prevents line-length readability issues
- Mobile-first responsive breakpoints at 640px (`sm:`) and above

## Logo & Branding
- **Logo**: Synapse icon — neural network visualization with central node connected to 8 satellite nodes
- **Logo Style**: Minimalist, uses `currentColor` for theme adaptation (light/dark mode via CSS)
- **Logo Size**: 24px default, scales with header
- **Logo Placement**: Left of "Synapse AI" text in header, 8px gap between icon and text
- **Logo Color**: Inherits from `--foreground` via `currentColor`, adapts to light/dark mode automatically

## Signature Detail
Accent color (indigo #8060f0) uniquely reserved for user messages — creates immediate visual scanning clarity. AI responses deliberately understated with card borders, not background fills. Logo reinforces "neural" theme without visual weight.
