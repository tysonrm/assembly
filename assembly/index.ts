
export class Model {
  modelName:string
  prop1:string
  constructor(prop1:string, name:string) {
    this.prop1 = prop1;
    this.modelName = name
  }
}

export const ArrayOfStrings_ID = idof<string[]>();

export function modelFactory (keys: string[], values: string[]): Model {
  if (keys[0] == "key1" &&  values[0] === "val1")
    return new Model("val1", "wasm");
  else
    return new Model("not val1", "wasm");
}

function dispose(model: Model): void {
  model.dispose();
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


