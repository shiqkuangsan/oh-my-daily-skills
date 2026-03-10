# Flowchart Example

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
