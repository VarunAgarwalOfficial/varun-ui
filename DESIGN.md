# varunUI Design Manual

This document is the human-facing design contract for varunUI. It defines the
product, visual language, component hierarchy, and decisions that every page,
block, component, email, and poster must follow.

The implementation lives in:

- `shell/tokens.css` for the pixel look's colours, frames and fonts. It is the
  one source; `src/lib/styles/tokens.css` mirrors it, and
  `scripts/registry/check-shell-tokens.mjs` fails if they drift.
- `src/lib/styles/tokens.css` for dimensions, radius, measure, and motion.
- `src/lib/styles.css` for the theme, color, and shared utilities.
- `.interface-design/system.md` for the expanded internal design contract.
- `npm run audit` for architecture and token enforcement.

When the implementation and this manual disagree, fix them together. Do not
leave design decisions documented but unenforced.

## 1. What varunUI is

varunUI is an opinionated Svelte system for building complete, colourful
products in the pixel look. It provides the decisions needed to move from tokens
to controls, compositions, page sections, complete pages, outgoing messages,
and social posters.

It should feel like a designer's proofing desk:

- a cream ground, brown ink and square corners;
- Pixelify Sans for headings and keys, Newsreader for reading text;
- Swiss editorial structure;
- simple Bauhaus geometry;
- pastel annotations and character scenes;
- small, purposeful micro-interactions.

It is not:

- a theme marketplace;
- a collection of cosmetic variants;
- an AI-specific interface kit;
- a set of unrelated landing-page sections;
- a dashboard made entirely from bordered cards;
- a place for one-off controls that bypass the system.

The test is simple: a varunUI screen should be recognizable before the logo is
visible, but it should still be useful when every decorative element is removed.

## 2. Design principles

### Opinion before options

Prefer one excellent default over several similar variants. Add an option only
when it represents a real context, state, or behavior—not a cosmetic preference.

### Structure before decoration

Establish reading order, measure, grouping, and action hierarchy first. Marker,
pastels, characters, and seals support that structure; they never rescue a weak
layout.

### Flat, not empty

varunUI uses no default visual depth. Where a shadow utility is used, it is a
flat drop of whole pixel steps (`--px-u`) in the frame orange, never a blur. Hierarchy comes from typography, spacing,
rules, solid muted fields, and named pastel fields. Flat does not mean every
surface looks identical.

### Color carries meaning

Primary identifies action and selection. Named pastels identify editorial roles.
Semantic colors report status. Data colors encode data. Color is never rotated
through a list merely to make adjacent items look different.

### Composition over prop rendering

Content is composed in markup. Props own behavior and state. Avoid APIs that pass
an entire heading, body, action, and media tree as unrelated label props.

### Every inconsistency must earn its place

Intentional asymmetry is welcome. Accidental drift is not. A different width,
radius, border, alignment, or color must communicate something the standard
treatment cannot.

## 3. Ownership hierarchy

The system flows in one direction:

`Tokens → Components → Pieces → Layouts → Blocks → Pages → App`

Emails and Canvases compose the same lower layers for constrained outputs.

| Layer      | Owns                                                                                | Must not own                               |
| ---------- | ----------------------------------------------------------------------------------- | ------------------------------------------ |
| Tokens     | Shared color, type, spacing, measure, radius, sizing, texture, and motion decisions | Product copy or layout markup              |
| Components | Reusable behavior, focus, keyboard support, state, and feedback                     | Business-specific content trees            |
| Pieces     | Small stateless content relationships                                               | Runtime state or page placement            |
| Layouts    | Geometry, flow, measure, columns, rails, and responsive collapse                    | Copy, decoration, or business nouns        |
| Blocks     | One bounded page job or domain interaction                                          | A private design system                    |
| Pages      | Complete route-level order and information flow                                     | Application persistence or side effects    |
| Emails     | One complete outgoing static message                                                | Email-client UI or JavaScript              |
| Canvases   | One ready-to-post square composition                                                | Alternate aspect ratios or fake product UI |
| App        | Routing, data, permissions, persistence, analytics, and integrations                | Reimplementing lower-level design rules    |

