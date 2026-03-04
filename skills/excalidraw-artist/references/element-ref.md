# Excalidraw Element Properties Reference

## Basic Structure

Top-level structure of every `.excalidraw` file:

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [...],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": null
  },
  "files": {}
}
```

## Element Types

| type        | Usage                       | Unique Properties                                              |
| ----------- | --------------------------- | -------------------------------------------------------------- |
| `rectangle` | Rectangle/rounded rectangle | roundness                                                      |
| `ellipse`   | Ellipse/circle              | -                                                              |
| `diamond`   | Diamond (decision)          | -                                                              |
| `line`      | Line/polyline               | points                                                         |
| `arrow`     | Arrow connector             | points, startArrowhead, endArrowhead, startBinding, endBinding |
| `text`      | Text                        | text, fontSize, fontFamily, textAlign, containerId             |

## Common Properties

Properties shared by all elements:

```json
{
  "id": "unique-id",
  "type": "rectangle",
  "x": 100,
  "y": 100,
  "width": 150,
  "height": 80,
  "angle": 0,
  "strokeColor": "#1e3a5f",
  "backgroundColor": "#dbeafe",
  "fillStyle": "solid",
  "strokeWidth": 2,
  "strokeStyle": "solid",
  "roughness": 1,
  "opacity": 100,
  "groupIds": [],
  "roundness": { "type": 3 },
  "seed": 1,
  "version": 1,
  "versionNonce": 1,
  "isDeleted": false,
  "boundElements": []
}
```

## Property Details

### Style Properties

| Property      | Values                                  | Description                         |
| ------------- | --------------------------------------- | ----------------------------------- |
| `fillStyle`   | `"solid"`, `"hachure"`, `"cross-hatch"` | Fill style                          |
| `strokeStyle` | `"solid"`, `"dashed"`, `"dotted"`       | Line style                          |
| `strokeWidth` | 1, 2, 4                                 | Line width                          |
| `roughness`   | 0, 1, 2                                 | Hand-drawn feel (0=smooth, 2=rough) |
| `opacity`     | 0-100                                   | Transparency                        |

### Roundness

```json
// Rounded rectangle
"roundness": { "type": 3 }

// Ellipse/diamond
"roundness": { "type": 2 }

// No rounding
"roundness": null
```

### Text Properties

```json
{
  "type": "text",
  "text": "Hello World",
  "fontSize": 20,
  "fontFamily": 1,
  "textAlign": "center",
  "verticalAlign": "middle",
  "containerId": "parent-element-id" // Bind to container
}
```

| fontFamily | Font                 |
| ---------- | -------------------- |
| 1          | Virgil (handwritten) |
| 2          | Helvetica            |
| 3          | Cascadia (monospace) |

| textAlign  | Horizontal Alignment |
| ---------- | -------------------- |
| `"left"`   | Left                 |
| `"center"` | Center               |
| `"right"`  | Right                |

### Arrow Properties

```json
{
  "type": "arrow",
  "points": [
    [0, 0],
    [100, 0]
  ],
  "startArrowhead": null,
  "endArrowhead": "arrow",
  "startBinding": {
    "elementId": "source-id",
    "focus": 0,
    "gap": 1
  },
  "endBinding": {
    "elementId": "target-id",
    "focus": 0,
    "gap": 1
  }
}
```

| arrowhead    | Style          |
| ------------ | -------------- |
| `null`       | No arrowhead   |
| `"arrow"`    | Standard arrow |
| `"bar"`      | Vertical bar   |
| `"dot"`      | Circle         |
| `"triangle"` | Triangle       |

### Grouping

```json
// Group elements
"groupIds": ["group-1"]

// Nested groups
"groupIds": ["group-1", "subgroup-a"]
```

### Element Binding

Container and text binding — **both sides must reference each other**:

```json
// Container (rectangle)
{
  "id": "box",
  "type": "rectangle",
  "boundElements": [
    { "id": "box-text", "type": "text" }
  ]
}

// Text
{
  "id": "box-text",
  "type": "text",
  "containerId": "box"
}
```

> **Critical**: Missing either side = broken binding. Text won't center and may float outside the container.

### Text Binding Positioning

When binding text inside a container, calculate coordinates precisely:

**Core formulas:**

```
padding = 10  (horizontal padding on each side)

text.width  = container.width - 2 × padding
text.height = fontSize × lineCount × 1.25
text.x      = container.x + (container.width - text.width) / 2
text.y      = container.y + (container.height - text.height) / 2
```

**Multi-line text:**

- Use `\n` for line breaks
- Each line height ≈ `fontSize × 1.25`
- 2-line text at fontSize 16: height = `16 × 2 × 1.25 = 40`

**Chinese text width:**

- Chinese chars are ~1em wide: width ≈ `charCount × fontSize`
- Mixed: count Chinese as 1em, ASCII as 0.6em

**Worked example** (2-line text in 150×80 rectangle at fontSize 16):

```
container: x=100, y=100, width=150, height=80

