// DOM Elements
const taskForm = document.querySelector('form');
const taskInput = document.querySelector('#task-input');
const taskCategory = document.querySelector('#task-category');
const taskList = document.querySelector('#task-list');


// ==========================================
// Dark / Light mode functionality
// ==========================================
const themeBtn = document.querySelector('#theme-toggle');
const themeIcon = themeBtn.querySelector('i');

// Dark mode check karne ke liye localStorage ya system preference check ho raha hai.
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    // Isse body tag mein attribute lagega setAttribute()
    document.body.setAttribute('data-theme', 'dark');
    // Yaha classList.replace() use ho raha hai taaki icon change ho jaye
    themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
} else {
    // Yaha setAttribute() use ho raha hai taaki body tag mein attribute lage 
    document.body.setAttribute('data-theme', 'light');
}

// Toggle Event Listener
themeBtn.addEventListener('click', () => {
    // dataset
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'; //ternary operator use ho raha hai

    //setAttribute() aur localStorage.setItem() use ho raha hai
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // REQUIRED: classList
    if (newTheme === 'dark') {
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
    } else {
        themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
    }
});


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskInput.value;
    const category = taskCategory.value;
    if (title.trim() === '') return;

    const newTask = {
        title,
        category,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
    taskCategory.value = 'Work';
    localStorage.setItem('tasks', JSON.stringify(tasks));
});

function renderTasks() {
    // Empty the container
    taskList.innerHTML = '';

    /* DocumentFragment ek temporary invisible container hai 
    jisme elements banane par ek baar mein DOM mein push kar sakte hain, 
    taaki bar bar reflow na ho. isse speed up hota hai */
    const fragment = document.createDocumentFragment();

    tasks.forEach((task, index) => {
        // Create the main task card
        const taskItem = document.createElement('div');
        taskItem.className = 'task-card';
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        // Attributes vs Properties (using dataset and setAttribute)
        taskItem.dataset.id = index; // Ye Event Delegation main kaam aayega
        taskItem.setAttribute('data-category', task.category);
        taskItem.setAttribute('data-status', task.completed ? 'completed' : 'pending');

        // --- Strict DOM Manipulation ---

        // Creating the task-info div
        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';

        // Creating Title Span & Text Node
        const titleSpan = document.createElement('span');
        titleSpan.className = 'task-title';
        const titleText = document.createTextNode(task.title); // Text Add ho raha hai
        titleSpan.appendChild(titleText);

        // Creating Category Span & Text Node
        const categorySpan = document.createElement('span');
        categorySpan.className = 'task-category';
        const categoryText = document.createTextNode(task.category); //  Text Add ho raha hai
        categorySpan.appendChild(categoryText);

        // Adding text to the info div using append()
        taskInfo.append(titleSpan, categorySpan);

        // Creating the task-actions div
        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        // Creating Complete Button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.setAttribute('title', 'Complete');
        const completeIcon = document.createElement('i');
        completeIcon.className = 'ri-check-line';
        completeBtn.appendChild(completeIcon);

        // Creating Edit Button
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.setAttribute('title', 'Edit');
        const editIcon = document.createElement('i');
        editIcon.className = 'ri-edit-line';
        editBtn.appendChild(editIcon);

        // Creating Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.setAttribute('title', 'Delete');
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'ri-delete-bin-line';
        deleteBtn.appendChild(deleteIcon);

        // Adding all buttons to the actions div using append()
        taskActions.append(completeBtn, editBtn, deleteBtn);

        // Ready final card
        taskItem.append(taskInfo, taskActions);

        // Append the finished card to the Document Fragment
        fragment.appendChild(taskItem);
    });

    // Finally, append the entire fragment to the real DOM at once
    taskList.appendChild(fragment);
    emptyState(); 
}

renderTasks();

// --- EVENT DELEGATION: Single listener for all actions ---
taskList.addEventListener('click', (e) => {
    // Closest se pata chalta hai ki click kaha hua, aur uske parent elements me se kaunsa match karta hai.
    const taskCard = e.target.closest('.task-card');

    // Agar click task card ke bahar hua, toh ignore kar dena hai.
    if (!taskCard) return;

    // Extract the index from the data attribute we set earlier
    const index = parseInt(taskCard.dataset.id);

    // Check which button was clicked using e.target.closest()
    if (e.target.closest('.delete-btn')) {
        deleteTask(index);
    }
    else if (e.target.closest('.complete-btn')) {
        taskComplete(index);
    }
    else if (e.target.closest('.edit-btn')) {
        editTask(index);
    }
    // Handle the Save and Cancel buttons during Edit Mode
    else if (e.target.closest('.save-btn')) {
        saveTask(index);
    }
    else if (e.target.closest('.cancel-btn')) {
        abortTask(index);
    }
});