If an item does not clearly belong to one layer, remove it or move it until its
ownership is obvious.

“Primitive” is not a public catalog tier. Native HTML, Bits UI adapters, focus
management, and cross-browser mechanics are private implementation details in
`internal`. A visual treatment such as Link’s underline belongs to its public
Component; a meaningful content relationship such as Keyboard Shortcut belongs
to Pieces. Consumers should never assemble varunUI from half-styled substrate.

## 4. Theme: the pixel look

There is one theme, light only: the pixel look shared with the website and the
shell. A cream ground, brown ink, orange frame rules, and the pastels. The
`.dark` class and the theme helpers remain for the API, but dark keeps the
light values. Do not expose a theme toggle or a theme picker.

Never use purple or lavender. Where a role needs a cool accent, use the deep
blue, as the site does for "open".

There is no paper grain. The texture rules remain, switched off by token. Do
not add gradients, glass, backdrop blur, glossy treatments, or blurred
shadows.

## 5. Color system

`primary` is the only brand and action color. There is no secondary palette.
A secondary action is an information hierarchy role and uses an outline Button,
quiet Button, or Link.

### Named expressive colors

| Color                         | Meaning                             | Good uses                                                | Avoid                            |
| ----------------------------- | ----------------------------------- | -------------------------------------------------------- | -------------------------------- |
| Primary                       | Action, selection, signature        | Primary Button, selected state, poster registration mark | Decorative section backgrounds   |
| Yellow                        | Orientation and annotation          | Marker, captions, templates, upcoming events             | Success or people stories        |
| Blue                          | Product explanation and information | Search, product detail, imports, release information     | Destructive or protected actions |
| Green                         | Proof, success, and progress        | Completion, positive evidence, readiness                 | Unverified claims                |
| Pink                          | People and human context            | Contact, hiring, roles, support, speaker portraits       | Generic decoration               |
| Deep blue (`purple` tone key) | Security and deliberate review      | Verification, protected access, billing review           | Routine navigation               |
| Red                           | Failure, prohibition, and danger    | Destructive actions, failed payment, urgent warning      | Ordinary emphasis                |

### Pastel strengths

Pastels are mixed into the cream ground. Their strength is fixed:

- Content field: **15%**.
- Interactive field on hover or focus: **22%**.
- Character or artwork field: **25%**.

Use `surface-pastel`, `surface-pastel-interactive`, and
`surface-pastel-art`. Do not create direct `bg-blue/20`-style surfaces or
increase strength to compensate for weak hierarchy.

### Semantic and data colors

Use `danger`, `success`, `warning`, and `info` only for status. Data colors are
reserved for chart encoding. Color never carries required information alone;
pair it with labels, shape, position, or text.

## 6. Typography

| Role         | Typeface                     | Use                                                    |
| ------------ | ---------------------------- | ------------------------------------------------------ |
| Display      | Pixelify Sans / `font-pixel` | Headings, labels, buttons and keys; never running text |
| Text         | Newsreader / `font-sans`     | Body, navigation, controls and editorial moments       |
| Aligned data | IBM Plex Mono / `font-mono`  | Values, dates, code, folios, metadata                  |

Pixelify Sans has one weight. Headings, labels, buttons, `kbd` and legends use
it by default, with font synthesis off, so a bold class never fakes a bold.

Build hierarchy with size, weight, line-height, tracking, and measure before
using color.

- Display headings are compact, bold, and tightly tracked.
- Body text uses comfortable line-height and readable measure.
- Labels are small, semibold, and precise.
- Kicker text uses `--tracking-kicker`.
- Data uses tabular figures when values need to align.

Do not use mono or the pixel face for long prose.

## 7. Spacing and measure

