const student = {
  name: "prince",
  age: 23,
  email: "prince.khnat@atharvasystem.com",
};

// object properties can access in two ways
console.log(student.name);
console.log(student["email"]);

//===========================//

//When a JavaScript variable is declared with the keyword "new", the variable is created as an object

function User() {
  this.name = "Prince";
  this.createdAt = new Date();
}

var x = new User();
console.log(x);

//====================================//

//Add key and value in existing object

const user = {
  name: "prince",
};

user["email"] = "prince.khant@atharvasystem.com";

console.log(user);

const letter = new Set();
letter.add("a");
console.log(letter);
