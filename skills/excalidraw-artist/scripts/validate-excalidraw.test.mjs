import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'excalidraw-validation-'));
after(() => fs.rmSync(temp, { recursive: true, force: true }));
const cli = fileURLToPath(new URL('./validate-excalidraw.mjs', import.meta.url));
let counter = 0;
function scene() {
  return { type: 'excalidraw', version: 2, files: {}, elements: [
    { id: 'a', type: 'rectangle', x: 0, y: 0, width: 200, height: 100,
      boundElements: [{id:'label',type:'text'},{id:'edge',type:'arrow'}] },
    { id: 'b', type: 'rectangle', x: 300, y: 0, width: 200, height: 100,
      boundElements: [{id:'edge',type:'arrow'}] },
    { id: 'label', type: 'text', x: 20, y: 30, width: 160, height: 30,
      text: '中文标签', fontSize: 24, containerId: 'a' },
    { id: 'edge', type: 'arrow', x: 200, y: 50, width: 100, height: 0,
      points: [[0,0],[100,0]], startBinding: {elementId:'a'}, endBinding: {elementId:'b'} },
  ] };
}
function run(doc, ...args) {
  const file = path.join(temp, `${counter++}.excalidraw`);
  fs.writeFileSync(file, JSON.stringify(doc));
  return spawnSync(process.execPath, [cli, ...args, file], { encoding: 'utf8' });
}
test('native reciprocal bindings and a horizontal arrow pass', () => {
  assert.equal(run(scene()).status, 0);
});
test('duplicate IDs cannot silently overwrite a node', () => {
  const d=scene(); d.elements.push({...d.elements[0]});
  assert.equal(run(d).status, 1);
});
test('malformed scene and element entries fail without a stack trace', () => {
  for (const d of [null, {type:'excalidraw',elements:[null]}]) {
    const r=run(d); assert.equal(r.status,1); assert.doesNotMatch(r.stderr,/TypeError/);
  }
});
test('invalid geometry, route points and malformed bound entries fail', () => {
  for (const mutate of [d=>d.elements[0].x='0', d=>d.elements[0].width=-1,
    d=>d.elements[3].points=[[0,0],[null,20]], d=>d.elements[0].boundElements=[null]]) {
    const d=scene(); mutate(d); assert.equal(run(d).status,1);
  }
});
test('missing reciprocal connector and label references fail', () => {
  for (const id of ['edge','label']) {
    const d=scene(); d.elements[0].boundElements=d.elements[0].boundElements.filter(b=>b.id!==id);
    assert.equal(run(d).status,1);
  }
});
test('deleted endpoints and stale backlinks fail', () => {
  let d=scene();d.elements[1].isDeleted=true;assert.equal(run(d).status,1);
  d=scene();d.elements[1].boundElements.push({id:'label',type:'text'});assert.equal(run(d).status,1);
});
test('bound arrow label is valid and not treated as rectangular overflow', () => {
  const d=scene();d.elements[3].boundElements=[{id:'edge-label',type:'text'}];
  d.elements.push({id:'edge-label',type:'text',x:220,y:30,width:60,height:30,text:'调用',fontSize:20,containerId:'edge'});
  const r=run(d,'--layout');assert.equal(r.status,0);assert.doesNotMatch(r.stderr,/WARN/);
});
test('rectangle overflow is advisory and opt-in', () => {
  const d=scene();d.elements[2].width=250;
  assert.doesNotMatch(run(d).stderr,/WARN/);
  const r=run(d,'--layout');assert.equal(r.status,0);assert.match(r.stderr,/WARN/);
});
test('embedded image assets must survive transport', () => {
  const d=scene();d.elements.push({id:'image',type:'image',x:0,y:150,width:40,height:40,fileId:'asset'});
  assert.equal(run(d).status,1);d.files.asset={id:'asset',dataURL:'data:image/png;base64,example'};
  assert.equal(run(d).status,0);
});
test('decorative lines do not require relationship bindings', () => {
  const d=scene();d.elements.push({id:'rule',type:'line',x:0,y:150,width:500,height:0,points:[[0,0],[500,0]]});
  assert.equal(run(d).status,0);
});
