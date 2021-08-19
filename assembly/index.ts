
export class Model {
  modelName:string
  prop1:string
  constructor(prop1:string, name:string) {
    this.prop1 = prop1;
    this.modelName = name
  }
}

export const ArrayOfStrings_ID = idof<string[]>();

export function modelFactory (keys: string[], values: string[]): string[][] {
  const arr = new Array<string[]>(3);
  const key1 = keys[0] === "key1" ? values[0] : "purple";
  arr[0]=["key1",key1];
  arr[1]=["key2","dinosaur"];
  arr[2]=["key3","val3"];
  return arr;
}

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


