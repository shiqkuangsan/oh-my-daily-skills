# ERD / Data Model Example

Entity-Relationship diagram showing 3 tables (User, Order, Product) with relationships.

**Layout model:**

- Each entity is a tall rectangle with title header + field list
- Relationships shown as labeled arrows with cardinality text
- Horizontal layout: entities spaced 200px apart

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
      "y": 20,
      "width": 250,
      "height": 30,
      "text": "E-Commerce Data Model",
      "fontSize": 24,
      "fontFamily": 1,
      "textAlign": "center",
      "strokeColor": "#1e3a5f"
    },
    {
      "id": "ent-user",
      "type": "rectangle",
      "x": 50,
      "y": 80,
      "width": 200,
      "height": 180,
      "strokeColor": "#3b82f6",
      "backgroundColor": "#eff6ff",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 1,
      "boundElements": [
        { "id": "ent-user-title", "type": "text" },
        { "id": "arrow-user-order", "type": "arrow" }
      ]
    },
    {
      "id": "ent-user-title",
      "type": "text",
      "x": 60,
      "y": 88,
      "width": 180,
      "height": 25,
      "text": "User",
      "fontSize": 20,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "top",
      "strokeColor": "#3b82f6",
      "containerId": "ent-user"
    },
    {
      "id": "ent-user-divider",
      "type": "line",
      "x": 50,
      "y": 120,
      "width": 200,
      "height": 0,
      "strokeColor": "#3b82f6",
      "strokeWidth": 1,
      "roughness": 1,
      "points": [[0, 0], [200, 0]]
    },
    {
      "id": "ent-user-fields",
      "type": "text",
      "x": 62,
      "y": 128,
      "width": 176,
      "height": 120,
      "text": "🔑 id: UUID\nname: VARCHAR\nemail: VARCHAR\ncreated_at: TIMESTAMP\nstatus: ENUM",
      "fontSize": 14,
      "fontFamily": 3,
      "textAlign": "left",
      "strokeColor": "#475569"
    },
    {
      "id": "ent-order",
      "type": "rectangle",
      "x": 350,
      "y": 80,
      "width": 200,
      "height": 180,
      "strokeColor": "#10b981",
      "backgroundColor": "#ecfdf5",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 2,
      "boundElements": [
        { "id": "ent-order-title", "type": "text" },
        { "id": "arrow-user-order", "type": "arrow" },
        { "id": "arrow-order-product", "type": "arrow" }
      ]
    },
    {
      "id": "ent-order-title",
      "type": "text",
      "x": 360,
      "y": 88,
      "width": 180,
      "height": 25,
      "text": "Order",
      "fontSize": 20,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "top",
      "strokeColor": "#10b981",
      "containerId": "ent-order"
    },
    {
      "id": "ent-order-divider",
      "type": "line",
      "x": 350,
      "y": 120,
      "width": 200,
      "height": 0,
      "strokeColor": "#10b981",
      "strokeWidth": 1,
      "roughness": 1,
      "points": [[0, 0], [200, 0]]
    },
    {
      "id": "ent-order-fields",
      "type": "text",
      "x": 362,
      "y": 128,
      "width": 176,
      "height": 120,
      "text": "🔑 id: UUID\n🔗 user_id: UUID\ntotal: DECIMAL\nstatus: ENUM\ncreated_at: TIMESTAMP",
      "fontSize": 14,
      "fontFamily": 3,
      "textAlign": "left",
      "strokeColor": "#475569"
    },
    {
      "id": "ent-product",
      "type": "rectangle",
      "x": 650,
      "y": 80,
      "width": 200,
      "height": 180,
      "strokeColor": "#f59e0b",
      "backgroundColor": "#fffbeb",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "roughness": 1,
      "roundness": { "type": 3 },
      "seed": 3,
      "boundElements": [
        { "id": "ent-product-title", "type": "text" },
        { "id": "arrow-order-product", "type": "arrow" }
      ]
    },
    {
      "id": "ent-product-title",
      "type": "text",
      "x": 660,
      "y": 88,
      "width": 180,
      "height": 25,
      "text": "Product",
      "fontSize": 20,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "top",
      "strokeColor": "#f59e0b",
      "containerId": "ent-product"
    },
    {
      "id": "ent-product-divider",
      "type": "line",
      "x": 650,
      "y": 120,
      "width": 200,
      "height": 0,
      "strokeColor": "#f59e0b",
      "strokeWidth": 1,
      "roughness": 1,
      "points": [[0, 0], [200, 0]]
    },
    {
      "id": "ent-product-fields",
      "type": "text",
      "x": 662,
      "y": 128,
      "width": 176,
      "height": 120,
      "text": "🔑 id: UUID\nname: VARCHAR\nprice: DECIMAL\nsku: VARCHAR\nstock: INTEGER",
      "fontSize": 14,
      "fontFamily": 3,
      "textAlign": "left",
      "strokeColor": "#475569"
    },
    {
      "id": "arrow-user-order",
      "type": "arrow",
      "x": 250,
      "y": 170,
      "width": 100,
      "height": 0,
      "strokeColor": "#6b7b8c",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [100, 0]],
      "startBinding": { "elementId": "ent-user", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "ent-order", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "label-user-order",
      "type": "text",
      "x": 270,
      "y": 148,
      "width": 60,
      "height": 18,
      "text": "1 → N",
      "fontSize": 14,
      "fontFamily": 2,
      "textAlign": "center",
      "strokeColor": "#6b7b8c"
    },
    {
      "id": "arrow-order-product",
      "type": "arrow",
      "x": 550,
      "y": 170,
      "width": 100,
      "height": 0,
      "strokeColor": "#6b7b8c",
      "strokeWidth": 2,
      "roughness": 1,
      "points": [[0, 0], [100, 0]],
      "startBinding": { "elementId": "ent-order", "focus": 0, "gap": 1 },
      "endBinding": { "elementId": "ent-product", "focus": 0, "gap": 1 },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "label-order-product",
      "type": "text",
      "x": 570,
      "y": 148,
      "width": 60,
      "height": 18,
      "text": "N → N",
      "fontSize": 14,
      "fontFamily": 2,
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

**Key techniques demonstrated:**

- Entity as tall rectangle with title (bound text) + divider line + field list (free text)
- Primary key marked with 🔑, foreign key with 🔗
- Monospace font (`fontFamily: 3`) for field definitions
- Each entity has its own accent color
- Cardinality labels as free text above relationship arrows
- Semantic ID pattern: `ent-{name}`, `arrow-{from}-{to}`, `label-{context}`

