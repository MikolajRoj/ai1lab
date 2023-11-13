class Todo {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.term = ''; // W?a?ciwo?? przechowuj?ca fraz? wyszukiwania.
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    addTask(taskText, dueDate) {
        if (taskText.trim() === "") {
            alert("Wprowad? tre?? zadania");
            return;
        }

        this.tasks.push({
            text: taskText,
            dueDate: dueDate
        });

        this.saveTasks();
        this.draw();
    }

    editTask(index, newText, newDueDate) {
        if (newText.trim() === "") {
            alert("Wprowad? now? tre?? zadania");
            return;
        }

        this.tasks[index].text = newText;
        this.tasks[index].dueDate = newDueDate;
        this.saveTasks();
        this.draw();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.draw();
    }

    getFilteredTasks() {
        return this.tasks.filter(task => {
            return task.text.toLowerCase().includes(this.term.toLowerCase());
        });
    }

    draw() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        const filteredTasks = this.getFilteredTasks(); // Pobierz tylko pasuj?ce do frazy wyszukiwania zadania.

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            const taskText = task.text;
            const highlightedText = this.highlightSearchTerm(taskText); // Pod?wietl szukan? fraz?.
            taskItem.innerHTML = `${highlightedText} (Termin: ${task.dueDate}) <button class="deleteTaskButton">Usu?</button> <button class="editTaskButton">Edytuj</button>`;
            taskList.appendChild(taskItem);

            const deleteButton = taskItem.querySelector(".deleteTaskButton");
            deleteButton.addEventListener("click", () => {
                this.deleteTask(index);
            });

            const editButton = taskItem.querySelector(".editTaskButton");
            editButton.addEventListener("click", () => {
                const newText = prompt("Edytuj tre?? zadania:", task.text);
                const newDueDate = prompt("Edytuj termin zadania:", task.dueDate);
                this.editTask(index, newText, newDueDate);
            });
        });
    }

    highlightSearchTerm(text) {
        const regex = new RegExp(this.term, 'gi'); // Utwórz wyra?enie regularne dla szukanej frazy.
        return text.replace(regex, match => `<span class="highlight">${match}</span>`); // Pod?wietl pasuj?ce fragmenty tekstu.
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const todoList = new Todo();
    const addTaskButton = document.getElementById("addTaskButton");
    const searchInput = document.getElementById("searchInput");

    addTaskButton.addEventListener("click", function () {
        const taskInput = document.getElementById("taskInput");
        const taskDueDate = document.getElementById("taskDueDate");

        todoList.addTask(taskInput.value, taskDueDate.value);

        taskInput.value = "";
        taskDueDate.value = "";
    });

    searchInput.addEventListener("input", function () {
        todoList.term = searchInput.value; // Aktualizuj fraz? wyszukiwania.
        todoList.draw();
    });

    todoList.draw();
});