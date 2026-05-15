# Organic Architecture Style

Use this reference when editing an existing Excalidraw architecture panorama whose value is the hand-drawn composition, not only the content. The goal is to preserve the user's visual taste while updating architecture semantics.

## Style Contract

| Preserve    | How                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------ |
| Composition | Keep the original canvas rhythm, waterlines, clusters, and asymmetry unless asked to redesign.         |
| Connectors  | Keep existing arrow `points`, stroke colors, dashed/solid styles, and curved routes whenever possible. |
| Palette     | Reuse sampled colors from nearby elements instead of applying the default business palette.            |
| Texture     | Preserve `fillStyle`, `roughness`, hachure fills, rounded rectangles, and handwritten font choices.    |
| Emphasis    | Change text and semantic grouping first; do not make every module equally large and grid-aligned.      |

If a user says they like the original style, treat style preservation as a requirement, not a preference.

## Style DNA

Organic panorama diagrams usually look like a thinking map, not a slide deck.

| Trait        | Recommended pattern                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Global shape | Wide canvas, iceberg/top-level view above a horizontal waterline, internal mechanics below.                                                       |
| Layout       | Main chain is readable, but support paths can be curved, diagonal, or clustered.                                                                  |
| Nodes        | Rounded rectangles with mixed `solid` and `hachure` fills; slightly uneven sizing is acceptable.                                                  |
| Text         | Virgil-style handwritten text, short labels, mixed Chinese/English where useful.                                                                  |
| Arrows       | Multi-point arrows with gentle bends; dashed arrows for optional/metadata paths.                                                                  |
| Colors       | Semantic but warm: brown/orange for orchestration, blue for data/tools, pink for skills/policy, purple for loop/memory, green for result/success. |
| Density      | Let the diagram feel exploratory; use Markdown docs for exhaustive detail.                                                                        |

## Sample Palette

These colors are a useful starting point when preserving a warm hand-drawn architecture map.

| Meaning                    | Stroke                 | Background             | Fill      |
| -------------------------- | ---------------------- | ---------------------- | --------- |
| Orchestration / routing    | `#be185d` or `#92400e` | `#fbcfe8` or `#fffbeb` | `hachure` |
| Agent hierarchy            | `#8b6f47`              | `#fff7ed`              | `hachure` |
| Focus agent / runtime      | `#b45309`              | `#fde68a`              | `solid`   |
| Context / data / tools     | `#2563eb`              | `#bfdbfe`              | `solid`   |
| Skills / policy / approval | `#db2777`              | `#fbcfe8`              | `solid`   |
| Loop / memory / decision   | `#7c3aed`              | `#ede9fe` or `#ddd6fe` | `solid`   |
| Result / success           | `#15803d`              | `#dcfce7`              | `solid`   |
| Sandbox / isolation        | `#0f766e`              | `#ccfbf1`              | `solid`   |

## Edit Workflow

1. Extract the scene JSON from the source file before editing.
2. Inventory the style: element count, dominant colors, `fillStyle`, `roughness`, font sizes, and arrow routes.
3. Decide which content labels need to change; avoid moving containers unless the text cannot fit.
4. Reuse existing element templates for new modules by copying a nearby box style.
5. Preserve arrow geometry: if an arrow already expresses the relationship, keep its `points` unchanged and only update endpoint labels.
6. For new arrows, copy the nearest arrow style and use 3-5 points to create a gentle curve instead of a straight grid connector.
7. Run binding validation on extracted JSON, then re-wrap into the original output format.

## What Not To Do

- Do not replace an organic map with a clean grid just because the content is architecture.
- Do not normalize all colors to a corporate palette when the source uses warm semantic colors.
- Do not flatten curved connectors into straight arrows unless readability requires it.
- Do not enlarge provider/vendor names beyond router/runtime concepts.
- Do not delete stylistic waterlines, side clusters, or hand-drawn labels if they carry the user's mental model.

## Obsidian Excalidraw Markdown

Obsidian Excalidraw commonly stores drawings as `.excalidraw.md`.

Compressed drawing block:

````text
## Drawing
```compressed-json
...
```
%%
````

The compressed payload is not gzip. It is `LZString.compressToBase64(jsonString)`.

Encoding convention used by the Obsidian plugin:

```js
const compressed = LZString.compressToBase64(jsonString);
let result = "";
for (let i = 0; i < compressed.length; i += 256) {
  result += compressed.slice(i, i + 256) + "\n\n";
}
const payload = result.trim();
```

Decoding convention:

```js
const cleaned = payload.replace(/[\n\r]/g, "");
const jsonString = LZString.decompressFromBase64(cleaned);
```

When editing a compressed `.excalidraw.md` file, preserve frontmatter, `## Text Elements`, comment fences, and the compressed `## Drawing` wrapper unless the user asks to decompress it.

## Verification Checklist

- Existing arrow geometry is unchanged unless intentionally edited.
- All arrows still have `startBinding` and `endBinding`.
- Every bound text element still has `containerId`, and the container lists it in `boundElements`.
- The file is returned in the same format it arrived in: `.excalidraw` stays JSON; compressed `.excalidraw.md` stays compressed Markdown.
- The resulting diagram still looks like the original diagram at a glance.
