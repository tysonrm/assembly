// The entry file of your WebAssembly module.

export function makeModel(): string[] {
  return ['prop1','prop2'];
}

export function getModelName (): string {
  return "wasmmodel";
}
export function getEndpoint (): string{
   return "wasmmodels";
}




