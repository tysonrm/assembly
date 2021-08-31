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
export function test (keys: string[], values: string[]): string[][] {
  const key1 = keys[0] == "key1" ? values[0] : "default";
  const key2 = keys[1] == "key2" ? values[1] : "default";
  const arr = new Array<string[]>(3);
  arr[0]=["key1",key1];
  arr[1]=["key2",key2];
  arr[2]=["key3","alwaysThisValue"];
  return arr;
}

export function getCommands():string[][] {
  const commands = new Array<string[]>(2);
  commands[0] = ["commandEx","a sample command"];
  commands[1] = ["fibonacci","run fibanocci sequence"]
  return commands;
}

export function commandEx(keys:string[],values:string[]):string[][]{
  const output = new Array<string[]>(1);
  output[0] = ["status","accepted"];
  return output; 
}

export function calculateFibonacci(x:f64):f64 {
  if (x === 0) {
    return 0
  }

  if (x === 1) {
    return 1
  }

  return calculateFibonacci(x - 1) + calculateFibonacci(x - 2)
}

export function fibonacci(keys:string[],values:string[]):string[][] {
  //const x = parseFloat(values[keys.findIndex(k => k === "fibonacci")])
  const start = Date.now()
  calculateFibonacci(100);
  const duration = Date.now() - start
  const output = new Array<string[]>(1);
  output[0] = ["duration", duration.toString()];
  return output;
}