const assert = require("assert");

require("..").then(wasmInstance => {
  console.log(wasmInstance.exports.modelFactory("input"));
  assert.strictEqual(wasmInstance.exports.setProperty1("hello"), "hello");
  assert.strictEqual(wasmInstance.exports.add(1, 2), 3);
});
