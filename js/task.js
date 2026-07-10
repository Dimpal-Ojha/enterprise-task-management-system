if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "login.html";
}

const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const projectSelect = document.getElementById("project");

const searchInput =
document.getElementById("search");

const filterPriority =
document.getElementById("filterPriority");

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

let projects =
JSON.parse(localStorage.getItem("projects")) || [];

loadProjects();
renderTasks();

function loadProjects(){

    projectSelect.innerHTML =
    '<option value="">Select Project</option>';

    projects.forEach(project => {

        projectSelect.innerHTML += `
            <option value="${project.name}">
                ${project.name}
            </option>
        `;

    });

}

form.addEventListener("submit", function(e){

    e.preventDefault();

    const task = {

        id: Date.now(),

        title:
        document.getElementById("title").value,

        priority:
        document.getElementById("priority").value,

        project:
        document.getElementById("project").value,

        dueDate:
        document.getElementById("dueDate").value,

        description:
        document.getElementById("description").value,

        status: "To Do"
    };

    tasks.push(task);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();

    form.reset();

});

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = [...tasks];

    const searchValue =
    searchInput.value.toLowerCase();

    if(searchValue){

        filteredTasks =
        filteredTasks.filter(task =>
            task.title
            .toLowerCase()
            .includes(searchValue)
        );

    }

    if(filterPriority.value !== "All"){

        filteredTasks =
        filteredTasks.filter(task =>
            task.priority ===
            filterPriority.value
        );

    }

    filteredTasks.forEach(task => {
        const today =
new Date().toISOString().split("T")[0];

const isOverdue =
task.dueDate &&
task.status !== "Done" &&
task.dueDate < today;

        taskList.innerHTML += `

        <tr class="${isOverdue ? 'overdue' : ''}">

            <td>${task.title}</td>

            <td class="
${task.priority === 'High' ? 'priority-high' : ''}
${task.priority === 'Medium' ? 'priority-medium' : ''}
${task.priority === 'Low' ? 'priority-low' : ''}
">
${task.priority}
</td>

            <td>${task.project}</td>

            <td>${task.dueDate || "-"}</td>

            <td>${task.description || "-"}</td>

            <td>

                <select
                onchange="changeStatus(${task.id}, this.value)">

                    <option
                    value="To Do"
                    ${task.status === "To Do" ? "selected" : ""}>
                    To Do
                    </option>

                    <option
                    value="In Progress"
                    ${task.status === "In Progress" ? "selected" : ""}>
                    In Progress
                    </option>

                    <option
                    value="Done"
                    ${task.status === "Done" ? "selected" : ""}>
                    Done
                    </option>

                </select>

            </td>

            <td>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

function editTask(id){

    const task =
    tasks.find(task => task.id === id);

    if(!task) return;

    const newTitle =
    prompt(
        "Enter New Task Title",
        task.title
    );

    if(newTitle === null) return;

    const newPriority =
    prompt(
        "Enter Priority (Low / Medium / High)",
        task.priority
    );

    if(newPriority === null) return;

    const newDueDate =
    prompt(
        "Enter Due Date (YYYY-MM-DD)",
        task.dueDate || ""
    );

    const newDescription =
    prompt(
        "Enter Description",
        task.description || ""
    );

    task.title = newTitle;
    task.priority = newPriority;
    task.dueDate = newDueDate;
    task.description = newDescription;

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();

}

function deleteTask(id){

    tasks = tasks.filter(
        task => task.id !== id
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();

}

function changeStatus(id, newStatus){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.status = newStatus;
        }

        return task;

    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();

}

searchInput.addEventListener(
    "input",
    renderTasks
);

filterPriority.addEventListener(
    "change",
    renderTasks
);