
export class Model {
  prop1:string
  constructor(prop1:string) {
    this.prop1 = prop1;
  }
}

export const ArrayOfStrings_ID = idof<string[]>();

export function modelFactory (keys: string[], values: string[] ): Model {
  if (keys[0] == "key1" &&  values[0] === "val1")
    return new Model("val1");
  else
    return new Model("not val1");
}

export class ModelSpec {
  constructor(name:string,endpoint:string) {
    this.modelName = name;
    this.endpoint = endpoint;
  }
  modelName: string
  endpoint: string
}

export function getModelSpec(): ModelSpec {
  return new ModelSpec("wasm","wasm");
} 

export function getModelName (): string {
  return "wasm-service";
}

export function getEndpoint (): string {
   return "wasm-service";
}


