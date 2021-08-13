const assert = require("assert");

require("..").then(wasmModule => {
  console.log("makeModel args:", wasmModule.exports.makeModel());
  assert.strictEqual(wasmModule.exports.getModelName(), "wasmmodel");
  assert.strictEqual(wasmModule.exports.getEndpoint(), "wasmmodels");
  console.log("modleName:", wasmModule.exports.getModelName());
});
