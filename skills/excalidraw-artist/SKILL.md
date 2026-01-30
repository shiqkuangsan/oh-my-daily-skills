---
name: tooyoung:excalidraw-artist
description: Create Excalidraw hand-drawn style diagrams (architecture, flowchart, swimlane, sequence, wireframe). Trigger words: draw diagram, architecture diagram, flowchart, swimlane, excalidraw, diagram
metadata:
  version: "0.2.0"
---

# Excalidraw Artist

Create professional hand-drawn style diagrams with Excalidraw, outputting `.excalidraw` files.

## Supported Diagram Types

| Type | Use Cases |
|------|-----------|
| Architecture | System design, microservices, layered architecture |
| Flowchart | Business processes, approval workflows, deployment flows |
| Swimlane | Multi-role collaboration, cross-department processes |
| Sequence | API calls, message flows |
| Wireframe | UI prototypes, page layouts |

## Quick Start

```bash
# Example user requests
"Draw a microservices architecture with gateway, user service, order service"
"Create an approval flowchart"
"Draw a login sequence diagram"
```

Output files can be opened and edited at [excalidraw.com](https://excalidraw.com).

## Design Principles

### Layout
- Horizontal flow: left to right
- Vertical hierarchy: top to bottom
- Consistent spacing: 40-60px between elements
- Overall width: 1200-1600px

### Color Palette (recommended, adjustable per context)

**Business Style** (default):
| Purpose | Color |
|---------|-------|
| Primary | #1e3a5f |
| Secondary | #4a90d9 |
| Background | #f1f5f9 |
| Accent | #10b981 |
| Border | #6b7b8c |

**Minimal Style**: Primary #1f2937, Border #9ca3af, Background #ffffff

### Element Selection

| Type | Shape | Usage |
|------|-------|-------|
| Core Component | Rounded Rectangle | Services, modules |
| Process Node | Rectangle | Steps, actions |
| Decision Point | Diamond | Conditions, branches |
| Data Source | Cylinder | Databases |
| Start/End | Ellipse | Start, end |

### Connectors

| Style | Usage |
|-------|-------|
| Solid Arrow | Main flow |
| Dashed Arrow | Optional/async |
| Bidirectional Arrow | Two-way calls |

## Workflow

1. **Understand Requirements** → Determine diagram type, identify key elements
2. **Plan Layout** → Define dimensions, divide regions
3. **Build Elements** → Reference JSON structures in `references/examples.md`
4. **Output File** → Generate `.excalidraw` file

## Reference Documentation

| File | Content |
|------|---------|
| `references/examples.md` | Complete JSON examples for 3 diagram types |
| `references/element-ref.md` | Element properties quick reference |

## Notes

- For complex diagrams, describe requirements step by step
- Large diagrams (>30 elements) should be split
- Fine-tune in Excalidraw after generation
- Mix Chinese/English labels for readability
