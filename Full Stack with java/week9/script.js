document.addEventListener("DOMContentLoaded", () => {
  // ---------- TODO APP ----------
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");

  function createTodoElement(text) {
    const li = document.createElement("li");
    li.className = "todo-item";

    const left = document.createElement("div");
    left.className = "todo-left";

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", `Mark '${text}' complete`);

    // text
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = text;

    left.appendChild(checkbox);
    left.appendChild(span);

    // actions
    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const upBtn = document.createElement("button");
    upBtn.className = "btn";
    upBtn.textContent = "↑";
    upBtn.title = "Move up";

    const downBtn = document.createElement("button");
    downBtn.className = "btn";
    downBtn.textContent = "↓";
    downBtn.title = "Move down";

    const delBtn = document.createElement("button");
    delBtn.className = "btn delete";
    delBtn.textContent = "✕";
    delBtn.title = "Delete";

    actions.appendChild(upBtn);
    actions.appendChild(downBtn);
    actions.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(actions);

    // Event: checkbox toggle
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        span.classList.add("completed");
      } else {
        span.classList.remove("completed");
      }
      updateButtonsState();
    });

    // Event: delete
    delBtn.addEventListener("click", () => {
      li.remove();
      updateButtonsState();
    });

    // Event: move up
    upBtn.addEventListener("click", () => {
      const prev = li.previousElementSibling;
      if (prev) {
        todoList.insertBefore(li, prev);
        updateButtonsState();
      }
    });

    // Event: move down
    downBtn.addEventListener("click", () => {
      const next = li.nextElementSibling;
      if (next) {
        todoList.insertBefore(next, li);
        updateButtonsState();
      }
    });

    return li;
  }

  function addTodoFromInput() {
    const text = todoInput.value.trim();
    if (!text) return;
    const node = createTodoElement(text);
    todoList.appendChild(node);
    todoInput.value = "";
    todoInput.focus();
    updateButtonsState();
  }

  addBtn.addEventListener("click", addTodoFromInput);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodoFromInput();
  });

  function updateButtonsState() {
    const items = Array.from(todoList.querySelectorAll(".todo-item"));
    items.forEach((item, idx) => {
      const up = item.querySelector(".btn:nth-child(1)");
      const down = item.querySelector(".btn:nth-child(2)");
      if (up) up.disabled = idx === 0;
      if (down) down.disabled = idx === items.length - 1;
    });
  }

  ["Finish lab report", "Study for algorithms", "Buy groceries"].forEach((t) => {
    todoList.appendChild(createTodoElement(t));
  });
  updateButtonsState();


  // ---------- CHESSBOARD ----------
  const chessboardEl = document.getElementById("chessboard");
  const regenBtn = document.getElementById("regen-board");
  const boardSizeSelect = document.getElementById("board-size");

  function generateChessboard(n = 8) {
    chessboardEl.innerHTML = "";
    chessboardEl.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    chessboardEl.style.gridTemplateRows = `repeat(${n}, 1fr)`;

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const sq = document.createElement("div");
        sq.className = "square";
        sq.setAttribute("role", "gridcell");
        sq.dataset.r = r;
        sq.dataset.c = c;

        const file = String.fromCharCode("a".charCodeAt(0) + c);
        const rank = n - r;
        const coord = document.createElement("span");
        coord.className = "coord";
        coord.textContent = `${file}${rank}`;
        sq.appendChild(coord);

        const isLight = (r + c) % 2 === 0;
        const lightColor = "#f0d9b5";
        const darkColor = "#b58863";
        sq.style.background = isLight ? lightColor : darkColor;
        sq.style.border = "1px solid rgba(0,0,0,0.06)";

        sq.addEventListener("click", () => {
          sq.classList.toggle("highlight");
        });

        sq.title = `Square ${file}${rank}`;
        chessboardEl.appendChild(sq);
      }
    }
  }

  generateChessboard(parseInt(boardSizeSelect.value, 10));

  regenBtn.addEventListener("click", () => {
    const n = parseInt(boardSizeSelect.value, 10);
    generateChessboard(n);
  });
  boardSizeSelect.addEventListener("change", () => {
    const n = parseInt(boardSizeSelect.value, 10);
    generateChessboard(n);
  });
});
