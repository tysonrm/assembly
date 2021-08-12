// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function modelFactory(inputString: string): string {
  return inputString+" updated by wasm";
}

export function setProperty1 (value1: string): string {
  return value1;
}
export function setProperty2 (value2:string): string{
   return value2;
}

export const modelName: string = "wasmmodel";
export const endpoint: string = "wasmmodels"



