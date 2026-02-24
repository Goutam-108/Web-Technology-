// Stack primitive use -
// Whatever we can declare variable is copy value (e.g. separate memory address)
// Store in Stack memory

// Heap non-primitive
// it give reference to original value address
// Store in heap memory

// primitive example
let myYouTube = "yo"
let newMyYouTube = myYouTube
newMyYouTube = "yoyoyo"
console.log(myYouTube)
console.log(newMyYouTube)

// non - primitive example
let user1 = {
    email : "yo@gmail.com",
    fname : "yo",
    ID : "23UAM136",
}

let user2 = user1
user2.email = "yoyoy@gmail..com"
console.log(user1.email)
console.log(user2.email)