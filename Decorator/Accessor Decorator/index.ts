function Enumerable(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("------------------------------------------------");
  console.log("Accessor logger");
  console.log(target);
  console.log(propertyKey);
  //make the method enumerable
  descriptor.enumerable = true;
  console.log(descriptor);
  const originalMethod = descriptor.get;
  descriptor.get = function () {
    const result = originalMethod?.apply(this);
    return result + " oke day chu";
  };
}

class Person {
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  @Enumerable
  get name() {
    return this._name;
  }
}

console.log("-- creating instance --");
let person: Person = new Person("Diana");
console.log("-- looping --");
for (let key in person) {
  // Liệt kê được các key của object bao gồm cả get||set nhờ set descriptor.enumerable = true;
  console.log(key + " = " + (person as any)[key]);
}
