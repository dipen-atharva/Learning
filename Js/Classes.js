// A JavaScript class is not an object.
// It is a template for JavaScript objects.

class Car {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
}

const myCar = new Car("Audi", 2024);

console.log(myCar);

// ====================== //

class user {
  constructor(name, year) {
    this.name = name;
    this.year = year;
  }
  age() {
    const ToDay = new Date();
    return ToDay.getFullYear() - this.year;
  }
}

const self = new user("prince", 2001);

console.log(self.age());
