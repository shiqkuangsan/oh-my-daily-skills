---
name: tooyoung:excalidraw-artist
description: "Create or edit Excalidraw hand-drawn diagrams, including style-preserving edits to existing Obsidian Excalidraw Markdown drawings, architecture, flowchart, swimlane/timeline, sequence, wireframe, ERD/data model, state machine, matrix, tree, hierarchy, and CI/CD pipeline."
metadata:
  version: "1.6.0"
---

# Excalidraw Artist

Create professional hand-drawn style diagrams with Excalidraw, outputting standalone `.excalidraw` JSON or Obsidian `.excalidraw.md` drawings.

## Supported Diagram Types

| Type             | Use Cases                                                                |
| ---------------- | ------------------------------------------------------------------------ |
| Architecture     | System design, microservices, layered architecture                       |
| Flowchart        | Business processes, approval workflows, deployment flows                 |
| Swimlane         | Multi-role collaboration, cross-department processes, quarterly roadmaps |
| Timeline         | Gantt-style roadmaps, milestone schedules, release plans                 |
| Sequence         | API calls, message flows                                                 |
| Wireframe        | UI prototypes, page layouts                                              |
| ERD / Data Model | Database schema, entity relationships, API object models                 |
| State Machine    | Order/payment lifecycle, auth states, retry/backoff flows                |
| Matrix           | Feature comparison, permission matrix, RACI, migration readiness         |
| Tree / Hierarchy | Component tree, directory structure, org chart, mind map                 |
| CI/CD Pipeline   | Build→Test→Deploy flows, release gates, environment promotion            |

## Quick Start

```bash
# Example user requests
"Draw a microservices architecture with gateway, user service, order service"
"Create an approval flowchart"
"Draw a login sequence diagram"
"Draw an ERD for user, order, product tables"
"Create a state machine for order lifecycle"
"Make a feature comparison matrix"
"Draw a component tree for the dashboard module"
"Draw a CI/CD pipeline with staging and production"
```

