const assert = require("assert");

require("..").then(wasm => {
  console.log(wasm.exports.modelFactory("input"));
  assert.strictEqual(wasm.exports.setProperty1("hello"), "hello");
});
