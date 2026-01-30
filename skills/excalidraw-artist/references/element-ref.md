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

| type | Usage | Unique Properties |
|------|-------|-------------------|
| `rectangle` | Rectangle/rounded rectangle | roundness |
| `ellipse` | Ellipse/circle | - |
| `diamond` | Diamond (decision) | - |
| `line` | Line/polyline | points |
| `arrow` | Arrow connector | points, startArrowhead, endArrowhead, startBinding, endBinding |
| `text` | Text | text, fontSize, fontFamily, textAlign, containerId |

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

| Property | Values | Description |
|----------|--------|-------------|
| `fillStyle` | `"solid"`, `"hachure"`, `"cross-hatch"` | Fill style |
| `strokeStyle` | `"solid"`, `"dashed"`, `"dotted"` | Line style |
| `strokeWidth` | 1, 2, 4 | Line width |
| `roughness` | 0, 1, 2 | Hand-drawn feel (0=smooth, 2=rough) |
| `opacity` | 0-100 | Transparency |

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
  "containerId": "parent-element-id"  // Bind to container
}
```

| fontFamily | Font |
|------------|------|
| 1 | Virgil (handwritten) |
| 2 | Helvetica |
| 3 | Cascadia (monospace) |

| textAlign | Horizontal Alignment |
|-----------|----------------------|
| `"left"` | Left |
| `"center"` | Center |
| `"right"` | Right |

### Arrow Properties

```json
{
  "type": "arrow",
  "points": [[0, 0], [100, 0]],
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

| arrowhead | Style |
|-----------|-------|
| `null` | No arrowhead |
| `"arrow"` | Standard arrow |
| `"bar"` | Vertical bar |
| `"dot"` | Circle |
| `"triangle"` | Triangle |

### Grouping

```json
// Group elements
"groupIds": ["group-1"]

// Nested groups
"groupIds": ["group-1", "subgroup-a"]
```

### Element Binding

Container and text binding:

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

## Color Palette

### Business Style

| Purpose | Color |
|---------|-------|
| Primary/Text | `#1e3a5f` |
| Secondary | `#4a90d9` |
| Background Blue | `#dbeafe` |
| Background Green | `#dcfce7` |
| Background Yellow | `#fef3c7` |
| Accent Green | `#10b981` |
| Border Gray | `#6b7b8c` |
| Light Gray | `#9ca3af` |

### Status Colors

| Status | Background | Border |
|--------|------------|--------|
| Success | `#dcfce7` | `#10b981` |
| Warning | `#fef3c7` | `#f59e0b` |
| Error | `#fee2e2` | `#ef4444` |
| Info | `#dbeafe` | `#3b82f6` |

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
