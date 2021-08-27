export class ModelSpec {
  modelName: string
  endpoint: string
  constructor(name:string, endpoint:string) {
    this.modelName = name;
    this.endpoint = endpoint;
  }
}

export function getModelSpec(): ModelSpec {
  return new ModelSpec("wasm","wasm");
} 

export const ArrayOfStrings_ID = idof<string[]>();

export function modelFactory (keys: string[], values: string[]): string[][] {
  const key1 = keys[0] == "key1" ? values[0] : "default";
  const key2 = keys[1] == "key2" ? values[1] : "default";
  const arr = new Array<string[]>(3);
  arr[0]=["key1",key1];
  arr[1]=["key2",key2];
  arr[2]=["key3","alwaysThisValue"];
  return arr;
}

export function factorial(i: i32): i32 {
  return i == 0 ? 1 : i * factorial(i - 1);
}

