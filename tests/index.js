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

  const ptr = __pin(getModelSpec())
  const modelSpec = ModelSpec.wrap(ptr)
  console.log(__getString(modelSpec.modelName));
  console.log(__getString(modelSpec.endpoint));
  const wrapped = {
    modelMame: __getString(modelSpec.modelName),
    endpoint: __getString(modelSpec.endpoint),
    factory: (keys, values) => {
      // Allocate a new array, but this time its elements are pointers to strings.
      const keyPtrs = Object.keys(keys).map(k => __pin(__newString(k)));
      const valPtrs = Object.values(values).map(v => __pin(__newString(v)));
      const keyPtr = __pin(__newArray(ArrayOfStrings_ID, keyPtrs));
      const valPtr = __pin(__newArray(ArrayOfStrings_ID, valPtrs));
      // Provide our array of lowercase strings to WebAssembly, and obtain the new
      // array of uppercase strings before printing it.
      const outPtr = __pin(modelFactory(keyPtr, valPtr))
      // The array keeps its values alive from now on
      const model = Model.wrap(outPtr);
      console.log(__getString(model.prop1))
      keyPtrs.forEach(__unpin);
      valPtrs.forEach(__unpin);
      __unpin(outPtr); // it is ok if the arrays becomes garbage collected now
    }
  }
  console.log(wrapped.endpoint)
  console.log(wrapped.modelMame)
  wrapped.factory(["key1", "key2"], ["va1", "val2"])
  __unpin(ptr)

  const specPtr = __pin(getModelSpec())
  const spec = ModelSpec.wrap(specPtr)
  console.log('modelName = ' + __getString(spec.modelName))
  __unpin(specPtr)


  assert.strictEqual(__getString(getModelName()), 'wasm-service')

  assert.strictEqual(__getString(getEndpoint()), 'wasm-service')

  console.log('modleName:', __getString(getModelName()))

  return Object.freeze(wrapped)
})