Output files can be opened and edited at [excalidraw.com](https://excalidraw.com).

## Design Principles

### Preserve Existing Style First

When editing an existing diagram, preserve its visual language unless the user explicitly asks for a redesign.

- Reuse the original color palette, fill styles, roughness, fonts, spacing rhythm, and arrow curvature.
- Prefer relabeling and lightly resizing existing elements over replacing the canvas with a new grid layout.
- Preserve existing arrow `points` and bindings whenever possible; smooth hand-drawn connector paths are part of the design.
- For organic architecture panoramas, read `references/organic-architecture-style.md` before editing.

### Layout

- Horizontal flow: left to right
- Vertical hierarchy: top to bottom
- Consistent spacing: 40-60px between elements
- Overall width: 1200-1600px

### Color Palette (recommended, adjustable per context)

**Business Style** (default):

| Purpose    | Color   |
| ---------- | ------- |
| Primary    | #1e3a5f |
| Secondary  | #4a90d9 |
| Background | #f1f5f9 |
| Accent     | #10b981 |
| Border     | #6b7b8c |

**Minimal Style**: Primary #1f2937, Border #9ca3af, Background #ffffff

### Element Selection

| Type           | Shape             | Usage                |
| -------------- | ----------------- | -------------------- |
| Core Component | Rounded Rectangle | Services, modules    |
| Process Node   | Rectangle         | Steps, actions       |
| Decision Point | Diamond           | Conditions, branches |
| Data Source    | Cylinder          | Databases            |
| Start/End      | Ellipse           | Start, end           |

### Connectors

| Style               | Usage          |
| ------------------- | -------------- |
| Solid Arrow         | Main flow      |
| Dashed Arrow        | Optional/async |
| Bidirectional Arrow | Two-way calls  |

## Workflow

1. **Understand Requirements** → Determine whether this is a new diagram or a style-preserving edit
2. **Sample Existing Style** → For existing diagrams, inventory colors, fill styles, roughness, font sizes, spacing, arrow paths, and output format before changing content
3. **Plan Layout** → Define dimensions and regions; for grid layouts calculate column/row system first (see `references/element-ref.md` → Grid Layout Calculation)
4. **Design Color Scheme** → Reuse the source diagram palette for edits; use preset palettes only for new diagrams
5. **Build Elements** → Read the matching example file from `references/examples/`; use semantic IDs for 10+ elements
6. **Create Real Connectors** → Every relationship arrow must have `startBinding` and `endBinding`, and both endpoint elements must include that arrow in `boundElements`
7. **Check Text Readability** → Break labels by semantic phrase, keep text inside containers with padding, and resize boxes instead of splitting Chinese words or abbreviations awkwardly
8. **Verify Bindings** → Check every container↔text pair and arrow↔endpoint pair has bidirectional references
9. **Run Validation** → Run `node skills/excalidraw-artist/scripts/validate-excalidraw.mjs <file.excalidraw>` on extracted JSON before claiming the diagram is complete
10. **Output File** → Generate the requested `.excalidraw` or `.excalidraw.md` format

## Binding Requirements

- Do not create visual-only arrows. If an arrow touches a node, it must be a real Excalidraw connector.
- For every connector arrow:
  - `arrow.startBinding.elementId` points to the source element.
  - `arrow.endBinding.elementId` points to the target element.
  - Source and target elements both include `{ "id": "<arrow-id>", "type": "arrow" }` in `boundElements`.
- For every container text:
  - The text element includes `containerId`.
  - The container includes `{ "id": "<text-id>", "type": "text" }` in `boundElements`.
- Use `line` for decorative separators. Use `arrow` only when the connection should stay attached during dragging.

## Text Readability Requirements

- Prefer short node titles plus 1-3 supporting lines. If a card needs more text, enlarge the card or split it into two cards.
- Insert `\n` only at semantic boundaries: phrase, slash group, or list item. Do not split Chinese words like `步骤`, `产物`, `证据`, or English identifiers like `frontend-skills`.
- For mixed Chinese/English labels, estimate the longest line before choosing `text.width`; do not rely on Excalidraw auto-wrap to fix overflow.
- Keep at least 10-12px horizontal padding and 8-12px vertical padding between text bounds and container bounds.
- After manually editing text, re-check text `x/y/width/height` and connector bindings; Excalidraw may change text bounds without changing the container.

## Reference Documentation

| File                                       | Content                                                                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `references/element-ref.md`                | Element properties, text binding formulas, grid layout calculation, semantic colors, ID conventions, troubleshooting |
| `references/organic-architecture-style.md` | Style-preserving edit guide for organic panorama architecture diagrams and Obsidian compressed Markdown drawings     |
| `scripts/validate-excalidraw.mjs`          | Validation for arrow endpoint bindings and container text bindings                                                   |

**Example files** (read only the one matching the diagram type):

| File                                      | Diagram Type              |
| ----------------------------------------- | ------------------------- |
| `references/examples/01-flowchart.md`     | Flowchart                 |
| `references/examples/02-architecture.md`  | Architecture              |
| `references/examples/03-sequence.md`      | Sequence                  |
| `references/examples/04-swimlane.md`      | Swimlane                  |
| `references/examples/05-erd.md`           | ERD / Data Model          |
| `references/examples/06-state-machine.md` | State Machine             |
| `references/examples/07-matrix.md`        | Matrix / Comparison Table |
| `references/examples/08-tree.md`          | Tree / Hierarchy          |
| `references/examples/09-cicd-pipeline.md` | CI/CD Pipeline            |
| `references/examples/10-wireframe.md`     | Wireframe                 |
| `references/examples/11-timeline.md`      | Timeline / Gantt          |

## Notes

- For complex diagrams, describe requirements step by step
- Large diagrams (>80 elements) may be slow to open; consider splitting
- Use semantic ID prefixes for 10+ elements (see element-ref.md → ID Naming Convention)
- Calculate grid coordinates before placing elements in grid/swimlane layouts
- For Obsidian `.excalidraw.md`, preserve the Markdown wrapper and re-encode `## Drawing` as `compressed-json` when the source file is compressed
- Fine-tune in Excalidraw after generation, then re-run validation if text or connected nodes were changed
- Mix Chinese/English labels for readability
