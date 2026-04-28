// middleware function : it is a function that runs before sending a response. it can check data, log info, authenticate user.
// syntax : app.use(request, response, next)=>{
    //             console.log("Data received");
    //             next();   
    //       }

const express = require('express')
const app = express()
const port = 3000

app.use((request, response, next)=>{   //pass control to next function without next request will hell 
    console.log("Data received");
    next();
});

app.get('/', (req, res) =>{
    res.send("Hello world");
});

app.listen(port, ()=>{
    console.log(`visit at https://localhost:${port}`);
})