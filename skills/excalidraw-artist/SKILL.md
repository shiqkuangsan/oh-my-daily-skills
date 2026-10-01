---
name: tooyoung:excalidraw-artist
description: "Create and edit expressive, editable Excalidraw diagrams: architecture, flows, mind maps and relationship maps, including Obsidian Excalidraw. Prefer for standalone hand-drawn diagrams; preserve explicit Mermaid requests and existing document formats."
metadata:
  version: "2.0.1"
  author: shiqkuangsan
  visibility: public
---

# Excalidraw Artist

Make a diagram that reveals the idea, not a document rearranged into boxes. Deliver a useful visual explanation and an editable scene. Let the model choose the composition; constrain correctness and delivery, not creativity.

## Design judgment

- Establish the diagram's central question and reading path from the request. Infer sensible defaults; ask only when missing information changes the meaning or scope.
- For architecture, inspect the actual components and important relationships. Distinguish calls, data movement, ownership and deployment boundaries. A directory tree or a list of files is not an architecture. Mark proposed or unverified behavior rather than inventing connections.
- Choose a visual structure that explains the subject: a spine with side branches, layered landscape, lifecycle loop, swimlanes, radial map or another appropriate composition. No mandatory template, grid, canvas size or node count.
- Make the main idea visible at fit-to-screen scale; detail should reward zooming in. Use whitespace, scale and a coherent palette to establish hierarchy. Default to moderately rich, saturated fills and accents while retaining readable text and a light canvas; follow an explicit palette or an existing drawing when editing. If the result is mostly paragraphs inside equal cards, recompose it.
- Treat “complete” as coverage of relevant responsibilities and relationships. Use named detail views when necessary, linked to the overview by stable labels. Do not compress the entire codebase into tiny text.
- Preserve the user's visual language during edits unless redesign was requested. Use grouping, shapes, connector routes and texture purposefully; handwritten typography alone is not visual storytelling.

For substantial new compositions or a visual redesign, consult [visual design](references/visual-design.md). It offers choices, not a prescribed look. Existing organic panoramas have additional [preservation guidance](references/organic-architecture-style.md).

## Editable construction

Use available native tools, an established CLI/MCP, or direct scene generation as appropriate. Tool choice does not determine artistic quality. Read [local workflow](references/local-workflow.md) when using a local canvas; read [element reference](references/element-ref.md) only for schema, geometry or Obsidian details.

- Use real Excalidraw elements for meaning-bearing shapes and text. A flattened image is not an editable diagram.
- Bind relationship arrows to their endpoints, with reciprocal `boundElements`. Bind labels to their containers. Use lines for decorative strokes; free annotations can remain free text.
- Keep stable IDs when editing. Preserve unrelated elements, image assets and the original wrapper format.
- Allocate space from actual labels. Break at semantic boundaries; widen, shorten or restructure before reducing text to an unreadable size. Font fallback and CJK metrics require rendered checks.

## Quality and delivery

Save a durable `.excalidraw` or `.excalidraw.md` source. Reopen or reimport that saved source, render it, and inspect the result. A temporary canvas is not the deliverable.

```bash
node "${SKILL_DIR}/scripts/validate-excalidraw.mjs" /absolute/path/diagram.excalidraw
# Optional geometry hints; warnings need visual judgment, not automatic fixes:
node "${SKILL_DIR}/scripts/validate-excalidraw.mjs" --layout /absolute/path/diagram.excalidraw
```

Check three different things:

- **Meaning:** responsibilities, arrow direction, state/sequence semantics, and scope match the evidence. No invented relationship added merely to fill space.
- **Visual reading:** the primary path is evident at overview scale; labels remain legible at normal reading scale; connectors avoid unrelated labels; detail views do not masquerade as extra services.
- **Editability:** validation passes, the saved scene reopens, and bindings/assets survive. For new construction methods, also move a representative node and confirm its label and connectors follow; restore the saved geometry afterward.

Fix observed defects and check the affected view again. Structural checks cannot establish beauty, text metrics or factual correctness. If rendering is unavailable, deliver the source with that explicit verification gap.

Deliver the editable source and a PNG or SVG preview. For a large canvas, include a readable overview preview. Keep implementation scripts and provenance separate from the visual explanation. Do not upload or share externally merely to obtain a preview.
