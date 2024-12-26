document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskTime = document.getElementById('task-time');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const searchDateInput = document.getElementById('search-date'); // Search input element
    let tasks = [];

    // Function to render tasks
    function renderTasks(filteredTasks = null) {
        taskList.innerHTML = '';
        const tasksToRender = filteredTasks || tasks;
        tasksToRender.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            if (task.completed) taskElement.classList.add('completed');

            taskElement.innerHTML = `
                <span>${task.name} - ${task.time}</span>
                <div>
                    <button class="complete-btn">✔</button>
                    <button class="edit-btn">✎</button>
                    <button class="delete-btn">🗑️</button>
                </div>
            `;
            taskList.appendChild(taskElement);

            // Add event listeners for buttons after the task is rendered
            const completeBtn = taskElement.querySelector('.complete-btn');
            const editBtn = taskElement.querySelector('.edit-btn');
            const deleteBtn = taskElement.querySelector('.delete-btn');

            // Mark as completed
            completeBtn.addEventListener('click', () => toggleComplete(index));

            // Edit the task
            editBtn.addEventListener('click', () => editTask(index));

            // Delete the task
            deleteBtn.addEventListener('click', () => deleteTask(index));
        });
    }

    // Function to add a new task
    function addTask() {
        const taskName = taskInput.value.trim();
        const taskDueTime = taskTime.value;
        if (taskName) {
            const newTask = {
                name: taskName,
                time: taskDueTime ? taskDueTime : 'No due date',
                completed: false,
            };
            tasks.push(newTask);
            renderTasks();
            taskInput.value = '';
            taskTime.value = '';
        }
    }

    // Function to mark a task as completed
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Function to edit a task
    function editTask(index) {
        const newName = prompt('Edit task name:', tasks[index].name);
        const newTime = prompt('Edit task due time:', tasks[index].time);
        if (newName && newTime) {
            tasks[index].name = newName;
            tasks[index].time = newTime;
            renderTasks();
        }
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to filter tasks by date
    function filterTasksByDate() {
        const searchDate = searchDateInput.value;
        if (searchDate) {
            const filteredTasks = tasks.filter(task => task.time.startsWith(searchDate));
            renderTasks(filteredTasks);
        } else {
            renderTasks(); // If no date is selected, show all tasks
        }
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    searchDateInput.addEventListener('input', filterTasksByDate); // Listen for changes in the search date input

    // Initial render
    renderTasks();
});
