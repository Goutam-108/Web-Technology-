const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({});
    const task = { id: Date.now(), text, completed: false };
    tasks.push(task);
    res.json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const { text, completed } = req.body;

    tasks = tasks.map(t => {
        if (t.id === id) {
            return {
                ...t,
                text: text !== undefined ? text : t.text,
                completed: completed !== undefined ? completed : t.completed
            };
        }
        return t;
    });

    res.json({});
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.json({});
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));