// client request -> middleware -> server response
// function checkRoute(req, res, next) =>{
//     console.log(req.url)
    
// }
// app.use(checkRoute)

const express = require('express')
const { Activity } = require('react')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })


app.use((req, res, next) => {
    console.log('Middleware executed', new Date())
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Activity
//what is middleware function and why we use 
//where we use middle ware function at company level
//types of middlware
//write 2 or 3 examples of middleware function