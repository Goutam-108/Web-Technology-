const balance = new Number(1000)
console.log(balance)
console.log(balance.toString()) // convert the value to string
console.log(balance.toString().length) // get the length of the string
console.log(balance.toFixed(3))  // format number to 3 decimal places ahead of the number
console.log(typeof(balance))
console.log(balance.toLocaleString())  // format number to local string
console.log(balance.toLocaleString('en-IN'))  // format number to Indian local string

// MATH Operations
console.log(Math);
console.log(Math.abs(-45));
console.log(Math.PI)  // PI value
console.log(Math.E)   // Euler's number
console.log(Math.floor(4.7))  // round down
console.log(Math.ceil(4.7))  // round up
console.log(Math.round(4.5))  // round to the nearest number
console.log(Math.min(3,56,7))
console.log(Math.max(3,56,7))
console.log(Math.random())  // random number between 0 and 1
console.log(Math.random()*100)  // random number between 0 and 100
console.log(Math.floor(Math.random()*100))  // random whole number between 0 and 100