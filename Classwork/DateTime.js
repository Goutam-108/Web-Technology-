let myDate = new Date()
console.log(myDate)
console.log(myDate.toString()) // give the current date time in string format
console.log(myDate.toISOString()) // give the current date time in ISO format
console.log(myDate.toDateString()) // give only date in string format
console.log(myDate.toLocaleDateString()) // give date in local string format
console.log(myDate.toLocaleTimeString()) // give time in local string format
console.log(myDate.getFullYear()) // get the year
console.log(myDate.getMonth()) // get the month (0-11)  

let myCreatedDate = new Date('2026,1,21') 
console.log(myCreatedDate)
console.log(myCreatedDate.toLocaleString())

let myCreatedDate2 = new Date('01-21-2026')
console.log(myCreatedDate2)
console.log(myCreatedDate2.toLocaleString())

let myTimeStamp = Date.now()
console.log(myTimeStamp)
console.log(Date.now()/100)
console.log(myCreatedDate2.getTime()) // remove decimal part
console.log(Math.floor(Date.now()/1000))
let newDate = new Date()
console.log(newDate.getDay())
console.log(newDate.getMonth())
console.log(newDate.getFullYear())
console.log(newDate.getSeconds())
console.log(newDate.toLocaleString('default', {weekday : "long"}))