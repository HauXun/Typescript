type InferValue<Prop extends PropertyKey, Desc> = Desc extends {
  get(): any;
  value: any;
}
  ? never
  : Desc extends { value: infer T }
  ? Record<Prop, T>
  : Desc extends { get(): infer T }
  ? Record<Prop, T>
  : never;

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor
> = Desc extends { writable: any; set(val: any): any }
  ? never
  : Desc extends { writable: any; get(): any }
  ? never
  : Desc extends { writable: false }
  ? Readonly<InferValue<Prop, Desc>>
  : Desc extends { writable: true }
  ? InferValue<Prop, Desc>
  : Readonly<InferValue<Prop, Desc>>;

function defineProperty<
  Obj extends object,
  Key extends PropertyKey,
  PDesc extends PropertyDescriptor
>(
  obj: Obj,
  prop: Key,
  val: PDesc
): asserts obj is Obj & DefineProperty<Key, PDesc> {
  Object.defineProperty(obj, prop, val);
}

function log(text: string) {
  return function <T extends { new (...args): {} }>(target: T) {
    return class extends target {
      text = "override";

      constructor(...args) {
        super(args);
        console.log("constructor from decorator: ", text);
        console.log(args);
      }
    };
  };
}

@log("Srv A")
class Service {
  text = "Service";

  constructor(_text: string) {
    console.log("hi from class Service");
  }

  doSomething() {
    return "hi " + this.text;
  }
}

let service = new Service("anh ha");
console.log("do something", service.doSomething());
