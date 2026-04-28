// Activity
// diff. between arrow func and simple func
// write a code for arrow func. with 2 example
// write code for switch case
// how to use truthy ans falsy value in javascript
// how to use ternary operator
// how to use loops in array
// diff bet. for of and for in
// how to use map and filter func in js
// how to use reduce methode in js

//simple function
function add(a,b)
{
    return a+b;
}
//Arrow function
const mul = (a,b) => a*b;
console.log("Simple function = "+add(2,4)+" | Arrow function = "+mul(2,4));

const sub = (a,b) => a-b;
const div = (a,b) => a/b;
console.log("Subtraction : "+sub(5,2));
console.log("Division : "+div(5,2));

let ch = 1;
switch(ch)
{
    case 1: console.log("Switch Case: 1"); break;
    case 2: console.log("Switch Case: 2"); break;
    default: console.log("Default case"); break;
}

//Truthy and falsy value in js
let val = "";
if(val)
{
    console.log("Truthy value");
}
else {
    console.log("Falsy value");
}
// 0, "", null, NaN, undefined are falsy values

// Ternary operator
let marks = 50;
let result = marks >= 50 ? "pass" : "fail";
console.log("Result = " + result);

// loops for array in js
let arr1 = [1,2,3,4,5,6,7];
let sum = 0;

// for loop
for(let i=0; i<arr1.length; i++)
{
    sum += arr1[i];
}
console.log("Addition (for loop): " + sum);

// for in loop (Iterates over keys/index)
sum = 0;
for(let i in arr1) {
    sum += arr1[i];
}
console.log("Addition (for in): " + sum);

// for of loop (Iterates over values)
sum = 0;
for(let val of arr1) {
    sum += val;
}
console.log("Addition (for of): " + sum);

// for each loop
sum = 0;
arr1.forEach(num => sum += num);
console.log("Addition (forEach): " + sum);

// map function (Doubling the array)
let doubled = arr1.map(num => num * 2);
console.log("Mapped Array (Doubled): " + doubled);

// filter function (Filtering even numbers)
let evens = arr1.filter(num => num % 2 === 0);
console.log("Filtered Array (Evens): " + evens);

// reduce method (Calculating total sum)
let totalSum = arr1.reduce((acc, curr) => acc + curr, 0);
console.log("Reduced Total: " + totalSum);