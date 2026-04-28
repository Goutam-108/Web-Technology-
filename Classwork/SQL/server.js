const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/data', (req, res) => {
    const data = req.body
    console.log('Received data:', data)
    res.send('Data received successfully!')
})

app.put('/update', (req, res) => {
    const updateData = req.body
    console.log('Received update data:', updateData)
    res.send('Update received successfully!')
}   )

app.delete('/delete', (req, res) => {   
    const deleteData = req.body
    console.log('Received delete data:', deleteData)
    res.send('Delete request received successfully!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})