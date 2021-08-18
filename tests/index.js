const assert = require('assert')

require('..').then(wasmModule => {
  const {
    __pin,
    __unpin,
    __getString,
    __newString,
    __newArray,
    ArrayOfStrings_ID,
    ModelSpec,
    Model,
    getModelSpec,
    getModelName,
    getEndpoint,
    modelFactory,
  } = wasmModule.exports

  const specPtr = __pin(getModelSpec())
  const modelSpec = ModelSpec.wrap(specPtr)
  console.log(__getString(modelSpec.modelName));
  console.log(__getString(modelSpec.endpoint));
  const wrapped = {
    modelMame: __getString(modelSpec.modelName),
    endpoint: __getString(modelSpec.endpoint),
    factory: (input) => {
      // Allocate a new array, but this time its elements are pointers to strings.
      const keyPtrs = Object.keys(input).map(k => __pin(__newString(k)));
      const valPtrs = Object.values(input).map(v => __pin(__newString(v)));
      const keyPtr = __pin(__newArray(ArrayOfStrings_ID, keyPtrs));
      const valPtr = __pin(__newArray(ArrayOfStrings_ID, valPtrs));
      // Provide our array of lowercase strings to WebAssembly, and obtain the new
      // array of uppercase strings before printing it.
      const modelPtr = __pin(modelFactory(keyPtr, valPtr))
      // The array keeps its values alive from now on
      const model = Model.wrap(modelPtr);
      console.log(__getString(model.prop1))
      keyPtrs.forEach(__unpin);
      valPtrs.forEach(__unpin);
      model.cleanup = () => __unpin(modelPtr)
    }
  }
  console.log(wrapped.endpoint)
  console.log(wrapped.modelMame)
  console.log(wrapped.factory({ key1: "val1", key2: "val2" }));

  assert.strictEqual(__getString(), 'wasm-service')
  assert.strictEqual(__getString(getEndpoint()), 'wasm-service')

  __unpin(specPtr)

  return Object.freeze(wrapped)
})
