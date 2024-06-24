// Regular funcation
// Regular functions have their own this context

function sum(a, b) {
  return a + b;
}

console.log(sum(2, 4));

function Human(name, age) {
  this.name = name;
  this.age = age;
}

const prince = new Human("Prince", 21);

console.log(prince);

//=====================================//

// Arrow funcation
// Arrow functions do not have their own this context.

const Welcome = (name) => {
  return `Hello ${name}`;
};

console.log(Welcome("prince"));

const Person = (name, age) => {
  this.name = name;
  this.age = age;
};

const raj = new Person("Raj", 21);

console.log(raj); // give the error
