// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function modelFactory(inputString: string): string {
  return inputString+" updated by wasm";
}

export function setProperty1 (val1: string): string {
  return val1;
}
export function setProperty2 (val2:string): string{
   return val2;
}

export const modelName: string = "wasmmodel";
export const endpoint: string = "wasmmodels"



