# Visual design for explanatory diagrams

Use this for a substantial new diagram or redesign. Choose the composition from the idea; these are options, not templates to reproduce.

## Choose the visual argument

| What the viewer needs to understand      | Useful composition                                                                    | Common failure                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| A request moving through a system        | Strong horizontal spine, supporting dependencies above/below, a separate return route | Equal emphasis on every helper module                   |
| Public surface versus internal machinery | Landscape with a clear boundary and a few expanded mechanisms beneath it              | Decorative layers mistaken for deployment tiers         |
| Feedback, iteration or control           | Open loop around a focal state; distinguish feedback from forward flow                | A circular arrangement that implies a nonexistent cycle |
| Responsibility across actors/time        | Swimlanes with aligned events                                                         | Calling a component inventory a sequence diagram        |
| Exploration, concepts or relationships   | Uneven radial clusters, named edges, branch hierarchy                                 | A perfectly symmetric star with no prioritization       |
| State transitions                        | Compact state topology with conditions on transitions                                 | Boxes arranged as a pipeline despite branching/cycles   |

Before constructing a large scene, settle its focal point, boundaries and main connector corridors. Work this out directly; do not turn it into an approval ceremony. Start with the few relationships that explain the system and expand where the user needs detail.

## An expressive hand-drawn language

A hand-drawn technical sketch with moderately rich color is the default when no visual preference is given. Shift toward a warmer workshop map or a more formal engineering diagram when the subject or reference calls for it.

- **Hierarchy:** give the central mechanism room and weight. Supporting notes should recede. Headings, labels and annotations need distinct scales rather than a single size everywhere.
- **Rhythm:** align related things locally while allowing meaningful asymmetry globally. Negative space separates concepts; it is not wasted canvas.
- **Shape:** choose a shape because it helps identify a role or boundary. Do not encase every heading, annotation and cluster in another rounded rectangle.
- **Ink and texture:** use modest roughness for structure. A selective hachure fill, underline or bracket can make one region memorable. Excessive wobble, hatching behind text or decoration on every node reduces clarity.
- **Color:** use a small coherent palette with a declared meaning. Prefer moderately saturated fills over washed-out gray pastels, and stronger accents for focal nodes. Keep the canvas light and leave whitespace so the richer colors have room. Preserve text contrast; avoid neon fills or making every region equally intense. Pair color with labels or line style when encoding status. Explicit user palettes and an existing drawing take precedence.
- **Connectors:** route primary connections cleanly; reserve bends and open margins for supporting routes. Use arrowheads only where direction has meaning. Explain what solid/dashed means if it is not obvious.
- **Type:** preserve natural Chinese phrases and technical identifiers. Handwritten Latin fonts may fall back for Chinese; judge the actual result rather than the font name. Keep secondary notes readable without extreme zoom.

Optional starting palettes, not fixed category mappings:

| Character         | Ink       | Paper     | Fills / stronger accents                                                                  |
| ----------------- | --------- | --------- | ----------------------------------------------------------------------------------------- |
| Warm workshop     | `#49382f` | `#fffcf5` | apricot `#ffb27f`, teal `#71d6bd`, golden yellow `#ffd166`; accents `#c65d2e` / `#187c6a` |
| Clear engineering | `#27364b` | `#f8fafc` | blue `#82b7f4`, green `#80d7a1`, violet `#bba0ee`; accents `#295fa8` / `#7046b3`          |

## Detail without a wall of boxes

Use concise role labels in the overview. Put contracts, exceptional paths or implementation names in a clearly labeled detail view only where they explain something important. Repeat the component name when expanding it so readers know it is the same component, not another deployment.

For code-based architecture, distinguish logical ownership from process or host boundaries. A PostgreSQL node should identify whose facts it owns; a dependency arrow should not accidentally imply that a knowledge repository writes runtime facts. Show a return path or reconciliation path when it materially changes the explanation.

A single integrated landscape can work better than panels; panels help when the views answer different questions. Choose based on reading burden, not a universal preference. Keep an overview useful on its own.

## Review the rendered artifact

At fit-to-screen scale: can a reader locate the main idea and follow the route without reading every note?
At reading scale: are labels comfortable, connector destinations unambiguous, and nested boundaries distinguishable?
During editing: does moving a node preserve its relationships?

Inspect crowded intersections, long bilingual labels, callouts near edges and exported font fallback. Geometry warnings are clues, not proof of a defect. Do not eliminate an intentional container overlap or organic asymmetry simply to satisfy a heuristic.
