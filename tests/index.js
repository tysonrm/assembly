const assert = require('assert')
const WasmInterop = require('../wasm-interop').WasmInterop
const wrapper = require('../wasm-wrappers')

require('..').then(wasmInstance => {
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
    fibonacci,
    onUpdate
    // Input,
    // Output,
    // getInput,
    // getOutput,
    // testClass
  } = wasmInstance.exports

  console.log(Object.entries(wasmInstance.exports))

  const adapter = WasmInterop(wasmInstance)

  const wms = wrapper.wrapWasmModelSpec(wasmInstance)
  console.log(wms)
  console.log(wms.test({}))

  const fib = 20
  console.log(
    'fibonacci of',
    fib,
    'is',
    adapter.callWasmFunction(fibonacci, fib)
  )

  const specPtr = __pin(getModelSpec())
  const modelSpec = ModelSpec.wrap(specPtr)

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
      const model = __getArray(modelPtr)
        .map(multi => __getArray(multi))
        .map(tuple => ({
          [__getString(tuple[0])]: __getString(tuple[1])
        }))
        .reduce((prop1, prop2) => ({
          ...prop1,
          ...prop2
        }))
        console.log(model)
      keyPtrs.forEach(__unpin)
      valPtrs.forEach(__unpin)
    }
  }

  const model = wrapped.factory({ key1: 'fromInput1', key2: 'fromInput2' })
  console.log(model)
  adapter.callWasmFunction(onUpdate, model, false)

  assert.strictEqual(wrapped.modelMame, 'wasm')
  assert.strictEqual(wrapped.endpoint, 'wasm')

  __unpin(specPtr)

  // assert.equal(
  //   adapter.callWasmFunction(wasmInstance.exports.commandEx, { a: 'b' }),
  //   { a: 'b' }
  // )

  // const inPtr = __pin(getInput())
  // const InClass = Input.wrap(inPtr)
  // const input = new Input('data1', 'data1')

  // const outPtr = __pin(testClass(input))
  // const output = Output.wrap(outPtr)

  return Object.freeze(wrapped)
})
