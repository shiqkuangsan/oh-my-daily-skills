# Excalidraw Diagram Examples

Complete JSON examples for three common diagram types, ready to copy and use.

## 1. Simple Flowchart

A basic yes/no decision flowchart.

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [
    {
      "id": "start",
      "type": "ellipse",
      "x": 100,
      "y": 100,
      "width": 100,
      "height": 50,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#e0f2fe",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": { "type": 2 },
      "seed": 1,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": [
        { "id": "text-start", "type": "text" },
        { "id": "arrow1", "type": "arrow" }
      ]
    },
    {
      "id": "text-start",
      "type": "text",
      "x": 120,
      "y": 112,
      "width": 60,
      "height": 25,
      "text": "Start",
      "fontSize": 20,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#1e3a5f",
      "containerId": "start"
    },
    {
      "id": "decision",
      "type": "diamond",
      "x": 87.5,
      "y": 200,
      "width": 125,
      "height": 80,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#fef3c7",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 2 },
      "seed": 2,
      "boundElements": [
        { "id": "text-decision", "type": "text" },
        { "id": "arrow1", "type": "arrow" },
        { "id": "arrow2", "type": "arrow" },
        { "id": "arrow3", "type": "arrow" }
      ]
    },
    {
      "id": "text-decision",
      "type": "text",
      "x": 115,
      "y": 225,
      "width": 70,
      "height": 25,
      "text": "Condition?",
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#1e3a5f",
      "containerId": "decision"
    },
    {
      "id": "action-yes",
      "type": "rectangle",
      "x": 250,
      "y": 210,
      "width": 120,
      "height": 60,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#d1fae5",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 3,
      "boundElements": [
        { "id": "text-yes", "type": "text" }
      ]
    },
    {
      "id": "text-yes",
      "type": "text",
      "x": 275,
      "y": 227,
      "width": 70,
      "height": 25,
      "text": "Execute",
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#1e3a5f",
      "containerId": "action-yes"
    },
    {
      "id": "arrow1",
      "type": "arrow",
      "x": 150,
      "y": 150,
      "width": 0,
      "height": 50,
      "strokeColor": "#6b7b8c",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [0, 50]],
      "startBinding": { "elementId": "start", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "decision", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "arrow2",
      "type": "arrow",
      "x": 212,
      "y": 240,
      "width": 38,
      "height": 0,
      "strokeColor": "#10b981",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [38, 0]],
      "startBinding": { "elementId": "decision", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "action-yes", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    }
  ],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": null
  },
  "files": {}
}
```

## 2. Three-Tier Architecture

Classic Client → Server → Database architecture.

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [
    {
      "id": "title",
      "type": "text",
      "x": 200,
      "y": 30,
      "width": 300,
      "height": 35,
      "text": "Three-Tier Architecture",
      "fontSize": 28,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "client",
      "type": "rectangle",
      "x": 100,
      "y": 100,
      "width": 150,
      "height": 80,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#dbeafe",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 1,
      "boundElements": [
        { "id": "text-client", "type": "text" },
        { "id": "arrow-cs", "type": "arrow" }
      ]
    },
    {
      "id": "text-client",
      "type": "text",
      "x": 125,
      "y": 120,
      "width": 100,
      "height": 40,
      "text": "Client\nReact App",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#1e3a5f",
      "containerId": "client"
    },
    {
      "id": "server",
      "type": "rectangle",
      "x": 350,
      "y": 100,
      "width": 150,
      "height": 80,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#dcfce7",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 2,
      "boundElements": [
        { "id": "text-server", "type": "text" },
        { "id": "arrow-cs", "type": "arrow" },
        { "id": "arrow-sd", "type": "arrow" }
      ]
    },
    {
      "id": "text-server",
      "type": "text",
      "x": 375,
      "y": 120,
      "width": 100,
      "height": 40,
      "text": "Server\nNode.js API",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#1e3a5f",
      "containerId": "server"
    },
    {
      "id": "database",
      "type": "rectangle",
      "x": 600,
      "y": 100,
      "width": 150,
      "height": 80,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#fef3c7",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 3,
      "boundElements": [
        { "id": "text-db", "type": "text" },
        { "id": "arrow-sd", "type": "arrow" }
      ]
    },
    {
      "id": "text-db",
      "type": "text",
      "x": 625,
      "y": 120,
      "width": 100,
      "height": 40,
      "text": "Database\nPostgreSQL",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#1e3a5f",
      "containerId": "database"
    },
    {
      "id": "arrow-cs",
      "type": "arrow",
      "x": 250,
      "y": 140,
      "width": 100,
      "height": 0,
      "strokeColor": "#6b7b8c",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [100, 0]],
      "startBinding": { "elementId": "client", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "server", "focus": 0, "gap": 1 },
      "startArrowhead": "arrow",
      "endArrowhead": "arrow"
    },
    {
      "id": "arrow-cs-label",
      "type": "text",
      "x": 275,
      "y": 115,
      "width": 50,
      "height": 20,
      "text": "HTTP",
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#6b7b8c"
    },
    {
      "id": "arrow-sd",
      "type": "arrow",
      "x": 500,
      "y": 140,
      "width": 100,
      "height": 0,
      "strokeColor": "#6b7b8c",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [100, 0]],
      "startBinding": { "elementId": "server", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "database", "focus": 0, "gap": 1 },
      "startArrowhead": "arrow",
      "endArrowhead": "arrow"
    },
    {
      "id": "arrow-sd-label",
      "type": "text",
      "x": 530,
      "y": 115,
      "width": 40,
      "height": 20,
      "text": "SQL",
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#6b7b8c"
    }
  ],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": null
  },
  "files": {}
}
```