The base unit is **4px**. Shared spacing should resolve to the established
rhythm rather than arbitrary values.

### Gaps

| Token              | Value | Typical use                |
| ------------------ | ----: | -------------------------- |
| `--layout-gap-sm`  |  16px | Tight component groups     |
| `--layout-gap-md`  |  24px | Default local composition  |
| `--layout-gap-lg`  |  32px | Major component groups     |
| `--layout-gap-xl`  |  48px | Section relationships      |
| `--layout-gap-2xl` |  64px | Major narrative separation |

### Page rhythm

- Gutter: `clamp(16px, 3vw, 32px)`.
- Small section: 48–64px.
- Standard section: 64–96px.
- Large section: 80–128px.

### Measures

| Content            | Maximum |
| ------------------ | ------: |
| Prose              |   672px |
| Small content      |   768px |
| Medium content     |  1024px |
| Large content      |  1152px |
| Maximum content    |  1280px |
| Standard form      |   448px |
| Compact task panel |   320px |
| Outgoing email     |   600px |

Use `100dvh`, not `100vh`, for viewport-height layouts.

### Controls

| Size | Height | Use                           |
| ---- | -----: | ----------------------------- |
| `xs` |   32px | Compact or icon-only controls |
| `sm` |   40px | Dense application chrome      |
| `md` |   44px | Default controls              |
| `lg` |   48px | Major actions                 |

Do not simulate a size by overriding a component’s height class.

## 8. Borders, shape, and surfaces

### Border rules

- Standard rule width is **1px**.
- Use one outline per grouping level.
- Adjacent structural rules must meet exactly.
- A parent boundary replaces child-card boundaries where possible.
- Focus rings are more visible than structural borders.
- Functional overlays use an opaque cream surface and one border.

If two regions share a column boundary, derive both from the same grid. Do not
approximate with nearby percentages.

### Radius

| Role    |      Radius |
| ------- | ----------: |
| Card    |         0px |
| Compact |         0px |
| Media   |         0px |
| Control |         0px |
| Overlay |         0px |
| Pill    | Fully round |

The pixel look is square. Every radius token is 0, and Tailwind's radius scale
is 0 too. Only pills and round avatars stay round.

### What earns a card

A card represents a discrete object that can be opened, selected, moved,
compared, or repeated beside peers. Products, articles, plans, jobs, projects,
and selectable options qualify.

Page headings, forms, FAQ answers, settings groups, toolbars, single metrics,
and entire columns do not. Use spacing, a rule, readable measure, a muted field,
or `PastelField` instead.

Never put a bordered card inside another bordered card. Inside a card, use
spacing, dividers, or flat fields.

## 9. Layout grammar

Compose inside-out:

- `Section → Center → Stack` for reading and focused forms.
- `Section → Split → Stack` for paired story and task content.
- `AppShell → Section → Grid` for application work surfaces.
- `Section → Rail → Stack` for persistent context beside detail.
- `Section → Reel` for horizontal browse flows.

Choose layouts by content behavior:

- Start with Stack.
- Use Cluster for short peers that may wrap without changing meaning.
- Use Switcher when columns should collapse intrinsically.
- Use two columns for comparison or paired objects.
- Use three columns for repeated editorial content.
- Use four columns only for compact equal-status metrics or logos.
- Use Bento only when items have unequal priority.
- Use Masonry only for unordered visual content.
- Use Rail only when navigation, filters, or a summary must remain beside detail.

Layouts own geometry only. They do not add Marker, characters, cards, copy, or
animation.

## 10. Actions and controls

The action vocabulary is deliberately small:

1. **Button** for normal, icon, loading, quiet, outline, and danger actions.
2. **Link** for inline and low-emphasis navigation.
3. **CopyButton** for clipboard behavior and copied feedback.
4. **HoldToConfirm** for rare destructive or costly actions.

Use one primary Button per action group. Do not create novelty Button components
for icon, async, play, split, or animated treatments.

