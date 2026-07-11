---
name: tooyoung:excalidraw-artist
description: "Use when creating or editing Excalidraw or Obsidian Excalidraw drawings, especially architecture, flow, sequence, swimlane, timeline, ERD, state, matrix, hierarchy, wireframe, and CI/CD diagrams."
metadata:
  version: "1.6.1"
  author: shiqkuangsan
  visibility: public
---

# Excalidraw Artist

Create valid, editable `.excalidraw` JSON or Obsidian `.excalidraw.md` drawings. The critical concerns are style preservation, real bindings, readable text, and validation.

## Resource Routing

- Existing organic/panorama drawing: read `references/organic-architecture-style.md`.
- Element schema, binding formulas, grid layout, IDs, colors: read the relevant section of `references/element-ref.md`.
- New drawing: read exactly one matching file under `references/examples/`.
- Always use `scripts/validate-excalidraw.mjs` before completion.

Example mapping:

| Diagram                        | Example                                                     |
| ------------------------------ | ----------------------------------------------------------- |
| Flow / architecture / sequence | `01-flowchart.md` / `02-architecture.md` / `03-sequence.md` |
| Swimlane / ERD / state         | `04-swimlane.md` / `05-erd.md` / `06-state-machine.md`      |
| Matrix / tree / CI/CD          | `07-matrix.md` / `08-tree.md` / `09-cicd-pipeline.md`       |
| Wireframe / timeline           | `10-wireframe.md` / `11-timeline.md`                        |

## Workflow

1. Determine output format and whether this is a new drawing or an edit.
2. For edits, inspect the source's palette, roughness, fill, fonts, spacing, arrow paths, grouping, and wrapper format before changing it.
3. Choose a layout and calculate regions/grid coordinates before emitting many elements.
4. Build semantic elements and IDs; keep labels concise.
5. Add real connector and container bindings.
6. Validate extracted JSON, then inspect the rendered result when a renderer is available.
7. Preserve or rebuild the Obsidian compressed wrapper when required.

## Non-Negotiable Bindings

For every relationship arrow:

- `startBinding.elementId` references the source.
- `endBinding.elementId` references the target.
- both endpoint elements contain the arrow in `boundElements`.

For every bound label:

- text has `containerId`.
- its container contains the text element in `boundElements`.

Use `line` for decoration and `arrow` only for relationships that should stay attached while editing.

## Readability and Style

- Preserve an existing drawing's visual language unless redesign was requested.
- Break labels at semantic boundaries; never split Chinese words or code identifiers merely to fit.
- Resize containers when text does not fit and keep visible padding.
- Use consistent flow direction and spacing appropriate to the diagram rather than fixed canvas dimensions.
- Use semantic color sparingly; do not turn every node into a different accent.
- Split very large diagrams when one canvas would become unreadable.

## Validation

```bash
node "${SKILL_DIR}/scripts/validate-excalidraw.mjs" /absolute/path/drawing.excalidraw
```

For `.excalidraw.md`, extract/decompress the drawing JSON for validation without destroying the Markdown wrapper.

Do not claim completion when bindings fail, labels overflow, elements overlap incoherently, or the output cannot be reopened by Excalidraw.
