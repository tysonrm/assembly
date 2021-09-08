
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
  return new ModelSpec("wasm2","wasm2");
} 

export const ArrayOfStrings_ID = idof<string[]>();

export function modelFactory (keys: string[], values: string[]): string[][] {
  const key1 = keys[0] == "key1" ? values[0] : "default";
  const key2 = keys[1] == "key2" ? values[1] : "default";
  const arr = new Array<string[]>(3);
  arr[0]=["key4",key2];
  arr[1]=["key5",key1];
  arr[2]=["key6","alwaysThisValue"];
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
  const commands = new Array<string[]>(6);
  commands[0] = ["websocketListen2","tell wasm module to begin listening"];
  commands[1] = ["websocketNotify2","tell wasm module to send broadcast"];
  commands[2] = ["websocketCallback2","an event to which wasm subscribed has fired"]
  commands[3] = ["fibonacci2","calculate fibonacci for a number"]
  commands[4] = ["deployModule2","request deployment of a module"]
  commands[5] = ["commandEx2", "command example"]
  return commands;
}

export function websocketListen2(keys:string[],values:string[]):void{
  //aegis.webSocketListen("wasmWebListen", "webSocketCallback");
  aegis.log("wasm listening on websocket");
}

export function websocketNotify2(keys:string[],values:string[]):void{
  aegis.log("wasm invoked websocket notify");
  aegis.websocketNotify("wasmWebNotify2",values[0].toString());
}

export function websocketCallback2(keys:string[],values:string[]):void{
  aegis.log("websocket callbacked fired");
}

export function fibonacci2(x:f64):f64 {
  if (x === 0) {
    return 0
  }

  if (x === 1) {
    return 1
  }

  return fibonacci2(x - 1) + fibonacci2(x - 2)
}

export function fibonnacciRemote2(keys:string[], vals:string[]):string[][]{
  // const x = vals.map((v,i) => keys[i] === 'fibonacci' ? v : null)
   const r = new Array<string[]>(1);
  //if (x.length < 1 || !x[0] || typeof x[0] !== 'number') return r
  //const z = parseFloat(x[0])
  r[0] = ["duration",fibonacci2(10).toString()]
  return r
}

export function getPorts (keys:string[],vals:string[]):string[][] {
  const ports = new Array<string[]>(1);
  ports[0] = ["publish","service,adapter,portEx,type"];
  return ports;
} 

export function commandEx2 (keys:string[],vals:string[]):string[][] {
  aegis.log("\ncommandEx called")
  const outval = new Array<string[]>(1)
  return [['key'],['val']];
}

export function portEx2 (keys:string[],vals:string[]):void {
  aegis.log("portEx calling port wasmTestPort")
  //aegis.invokePort("wasmTestPort","lorem ipsum","wasmTestEvent")
  return
}

export function onUpdate (keys:string[], vals:string[]):void{
  aegis.log('onUpdate called')
  return 
}

export function onDelete (keys:string[], vals:string):void {
  return 
}

export function validate(keys:string[], vals:string[]):void{
  aegis.log('onUpdate called')
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