HoldToConfirm is a safety mechanism, not a playful animation. It must cancel on
release, pointer exit, or keyboard cancellation and retain its time threshold
under reduced motion.

Every control requires default, hover, active, focus, disabled, and relevant
invalid/loading states.

## 11. Expressive elements

### Marker

Marker is the recurring kicker. Use it once at the start of a meaningful page
or section region. Do not place it in every card, field, or navigation item.

### Characters and story assets

Characters explain an emotional state, setting, or next action. They belong in:

- auth context;
- onboarding orientation and completion;
- empty, offline, support, and recoverable error states;
- people-led marketing and campaign posters.

They do not belong beside dense analytics, legal copy, billing review, urgent
incidents, permissions, or checkout details.

Every character uses transparent black-ink line art from the same family. The
host supplies the named pastel field. Do not bake gradients, shadows, text, or
pastel backgrounds into the asset.

### Rotating text seal

Use at most one seal for a launch, welcome, invitation, or major completion.
It is normally static and may use one brief entrance. Never use it as ambient
decoration.

## 12. Data interfaces

Charts are Components because they own scales, marks, empty state, focus,
keyboard inspection, tooltips, formatting, and accessible summaries.

Use the chart that answers the question:

| Question                              | Chart                  |
| ------------------------------------- | ---------------------- |
| What changed over time?               | Line                   |
| How much volume occurred?             | Area                   |
| Which category is larger?             | Bar                    |
| How is a whole divided?               | Donut or Segmented Bar |
| Are two measures related?             | Scatter                |
| Where do repeated patterns occur?     | Heatmap                |
| What is the distribution?             | Histogram              |
| How does a five-part profile compare? | Five-Axis Radar        |
| What is the tiny inline trend?        | Sparkline              |

Detailed charts require:

- direct axes or persistent labels;
- an opaque cream tooltip;
- hover and keyboard inspection;
- one chart-level tab stop;
- an `aria-live` reading of the active mark;
- Escape to dismiss inspection;
- a plain empty state;
- reduced-motion-safe reveal.

Charts and tables use `DataCaption`. Captions explain interpretation, source,
or freshness—not component implementation.

Tables may be functionally rich, but their architecture must separate typed
data/query behavior from cell composition and styling.

## 13. Motion

Motion explains state, direction, progress, or causality.

| Context                                |  Duration |
| -------------------------------------- | --------: |
| Control state                          | 120–180ms |
| Popover or local transform             | 180–260ms |
| Media or meaningful composition change | 260–420ms |
| Marker draw                            |     720ms |
| Hold-to-confirm threshold              |    1200ms |

Use the emphasized deceleration curve:
`cubic-bezier(0.22, 1, 0.36, 1)`.

- Components animate the state they own.
- Pieces do not animate themselves on mount.
- Layouts never animate.
- Data marks reveal once from their semantic origin.
- Story art settles once when the asset becomes ready.
- Loops are exceptional and stop when their status ends.
- Non-essential motion collapses under `prefers-reduced-motion`.

## 14. Poster canvases

Canvases are ready-to-post **1:1** posters. There are no portrait, story, print,
or arbitrary-ratio modes.

Every poster contains exactly:

- one square `CanvasFrame`;
- one neutral `PosterMasthead`;
- one Marker-led kicker;
- one mono folio or date;
- one `PosterRegistration` primary bar;
- one character on a named pastel art field;
- one dominant message readable at thumbnail size.

Poster measurements:

| Decision                 |          Value |
| ------------------------ | -------------: |
| Safe area                |           7.5% |
| Masthead block padding   |         3.5cqi |
| Kicker size              |         2.2cqi |
| Folio size               |         1.8cqi |
| Label size               |         1.7cqi |
| Registration bar         | 14cqi × 1.1cqi |
| Outer and internal rules |            1px |

Artwork and pastel fields may bleed to the edge. Type, values, dates, and
identity stay inside the safe area. Structural dividers that represent the same
column must share the same grid definition so their lines meet exactly.

