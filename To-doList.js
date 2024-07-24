
// Selectors
const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskDate = document.getElementById('taskDate');
const taskTime = document.getElementById('taskTime');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');

// Event listeners
form.addEventListener('submit', function(event) {
    event.preventDefault();
    addTask();
});

taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.closest('.task-item');
        const taskId = taskItem.dataset.id;
        taskItem.remove();
        removeTaskFromLocalStorage(taskId);
    } else if (event.target.classList.contains('checkbox')) {
        const taskItem = event.target.closest('.task-item');
        taskItem.classList.toggle('completed');
        updateTaskInLocalStorage(taskItem.dataset.id);
    }
});

clearBtn.addEventListener('click', clearCompletedTasks);
document.addEventListener('DOMContentLoaded', displayTasksFromLocalStorage);

// Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: new Date().getTime(),
        text: taskText,
        completed: false,
        date: taskDate.value,
        time: taskTime.value
    };

    createTaskElement(task);
    saveTaskToLocalStorage(task);

    taskInput.value = '';
    taskDate.value = '';
    taskTime.value = '';
    alert("task added to your list !!");
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.classList.add('task-item');
    if (task.completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
        <span>${task.text}</span>
        <span class="task-date">${task.date} ${task.time}</span>
        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);
}

function clearCompletedTasks() {
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(task => {
        task.remove();
        removeTaskFromLocalStorage(task.dataset.id);
    });
}

function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function displayTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}

function updateTaskInLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        if (task.id == id) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id != id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
