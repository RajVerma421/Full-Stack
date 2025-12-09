<!-- todo.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>To‑Do List</title>
    <style>
      :root{--bg:#f6f8fb;--card:#ffffff;--accent:#4f46e5;--muted:#6b7280}
      html,body{height:100%;margin:0;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Roboto,'Helvetica Neue',Arial}
      body{background:linear-gradient(180deg,var(--bg),#eef2ff);display:flex;align-items:center;justify-content:center;padding:32px}
      .wrap{width:100%;max-width:720px}
      .card{background:var(--card);border-radius:12px;box-shadow:0 6px 30px rgba(15,23,42,0.06);padding:20px}
      header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
      h1{font-size:20px;margin:0}
      .controls{display:flex;gap:8px}
      input[type=text]{flex:1;padding:10px 12px;border:1px solid #e6e9f2;border-radius:8px;outline:none}
      button{background:var(--accent);color:#fff;border:none;padding:9px 12px;border-radius:8px;cursor:pointer}
      button.secondary{background:#fff;color:var(--accent);border:1px solid rgba(79,70,229,0.12)}
      .list{margin-top:12px;display:flex;flex-direction:column;gap:8px}
      .item{display:flex;align-items:center;gap:12px;padding:10px;border-radius:8px;border:1px solid #f0f2f7}
      .item.done{background:linear-gradient(90deg,rgba(79,70,229,0.04),rgba(79,70,229,0.02));text-decoration:line-through;color:var(--muted)}
      .content{flex:1;display:flex;align-items:center;gap:12px}
      .content .text{font-size:15px}
      .meta{display:flex;gap:8px}
      .empty{padding:28px;text-align:center;color:var(--muted)}
      .filters{display:flex;gap:8px;margin-top:12px}
      .badge{padding:6px 10px;border-radius:999px;background:#f8fafc;color:var(--muted);font-size:13px}
    </style>
  </head>
  <body>
    <div class="wrap">
      <div class="card">
        <header>
          <h1>To‑Do List</h1>
          <div class="controls">
            <input id="newTask" type="text" placeholder="Add a new task" />
            <button id="addBtn">Add</button>
            <button id="clearCompleted" class="secondary">Clear Done</button>
          </div>
        </header>
        <section>
          <div class="filters">
            <div id="count" class="badge">0 items</div>
            <div style="flex:1"></div>
            <div>
              <select id="filter">
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div id="list" class="list"></div>
          <div id="empty" class="empty">No tasks yet. Add one above.</div>
        </section>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>

/* script.js */
const qs = s => document.querySelector(s)
const newTaskInput = qs('#newTask')
const addBtn = qs('#addBtn')
const listEl = qs('#list')
const emptyEl = qs('#empty')
const countEl = qs('#count')
const filterEl = qs('#filter')
const clearCompletedBtn = qs('#clearCompleted')
let tasks = JSON.parse(localStorage.getItem('todo.tasks') || '[]')

function save() {
  localStorage.setItem('todo.tasks', JSON.stringify(tasks))
}

function render() {
  const filter = filterEl.value
  listEl.innerHTML = ''
  const shown = tasks.filter(t => filter === 'all' ? true : (filter === 'done' ? t.done : !t.done))
  if (shown.length === 0) {
    emptyEl.style.display = 'block'
  } else {
    emptyEl.style.display = 'none'
  }
  shown.forEach(task => {
    const item = document.createElement('div')
    item.className = 'item' + (task.done ? ' done' : '')
    const content = document.createElement('div')
    content.className = 'content'
    const chk = document.createElement('input')
    chk.type = 'checkbox'
    chk.checked = task.done
    chk.addEventListener('change', () => {
      task.done = chk.checked
      save()
      render()
    })
    const text = document.createElement('div')
    text.className = 'text'
    text.textContent = task.text
    text.contentEditable = true
    text.addEventListener('blur', () => {
      const v = text.textContent.trim()
      if (v === '') {
        tasks = tasks.filter(t => t.id !== task.id)
      } else {
        task.text = v
      }
      save()
      render()
    })
    const meta = document.createElement('div')
    meta.className = 'meta'
    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.addEventListener('click', () => text.focus())
    const delBtn = document.createElement('button')
    delBtn.textContent = 'Delete'
    delBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id)
      save()
      render()
    })
    content.appendChild(chk)
    content.appendChild(text)
    item.appendChild(content)
    meta.appendChild(editBtn)
    meta.appendChild(delBtn)
    item.appendChild(meta)
    listEl.appendChild(item)
  })
  countEl.textContent = tasks.length + ' items'
}

function addTask(text) {
  const t = { id: Date.now().toString(36) + Math.random().toString(36).slice(2,8), text: text.trim(), done: false }
  tasks.push(t)
  save()
  render()
}

addBtn.addEventListener('click', () => {
  const v = newTaskInput.value.trim()
  if (v) {
    addTask(v)
    newTaskInput.value = ''
    newTaskInput.focus()
  }
})

newTaskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addBtn.click()
  }
})

filterEl.addEventListener('change', render)

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done)
  save()
  render()
})

render()
