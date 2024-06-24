console.log(Math.random()); // random number
console.log(Math.round(25 / 4)); // 4.49 => 4 || 4.51 => 5
console.log(Math.floor(4.89)); // 4.89 => 4
console.log(Math.ceil(25 / 4)); // 10.4 => 11
console.log(Math.trunc(10 / 3)); // 10.6 => 10
console.log(Math.sign(10)); // -5 => -1 ; 0 => 0 ; 6 => 1

// ====================== //

const getOTP = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

console.log(getOTP(100000, 999999));

// ==================== //
const points = [40, 100, 12, 5, 25, 10];

// Math.min()
// const minNumber = (arr) => Math.min(...arr);
// console.log(minNumber(points));

// Math.max()
// const maxNumber = (arr) => Math.max(...arr);
// console.log(maxNumber(points));
