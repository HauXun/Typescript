var RM: any = require("reflect-metadata");

function logType(target: any, key: string) {
  let t = Reflect.getMetadata("design:type", target, key);
  console.log(t.prototype);
  console.log(`(${key} attribute) has types ${t.name}`);
}
function logParamTypes(target: any, key: string) {
  let t = Reflect.getMetadata("design:paramtypes", target, key);
  let r = Reflect.getMetadata("design:returntype", target, key);
  console.log(r.prototype);
  var s = t.map((x) => x.name).join(" ");
  console.log(`(${key} method) has param types >> ${s}`);
}

declare interface IFoo {}

class Demo {
  // @logType
  private attr: string;

  // @logParamTypes // apply parameter decorator
  doSomething(
    param1: string,
    param2: number,
    param3: any,
    param4: { test: string },
    param5: IFoo,
    param6: Function,
    param7: (a: number) => void
  ): number {
    return 1;
  }
}

function funcInfo(func: Function) {
  return `Function "${func.name}" accepts "${func.length}" arguments`;
}

// define sample functions
var add = (a: any, b: any) => a + b;
var sayMyName = (name: string) => name;

// print function information
// console.log("add info >>", funcInfo(add));
// console.log("sayMyName info >>", funcInfo(sayMyName));

// check if `Reflect.defineMetadata` is a `function`
console.log("check >> ", typeof Reflect.defineMetadata);

// define a sample target
var target = { name: "Joris", middleName: "Honoré" };

Reflect.defineMetadata("version", 1, target);
Reflect.defineMetadata("info", { props: 1 }, target);
Reflect.defineMetadata("is", "string", target, "name");

// see the target
console.log("target >> ", target);

// extract metadata
console.log("target(info) >>", Reflect.getMetadata("info", target));

console.log("target(version) >>", Reflect.getMetadata("version", target));

console.log("target.name(is) >>", Reflect.getMetadata("is", target, "name"));

let metaKeys = Reflect.getMetadataKeys(target);
console.log(metaKeys);

Reflect.deleteMetadata("version", target);
metaKeys = Reflect.getMetadataKeys(target);
console.log(metaKeys);
