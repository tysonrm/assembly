// The entry file of your WebAssembly module.

export function makeModel(tuples: string[][]): string[][] {
  return [['prop1','val1'],['prop2','val2']].concat(tuples);
}

export function getModelName (): string {
  return "wasm-service";
}
export function getEndpoint (): string {
   return "wasm-service";
}




