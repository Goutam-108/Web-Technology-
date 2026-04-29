//write a code for array function object declaration
//write a code for reverse number 
//check palindrome number
//write a code for fibonacci series
//write a code for find largest number in array
//Remove duplicate from array
//find missing number in array
//string:write reverse string
//coudnt vowels in string
//check plindrome instiction
//check prime number
//check factorial of number
//write a code function even or odd
//write a code function sum of array


//ALL acitvity:
// A1: reverse number
let num1 = 123456;
console.log(num1.toString().split('').reverse().join(''));
let num2 = Number(num1);
console.log(num2);

// A2: palindrome number & string
let num3 = 125521;
let revnum = num3.toString().split('').reverse().join('');
console.log("Number Palindrome:", revnum === num3.toString());

let str = "madam";
console.log("String Palindrome:", str.split('').reverse().join('') === str);

// A3: fibonacci series
let n = 10;
let a = 0, b = 1;
console.log("Fibonacci Series:");
for (let i = 0; i < n; i++) {
  console.log(a);
  let next = a + b;
  a = b;
  b = next;
}

// A4: find largest number in array
let arr1 = [10, 25, 8, 99, 45];
console.log("Largest:", Math.max(...arr1));

// A5: remove duplicates from array
let arr2 = [1,2,2,3,4,4,5];
let unique = [...new Set(arr2)];
console.log("Unique Array:", unique);

// A6: find missing number in array (1 to n)
let arr3 = [1,2,3,5];
let total = 5 * (5 + 1) / 2;
let sum = arr3.reduce((a,b)=>a+b,0);
console.log("Missing Number:", total - sum);

// A7: reverse string
let str2 = "javascript";
console.log("Reverse String:", str2.split('').reverse().join(''));

// A8: count vowels in string
let text = "hello world";
let vowels = text.match(/[aeiou]/gi);
console.log("Vowel Count:", vowels ? vowels.length : 0);

// A9: palindrome string check
let text2 = "level";
let revStr = text2.split('').reverse().join('');
console.log("Palindrome String:", revStr === text2);

// A10: check prime number
let num4 = 17;
let isPrime = true;
for (let i = 2; i < num4; i++) {
  if (num4 % i === 0) {
    isPrime = false;
    break;
  }
}
console.log("Prime Number:", isPrime);

// A11: factorial of number
let factNum = 5;
let fact = 1;
for (let i = 1; i <= factNum; i++) fact *= i;
console.log("Factorial:", fact);

// A12: even or odd function
function checkEvenOdd(n) {
  return n % 2 === 0 ? "Even" : "Odd";
}
console.log("Number is:", checkEvenOdd(7));

// A13: sum of array
let arr4 = [1,2,3,4,5];
let sumArr = arr4.reduce((a,b)=>a+b,0);
console.log("Sum of Array:", sumArr);

// A14: array, function, and object declaration
let numbers = [1,2,3];
function greet() {
  console.log("Hello!");
}
let person = {
  name: "G",
  age: 20
};
console.log(numbers, person);
greet();
