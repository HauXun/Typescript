function methodLogger(
  targetPrototype: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log("Method logger");
  console.log(targetPrototype);
  console.log(name);
  console.log(descriptor);
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log("start my job", args);
    return originalMethod.apply(this, [...args, 999]);
  };
  console.log("------------------------------------------------");
}

class Person {
  name: string = "Jon";

  static own: number;

  constructor(name: string) {
    this.name = name;
  }

  @methodLogger
  display(...args: any): void {
    console.log(`Person name: ${this.name} - ${Person.own}`, args);
  }
}

const p = new Person("Haa");
p.display({ id: 2011379 });