function editTask(index) {
    const task = tasks[index];
    const taskCard = taskList.children[index];

    if (task.completed) return;

    // 1. Create a single wrapper for everything
    const editDiv = document.createElement('div');
    editDiv.classList.add('edit-mode');

    // Taking the existing title and category, and putting them in input/select for editing
    editDiv.innerHTML = `
        <input type="text" value="${task.title}" class="edit-task-input" />
        <select class="edit-task-category">
            <option value="Work" ${task.category === 'Work' ? 'selected' : ''}>Work</option>
            <option value="Personal" ${task.category === 'Personal' ? 'selected' : ''}>Personal</option>
            <option value="Urgent" ${task.category === 'Urgent' ? 'selected' : ''}>Urgent</option>
        </select>
        <i class="ri-close-line cancel-btn" title="Cancel" style="cursor:pointer; font-size: 1.25rem;"></i>
        <i class="ri-check-line save-btn" title="Save" style="cursor:pointer; font-size: 1.25rem; margin-left: 0.5rem;"></i>
    `;

    // Use replaceWith() AND remove()!
    // We replace the info div with our new edit div
    taskCard.querySelector('.task-info').replaceWith(editDiv);
    // Delete the old action buttons using remove()
    taskCard.querySelector('.task-actions').remove();
}

function saveTask(index) {
    const taskItem = taskList.children[index];
    const taskText = taskItem.querySelector('.edit-task-input').value;
    const taskCategory = taskItem.querySelector('.edit-task-category').value;
    if (taskText.trim() === '') return;
    tasks[index].title = taskText.trim();
    tasks[index].category = taskCategory;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskList.innerHTML = '';
    console.log(tasks);
    renderTasks();
}

function abortTask(index) {
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskList.innerHTML = '';
    renderTasks();
}

function taskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskItem = taskList.children[index];
    taskItem.classList.toggle('completed');
}

function emptyState() {
    if (tasks.length === 0) {
        document.querySelector('.empty-list-box').style.display = 'flex';
    } else {
        document.querySelector('.empty-list-box').style.display = 'none';
    }
}

// ==========================================
// Event Propagation (Bubbling & Capturing)
const grandparent = document.getElementById('grandparent');
const parent = document.getElementById('parent');
const child = document.getElementById('child');

/*
  ============================================
  DIFFERENCE BETWEEN EVENT CAPTURING AND EVENT BUBBLING:
  ============================================
  <------Event Bubbling----->
   - Bubbling mein event andar se bahar jaata hai, matlab child se parent ki taraf travel karta hai
   - Jab hum kisi button pe click karte hain, pehle button ka event fire hota hai, phir uske parent div ka, phir body ka, phir html ka, aur finally document tak pahunchta hai
   - Yeh default behaviour hai browser ka, matlab tumhe kuch extra nahi likhna padta
   - addEventListener mein teen argument nahi diya, ya false diya, toh automatically bubbling mode mein kaam karta hai
   - Event Delegation isi pe based hai, jisme parent pe ek listener lagate ho aur saare children ke events handle ho jaate hain
   - e.stopPropagation() likh do toh bubbling wahi rok jaati hai, upar nahi jaayega event

  <------Event Capturing----->
   - Capturing mein event bahar se andar jaata hai, matlab document se start hokar target child tak pahunchta hai
   - Jab hum click karte hain, pehle document pakadta hai event, phir html, phir body, phir div, aur finally us element tak pohochta hai jispe click hua
   - Yeh default nahi hai, isko enable karne ke liye addEventListener ke teesre argument mein true pass karna padta hai
   - Real world mein capturing bahut kam use hoti hai, sirf tab jab parent ko event pehle handle karna ho child se pehle
   - e.stopPropagation() capturing mein bhi kaam karta hai, element wahi rok leta hai event ko aage jane se

   <=====Important —> Dono ka Order=====>
    Browser mein dono ek saath hote hain, pehle Capturing chalta hai upar se neeche, uske baad Bubbling neeche se upar
    Toh actually ek click pe poora cycle hota hai, capturing phase, phir target, phir bubbling phase
*/

// --- 1. EVENT CAPTURING LOGS ---
// Because we pass { capture: true }, these fire first, going outside-in.
grandparent.addEventListener('click', (e) => {
    console.log("--- Capturing Phase ---");
    console.log("Grandparent");
}, { capture: true });

parent.addEventListener('click', (e) => {
    console.log("Parent");
}, { capture: true });

child.addEventListener('click', (e) => {
    console.log("Child");
}, { capture: true });


// --- 2. EVENT BUBBLING LOGS ---
// These fire second, going inside-out.
child.addEventListener('click', (e) => {
    console.log("--- Bubbling Phase ---");
    console.log("Child");
});

parent.addEventListener('click', (e) => {
    console.log("Parent");
});

grandparent.addEventListener('click', (e) => {
    console.log("Grandparent");
    console.log("==============================");
});