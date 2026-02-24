// We can declare 2 types of object object literal and object single ton

// Object Literal
let user = {
    name : "yo",
    age : 22,
    email : "yo@gmail.com",
    city : "Ich",
    isLogin : false,
    lastLoginDay : ["Monday", "Tuesday"],
    "fullname" : "yoyo"
}

console.log(user)
console.log(user.email)
console.log(user.lastLoginDay)
console.log(user.fullname)

user.email = "user@gmail.com"
console.log(user.email)

// Object.freeze(user)  // freeze the object to prevent any changes
user.email = "user2@gmail.com"
console.log(user.email)  

// Symmbol example
const mysum = Symbol("JS")
const myobj = {
    [mysum] : "JS"
}
console.log(myobj)
console.log(typeof(myobj))
console.log(myobj[mysum])

user.greeting = function(){
    console.log("Hello.js")
}
console.log(user.greeting())

user.greeting2 = function(){
    console.log(`${this.email}`)
}

