const fs = require("fs");
const AsBind = require("as-bind/dist/as-bind.cjs.js");

const wasmModule = AsBind.instantiate(
  fs.readFileSync(__dirname + "/build/optimized.wasm")
).then(wasm => wasm);

module.exports = wasmModule.then(instance => instance);
