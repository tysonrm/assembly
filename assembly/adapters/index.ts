export class Port {
  name: string;
  type: string;
  service: string;
  consumesEvent: string;
  producesEvent: string;
  constructor(
    name: string,
    type: string,
    service: string,
    consumesEvent: string,
    producesEvent: string
  ) {
    this.name = name;
    this.type = type;
    this.service = service;
    this.consumesEvent = consumesEvent;
    this.producesEvent = producesEvent;
  }
}

export class ModelSpec {
  modelName: string;
  endpoint: string;
  ports: Port[];
  constructor(name: string, endpoint: string) {
    this.modelName = name;
    this.endpoint = endpoint;
    this.ports = new Array<Port>(1);
    this.ports[0] = new Port(
      "wasm",
      "outbound",
      "wasm-service",
      "wasmStart",
      "wasmFinish"
    );
  }
}

export const ArrayOfStrings_ID = idof<string[]>();
export const ArrayOfPorts_ID = idof<Port[]>();

export function getModelSpec(): ModelSpec {
  return new ModelSpec("wasm", "wasm");
}

export function modelFactory(keys: string[], values: string[]): string[][] {
  const key1 = keys[0] == "key1" ? values[0] : "default";
  const key2 = keys[1] == "key2" ? values[1] : "default";
  const arr = new Array<string[]>(3);
  arr[0] = ["key1", key1];
  arr[1] = ["key2", key2];
  arr[2] = ["key3", "alwaysThisValue"];
  return arr;
}
