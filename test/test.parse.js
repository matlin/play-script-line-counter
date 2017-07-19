import test from 'tape';
import SampleScript from 'sample_script.txt';
import ScriptParser from '../script-parser.js';

test('Script Parser builds parser from parameters', (assert) => {
  const parser = new ScriptParser();
  assert.equal(typeof parser, "function",
    'Given two mismatched values, .equal() should produce a nice bug report');
  assert.end();
});

test('The resulting parser returns an Object for valid XML', (assert) => {
  const parser = new ScriptParser();
  const sample =

  assert.equal(typeof parser, "function",
    'Given two mismatched values, .equal() should produce a nice bug report');
  assert.end();
});