Creativity comes from composition, scale, crop, and information order—not from
changing masthead dimensions, border weights, pastel strength, or registration
geometry.

The rotating seal appears only on a poster that earns a launch or milestone
moment. Empty colored rectangles, fake buttons, fake UI, and hover-only
information are not poster design.

## 15. Onboarding

Onboarding uses one visual flow:

1. Orientation: blue character split.
2. Configuration: task-first, character-free steps.
3. Completion: optional green character and rare seal.

Every configuration step uses the same anatomy: step label, thin progress,
left-aligned Marker header, one semantic pastel field, one primary continuation,
and one quiet escape route.

Tone map:

- Pink: personal details and role.
- Blue: workspace, import, and integration.
- Yellow: goals, templates, and notifications.
- Deep blue (the `purple` tone): security and billing.

Do not center dense forms, add decorative characters to configuration steps, or
collect information merely to make onboarding feel longer.

## 16. Emails and machine codes

Emails are static outgoing messages, not email-client interfaces. They use a
600px cream frame, meaningful preheader, live text, one primary route back
to the product, and a footer explaining why the message was sent.

Emails contain no forms, client-side state, JavaScript, or hover-dependent
information.

QR codes and barcodes are generated locally. They always use invariant dark ink
on the cream machine-code ground with a real quiet zone. Never add logos, gradients,
rounded modules, pastel modules, or decorative damage.

## 17. Voice and example world

varunUI examples live in one coherent world: briefs, decisions, reviews,
ownership, handoffs, workspaces, releases, and the people doing the work.

Copy is short, concrete, and sentence case. Prefer verbs such as start, review,
compare, choose, send, save, publish, and return.

Avoid generic filler such as “seamless,” “elevate,” “unlock potential,”
“revolutionary,” and “best-in-class.” Do not invent metrics, locations, customer
counts, or performance claims to make a demo look credible.

## 18. Accessibility

Accessibility is part of component ownership, not a later review.

- Use semantic HTML before ARIA.
- Preserve visible focus.
- Support keyboard operation for every interaction.
- Keep touch targets appropriate to the control context.
- Never rely on color alone.
- Announce asynchronous state changes.
- Respect reduced motion and increased contrast.
- Provide useful empty, loading, error, and disabled states.
- Use alt text that describes a character’s narrative role.
- Keep required chart and table information visible outside tooltips.

## 19. Design review checklist

Before adding or approving UI, ask:

### Ownership

- Does this belong in the layer where it is implemented?
- Is this a new job or merely a cosmetic variant?
- Is a public API carrying behavior rather than a content tree?

### Composition

- Can the reading order be understood when squinting?
- Does every horizontal rule meet the structure it describes?
- Are widths, gaps, and padding taken from one shared decision?
- Does every card represent a discrete object?

### Color and type

- Does every named color preserve its semantic role?
- Is primary reserved for action, selection, or signature?
- Are pastel strengths still 15% / 22% / 25%?
- Does typography establish hierarchy without decorative color?

### Interaction

- Are hover, active, focus, disabled, loading, empty, and error states covered?
- Does motion explain something?
- Is keyboard behavior complete?
- Does reduced motion preserve meaning?

### varunUI signature

- Is Marker used as orientation rather than wallpaper?
- Does a character tell a story rather than fill space?
- Is the rotating seal rare?
- Would the screen remain strong without expressive accents?

## 20. Enforcement and workflow

Run the full gate after a coherent batch of changes:

```sh
npm run generate
npm run check
npm run audit
npm run validate
npm run build
```

`audit` rejects architecture and token drift, including raw colors,
direct pastel surfaces, local motion vocabularies, hard-coded control sizing,
and poster-contract violations.

Always finish non-trivial visual work with settled-state browser screenshots at
desktop and mobile sizes. Verify actual coordinates when rules, columns, or
overlays are meant to align. “Looks close” is not an alignment system.
