function logger(...message: any[]) {
  console.log("decorator factory");
  console.log("------------------------------------------------");
  return function (Class: Function & typeof Person) {
    console.log(`Logger decorator with parameters: >> ${message}`);
    console.log(Class);

    Class.own = Number(message);
    console.log("------------------------------------------------");
  };
}

@logger(53)
class Person {
  name: string = "Jon";

  static own: number;

  constructor(name: string) {
    this.name = name;
  }

  display(...args: any): void {
    console.log(`Person name: ${this.name} - ${Person.own} ${args}`);
  }
}

const p = new Person("Haa");
p.display(1, 5, "ok");
