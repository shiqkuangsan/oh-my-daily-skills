# Architecture Example

Classic Client → Server → Database three-tier architecture.

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
