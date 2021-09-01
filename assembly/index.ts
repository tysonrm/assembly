
import * as aegis from "./aegis"

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
  aegis.log("test called")
  return arr;
}
  
export function getCommands():string[][] {
  const commands = new Array<string[]>(2);
  commands[0] = ["webSocketListen","write"];
  commands[1] = ["webSocketNotify","write"];
  commands[2] = ["webSocetCallback","write"]
  commands[3] = ["fibonacci","write"]
  commands[4] = ["listenCallback","write"]
  commands[5] = ["deployModule","write"]
  commands[6] = ["commandEx", "write"]
  return commands;
}

export function webSocketListen(keys:string[],values:string[]):void{
  //aegis.webSocketListen("wasmWebListen", "webSocketCallback");
  aegis.log("wasm listening on websocket");
}

export function webSocketNotify(keys:string[],values:string[]):void{
  //aegis.webSocketNotify("wasmWebNotify",values[0].toString());
  aegis.log("wasm invoked websocket notify");
}

export function webSocketCallback(keys:string[],values:string[]):void{
  aegis.log("websocket callbacked fired");
}




export function calcFibonacci(x:f64):f64 {
  if (x === 0) {
    return 0
  }

  if (x === 1) {
    return 1
  }

  return calcFibonacci(x - 1) + calcFibonacci(x - 2)
}

export function fibonacci(keys:string[],vals:string[]):string[][] {
  //const x = parseFloat(values[keys.findIndex(k => k === "fibonacci")])
  const start = Date.now()
  calcFibonacci(10)
  const duration = Date.now() - start
  const output = new Array<string[]>(1);
  output[0] = ["duration", duration.toString()];
  //aegis.callMethod('notify', 'fibonacci duration '+duration.toString());
  return output;
}

export function getPorts (keys:string[],vals:string[]):string[][] {
  const ports = new Array<string[]>(1);
  ports[0] = ["publish","service,adapter,portEx,type"];
  return ports;
}

export function commandEx (keys:string[],vals:string[]):string[][] {
  aegis.log("\ncommandEx called")
  const outval = new Array<string[]>(1)
  outval[0]=[keys[0].toString(),vals[0].toString()];
  return outval;
}

export function portEx (keys:string[],vals:string[]):void {
  return
}

export function onUpdate (keys:string[], vals:string[]):void{
  return 
}

export function onDelete (keys:string[], vals:string):void {
  return 
}


// export class Input {
//   item1:string
//   item2:string
//   constructor(item1:string,item2:string) {
//     this.item1 = item1;
//     this.item2 = item2;
//   }
// }

// export class Output {
//   item1:string
//   item2:string
//   constructor(item1:string,item2:string) {
//     this.item1 = item1;
//     this.item2 = item2;
//   }
// }

// export function testClass(input: Input): Output {
//   aegis.log("testClass intput.item1="+ input.item1);
//   return new Output("value1","value2");
// }

