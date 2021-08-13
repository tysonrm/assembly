// The entry file of your WebAssembly module.

export function makeModel(inputString: string[]): string[] {
  return inputString;
}

export function getModelName (): string {
  return "wasmmodel";
}
export function getEndpoint (): string{
   return "wasmmodels";
}




