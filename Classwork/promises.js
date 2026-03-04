const { rejects } = require("node:assert");
const { resolve } = require("node:dns");

console.log("start");
setTimeout(() => {
    console.log("Inside set timeout");
}, 2000);

console.log("End");

//Promises
// it is an object that represent future result of a async. operations
//Ex. 
// promise has 3 state ,
//1.Pending     2.Resolved    3.Reject

//Syntax :
let myPromise = new Promise((res, rej) => {
    let success = true;
    if (success) {
        res("Data fetched successfully");
    } else {
        rej("Error while fetching data");
    }
});
myPromise
    .then((res) => {  //'.then' return success
        console.log(res);
    })
    .catch((error) => { // '.catch' return error
        console.log(error);
    });

