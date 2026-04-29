const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('public'))

// In-memory DB
let users = []

// ➤ REGISTER (Add User)
app.post('/users', (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" })
  }

  const user = {
    id: Date.now(),
    name,
    email,
    password
  }

  users.push(user)
  res.status(201).json({ message: "User registered", user })
})

// ➤ GET ALL USERS
app.get('/users', (req, res) => {
  res.json(users)
})

// ➤ UPDATE USER
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id)

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const { name, email } = req.body
  if (name) user.name = name
  if (email) user.email = email

  res.json({ message: "User updated", user })
})

// ➤ DELETE USER
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id)

  if (index === -1) {
    return res.status(404).json({ message: "User not found" })
  }

  users.splice(index, 1)
  res.json({ message: "User deleted" })
})

// ➤ LOGIN API
app.post('/login', (req, res) => {
  const { email, password } = req.body

  const user = users.find(
    u => u.email === email && u.password === password
  )

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  res.json({ message: "Login successful", user })
})

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})