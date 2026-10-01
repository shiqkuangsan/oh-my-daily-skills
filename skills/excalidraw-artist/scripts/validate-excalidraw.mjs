#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const layout = process.argv.includes("--layout");
const files = process.argv.slice(2).filter((arg) => arg !== "--layout");

if (files.length === 0) {
  console.error(
    "Usage: node scripts/validate-excalidraw.mjs [--layout] <file.excalidraw> [...]",
  );
  process.exit(2);
}

let hasError = false;

function hasBoundElement(element, id, type) {
  return (
    Array.isArray(element.boundElements) &&
    element.boundElements.some((item) => item.id === id && item.type === type)
  );
}

function validateFile(file) {
  const absolute = path.resolve(file);
  const errors = [];
  const warnings = [];
  let doc;

  try {
    doc = JSON.parse(fs.readFileSync(absolute, "utf8"));
  } catch (error) {
    errors.push(`invalid JSON: ${error.message}`);
    return { file: absolute, errors };
  }

  if (!doc || typeof doc !== "object" || Array.isArray(doc)) {
    return { file: absolute, errors: ["expected a scene object"] };
  }
  if (doc.type !== "excalidraw") {
    errors.push(
      `expected top-level type "excalidraw", got ${JSON.stringify(doc.type)}`,
    );
  }

  if (!Array.isArray(doc.elements)) {
    errors.push("expected top-level elements array");
    return { file: absolute, errors };
  }

  if (doc.elements.some((e) => !e || typeof e !== "object" || Array.isArray(e))) {
    return { file: absolute, errors: [...errors, "elements must contain objects"] };
  }

  const ids = new Set();
  for (const e of doc.elements) {
    if (typeof e.id !== "string" || !e.id) errors.push("element has missing or invalid id");
    else if (ids.has(e.id)) errors.push(`duplicate element id ${e.id}`);
    ids.add(e.id);
    if (e.isDeleted) continue;
    for (const key of ["x", "y", "width", "height"]) {
      if (!Number.isFinite(e[key])) errors.push(`${e.id}.${key} must be finite`);
    }
    if (e.width < 0 || e.height < 0) errors.push(`${e.id} has negative dimensions`);
    if (e.boundElements != null && (!Array.isArray(e.boundElements)
      || e.boundElements.some(b => !b || typeof b.id !== "string" || !["text", "arrow"].includes(b.type)))) {
      errors.push(`${e.id}.boundElements is malformed`);
    }
    if (["arrow", "line"].includes(e.type) && (!Array.isArray(e.points) || e.points.length < 2
      || e.points.some(p => !Array.isArray(p) || p.length !== 2 || !p.every(Number.isFinite)))) {
      errors.push(`${e.id} needs at least two finite [x,y] points`);
    }
    if (e.type === "text" && (typeof e.text !== "string" || !Number.isFinite(e.fontSize) || e.fontSize <= 0)) {
      errors.push(`${e.id} has invalid text or fontSize`);
    }
    if (e.type === "image" && (!e.fileId || !doc.files?.[e.fileId])) {
      errors.push(`${e.id} references a missing image asset`);
    }
  }
  // Stop before traversing malformed binding objects.
  if (errors.length) return { file: absolute, errors };

  const byId = new Map(
    doc.elements
      .filter((element) => !element.isDeleted)
      .map((element) => [element.id, element]),
  );

  for (const arrow of doc.elements.filter(
    (element) => element.type === "arrow" && !element.isDeleted,
  )) {
    const startId = arrow.startBinding?.elementId;
    const endId = arrow.endBinding?.elementId;
    const start = startId ? byId.get(startId) : null;
    const end = endId ? byId.get(endId) : null;

    if (!startId || !endId) {
      errors.push(`arrow ${arrow.id} is missing startBinding/endBinding`);
      continue;
    }
    if (!start) {
      errors.push(
        `arrow ${arrow.id} startBinding references missing element ${startId}`,
      );
      continue;
    }
    if (!end) {
      errors.push(
        `arrow ${arrow.id} endBinding references missing element ${endId}`,
      );
      continue;
    }
    if (!hasBoundElement(start, arrow.id, "arrow")) {
      errors.push(
        `arrow ${arrow.id} is not listed in source ${startId}.boundElements`,
      );
    }
    if (!hasBoundElement(end, arrow.id, "arrow")) {
      errors.push(
        `arrow ${arrow.id} is not listed in target ${endId}.boundElements`,
      );
    }
  }

  for (const text of doc.elements.filter(
    (element) =>
      element.type === "text" && element.containerId && !element.isDeleted,
  )) {
    const container = byId.get(text.containerId);
    if (!container) {
      errors.push(
        `text ${text.id} references missing container ${text.containerId}`,
      );
      continue;
    }
    if (!hasBoundElement(container, text.id, "text")) {
      errors.push(
        `text ${text.id} is not listed in container ${text.containerId}.boundElements`,
      );
    }
  }

  for (const element of doc.elements.filter(
    (item) => Array.isArray(item.boundElements) && !item.isDeleted,
  )) {
    for (const bound of element.boundElements) {
      const target = byId.get(bound.id);
      if (!target) {
        errors.push(
          `${element.id}.boundElements references missing ${bound.type} ${bound.id}`,
        );
        continue;
      }
      if (target.type !== bound.type) {
        errors.push(`${element.id} expects ${bound.id} to be ${bound.type}, found ${target.type}`);
      }
      if (bound.type === "text" && target.containerId !== element.id) {
        errors.push(
          `${element.id}.boundElements includes text ${bound.id}, but that text containerId is ${JSON.stringify(target.containerId)}`,
        );
      }
      if (bound.type === "arrow") {
        const startId = target.startBinding?.elementId;
        const endId = target.endBinding?.elementId;
        if (startId !== element.id && endId !== element.id) {
          errors.push(
            `${element.id}.boundElements includes arrow ${bound.id}, but that arrow is bound to ${JSON.stringify(startId)} -> ${JSON.stringify(endId)}`,
          );
        }
      }
    }
  }

  if (layout) {
    for (const e of byId.values()) {
      if (e.type !== "text" || e.angle) continue;
      const c = byId.get(e.containerId);
      // Only rectangular, unrotated labels have a useful simple bounds test.
      // Arrow labels, diamonds, font metrics and intentional overlaps need rendering.
      if (c?.type === "rectangle" && !c.angle &&
        (e.x < c.x - 2 || e.y < c.y - 2 || e.x + e.width > c.x + c.width + 2
          || e.y + e.height > c.y + c.height + 2)) {
        warnings.push(`${e.id}: text bounds extend outside ${c.id}; inspect the rendered label`);
      }
    }
  }
  return { file: absolute, errors, warnings };
}

for (const file of files) {
  const result = validateFile(file);
  for (const warning of result.warnings ?? []) console.warn(`WARN ${warning}`);
  if (result.errors.length === 0) {
    console.log(`OK ${result.file}`);
    continue;
  }

  hasError = true;
  console.error(`FAIL ${result.file}`);
  for (const error of result.errors) {
    console.error(`- ${error}`);
  }
}

if (hasError) {
  process.exit(1);
}
