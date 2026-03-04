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
      "boundElements": [{ "id": "text-yes", "type": "text" }]
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
      "points": [
        [0, 0],
        [0, 50]
      ],
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
      "points": [
        [0, 0],
        [38, 0]
      ],
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
      "points": [
        [0, 0],
        [100, 0]
      ],
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
      "points": [
        [0, 0],
        [100, 0]
      ],
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
      "points": [
        [0, 0],
        [0, 200]
      ]
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
      "points": [
        [0, 0],
        [0, 200]
      ]
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
      "points": [
        [0, 0],
        [0, 200]
      ]
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
      "points": [
        [0, 0],
        [180, 0]
      ],
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
      "points": [
        [0, 0],
        [180, 0]
      ],
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
      "points": [
        [0, 0],
        [-180, 0]
      ],
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
      "points": [
        [0, 0],
        [-180, 0]
      ],
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

## 4. Swimlane / Timeline Diagram

A quarterly roadmap with 2 swimlanes (Frontend / Backend), 3 phases, priority color coding, and grid-based layout. Demonstrates large-diagram techniques: semantic IDs, grid calculation, semantic colors.

**Layout model:**

- Total width: 1000px, 3 columns (Phase 1-3), left label sidebar 100px
- Column width: (1000 - 60 - 100) / 3 = 280
- colX(i) = 30 + 100 + i × 280

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "claude-code",
  "elements": [
    {
      "id": "title",
      "type": "text",
      "x": 300,
      "y": 15,
      "width": 400,
      "height": 30,
      "text": "Project Roadmap — Q1 2026",
      "fontSize": 24,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "phase1-header",
      "type": "rectangle",
      "x": 130,
      "y": 55,
      "width": 280,
      "height": 36,
      "strokeColor": "#475569",
      "backgroundColor": "#f1f5f9",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 10,
      "boundElements": [{ "id": "phase1-header-text", "type": "text" }]
    },
    {
      "id": "phase1-header-text",
      "type": "text",
      "x": 210,
      "y": 61,
      "width": 120,
      "height": 24,
      "text": "Phase 1 — Jan",
      "fontSize": 14,
      "fontFamily": 2,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#475569",
      "containerId": "phase1-header"
    },
    {
      "id": "phase2-header",
      "type": "rectangle",
      "x": 410,
      "y": 55,
      "width": 280,
      "height": 36,
      "strokeColor": "#475569",
      "backgroundColor": "#f1f5f9",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 11,
      "boundElements": [{ "id": "phase2-header-text", "type": "text" }]
    },
    {
      "id": "phase2-header-text",
      "type": "text",
      "x": 490,
      "y": 61,
      "width": 120,
      "height": 24,
      "text": "Phase 2 — Feb",
      "fontSize": 14,
      "fontFamily": 2,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#475569",
      "containerId": "phase2-header"
    },
    {
      "id": "phase3-header",
      "type": "rectangle",
      "x": 690,
      "y": 55,
      "width": 280,
      "height": 36,
      "strokeColor": "#475569",
      "backgroundColor": "#f1f5f9",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 12,
      "boundElements": [{ "id": "phase3-header-text", "type": "text" }]
    },
    {
      "id": "phase3-header-text",
      "type": "text",
      "x": 770,
      "y": 61,
      "width": 120,
      "height": 24,
      "text": "Phase 3 — Mar",
      "fontSize": 14,
      "fontFamily": 2,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#475569",
      "containerId": "phase3-header"
    },
    {
      "id": "lane-fe-label",
      "type": "rectangle",
      "x": 30,
      "y": 100,
      "width": 100,
      "height": 130,
      "strokeColor": "#3b82f6",
      "backgroundColor": "#eff6ff",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 20,
      "boundElements": [{ "id": "lane-fe-label-text", "type": "text" }]
    },
    {
      "id": "lane-fe-label-text",
      "type": "text",
      "x": 45,
      "y": 145,
      "width": 70,
      "height": 40,
      "text": "Frontend\nTeam",
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#3b82f6",
      "containerId": "lane-fe-label"
    },
    {
      "id": "lane-be-label",
      "type": "rectangle",
      "x": 30,
      "y": 240,
      "width": 100,
      "height": 130,
      "strokeColor": "#10b981",
      "backgroundColor": "#ecfdf5",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 21,
      "boundElements": [{ "id": "lane-be-label-text", "type": "text" }]
    },
    {
      "id": "lane-be-label-text",
      "type": "text",
      "x": 45,
      "y": 285,
      "width": 70,
      "height": 40,
      "text": "Backend\nTeam",
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#10b981",
      "containerId": "lane-be-label"
    },
    {
      "id": "line-divider",
      "type": "line",
      "x": 130,
      "y": 235,
      "width": 840,
      "height": 0,
      "strokeColor": "#d1d5db",
      "strokeWidth": 1,
      "strokeStyle": "dashed",
      "roughness": 0,
      "points": [
        [0, 0],
        [840, 0]
      ]
    },
    {
      "id": "p1-fe-task1",
      "type": "rectangle",
      "x": 138,
      "y": 105,
      "width": 264,
      "height": 50,
      "strokeColor": "#dc2626",
      "backgroundColor": "#fef2f2",
      "fillStyle": "solid",
      "strokeWidth": 3,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 100,
      "boundElements": [{ "id": "p1-fe-task1-text", "type": "text" }]
    },
    {
      "id": "p1-fe-task1-text",
      "type": "text",
      "x": 158,
      "y": 111,
      "width": 224,
      "height": 38,
      "text": "Monorepo Migration\nP0 · Alice · 2PM",
      "fontSize": 13,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#dc2626",
      "containerId": "p1-fe-task1"
    },
    {
      "id": "p1-fe-task2",
      "type": "rectangle",
      "x": 138,
      "y": 163,
      "width": 264,
      "height": 50,
      "strokeColor": "#ca8a04",
      "backgroundColor": "#fefce8",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 101,
      "boundElements": [{ "id": "p1-fe-task2-text", "type": "text" }]
    },
    {
      "id": "p1-fe-task2-text",
      "type": "text",
      "x": 158,
      "y": 169,
      "width": 224,
      "height": 38,
      "text": "Component Standards\nP1 · Bob · 1.5PM",
      "fontSize": 13,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#ca8a04",
      "containerId": "p1-fe-task2"
    },
    {
      "id": "p2-fe-task1",
      "type": "rectangle",
      "x": 418,
      "y": 105,
      "width": 264,
      "height": 50,
      "strokeColor": "#dc2626",
      "backgroundColor": "#fef2f2",
      "fillStyle": "solid",
      "strokeWidth": 3,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 102,
      "boundElements": [{ "id": "p2-fe-task1-text", "type": "text" }]
    },
    {
      "id": "p2-fe-task1-text",
      "type": "text",
      "x": 438,
      "y": 111,
      "width": 224,
      "height": 38,
      "text": "Component Doc Site\nP0 · Alice · 2PM",
      "fontSize": 13,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#dc2626",
      "containerId": "p2-fe-task1"
    },
    {
      "id": "p2-fe-task2",
      "type": "rectangle",
      "x": 418,
      "y": 163,
      "width": 264,
      "height": 50,
      "strokeColor": "#16a34a",
      "backgroundColor": "#f0fdf4",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "dashed",
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 103,
      "boundElements": [{ "id": "p2-fe-task2-text", "type": "text" }]
    },
    {
      "id": "p2-fe-task2-text",
      "type": "text",
      "x": 438,
      "y": 169,
      "width": 224,
      "height": 38,
      "text": "Dark Mode Support\nP2 · Charlie · 1PM",
      "fontSize": 13,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#16a34a",
      "containerId": "p2-fe-task2"
    },
    {
      "id": "p3-fe-task1",
      "type": "rectangle",
      "x": 698,
      "y": 105,
      "width": 264,
      "height": 50,
      "strokeColor": "#ca8a04",
      "backgroundColor": "#fefce8",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 104,
      "boundElements": [{ "id": "p3-fe-task1-text", "type": "text" }]
    },
    {
      "id": "p3-fe-task1-text",
      "type": "text",
      "x": 718,
      "y": 111,
      "width": 224,
      "height": 38,
      "text": "Performance Audit\nP1 · Bob · 1PM",
      "fontSize": 13,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#ca8a04",
      "containerId": "p3-fe-task1"
    },
    {
      "id": "p1-be-task1",
      "type": "rectangle",
      "x": 138,
      "y": 250,
      "width": 264,
      "height": 50,
      "strokeColor": "#dc2626",
      "backgroundColor": "#fef2f2",
      "fillStyle": "solid",
      "strokeWidth": 3,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 200,
      "boundElements": [{ "id": "p1-be-task1-text", "type": "text" }]
    },
    {
      "id": "p1-be-task1-text",
      "type": "text",
      "x": 158,
      "y": 256,
      "width": 224,
      "height": 38,
      "text": "API Gateway Setup\nP0 · Dave · 2PM",
      "fontSize": 13,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#dc2626",
      "containerId": "p1-be-task1"
    },
    {
      "id": "p2-be-task1",
      "type": "rectangle",
      "x": 418,
      "y": 250,
      "width": 264,
      "height": 50,
      "strokeColor": "#ca8a04",
      "backgroundColor": "#fefce8",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 201,
      "boundElements": [{ "id": "p2-be-task1-text", "type": "text" }]
    },
    {
      "id": "p2-be-task1-text",
      "type": "text",
      "x": 438,
      "y": 256,
      "width": 224,
      "height": 38,
      "text": "Auth Service\nP1 · Eve · 1.5PM",
      "fontSize": 13,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#ca8a04",
      "containerId": "p2-be-task1"
    },
    {
      "id": "p3-be-task1",
      "type": "rectangle",
      "x": 698,
      "y": 250,
      "width": 264,
      "height": 50,
      "strokeColor": "#dc2626",
      "backgroundColor": "#fef2f2",
      "fillStyle": "solid",
      "strokeWidth": 3,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 202,
      "boundElements": [{ "id": "p3-be-task1-text", "type": "text" }]
    },
    {
      "id": "p3-be-task1-text",
      "type": "text",
      "x": 718,
      "y": 256,
      "width": 224,
      "height": 38,
      "text": "DB Migration\nP0 · Dave · 1PM",
      "fontSize": 13,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#dc2626",
      "containerId": "p3-be-task1"
    },
    {
      "id": "arrow-mono-to-doc",
      "type": "arrow",
      "x": 402,
      "y": 130,
      "width": 16,
      "height": 0,
      "strokeColor": "#9ca3af",
      "strokeWidth": 1,
      "strokeStyle": "dashed",
      "roughness": 1,
      "points": [
        [0, 0],
        [16, 0]
      ],
      "startArrowhead": null,
      "endArrowhead": "arrow",
      "startBinding": { "elementId": "p1-fe-task1", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "p2-fe-task1", "focus": 0, "gap": 1 }
    },
    {
      "id": "legend-p0",
      "type": "rectangle",
      "x": 130,
      "y": 385,
      "width": 16,
      "height": 16,
      "strokeColor": "#dc2626",
      "backgroundColor": "#fef2f2",
      "fillStyle": "solid",
      "strokeWidth": 3,
      "roughness": 1,
      "seed": 300
    },
    {
      "id": "legend-p0-text",
      "type": "text",
      "x": 152,
      "y": 385,
      "width": 80,
      "height": 16,
      "text": "P0 Critical",
      "fontSize": 12,
      "fontFamily": 2,
      "strokeColor": "#64748b"
    },
    {
      "id": "legend-p1",
      "type": "rectangle",
      "x": 260,
      "y": 385,
      "width": 16,
      "height": 16,
      "strokeColor": "#ca8a04",
      "backgroundColor": "#fefce8",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "seed": 301
    },
    {
      "id": "legend-p1-text",
      "type": "text",
      "x": 282,
      "y": 385,
      "width": 90,
      "height": 16,
      "text": "P1 Important",
      "fontSize": 12,
      "fontFamily": 2,
      "strokeColor": "#64748b"
    },
    {
      "id": "legend-p2",
      "type": "rectangle",
      "x": 400,
      "y": 385,
      "width": 16,
      "height": 16,
      "strokeColor": "#16a34a",
      "backgroundColor": "#f0fdf4",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "dashed",
      "roughness": 1,
      "seed": 302
    },
    {
      "id": "legend-p2-text",
      "type": "text",
      "x": 422,
      "y": 385,
      "width": 100,
      "height": 16,
      "text": "P2 Nice-to-have",
      "fontSize": 12,
      "fontFamily": 2,
      "strokeColor": "#64748b"
    }
  ],
  "appState": {
    "viewBackgroundColor": "#ffffff",
    "gridSize": null
  },
  "files": {}
}
```

**Key techniques demonstrated:**

- Semantic ID pattern: `{phase}-{lane}-{task}` (e.g., `p1-fe-task1`)
- Grid calculation: 3 equal columns starting at x=130, spaced 280px apart
- Priority encoding: P0 red/thick, P1 amber/normal, P2 green/dashed
- Swimlane labels as left sidebar with category colors
- Dashed divider line between swimlanes
- Dependency arrow between tasks (monorepo → doc site)
- Legend row at bottom with color samples

## Usage Tips

1. **Start simple**: Create shapes first, add text, then draw arrows
2. **Keep spacing consistent**: 50-100px between elements
3. **Test incrementally**: Paste into excalidraw.com to verify
4. **Adapt to context**: Examples are references, adjust colors and layout as needed
5. **Use semantic IDs**: For 10+ elements, adopt `{category}-{name}` naming
6. **Calculate grid first**: Define column/row system before placing elements
7. **Verify bindings**: Every `containerId` must have a matching `boundElements` entry
