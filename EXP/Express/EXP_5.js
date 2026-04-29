// Nodejs : it is runtime env. that lets run js code outside the browser.Build on chrome's v8 js engine.
// used to create fast and scalable wen appl.

// ExpressJS : it is minimal and flexible web framework for nodeJS
// it helps to handle routes, middleware and http request easily
// makes backend development fast and simple

//Why to use expressjs
//simplifies server creation in nodejs it offers powerful features like routing, middleware,
// static file serving and error handling.

//npm (node package manager)
// it is tool to install packages or libraries from the nodejs ecosystem


// Activity
// what is package.json
//diff. between package.json and package-lock.json
//diff. between dependency and dev-dependency
// find http methods and their use in realtime

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/time', (req, res) => {
  const date = new Date()
  let msg = {
    name : "G"+"<br>",
    time : date.getTime(),
    localdate : date.toLocaleDateString(),
    localtime : date.toLocaleTimeString()
  }
  res.send(`Hello ${msg.name}\nCurrent time is ${msg.time} <br> Local date is ${msg.localdate} <br> Local time is ${msg.localtime}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
