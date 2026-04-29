//handling request and response in express js
//Express application handles http request and response using a simple and intuitive API. When a client makes a request to the server, Express processes that request and sends back an appropriate response. Here's how it works:
//the request object contain info. about client request
//ex. url, headers, query parameters, request word, etc

const express = require('express')
const app = express()
const port = 3000

app.get('/user', (req, res) => {
    console.log(req.query.name) //accessing query parameter : localhost:3000/user?name='G'

})

//Activity
//write 2 or 4 examples of query parameters
//what is query parameters their real application
//use at company level

//the response object is used to send back data to the client. 
//common response methods : 
// response.send() => sends plain text or HTML, 
// response.json() => sends JSON data, 
// response.status() => sets the HTTP status code ,
// response.sendfiles() => send files , etc