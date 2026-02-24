// Singleton object
const user = new Object() // Creating an object using the Object constructor
console.log(user)

const user2 = {
}
user2.id = 123,
user2.name = "yo"
user2.city = "ich"
user2.isLogin = true
console.log(user2)   // non singleton object

// object inside object
const user3 = {
    email : "yo@gmail.com",
    user : {
        fullname : {
            fname : "yo",
            lname : "yo"
        }
    }
}

console.log(user3)
console.log(user3.user.fullname.fname)