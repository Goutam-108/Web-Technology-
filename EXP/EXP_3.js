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
console.log("Simple function = "+add(2,4)+"      Arrow function = "+mul(2,4));

const sub = (a,b) => a-b
const div = (a,b) => a/b
console.log("Subtraction : "+sub(5,2))
console.log("Division : "+div(5,2))

    let ch = 1
    switch(ch)
    {
        case 1:console.log("1")
        break;
        case 2:console.log("2")
        break;
        case 3:console.log("3")
        break;
        case 4:console.log("4")
        break;
        case 5:console.log("5")
        break;
        case 6:console.log("6")
        break;
        default:console.log("default")
        break;
    }

//Truthy and falsy value in js
let val = ""
if(val)
{
    console.log("Truethy value")
}
else{
    console.log("Falsy value")
}
//0,"",null,NaN,undefined are falsy value

// Ternary operator
let marks = 50
let result = marks>50 ? "pass":"fail"
console.log("result = " + result)

// loops for array in js
let arr1 = [1,2,3,4,5,6,7]
let sum = 0
//for loop
for(let i=0;i<arr1.length;i++)
{
    sum += arr1[i]
}
console.log("Addition of array elements is : "+sum)

//for in loop
sum = 0
for(let i in arr1){
    sum += arr1[i]
}
console.log("Addition : "+sum)

//for each loop
arr1.forEach