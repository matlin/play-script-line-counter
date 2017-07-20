const test = require("tape");
const ScriptParser = require("../script-parser.js");
const SampleScriptPath = "./sample_script.txt";

test("Script Parser builds parser from parameters", assert => {
  const parser = new ScriptParser();
  assert.equal(
    typeof parser,
    "function",
    "Given two mismatched values, .equal() should produce a nice bug report"
  );
  assert.end();
});

test("The resulting parser returns a a promise for a JS object when supplied valid XML file", assert => {
  assert.plan(4); //plan for 4 assertions
  const parser = new ScriptParser();
  const sample = parser(SampleScriptPath).then(obj => {
    assert.equal(typeof obj, "object", "Should return a JS object when finished")
  });
  assert.equal(
    typeof sample,
    "object",
    "The parser should be async and return a promise"
  );
  assert.true("then" in sample);
  assert.true("catch" in sample);
});
