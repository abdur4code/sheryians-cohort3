document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        updateIcons(true);
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.getAttribute('data-theme') === 'dark';

        if (isDark) {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateIcons(false);
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateIcons(true);
        }
    });

    function updateIcons(isDark) {
        if (isDark) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    }
});

const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('.task-list');
const deleteBtn = document.querySelector('.delete-btn');


const tasks = ["hello", "world"];

const taskRender = () => {
    for (let i = 0; i < tasks.length; i++) {

        taskList.innerHTML += `<li class="task-item">
                    <label class="checkbox-container">
                        <input class="check-box-input" onclick="completeTask(${i})" type="checkbox">
                        <span class="custom-checkbox"></span>
                    </label>
                    <div class="task-text-container">
                        <span class="task-text">${tasks[i]}</span>
                    </div>
                    <div class="actions">
                        <button class="edit-btn" onclick="editTask(${i})" aria-label="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button class="delete-btn" onclick="deleteTask(${i})" aria-label="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </li>`;
    }
}

taskRender();

addTaskBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push(taskText);
        taskInput.value = '';
    }
    taskRender();
});

function deleteTask(index) {
    tasks.splice(index, 1);
    taskList.innerHTML = '';
    taskRender();
}

function editTask(index) {
    const taskItem = taskList.children[index];
    const taskText = taskItem.querySelector('.task-text').textContent;
    taskItem.innerHTML = ` <div class="task-text-container">
              <input
                type="text"
                value="${taskText}"
                id="task-input"
              />
            </div>
            <i id="cross-btn" class="ri-close-line" onclick="abortTask(${index})"></i>
            <i id="check-btn" class="ri-check-line" onclick="saveTask(${index})"></i>`;
}

function saveTask(index) {
    const taskItem = taskList.children[index];
    const taskText = taskItem.querySelector('#task-input').value;
    tasks[index] = taskText;
    taskList.innerHTML = '';
    taskRender();
}

function abortTask(index) {
    taskList.innerHTML = '';
    taskRender();
}

function completeTask(index) {
    const taskItem = taskList.children[index];
    const checkbox = taskItem.querySelector('.check-box-input');
    
    if (checkbox.checked) {
        taskItem.classList.add('completed');
    }else {
        taskItem.classList.remove('completed');
    }
}