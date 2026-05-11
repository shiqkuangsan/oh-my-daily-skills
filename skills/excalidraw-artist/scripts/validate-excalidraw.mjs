#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error(
    "Usage: node skills/excalidraw-artist/scripts/validate-excalidraw.mjs <file.excalidraw> [...]",
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
  let doc;

  try {
    doc = JSON.parse(fs.readFileSync(absolute, "utf8"));
  } catch (error) {
    errors.push(`invalid JSON: ${error.message}`);
    return { file: absolute, errors };
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

  return { file: absolute, errors };
}

for (const file of files) {
  const result = validateFile(file);
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