text.width  = 150 - 20 = 130
text.height = 16 × 2 × 1.25 = 40
text.x      = 100 + (150 - 130) / 2 = 110
text.y      = 100 + (80 - 40) / 2 = 120
```

## ID Naming Convention

For large diagrams (30+ elements), use semantic prefixes to keep IDs manageable:

| Pattern             | Usage            | Example                      |
| ------------------- | ---------------- | ---------------------------- |
| `{category}-{name}` | Shape elements   | `server-gateway`, `db-users` |
| `{parent}-text`     | Bound text       | `server-gateway-text`        |
| `arrow-{from}-{to}` | Arrow connectors | `arrow-client-server`        |
| `line-{purpose}`    | Lines / dividers | `line-swimlane-divider`      |
| `label-{context}`   | Free text labels | `label-q1-header`            |
| `group-{name}`      | Group IDs        | `group-auth-module`          |

For grid layouts, encode position: `q1-task-mono` (quarter 1, task: monorepo).

**Bidirectional reference checklist** — for every container+text pair, verify:

1. Container has `"boundElements": [{ "id": "xxx-text", "type": "text" }]`
2. Text has `"containerId": "xxx"`
3. IDs match exactly (typo = silent failure)

## Grid Layout Calculation

For multi-column / multi-row layouts (swimlane, Gantt, timeline, roadmap):

### Column system

```
totalWidth  = 1400
padding     = 30
labelWidth  = 100   // left sidebar for row labels
columns     = 4
colWidth    = (totalWidth - padding × 2 - labelWidth) / columns

colX(i)     = padding + labelWidth + i × colWidth   // i = 0, 1, 2, 3
```

### Row system

```
headerHeight = 50
rowGap       = 10

row[0].y = headerY + headerHeight + rowGap
row[0].height = 280   // swimlane 1

row[1].y = row[0].y + row[0].height + rowGap
row[1].height = 200   // swimlane 2
```

### Cell placement

```
cardPadding = 8

card.x     = colX(colIndex) + cardPadding
card.y     = row[rowIndex].y + verticalOffset
card.width = colWidth - 2 × cardPadding
```

### Vertical stacking within a cell

When multiple cards share one cell, stack them vertically:

```
cardHeight = 50
cardGap    = 6

card[0].y = row.y + 8
card[1].y = card[0].y + cardHeight + cardGap
card[2].y = card[1].y + cardHeight + cardGap
```

## Color Palette

### Business Style

| Purpose           | Color     |
| ----------------- | --------- |
| Primary/Text      | `#1e3a5f` |
| Secondary         | `#4a90d9` |
| Background Blue   | `#dbeafe` |
| Background Green  | `#dcfce7` |
| Background Yellow | `#fef3c7` |
| Accent Green      | `#10b981` |
| Border Gray       | `#6b7b8c` |
| Light Gray        | `#9ca3af` |

### Status Colors

| Status  | Background | Border    |
| ------- | ---------- | --------- |
| Success | `#dcfce7`  | `#10b981` |
| Warning | `#fef3c7`  | `#f59e0b` |
| Error   | `#fee2e2`  | `#ef4444` |
| Info    | `#dbeafe`  | `#3b82f6` |

### Semantic Color Coding

When fixed palettes don't fit, design colors by **meaning**. Combine border color + strokeWidth + strokeStyle for 3 visual dimensions:

**Priority-based:**

| Level             | Border    | Background | strokeWidth | strokeStyle |
| ----------------- | --------- | ---------- | ----------- | ----------- |
| Critical (P0)     | `#dc2626` | `#fef2f2`  | 3           | solid       |
| Important (P1)    | `#ca8a04` | `#fefce8`  | 2           | solid       |
| Nice-to-have (P2) | `#16a34a` | `#f0fdf4`  | 1           | dashed      |

**Category-based:**

| Category    | Color     | Typical use                         |
| ----------- | --------- | ----------------------------------- |
| Engineering | `#3b82f6` | Infrastructure, architecture, tools |
| Product     | `#ea580c` | Features, user-facing iterations    |
| Operations  | `#8b5cf6` | Support, maintenance, debt          |
| Toolchain   | `#10b981` | DevOps, AI tools, automation        |

**Design tip**: Pick one dimension (e.g., priority = border color) and use another (e.g., category = background tint) to encode two data axes simultaneously.

## Coordinates & Layout

- **x, y**: Top-left corner coordinates
- **width, height**: Dimensions
- **Recommended spacing**: 50-100px between elements
- **Recommended width**: Overall 1200-1600px

## Minimal Example

A rectangle + text:

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [
    {
      "id": "box",
      "type": "rectangle",
      "x": 100,
      "y": 100,
      "width": 120,
      "height": 60,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#dbeafe",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 1,
      "boundElements": [{ "id": "box-text", "type": "text" }]
    },
    {
      "id": "box-text",
      "type": "text",
      "x": 130,
      "y": 118,
      "width": 60,
      "height": 24,
      "text": "Hello",
      "fontSize": 20,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f",
      "containerId": "box"
    }
  ],
  "appState": { "viewBackgroundColor": "#ffffff" },
  "files": {}
}
```

## Troubleshooting

| Problem                       | Cause                                    | Fix                                                                                    |
| ----------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| Text floats outside box       | Missing `containerId` or `boundElements` | Ensure both container.boundElements and text.containerId reference each other          |
| Text not centered             | Wrong x/y calculation                    | Use formula: `text.x = container.x + (container.width - text.width) / 2`               |
| Arrow doesn't connect         | Missing startBinding/endBinding          | Add binding with target elementId; ensure target has the arrow in its `boundElements`  |
| Elements overlap              | Coordinates conflict                     | Use grid calculation to ensure non-overlapping placement                               |
| File won't open in Excalidraw | Invalid JSON                             | Remove all `//` comments and trailing commas from JSON                                 |
| Rounded corners not showing   | Wrong roundness type                     | Use `type: 3` for rectangles, `type: 2` for ellipses/diamonds                          |
| Chinese text overflows        | Text width too narrow                    | Chinese chars ≈ 1em wide: `width ≈ charCount × fontSize`                               |
| Arrow label misaligned        | Label is free text, not bound            | Position label manually above the arrow midpoint; labels are independent text elements |
| Large file slow to open       | Too many elements (100+)                 | Split into sub-diagrams; keep each file under 80 elements                              |
