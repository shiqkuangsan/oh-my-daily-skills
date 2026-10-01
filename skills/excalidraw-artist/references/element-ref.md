# Native scene reference

Read only when directly generating or repairing scene JSON. Prefer the installed editor/renderer as the authority for its supported schema. Preserve unfamiliar fields in an existing drawing.

## Scene and elements

A native file has `type: "excalidraw"`, `version: 2`, an `elements` array, `appState` and a `files` asset map. Save strict JSON, without comments or trailing commas. Preserve image `fileId` references and the corresponding `files` entries; geometry alone does not reconstruct embedded images.

Use unique, stable IDs and finite `x`, `y`, `width`, `height`. Coordinates are canvas coordinates, not screen pixels at the current zoom. Shapes normally have positive dimensions; a horizontal or vertical line may have a zero dimension. Keep native version/seed/style metadata when copying existing elements.

Common types: `rectangle`, `ellipse`, `diamond`, `text`, `arrow`, `line`, `image`, `freedraw`, `frame`. Not every type accepts the same properties. Do not use a container rectangle to simulate an image or flatten text into one.

## Text and containers

A label owned by a shape needs both references:

```json
{
  "id": "runtime",
  "type": "rectangle",
  "boundElements": [{ "id": "runtime-label", "type": "text" }]
}
```

```json
{
  "id": "runtime-label",
  "type": "text",
  "text": "QA Runtime",
  "originalText": "QA Runtime",
  "containerId": "runtime",
  "fontSize": 24,
  "fontFamily": 1,
  "textAlign": "center",
  "verticalAlign": "middle",
  "lineHeight": 1.25
}
```

These are partial field examples, not complete scene elements. For ordinary standalone headings/notes, use `containerId: null`, top alignment and explicit top-left coordinates. Middle alignment intended for containers can produce displaced multiline notes in some rendering paths.

For initial sizing only:

- CJK glyphs are roughly 1 em wide; ASCII averages roughly 0.6 em. This is a heuristic, not font measurement.
- Height is approximately `fontSize × lineHeight × lineCount`.
- A centered label's origin is `container origin + (container size − measured label size) / 2`.
- Add visible padding. A diamond or ellipse has less usable text area than its bounding rectangle.

Do not equate `text.width` to available container width and assume the text fits. Measure in the actual font when available; otherwise render and inspect. Use semantic line breaks, e.g. `复现步骤` stays together. A renderer may reflow wrapped text differently from the JSON's estimates.

Known legacy font IDs include 1 (Virgil), 2 (Helvetica), 3 (Cascadia). Other fonts depend on the installed renderer. Preserve supported existing fonts; do not assume a Latin handwritten font covers Chinese.

## Connectors

`points` are relative to the arrow's `x,y`. A route from `(300,200)` through `(400,200)` to `(400,350)` uses origin `(300,200)` and points `[[0,0],[100,0],[100,150]]`. Position endpoints near their intended boundaries; a binding alone does not choose a good route.

For a relationship arrow, set `startBinding.elementId` and `endBinding.elementId`; each endpoint lists `{ "id": "edge-id", "type": "arrow" }` in `boundElements`. Common simple bindings use `focus: 0` and a small positive `gap`. Preserve additional binding fields from newer editors instead of stripping them. Elbowed arrows can carry additional routing state; prefer editor support over guessing those fields.

Arrow labels use a text element with `containerId` referencing the arrow and a reciprocal text entry on the arrow. They are not required to be free-floating. Optional narrative notes may remain unbound.

Use `line` for separators or decorative strokes. Route relationships around unrelated labels; bends should clarify destination or avoid interference, not meet a prescribed point count. Check both bindings and visual routes after moving nodes.

## Style and grouping

`strokeColor`, `backgroundColor`, `strokeWidth`, `strokeStyle`, `fillStyle`, `roughness` and `opacity` control the drawing language. `solid`, `hachure` and `cross-hatch` fills have different visual density. Reuse supported `roundness` objects from the editor/reference scene; rounded rectangles commonly use `{ "type": 3 }`.

`groupIds` let related elements move together; `frameId` describes frame membership. Neither replaces arrow or text bindings. Preserve intended groups when editing; do not put the whole diagram into one inseparable group.

There is no universal canvas width, grid or element limit. Size the composition around the intended reading scale and test actual render/open performance. A large scene may need an overview and detail views for readability even when the editor performs well.

## Obsidian wrapper

For `.excalidraw.md`, preserve frontmatter, Text Elements, embedded-file references, comment fences and Drawing blocks. The compressed payload uses LZString Base64, not gzip. Decode, validate the native scene and re-encode without discarding surrounding Markdown. See [wrapper details](organic-architecture-style.md#obsidian-excalidraw-markdown) when handling compressed files. Reopen the final wrapped artifact in a compatible editor when available; checking extracted JSON alone does not verify the wrapper.

## Troubleshooting

| Symptom                                     | Inspect                                                       |
| ------------------------------------------- | ------------------------------------------------------------- |
| Label or connector stays behind on drag     | Both directions of binding, stale IDs, group membership       |
| Chinese label clips despite valid JSON      | Actual font fallback, measured width, padding and line breaks |
| Standalone multiline note shifts vertically | Top versus middle alignment; render path normalization        |
| Connector label moves incorrectly           | Arrow/text container binding and actual route geometry        |
| Image disappears after import               | `fileId` and complete `files` entries                         |
| Diagram looks like an inventory             | Visual hierarchy and composition, not more colors or boxes    |
