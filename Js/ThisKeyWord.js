const person = {
  firstName: "prince",
  lastName: "khant",
  id: 235,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

console.log(person.fullName());

const x = this;
console.log();
