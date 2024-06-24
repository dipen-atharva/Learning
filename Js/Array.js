const city = ["ahmedabad", "rajkot", "surat"];
// console.log(city);

// ==================== //

city[1] = "mumbai";
// console.log(city);
// console.log(city.length);

// ===================== //

city.length = 0;
// console.log(city);

// ===================== //

//array methods

const name = ["prince", "raj", "happy", "jay"];

// Array toString()
// console.log(name.toString());

// Array at()
// console.log(name.at(2));

// Array join()
// console.log(name.join([" * "]));

// Array pop()
// console.log(name.pop());

// Array push()
// name.push("meet");
// console.log(name);

// Array shift()
// console.log(name.shift());

// Array unshift()
// console.log(name.unshift());

// Array delete()
// delete name[1];
// console.log(name);

// Array concat()
// console.log(name.concat(["meet"]));

// Array flat()
// console.log(name.flat());

// Array splice()
// console.log(name.splice(2, 4));

// Array slice()
// name.splice(1, 0, "meet");
// console.log(name);

// Array includes()
// console.log(name.includes("prince"));

// Array find()
// console.log(name.find("prince"));

// Array sort()
// name.sort();
// console.log(name);

// Array reverse()
// console.log(name.reverse());

// Sorting Objects
const cars = [
  { type: "Volvo", year: 2016 },
  { type: "Saab", year: 2001 },
  { type: "BMW", year: 2010 },
];
// console.log(cars.sort((a, b) => a.year + b.year));

// Numeric Sort
const points = [40, 100, 12, 5, 25, 10];
// console.log(points.sort((a, b) => a - b));
