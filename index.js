const fs = require('fs')
const loader = require('@assemblyscript/loader')

const wasmModule = loader.instantiate(
  fs.readFileSync(__dirname + '/build/optimized.wasm'),
  {
    aegis: {
      log: ptr =>
        wasmModule.then(instance =>
          console.log(wasmModule, instance.exports.__getString(ptr))
        )
    }
  }
)
module.exports = wasmModule.then(instance => instance)
