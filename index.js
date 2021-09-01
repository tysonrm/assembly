const fs = require('fs')

const STRING_SMALLSIZE = 192 // break-even point in V8
const STRING_CHUNKSIZE = 1024 // mitigate stack overflow
const SIZE_OFFSET = -4 // Runtime ids
const utf16 = new TextDecoder('utf-16le', {
  fatal: true
}) // != wtf16

function getStringImpl (buffer, ptr) {
  let len = new Uint32Array(buffer)[(ptr + SIZE_OFFSET) >>> 2] >>> 1
  const wtf16 = new Uint16Array(buffer, ptr, len)
  if (len <= STRING_SMALLSIZE) return String.fromCharCode(...wtf16)

  try {
    return utf16.decode(wtf16)
  } catch {
    let str = '',
      off = 0

    while (len - off > STRING_CHUNKSIZE) {
      str += String.fromCharCode(
        ...wtf16.subarray(off, (off += STRING_CHUNKSIZE))
      )
    }

    return str + String.fromCharCode(...wtf16.subarray(off))
  }
}

const buffer = new ArrayBuffer(32);
// const AsBind = require("as-bind/dist/as-bind.cjs.js");

const importObject = {
  env: {
    abort: m => console.log('abort!')
  },
  aegis: {
    log: strPtr => console.log(getStringImpl(buffer, strPtr))
  }
}

const loader = require('@assemblyscript/loader')

const wasmModule = loader.instantiate(
  fs.readFileSync(__dirname + '/build/optimized.wasm'),
  importObject
)
module.exports = wasmModule.then(instance => instance)
