# Local canvas workflow

Use an existing rendering toolchain when available. This skill does not require MCP, Docker, a particular browser host or a global installation. Native scene generation is also valid. Keep machine-specific setup in the host configuration.

## Available diagram-excalidraw CLI

When `diagram-excalidraw` is installed, inspect its help/status before use. The following workflow is supported by the tested 2.0.0 CLI. Preserve an existing user's canvas; use an isolated instance or source-file workflow if ownership is unclear.

```bash
diagram-excalidraw status
diagram-excalidraw start
# Open the URL reported by start in a task-owned browser session.
# Screenshots require a connected tab.
diagram-excalidraw import /absolute/path/diagram.excalidraw --replace
diagram-excalidraw screenshot --out /absolute/path/diagram.png
diagram-excalidraw screenshot --format svg --out /absolute/path/diagram.svg
```

Use `--replace` only on a canvas owned by this task. For a new scene, `add /path/elements.json` accepts a simplified array; `export --out /path/diagram.excalidraw` produces the saved source. Reimport the exported native file before final rendering: simplified input and native output can differ in labels and font geometry.

After native import, bound labels are separate text elements. Update the actual text element and preserve its binding; do not add a second shorthand label to the container. If using UI tools, save UI edits back to the deliverable before final validation.

Respect the host's browser automation instructions. Close only task-owned sessions. Stop the canvas if the task started it and the user has not requested an open editor; verify it stopped. Saved files must remain usable independently of that process.

## Other environments

Use an already available Excalidraw renderer or editor and follow the same save → reopen → render → inspect loop. Do not install another server solely because this reference mentions a CLI. If a renderer is unavailable, state the gap; do not substitute a raster drawing and claim it is editable.

Avoid external share/upload operations unless requested. Source and local previews are sufficient delivery.
