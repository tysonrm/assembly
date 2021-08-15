const assert = require('assert')

require('..').then(wasmModule => {
  console.log(
    'makeModel args:',
    wasmModule.exports.makeModel([
      ['a', 'b'],
      ['c', 'd']
    ])
  )
  assert.strictEqual(wasmModule.exports.getModelName(), 'wasm-service')
  assert.strictEqual(wasmModule.exports.getEndpoint(), 'wasm-service')
  console.log('modleName:', wasmModule.exports.getModelName())
})
