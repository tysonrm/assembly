const assert = require('assert')
const interop = require('../wasm-interop')
const wrapper = require('../wasm-wrappers')

require('..').then(wasmModule => {
  const {
    __pin,
    __unpin,
    __getString,
    __newString,
    __newArray,
    __getArray,
    ArrayOfStrings_ID,
    ModelSpec,
    getModelSpec,
    modelFactory,
    modelName
  } = wasmModule.exports

  adapter = interop.WasmInterop(wasmModule)

  const wms = wrapper.wrapWasmModelSpec(wasmModule)
  console.log(wms)
  console.log(wms.test({ key1: 'val1', a: 'b' }))

  assert.strictEqual(
    adapter.callWasmFunction(wasmModule.exports.commandEx, { a: 'b' }),
    { status: 'accepted' }
  )

  console.log(
    '>>>>>>>>>>>>>>>>>>>>modelName',
    __getString(wasmModule.exports.modelName)
  )

  //console.log(Object.entries(wasmModule.exports))
  const specPtr = __pin(getModelSpec())
  const modelSpec = ModelSpec.wrap(specPtr)
  console.log(__getString(modelSpec.modelName))
  console.log(__getString(modelSpec.endpoint))
  const wrapped = {
    modelMame: __getString(modelSpec.modelName),
    endpoint: __getString(modelSpec.endpoint),
    factory: input => {
      // Allocate a new array, but this time its elements are pointers to strings.
      const keyPtrs = Object.keys(input).map(k => __pin(__newString(k)))
      const valPtrs = Object.values(input).map(v => __pin(__newString(v)))
      const keyPtr = __pin(__newArray(ArrayOfStrings_ID, keyPtrs))
      const valPtr = __pin(__newArray(ArrayOfStrings_ID, valPtrs))
      // Provide our array of lowercase strings to WebAssembly, and obtain the new
      // array of uppercase strings before printing it.
      const modelPtr = __pin(modelFactory(keyPtr, valPtr))

      // The array keeps its values alive from now on
      //const model = Model.wrap(modelPtr);

      const model = __getArray(modelPtr)
        .map(multi => __getArray(multi))
        .map(tuple => ({
          [__getString(tuple[0])]: __getString(tuple[1])
        }))
        .reduce((prop1, prop2) => ({
          ...prop1,
          ...prop2
        }))

      // const array = __getArray(modelPtr);
      // const decoded = array.map(a => __getArray(a)).map(b => ({ [__getString(b[0])]: __getString(b[1]) })).reduce((p, c) => ({ ...p, ...c }))

      console.log(model)

      // const hydrated = Object.entries(([k, v]) => ({ [__getString(k)]: __getString(v) }));
      // const hyd2 = Object.keys(model).map(k => __getString(model[k]));
      // console.log("<<<<<<<", hyd2)
      // console.log(">>>>>>>>>", hydrated)
      keyPtrs.forEach(__unpin)
      valPtrs.forEach(__unpin)
      //model.cleanup = () => __unpin(modelPtr)
    }
  }
  console.log(wrapped.endpoint)
  console.log(wrapped.modelMame)
  console.log(wrapped.factory({ key1: 'fromInput1', key2: 'fromInput2' }))

  assert.strictEqual(wrapped.modelMame, 'wasm')
  assert.strictEqual(wrapped.endpoint, 'wasm')

  __unpin(specPtr)

  return Object.freeze(wrapped)
})
