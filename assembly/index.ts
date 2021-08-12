// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function addWasmByExample(inputString: string): string {
  return inputString + "Wasm By Example";
}

export const modelName: string = "wasmmodel";
export const endpoint: string = "wasmmodels"



