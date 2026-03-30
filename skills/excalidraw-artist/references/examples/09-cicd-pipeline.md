# CI/CD Pipeline Example

Build→Test→Deploy pipeline with stages, gates, and environments.

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
      "width": 300,
      "height": 30,
      "text": "CI/CD Pipeline",
      "fontSize": 24,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "stage-build",
      "type": "rectangle",
      "x": 50,
      "y": 80,
      "width": 160,
      "height": 100,
      "strokeColor": "#3b82f6",
      "backgroundColor": "#eff6ff",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 1,
      "boundElements": [
        { "id": "stage-build-title", "type": "text" },
        { "id": "arrow-build-test", "type": "arrow" }
      ]
    },
    {
      "id": "stage-build-title",
      "type": "text",
      "x": 75,
      "y": 88,
      "width": 110,
      "height": 24,
      "text": "Build",
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "top",
      "strokeColor": "#3b82f6",
      "containerId": "stage-build"
    },
    {
      "id": "stage-build-steps",
      "type": "text",
      "x": 62,
      "y": 118,
      "width": 136,
      "height": 54,
      "text": "· Install deps\n· Compile TS\n· Build artifacts",
      "fontSize": 13,
      "fontFamily": 2,
      "textAlign": "left",
      "strokeColor": "#475569"
    },
    {
      "id": "stage-test",
      "type": "rectangle",
      "x": 280,
      "y": 80,
      "width": 160,
      "height": 100,
      "strokeColor": "#10b981",
      "backgroundColor": "#ecfdf5",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 2,
      "boundElements": [
        { "id": "stage-test-title", "type": "text" },
        { "id": "arrow-build-test", "type": "arrow" },
        { "id": "arrow-test-gate", "type": "arrow" }
      ]
    },
    {
      "id": "stage-test-title",
      "type": "text",
      "x": 305,
      "y": 88,
      "width": 110,
      "height": 24,
      "text": "Test",
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "top",
      "strokeColor": "#10b981",
      "containerId": "stage-test"
    },
    {
      "id": "stage-test-steps",
      "type": "text",
      "x": 292,
      "y": 118,
      "width": 136,
      "height": 54,
      "text": "· Unit tests\n· Integration tests\n· Lint + type check",
      "fontSize": 13,
      "fontFamily": 2,
      "textAlign": "left",
      "strokeColor": "#475569"
    },
    {
      "id": "gate-approval",
      "type": "diamond",
      "x": 500,
      "y": 90,
      "width": 80,
      "height": 80,
      "strokeColor": "#f59e0b",
      "backgroundColor": "#fef3c7",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 2 },
      "seed": 3,
      "boundElements": [
        { "id": "gate-approval-text", "type": "text" },
        { "id": "arrow-test-gate", "type": "arrow" },
        { "id": "arrow-gate-staging", "type": "arrow" }
      ]
    },
    {
      "id": "gate-approval-text",
      "type": "text",
      "x": 512,
      "y": 118,
      "width": 56,
      "height": 24,
      "text": "Gate",
      "fontSize": 14,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "strokeColor": "#f59e0b",
      "containerId": "gate-approval"
    },
    {
      "id": "stage-staging",
      "type": "rectangle",
      "x": 640,
      "y": 80,
      "width": 160,
      "height": 100,
      "strokeColor": "#8b5cf6",
      "backgroundColor": "#ede9fe",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 4,
      "boundElements": [
        { "id": "stage-staging-title", "type": "text" },
        { "id": "arrow-gate-staging", "type": "arrow" },
        { "id": "arrow-staging-prod", "type": "arrow" }
      ]
    },
    {
      "id": "stage-staging-title",
      "type": "text",
      "x": 665,
      "y": 88,
      "width": 110,
      "height": 24,
      "text": "Staging",
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "top",
      "strokeColor": "#8b5cf6",
      "containerId": "stage-staging"
    },
    {
      "id": "stage-staging-steps",
      "type": "text",
      "x": 652,
      "y": 118,
      "width": 136,
      "height": 54,
      "text": "· Deploy preview\n· E2E tests\n· Smoke tests",
      "fontSize": 13,
      "fontFamily": 2,
      "textAlign": "left",
      "strokeColor": "#475569"
    },
    {
      "id": "stage-prod",
      "type": "rectangle",
      "x": 870,
      "y": 80,
      "width": 160,
      "height": 100,
      "strokeColor": "#dc2626",
      "backgroundColor": "#fef2f2",
      "fillStyle": "solid",
      "strokeWidth": 3,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 5,
      "boundElements": [
        { "id": "stage-prod-title", "type": "text" },
        { "id": "arrow-staging-prod", "type": "arrow" }
      ]
    },
    {
      "id": "stage-prod-title",
      "type": "text",
      "x": 895,
      "y": 88,
      "width": 110,
      "height": 24,
      "text": "Production",
      "fontSize": 18,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "top",
      "strokeColor": "#dc2626",
      "containerId": "stage-prod"
    },
    {
      "id": "stage-prod-steps",
      "type": "text",
      "x": 882,
      "y": 118,
      "width": 136,
      "height": 54,
      "text": "· Blue-green deploy\n· Health checks\n· Monitor alerts",
      "fontSize": 13,
      "fontFamily": 2,
      "textAlign": "left",
      "strokeColor": "#475569"
    },
    {
      "id": "arrow-build-test",
      "type": "arrow",
      "x": 210,
      "y": 130,
      "width": 70,
      "height": 0,
      "strokeColor": "#6b7b8c",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [70, 0]],
      "startBinding": { "elementId": "stage-build", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "stage-test", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "arrow-test-gate",
      "type": "arrow",
      "x": 440,
      "y": 130,
      "width": 60,
      "height": 0,
      "strokeColor": "#6b7b8c",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [60, 0]],
      "startBinding": { "elementId": "stage-test", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "gate-approval", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "arrow-gate-staging",
      "type": "arrow",
      "x": 580,
      "y": 130,
      "width": 60,
      "height": 0,
      "strokeColor": "#10b981",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [60, 0]],
      "startBinding": { "elementId": "gate-approval", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "stage-staging", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "label-gate-pass",
      "type": "text",
      "x": 582,
      "y": 108,
      "width": 48,
      "height": 18,
      "text": "pass ✅",
      "fontSize": 12,
      "fontFamily": 2,
      "strokeColor": "#10b981"
    },
    {
      "id": "arrow-staging-prod",
      "type": "arrow",
      "x": 800,
      "y": 130,
      "width": 70,
      "height": 0,
      "strokeColor": "#6b7b8c",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [70, 0]],
      "startBinding": { "elementId": "stage-staging", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "stage-prod", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "arrow-gate-fail",
      "type": "arrow",
      "x": 540,
      "y": 170,
      "width": 0,
      "height": 50,
      "strokeColor": "#dc2626",
      "strokeWidth": 2,
      "strokeStyle": "dashed",
      "roughness": 1,
      "points": [[0, 0], [0, 50]],
      "startBinding": { "elementId": "gate-approval", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "label-gate-fail",
      "type": "text",
      "x": 550,
      "y": 188,
      "width": 48,
      "height": 18,
      "text": "fail ❌",
      "fontSize": 12,
      "fontFamily": 2,
      "strokeColor": "#dc2626"
    },
    {
      "id": "label-fail-action",
      "type": "text",
      "x": 495,
      "y": 226,
      "width": 90,
      "height": 18,
      "text": "Fix & re-push",
      "fontSize": 13,
      "fontFamily": 2,
      "strokeColor": "#dc2626"
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

- Linear left→right pipeline flow with consistent stage boxes
- Each stage box has: title (bound text) + step list (free text below title)
- Diamond gate for approval/quality check with pass/fail branches
- Fail path goes downward with dashed red arrow
- Production stage has thick border (strokeWidth: 3) to emphasize importance
- Color progression: blue (build) → green (test) → amber (gate) → purple (staging) → red (production)
- Step lists use `·` bullet character for clean formatting
