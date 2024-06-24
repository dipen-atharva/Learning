//Variables declared with let and const have Block Scope
//Variables declared with var have Global Scope

let a = 10;
const b = 20;
var c = 30;

console.log(a);
console.log(b);
console.log(c);

{
  let x = 12;
  const y = 22;
  var z = 32;
}
console.log(x);
console.log(y);
console.log(z);
