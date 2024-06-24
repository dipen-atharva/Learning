const d = new Date();
d.setDate(d.getDate() - 1);
d.setHours(23);
d.setMinutes(59);
d.setSeconds(59);
console.log(d.toLocaleString());

const x = Date.now();
console.log(x);

console.log(d.toISOString(), "ISO");

console.log(d.toUTCString(), "UTC");

console.log(d.toString(), "TOSTRING");

console.log(d.getDate(), "DATE");

console.log(d.getDay(), "DAY");

console.log(d.getFullYear(), "FULLYEAR");

console.log(d.getHours(), "HOURS");

console.log(d.getMilliseconds(), "MILLISECONDS");

console.log(d.getMinutes(), "MINUTES");

console.log(d.getMonth(), "MONTH");

console.log(d.getSeconds(), "SECONDS");

console.log(d.getTime(), "TIME");

console.log(d.getTimezoneOffset(), "TIMEZONEOFFSET");

console.log(d.getUTCDate(), "UTCDATE");

console.log(d.getUTCDay(), "UTCDAY");

console.log(d.getUTCFullYear(), "UTCFULLYEAR");

console.log(d.getUTCHours(), "UTCHOURS");

console.log(d.getUTCMilliseconds(), "UTCMILLISECONDS");

console.log(d.getUTCMinutes(), "UTCMINUTS");

console.log(d.getUTCMonth(), "UTCMONTH");

console.log(d.getUTCSeconds(), "UTCSECONDS");

console.log();
// // console.log(d.getMonth());
// // console.log(d.getMonth());
// // console.log(d.getMonth());
// console.log(d.getMonth());
