// script.js
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const editModal = document.getElementById('editModal');
const editTodoText = document.getElementById('editTodoText');
const saveEditBtn = document.getElementById('saveEditBtn');
const closeBtn = document.querySelector('.close');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editTodoId = null;

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="todo-text">${todo}</span>
      <div class="todo-actions">
        <button class="edit-btn" data-id="${index}">Edit</button>
        <button class="delete-btn" data-id="${index}">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    todos.push(todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInput.value = '';
  }
}

function deleteTodo(id) {
  todos.splice(id, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

function openEditModal(id) {
  editTodoId = id;
  editTodoText.value = todos[id];
  editModal.style.display = 'block';
}

function saveEditTodo() {
  if (editTodoId !== null) {
    todos[editTodoId] = editTodoText.value;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    closeEditModal();
  }
}

function closeEditModal() {
  editModal.style.display = 'none';
  editTodoId = null;
}

addTodoBtn.addEventListener('click', addTodo);

todoList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.dataset.id;
    deleteTodo(id);
  } else if (event.target.classList.contains('edit-btn')) {
    const id = event.target.dataset.id;
    openEditModal(id);
  }
});

saveEditBtn.addEventListener('click', saveEditTodo);
closeBtn.addEventListener('click', closeEditModal);

window.addEventListener('click', (event) => {
  if (event.target == editModal) {
    closeEditModal();
  }
});

renderTodos();