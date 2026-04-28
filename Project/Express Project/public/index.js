const input = document.getElementById('taskInput');
const list = document.getElementById('list');

async function load() {
    const res = await fetch('/api/tasks');
    const data = await res.json();

    list.innerHTML = data.map(t => `
        <div class="task">
            <div class="left">
                <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="toggle(${t.id}, this.checked)">
                <span class="${t.completed ? 'done' : ''}">${t.text}</span>
            </div>
            <div class="actions">
                <button onclick="editTask(${t.id}, '${t.text}')">Edit</button>
                <button onclick="removeTask(${t.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

async function addTask() {
    const text = input.value.trim();
    if (!text) return;

    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });

    input.value = '';
    load();
}

async function toggle(id, completed) {
    await fetch('/api/tasks/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
    });
    load();
}

async function editTask(id, oldText) {
    const newText = prompt('Edit task:', oldText);
    if (!newText) return;

    await fetch('/api/tasks/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText })
    });

    load();
}

async function removeTask(id) {
    await fetch('/api/tasks/' + id, { method: 'DELETE' });
    load();
}

input.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTask();
});

load();