## 3. Sequence Diagram

Login authentication sequence diagram.

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [
    {
      "id": "title",
      "type": "text",
      "x": 200,
      "y": 20,
      "width": 200,
      "height": 30,
      "text": "Login Sequence",
      "fontSize": 24,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "actor-user",
      "type": "rectangle",
      "x": 100,
      "y": 70,
      "width": 80,
      "height": 40,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#dbeafe",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 }
    },
    {
      "id": "text-user",
      "type": "text",
      "x": 115,
      "y": 80,
      "width": 50,
      "height": 20,
      "text": "User",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "actor-auth",
      "type": "rectangle",
      "x": 280,
      "y": 70,
      "width": 80,
      "height": 40,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#dcfce7",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 }
    },
    {
      "id": "text-auth",
      "type": "text",
      "x": 295,
      "y": 80,
      "width": 50,
      "height": 20,
      "text": "Auth",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "actor-db",
      "type": "rectangle",
      "x": 460,
      "y": 70,
      "width": 80,
      "height": 40,
      "strokeColor": "#1e3a5f",
      "backgroundColor": "#fef3c7",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 }
    },
    {
      "id": "text-db",
      "type": "text",
      "x": 485,
      "y": 80,
      "width": 30,
      "height": 20,
      "text": "DB",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "lifeline-user",
      "type": "line",
      "x": 140,
      "y": 110,
      "width": 0,
      "height": 200,
      "strokeColor": "#9ca3af",
      "strokeWidth": 1,
      "strokeStyle": "dashed",
      "roughness": 0,
      "points": [[0, 0], [0, 200]]
    },
    {
      "id": "lifeline-auth",
      "type": "line",
      "x": 320,
      "y": 110,
      "width": 0,
      "height": 200,
      "strokeColor": "#9ca3af",
      "strokeWidth": 1,
      "strokeStyle": "dashed",
      "roughness": 0,
      "points": [[0, 0], [0, 200]]
    },
    {
      "id": "lifeline-db",
      "type": "line",
      "x": 500,
      "y": 110,
      "width": 0,
      "height": 200,
      "strokeColor": "#9ca3af",
      "strokeWidth": 1,
      "strokeStyle": "dashed",
      "roughness": 0,
      "points": [[0, 0], [0, 200]]
    },
    {
      "id": "msg1",
      "type": "arrow",
      "x": 140,
      "y": 140,
      "width": 180,
      "height": 0,
      "strokeColor": "#1e3a5f",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [180, 0]],
      "endArrowhead": "arrow"
    },
    {
      "id": "msg1-label",
      "type": "text",
      "x": 180,
      "y": 120,
      "width": 100,
      "height": 18,
      "text": "1. login()",
      "fontSize": 14,
      "fontFamily": 1,
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "msg2",
      "type": "arrow",
      "x": 320,
      "y": 180,
      "width": 180,
      "height": 0,
      "strokeColor": "#1e3a5f",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [180, 0]],
      "endArrowhead": "arrow"
    },
    {
      "id": "msg2-label",
      "type": "text",
      "x": 360,
      "y": 160,
      "width": 100,
      "height": 18,
      "text": "2. verify()",
      "fontSize": 14,
      "fontFamily": 1,
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "msg3",
      "type": "arrow",
      "x": 500,
      "y": 220,
      "width": 180,
      "height": 0,
      "strokeColor": "#10b981",
      "strokeWidth": 2,
      "strokeStyle": "dashed",
      "roughness": 1,
      "points": [[0, 0], [-180, 0]],
      "endArrowhead": "arrow"
    },
    {
      "id": "msg3-label",
      "type": "text",
      "x": 360,
      "y": 200,
      "width": 100,
      "height": 18,
      "text": "3. user data",
      "fontSize": 14,
      "fontFamily": 1,
      "strokeColor": "#10b981"
    },
    {
      "id": "msg4",
      "type": "arrow",
      "x": 320,
      "y": 260,
      "width": 180,
      "height": 0,
      "strokeColor": "#10b981",
      "strokeWidth": 2,
      "strokeStyle": "dashed",
      "roughness": 1,
      "points": [[0, 0], [-180, 0]],
      "endArrowhead": "arrow"
    },
    {
      "id": "msg4-label",
      "type": "text",
      "x": 180,
      "y": 240,
      "width": 100,
      "height": 18,
      "text": "4. token",
      "fontSize": 14,
      "fontFamily": 1,
      "strokeColor": "#10b981"
    }
  ],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": null
  },
  "files": {}
}
```

## Usage Tips

1. **Start simple**: Create shapes first, add text, then draw arrows
2. **Keep spacing consistent**: 50-100px between elements
3. **Test incrementally**: Paste into excalidraw.com to verify
4. **Adapt to context**: Examples are references, adjust colors and layout as needed
