const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let user = [
    {id : 1, name : "G"},
    {id : 2, name : "G2"},
    {id : 3, name : "G3"},
];

app.get('/user', (req, res) =>{
    res.json(user)
})

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const userData = user.find(u => u.id === parseInt(userId));
    if (userData) {
        res.json(userData);
    } else {
        res.json({ message: "User not found" });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
